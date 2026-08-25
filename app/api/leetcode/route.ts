import { NextResponse } from "next/server";

type Day = {
  date: string;
  count: number;
};

type SubmissionItem = {
  difficulty: string;
  count: number;
};

export async function GET() {
  const username =
    process.env.LEETCODE_USERNAME;

  /* =====================================================
     CHECK USERNAME
  ===================================================== */

  if (!username) {
    return NextResponse.json({
      total: 0,
      days: [],
      dayStreak: 0,
      globalRank: 0,
      solvedQuestions: 0,
      error:
        "LEETCODE_USERNAME is missing",
    });
  }

  try {
    /* ===================================================
       GRAPHQL QUERY
    =================================================== */

    const query = `
      query userProfile(
        $username: String!
        $year: Int
      ) {
        matchedUser(
          username: $username
        ) {

          profile {
            ranking
          }

          submitStatsGlobal {
            acSubmissionNum {
              difficulty
              count
            }
          }

          userCalendar(
            year: $year
          ) {
            streak
            totalActiveDays
            submissionCalendar
          }
        }
      }
    `;

    /* ===================================================
       FETCH CURRENT YEAR
    =================================================== */

    const currentYear =
      new Date().getFullYear();

    const previousYear =
      currentYear - 1;

    async function fetchYear(
      year: number
    ) {
      const response =
        await fetch(
          "https://leetcode.com/graphql/",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",

              Referer:
                "https://leetcode.com/",

              "User-Agent":
                "Mozilla/5.0",
            },

            body: JSON.stringify({
              query,

              variables: {
                username,
                year,
              },
            }),

            cache: "no-store",
          }
        );

      if (!response.ok) {
        throw new Error(
          `LeetCode HTTP error: ${response.status}`
        );
      }

      return response.json();
    }

    /* ===================================================
       GET BOTH YEARS
    =================================================== */

    const [
      currentData,
      previousData,
    ] = await Promise.all([
      fetchYear(currentYear),
      fetchYear(previousYear),
    ]);

    /* ===================================================
       ERROR CHECK
    =================================================== */

    if (
      currentData?.errors ||
      previousData?.errors
    ) {
      console.error(
        "LeetCode GraphQL Error:",
        currentData?.errors ||
          previousData?.errors
      );

      return NextResponse.json({
        total: 0,
        days: [],
        dayStreak: 0,
        globalRank: 0,
        solvedQuestions: 0,
        error:
          "LeetCode GraphQL API error",
      });
    }

    /* ===================================================
       USER
    =================================================== */

    const user =
      currentData?.data?.matchedUser;

    if (!user) {
      return NextResponse.json({
        total: 0,
        days: [],
        dayStreak: 0,
        globalRank: 0,
        solvedQuestions: 0,
        error:
          "LeetCode user not found",
      });
    }

    /* ===================================================
       CALENDAR DATA
    =================================================== */

    const currentCalendar =
      currentData?.data?.matchedUser
        ?.userCalendar
        ?.submissionCalendar;

    const previousCalendar =
      previousData?.data?.matchedUser
        ?.userCalendar
        ?.submissionCalendar;

    const allDays = new Map<
      string,
      number
    >();

    /* ===================================================
       PARSE CALENDAR
    =================================================== */

    function parseCalendar(
      calendar: unknown
    ) {
      if (!calendar) return;

      try {
        const parsed =
          typeof calendar ===
          "string"
            ? JSON.parse(calendar)
            : calendar;

        Object.entries(
          parsed as Record<
            string,
            number
          >
        ).forEach(
          ([timestamp, count]) => {
            const date =
              new Date(
                Number(timestamp) *
                  1000
              )
                .toISOString()
                .split("T")[0];

            allDays.set(
              date,
              (allDays.get(date) ||
                0) + Number(count)
            );
          }
        );
      } catch (error) {
        console.error(
          "Calendar parse error:",
          error
        );
      }
    }

    parseCalendar(
      previousCalendar
    );

    parseCalendar(
      currentCalendar
    );

    /* ===================================================
       LAST 365 DAYS ONLY
    =================================================== */

    const today = new Date();

    const oneYearAgo =
      new Date(today);

    oneYearAgo.setDate(
      today.getDate() - 364
    );

    const days: Day[] = [];

    allDays.forEach(
      (count, date) => {
        const dateObject =
          new Date(
            `${date}T00:00:00`
          );

        if (
          dateObject >=
            oneYearAgo &&
          dateObject <= today
        ) {
          days.push({
            date,
            count,
          });
        }
      }
    );

    /* ===================================================
       SORT DAYS
    =================================================== */

    days.sort((a, b) =>
      a.date.localeCompare(
        b.date
      )
    );

    /* ===================================================
       TOTAL SUBMISSIONS
    =================================================== */

    const total =
      days.reduce(
        (sum, day) =>
          sum + day.count,
        0
      );

    /* ===================================================
       SOLVED QUESTIONS
    =================================================== */

    const submissionStats =
      user
        ?.submitStatsGlobal
        ?.acSubmissionNum || [];

    const allSolved =
      submissionStats.find(
        (item: SubmissionItem) =>
          item.difficulty === "All"
      );

    const solvedQuestions =
      allSolved
        ? Number(allSolved.count)
        : 0;

    /* ===================================================
       GLOBAL RANK
    =================================================== */

    const globalRank =
      Number(
        user?.profile?.ranking || 0
      );

    /* ===================================================
       ACTIVE DAYS
    =================================================== */

    const activeDays =
      days.filter(
        (day) => day.count > 0
      ).length;

    /* ===================================================
       DAY STREAK
    =================================================== */

    /*
      LeetCode's API gives current streak.
      We use that directly.
    */

    const dayStreak =
      Number(
        currentData
          ?.data
          ?.matchedUser
          ?.userCalendar
          ?.streak || 0
      );

    /* ===================================================
       FINAL RESPONSE
    =================================================== */

    return NextResponse.json({
      total,

      days,

      dayStreak,

      globalRank,

      solvedQuestions,

      activeDays,

      error: null,
    });

  } catch (error) {
    console.error(
      "LeetCode server error:",
      error
    );

    return NextResponse.json({
      total: 0,
      days: [],
      dayStreak: 0,
      globalRank: 0,
      solvedQuestions: 0,
      activeDays: 0,
      error:
        "Failed to fetch LeetCode data",
    });
  }
}