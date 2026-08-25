import { NextResponse } from "next/server";

type Day = {
  date: string;
  count: number;
};

function calculateStreak(days: Day[]) {
  if (!days.length) return 0;

  const sortedDays = [...days].sort((a, b) =>
    a.date.localeCompare(b.date)
  );

  let streak = 0;

  // Today se check karenge
  const today = new Date();

  // Local date ko YYYY-MM-DD me convert
  const todayString = today.toISOString().split("T")[0];

  // Agar aaj contribution nahi hai,
  // toh yesterday se streak check karo.
  let currentDate = new Date(`${todayString}T00:00:00`);

  let todayDay = sortedDays.find(
    (day) => day.date === todayString
  );

  if (!todayDay || todayDay.count === 0) {
    currentDate.setDate(currentDate.getDate() - 1);
  }

  while (true) {
    const dateString = currentDate
      .toISOString()
      .split("T")[0];

    const day = sortedDays.find(
      (item) => item.date === dateString
    );

    if (!day || day.count === 0) {
      break;
    }

    streak++;

    currentDate.setDate(
      currentDate.getDate() - 1
    );
  }

  return streak;
}

export async function GET() {
  const username =
    process.env.GITHUB_USERNAME;

  const token =
    process.env.GITHUB_TOKEN;

  // ==============================
  // ENV CHECK
  // ==============================

  if (!username) {
    return NextResponse.json({
      total: 0,
      days: [],
      dayStreak: 0,
      activeDays: 0,
      error: "GITHUB_USERNAME is missing",
    });
  }

  if (!token) {
    return NextResponse.json({
      total: 0,
      days: [],
      dayStreak: 0,
      activeDays: 0,
      error: "GITHUB_TOKEN is missing",
    });
  }

  try {
    // ==============================
    // GITHUB GRAPHQL QUERY
    // ==============================

    const query = `
      query {
        user(login: "${username}") {
          login
          name

          contributionsCollection {
            contributionCalendar {
              totalContributions

              weeks {
                contributionDays {
                  date
                  contributionCount
                }
              }
            }
          }
        }
      }
    `;

    // ==============================
    // GITHUB API REQUEST
    // ==============================

    const response = await fetch(
      "https://api.github.com/graphql",
      {
        method: "POST",

        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },

        body: JSON.stringify({
          query,
        }),

        cache: "no-store",
      }
    );

    // ==============================
    // RESPONSE CHECK
    // ==============================

    if (!response.ok) {
      const errorText =
        await response.text();

      console.error(
        "GitHub HTTP Error:",
        response.status,
        errorText
      );

      return NextResponse.json({
        total: 0,
        days: [],
        dayStreak: 0,
        activeDays: 0,
        error: `GitHub API HTTP ${response.status}`,
      });
    }

    const data =
      await response.json();

    console.log(
      "GitHub API Response:",
      JSON.stringify(data, null, 2)
    );

    // ==============================
    // GRAPHQL ERROR
    // ==============================

    if (data.errors) {
      console.error(
        "GitHub GraphQL Error:",
        data.errors
      );

      return NextResponse.json({
        total: 0,
        days: [],
        dayStreak: 0,
        activeDays: 0,
        error:
          data.errors?.[0]?.message ||
          "GitHub API error",
      });
    }

    // ==============================
    // USER DATA
    // ==============================

    const user =
      data?.data?.user;

    if (!user) {
      return NextResponse.json({
        total: 0,
        days: [],
        dayStreak: 0,
        activeDays: 0,
        error:
          "GitHub user not found",
      });
    }

    // ==============================
    // CONTRIBUTION CALENDAR
    // ==============================

    const calendar =
      user?.contributionsCollection
        ?.contributionCalendar;

    if (!calendar) {
      return NextResponse.json({
        total: 0,
        days: [],
        dayStreak: 0,
        activeDays: 0,
        error:
          "GitHub contribution calendar not found",
      });
    }

    // ==============================
    // CONVERT GITHUB DATA
    // ==============================

    const days: Day[] = [];

    for (const week of calendar.weeks) {
      for (const day of week.contributionDays) {
        days.push({
          date: day.date,
          count:
            Number(day.contributionCount) || 0,
        });
      }
    }

    // ==============================
    // TOTAL CONTRIBUTIONS
    // ==============================

    const total =
      Number(
        calendar.totalContributions
      ) || 0;

    // ==============================
    // ACTIVE DAYS
    // ==============================

    const activeDays =
      days.filter(
        (day) => day.count > 0
      ).length;

    // ==============================
    // CURRENT STREAK
    // ==============================

    const dayStreak =
      calculateStreak(days);

    // ==============================
    // FINAL RESPONSE
    // ==============================

    return NextResponse.json({
      total,
      days,

      dayStreak,
      activeDays,

      username:
        user.login,

      name:
        user.name || user.login,

      error: null,
    });
  } catch (error) {
    console.error(
      "GitHub server error:",
      error
    );

    return NextResponse.json({
      total: 0,
      days: [],
      dayStreak: 0,
      activeDays: 0,
      error:
        "Failed to fetch GitHub data",
    });
  }
}