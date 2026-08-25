"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

type Day = {
  date: string;
  count: number;
};

type Stats = {
  total: number;
  days: Day[];

  // GitHub
  dayStreak?: number;
  activeDays?: number;

  // LeetCode
  globalRank?: number;
  solvedQuestions?: number;
};

type Platform = "github" | "leetcode";

const emptyStats: Stats = {
  total: 0,
  days: [],
};

/* =========================================================
   LEVEL COLORS
========================================================= */

function getLevel(
  count: number,
  platform: Platform
) {
  if (count === 0) {
    return "bg-white/[0.035] border-white/[0.05]";
  }

  /* LEETCODE - GREEN */

  if (platform === "leetcode") {
    if (count <= 1) {
      return "bg-green-950 border-green-900/50";
    }

    if (count <= 3) {
      return "bg-green-800/70 border-green-700/60";
    }

    if (count <= 6) {
      return "bg-green-600/80 border-green-500/60";
    }

    return "bg-green-400 border-green-300 shadow-[0_0_10px_rgba(74,222,128,0.5)]";
  }

  /* GITHUB - CYAN */

  if (count <= 2) {
    return "bg-cyan-950 border-cyan-900/50";
  }

  if (count <= 5) {
    return "bg-cyan-800/70 border-cyan-700/60";
  }

  if (count <= 10) {
    return "bg-cyan-600/80 border-cyan-500/60";
  }

  return "bg-cyan-400 border-cyan-300 shadow-[0_0_10px_rgba(34,211,238,0.5)]";
}

/* =========================================================
   DATE FORMAT
========================================================= */

function formatDate(date: string) {
  return new Date(
    `${date}T00:00:00`
  ).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

/* =========================================================
   NUMBER FORMAT
========================================================= */

function formatNumber(value?: number) {
  if (
    value === undefined ||
    value === null ||
    Number.isNaN(value)
  ) {
    return "0";
  }

  return value.toLocaleString("en-US");
}

/* =========================================================
   GITHUB ICON
========================================================= */

function GithubIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5 fill-current"
    >
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56v-2.17c-3.2.69-3.87-1.54-3.87-1.54-.53-1.34-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.75 1.18 1.75 1.18 1.02 1.75 2.68 1.25 3.33.96.1-.74.4-1.25.73-1.54-2.55-.29-5.23-1.28-5.23-5.69 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.47.11-3.06 0 0 .96-.31 3.15 1.18A10.9 10.9 0 0 1 12 6.34c.97 0 1.94.13 2.85.38 2.18-1.49 3.14-1.18 3.14-1.18.62 1.59.23 2.77.12 3.06.73.81 1.18 1.84 1.18 3.1 0 4.42-2.69 5.4-5.25 5.68.41.35.78 1.04.78 2.1v3.11c0 .31.21.68.8.56A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
    </svg>
  );
}

/* =========================================================
   LEETCODE ICON
========================================================= */

function LeetCodeIcon() {
  return (
    <span className="text-sm font-black">
      LC
    </span>
  );
}

/* =========================================================
   CONTRIBUTION CALENDAR
========================================================= */

function ContributionCalendar({
  days,
  platform,
}: {
  days: Day[];
  platform: Platform;
}) {
  const calendar = useMemo(() => {
    const today = new Date();

    /*
      Last 365 days
    */

    const start = new Date(today);

    start.setDate(
      today.getDate() - 364
    );

    /*
      Start calendar from Sunday
    */

    start.setDate(
      start.getDate() - start.getDay()
    );

    const map = new Map(
      days.map((day) => [
        day.date,
        day.count,
      ])
    );

    const weeks: Day[][] = [];

    let current = new Date(start);

    /*
      53 weeks
    */

    for (
      let week = 0;
      week < 53;
      week++
    ) {
      const currentWeek: Day[] = [];

      for (
        let day = 0;
        day < 7;
        day++
      ) {
        const date = current
          .toISOString()
          .split("T")[0];

        currentWeek.push({
          date,
          count:
            map.get(date) ?? 0,
        });

        current.setDate(
          current.getDate() + 1
        );
      }

      weeks.push(currentWeek);
    }

    return weeks;
  }, [days]);

  /* =======================================================
     MONTH + YEAR LABELS
  ======================================================= */

  const monthLabels = useMemo(() => {
    const labels: {
      name: string;
      year: number;
      week: number;
    }[] = [];

    let previousMonth = -1;
    let previousYear = -1;

    calendar.forEach(
      (week, index) => {
        const date = new Date(
          `${week[0].date}T00:00:00`
        );

        const month =
          date.getMonth();

        const year =
          date.getFullYear();

        if (
          month !== previousMonth ||
          year !== previousYear
        ) {
          labels.push({
            name:
              date.toLocaleDateString(
                "en-US",
                {
                  month: "short",
                }
              ),

            year,

            week: index,
          });

          previousMonth = month;
          previousYear = year;
        }
      }
    );

    return labels;
  }, [calendar]);

  const isGithub =
    platform === "github";

  return (
    <div className="w-full overflow-x-auto pb-4 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-cyan-500/20">
      <div className="min-w-[950px]">

        {/* =================================================
            MONTH + YEAR
        ================================================= */}

        <div className="relative ml-[50px] h-10">

          {monthLabels.map(
            (month, index) => (
              <div
                key={`${month.name}-${month.year}-${index}`}
                className="absolute whitespace-nowrap"
                style={{
                  left: `${
                    month.week * 16
                  }px`,
                }}
              >
                <span className="text-[11px] font-medium text-gray-500">
                  {month.name}
                </span>

                {/* YEAR */}
                {(month.name === "Jan" ||
                  index === 0) && (
                  <span className="ml-1 text-[9px] text-gray-700">
                    {month.year}
                  </span>
                )}
              </div>
            )
          )}

        </div>

        {/* =================================================
            WEEK DAYS + GRAPH
        ================================================= */}

        <div className="flex">

          {/* WEEK DAYS */}

          <div className="mr-3 flex w-[35px] shrink-0 flex-col justify-between py-[1px] text-[10px] text-gray-600">
            <span>Sun</span>
            <span>Mon</span>
            <span>Tue</span>
            <span>Wed</span>
            <span>Thu</span>
            <span>Fri</span>
            <span>Sat</span>
          </div>

          {/* CONTRIBUTION GRID */}

          <div className="flex gap-[3px]">

            {calendar.map(
              (week, weekIndex) => (
                <div
                  key={weekIndex}
                  className="flex flex-col gap-[3px]"
                >
                  {week.map(
                    (day) => (
                      <div
                        key={day.date}
                        title={`${day.count} ${
                          isGithub
                            ? "contributions"
                            : "submissions"
                        } on ${formatDate(
                          day.date
                        )}`}
                        className={`
                          h-[13px]
                          w-[13px]
                          shrink-0
                          rounded-[3px]
                          border
                          transition-all
                          duration-200
                          hover:z-20
                          hover:scale-125

                          ${
                            isGithub
                              ? `
                                hover:border-cyan-300
                                hover:shadow-[0_0_12px_rgba(34,211,238,0.8)]
                              `
                              : `
                                hover:border-green-300
                                hover:shadow-[0_0_12px_rgba(74,222,128,0.8)]
                              `
                          }

                          ${getLevel(
                            day.count,
                            platform
                          )}
                        `}
                      />
                    )
                  )}
                </div>
              )
            )}

          </div>
        </div>

        {/* =================================================
            LEGEND
        ================================================= */}

        <div className="mt-5 flex items-center justify-end gap-2 text-[11px] text-gray-500">

          <span>Less</span>

          <div className="h-[13px] w-[13px] rounded-[3px] border border-white/[0.05] bg-white/[0.035]" />

          {isGithub ? (
            <>
              <div className="h-[13px] w-[13px] rounded-[3px] border border-cyan-900/50 bg-cyan-950" />

              <div className="h-[13px] w-[13px] rounded-[3px] border border-cyan-700/60 bg-cyan-800/70" />

              <div className="h-[13px] w-[13px] rounded-[3px] border border-cyan-500/60 bg-cyan-600/80" />

              <div className="h-[13px] w-[13px] rounded-[3px] border border-cyan-300 bg-cyan-400" />
            </>
          ) : (
            <>
              <div className="h-[13px] w-[13px] rounded-[3px] border border-green-900/50 bg-green-950" />

              <div className="h-[13px] w-[13px] rounded-[3px] border border-green-700/60 bg-green-800/70" />

              <div className="h-[13px] w-[13px] rounded-[3px] border border-green-500/60 bg-green-600/80" />

              <div className="h-[13px] w-[13px] rounded-[3px] border border-green-300 bg-green-400" />
            </>
          )}

          <span>More</span>

        </div>
      </div>
    </div>
  );
}

/* =========================================================
   MAIN CONTRIBUTION COMPONENT
========================================================= */

export default function Contribution() {

  const [activeTab, setActiveTab] =
    useState<Platform>("github");

  const [github, setGithub] =
    useState<Stats>(emptyStats);

  const [leetcode, setLeetcode] =
    useState<Stats>(emptyStats);

  const [githubLoading, setGithubLoading] =
    useState(true);

  const [leetcodeLoading, setLeetcodeLoading] =
    useState(true);

  /* =======================================================
     FETCH LIVE DATA
  ======================================================= */

  useEffect(() => {
    async function loadData() {
      try {
        const [
          githubResponse,
          leetcodeResponse,
        ] = await Promise.all([
          fetch("/api/github", {
            cache: "no-store",
          }),

          fetch("/api/leetcode", {
            cache: "no-store",
          }),
        ]);

        const githubData =
          await githubResponse.json();

        const leetcodeData =
          await leetcodeResponse.json();

        console.log(
          "GitHub API:",
          githubData
        );

        console.log(
          "LeetCode API:",
          leetcodeData
        );

        setGithub(githubData);
        setLeetcode(leetcodeData);

      } catch (error) {
        console.error(
          "Contribution error:",
          error
        );
      } finally {
        setGithubLoading(false);
        setLeetcodeLoading(false);
      }
    }

    loadData();
  }, []);

  /* =======================================================
     CURRENT PLATFORM
  ======================================================= */

  const isGithub =
    activeTab === "github";

  const currentData = isGithub
    ? github
    : leetcode;

  const currentLoading =
    isGithub
      ? githubLoading
      : leetcodeLoading;

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <section
      id="contributions"
      className="relative w-full scroll-mt-28 px-6 py-24"
    >

      {/* BACKGROUND GLOW */}

      <div
        className={`pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[450px] w-[850px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[140px] ${
          isGithub
            ? "bg-cyan-500/5"
            : "bg-green-500/5"
        }`}
      />

      <div className="mx-auto max-w-7xl">

        {/* =================================================
            HEADING
        ================================================= */}

        <div className="mb-10 text-center">

          <p
            className={`mb-3 text-sm font-medium uppercase tracking-[0.35em] ${
              isGithub
                ? "text-cyan-400"
                : "text-green-400"
            }`}
          >
            Coding Activity
          </p>

          <h2 className="text-4xl font-bold tracking-tight text-white md:text-5xl">
            My Contributions
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-gray-400 md:text-base">
            Track my real coding activity
            across GitHub and LeetCode.
          </p>

        </div>

        {/* =================================================
            MAIN CARD
        ================================================= */}

        <div className="rounded-3xl border border-white/[0.08] bg-[#050b12]/75 p-5 shadow-[0_0_70px_rgba(8,145,178,0.08)] backdrop-blur-xl md:p-8">

          {/* =================================================
              TABS
          ================================================= */}

          <div className="mb-10 flex justify-center">

            <div className="flex rounded-xl border border-white/[0.08] bg-black/30 p-1">

              {/* GITHUB */}

              <button
                type="button"
                onClick={() =>
                  setActiveTab("github")
                }
                className={`flex items-center gap-2 rounded-lg px-7 py-3 text-sm font-medium transition-all duration-300 ${
                  isGithub
                    ? "bg-cyan-400/10 text-cyan-400 shadow-[0_0_25px_rgba(34,211,238,0.08)]"
                    : "text-gray-500 hover:text-white"
                }`}
              >
                <GithubIcon />

                GitHub
              </button>

              {/* LEETCODE */}

              <button
                type="button"
                onClick={() =>
                  setActiveTab("leetcode")
                }
                className={`flex items-center gap-2 rounded-lg px-7 py-3 text-sm font-medium transition-all duration-300 ${
                  !isGithub
                    ? "bg-green-400/10 text-green-400 shadow-[0_0_25px_rgba(74,222,128,0.08)]"
                    : "text-gray-500 hover:text-white"
                }`}
              >
                <LeetCodeIcon />

                LeetCode
              </button>

            </div>

          </div>

          {/* =================================================
              HEADER
          ================================================= */}

          <div className="mb-8 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">

            <div>

              <p
                className={`text-sm uppercase tracking-[0.25em] ${
                  isGithub
                    ? "text-cyan-400"
                    : "text-green-400"
                }`}
              >
                {isGithub
                  ? "GitHub"
                  : "LeetCode"}
              </p>

              <h3 className="mt-2 text-2xl font-bold text-white md:text-3xl">
                {isGithub
                  ? "GitHub Contributions"
                  : "LeetCode Activity"}
              </h3>

              <p className="mt-2 text-sm text-gray-500">
                {isGithub
                  ? "Last 365 days of GitHub contributions"
                  : "Daily LeetCode submission activity"}
              </p>

            </div>

            {/* TOTAL */}

            <div className="text-left md:text-right">

              <p className="text-[10px] uppercase tracking-[0.18em] text-gray-600">
                Total Activity
              </p>

              <p
                className={`mt-1 text-3xl font-bold ${
                  isGithub
                    ? "text-cyan-400"
                    : "text-green-400"
                }`}
              >
                {currentLoading
                  ? "..."
                  : formatNumber(
                      currentData.total
                    )}
              </p>

            </div>

          </div>

          {/* =================================================
              GRAPH
          ================================================= */}

          {currentLoading ? (
            <div className="flex h-48 items-center justify-center">

              <div className="flex flex-col items-center gap-3">

                <div
                  className={`h-6 w-6 animate-spin rounded-full border-2 border-t-transparent ${
                    isGithub
                      ? "border-cyan-400"
                      : "border-green-400"
                  }`}
                />

                <p className="text-sm text-gray-500">
                  Loading{" "}
                  {isGithub
                    ? "GitHub"
                    : "LeetCode"}{" "}
                  activity...
                </p>

              </div>

            </div>
          ) : currentData.days.length ===
            0 ? (

            <div className="flex min-h-48 flex-col items-center justify-center gap-2">

              <p className="text-sm text-gray-500">
                No contribution data found.
              </p>

              <p className="text-xs text-gray-700">
                Check your{" "}
                {isGithub
                  ? "GitHub"
                  : "LeetCode"}{" "}
                API configuration.
              </p>

            </div>

          ) : (

            <ContributionCalendar
              days={currentData.days}
              platform={activeTab}
            />

          )}

          {/* =================================================
              STATS FOOTER
          ================================================= */}

          {!currentLoading &&
            currentData.days.length > 0 && (

              <div className="mt-10 grid grid-cols-1 gap-3 border-t border-white/[0.06] pt-6 sm:grid-cols-3">

                {/* =================================================
                    STAT 1 - DAY STREAK
                ================================================= */}

                <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] px-5 py-4 transition-all duration-300 hover:border-white/[0.12]">

                  <p className="text-[10px] uppercase tracking-[0.18em] text-gray-600">
                    Total Day Streak
                  </p>

                  <p
                    className={`mt-2 text-2xl font-bold ${
                      isGithub
                        ? "text-cyan-400"
                        : "text-green-400"
                    }`}
                  >
                    {formatNumber(
                      currentData.dayStreak
                    )}

                    <span className="ml-1 text-xs font-normal text-gray-600">
                      days
                    </span>
                  </p>

                </div>

                {/* =================================================
                    STAT 2
                ================================================= */}

                <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] px-5 py-4 transition-all duration-300 hover:border-white/[0.12]">

                  <p className="text-[10px] uppercase tracking-[0.18em] text-gray-600">
                    {isGithub
                      ? "Total Contributions"
                      : "Global Rank"}
                  </p>

                  <p
                    className={`mt-2 text-2xl font-bold ${
                      isGithub
                        ? "text-cyan-400"
                        : "text-green-400"
                    }`}
                  >
                    {isGithub
                      ? formatNumber(
                          currentData.total
                        )
                      : currentData.globalRank
                        ? `#${formatNumber(
                            currentData.globalRank
                          )}`
                        : "0"}
                  </p>

                </div>

                {/* =================================================
                    STAT 3
                ================================================= */}

                <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] px-5 py-4 transition-all duration-300 hover:border-white/[0.12]">

                  <p className="text-[10px] uppercase tracking-[0.18em] text-gray-600">
                    {isGithub
                      ? "Total Active Days"
                      : "Total Questions"}
                  </p>

                  <p
                    className={`mt-2 text-2xl font-bold ${
                      isGithub
                        ? "text-cyan-400"
                        : "text-green-400"
                    }`}
                  >
                    {isGithub
                      ? formatNumber(
                          currentData.activeDays
                        )
                      : formatNumber(
                          currentData.solvedQuestions
                        )}
                  </p>

                </div>

              </div>
            )}

          {/* =================================================
              BOTTOM STATUS
          ================================================= */}

          <div className="mt-8 flex items-center justify-between border-t border-white/[0.05] pt-5">

            <span className="text-xs text-gray-700">
              {isGithub
                ? "GitHub contribution calendar"
                : "LeetCode submission calendar"}
            </span>

            <span
              className={`rounded-full border px-3 py-1 text-[10px] font-medium tracking-[0.15em] ${
                isGithub
                  ? "border-cyan-400/20 bg-cyan-400/5 text-cyan-400"
                  : "border-green-400/20 bg-green-400/5 text-green-400"
              }`}
            >
              LIVE DATA
            </span>

          </div>

        </div>
      </div>
    </section>
  );
}