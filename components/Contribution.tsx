"use client";

import { useEffect, useMemo, useState } from "react";

type Day = {
  date: string;
  count: number;
};

type Stats = {
  total: number;
  days: Day[];
  dayStreak?: number;
  activeDays?: number;
  globalRank?: number;
  solvedQuestions?: number;
};

type Platform = "github" | "leetcode";

const emptyStats: Stats = {
  total: 0,
  days: [],
};

/* =========================================================
   CONTRIBUTION LEVEL
========================================================= */

function getLevel(count: number, platform: Platform) {
  if (count === 0) {
    return "bg-white/[0.035] border-white/[0.05]";
  }

  if (platform === "leetcode") {
    if (count >= 8) {
      return "bg-green-400 border-green-300/70";
    }

    if (count >= 5) {
      return "bg-green-500/80 border-green-400/60";
    }

    if (count >= 3) {
      return "bg-green-500/50 border-green-400/40";
    }

    return "bg-green-500/25 border-green-400/25";
  }

  if (count >= 8) {
    return "bg-cyan-400 border-cyan-300/70";
  }

  if (count >= 5) {
    return "bg-cyan-500/80 border-cyan-400/60";
  }

  if (count >= 3) {
    return "bg-cyan-500/50 border-cyan-400/40";
  }

  return "bg-cyan-500/25 border-cyan-400/25";
}

/* =========================================================
   DATE FORMAT
========================================================= */

function formatDate(date: string) {
  const d = new Date(`${date}T00:00:00`);

  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

/* =========================================================
   NUMBER FORMAT
========================================================= */

function formatNumber(value?: number) {
  if (value === undefined || value === null) {
    return "—";
  }

  return value.toLocaleString();
}

/* =========================================================
   GITHUB ICON
========================================================= */

function GithubIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.09 3.29 9.4 7.86 10.93.57.1.78-.25.78-.55v-2.15c-3.2.7-3.87-1.36-3.87-1.36-.52-1.33-1.27-1.68-1.27-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.67 1.24 3.32.95.1-.74.4-1.24.73-1.53-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.04 0 0 .96-.31 3.15 1.18a10.9 10.9 0 0 1 5.74 0c2.19-1.49 3.15-1.18 3.15-1.18.62 1.58.23 2.75.11 3.04.73.81 1.18 1.84 1.18 3.1 0 4.42-2.69 5.39-5.25 5.67.41.35.78 1.04.78 2.1v3.12c0 .3.2.66.79.55A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
    </svg>
  );
}

/* =========================================================
   LEETCODE ICON
========================================================= */

function LeetCodeIcon() {
  return (
    <div className="flex h-5 w-5 items-center justify-center rounded-sm border border-green-400/50 text-[9px] font-bold text-green-400">
      LC
    </div>
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

    today.setHours(0, 0, 0, 0);

    const endDate = new Date(today);

    const startDate = new Date(today);
    startDate.setDate(startDate.getDate() - 364);

    const firstDay = new Date(startDate);

    firstDay.setDate(
      firstDay.getDate() - firstDay.getDay()
    );

    const weeks: Day[][] = [];

    const dateMap = new Map<string, number>();

    days.forEach((day) => {
      dateMap.set(day.date, day.count);
    });

    const current = new Date(firstDay);

    while (current <= endDate || weeks.length < 53) {
      const week: Day[] = [];

      for (let i = 0; i < 7; i++) {
        const dateString =
          current.toISOString().split("T")[0];

        week.push({
          date: dateString,
          count: dateMap.get(dateString) ?? 0,
        });

        current.setDate(current.getDate() + 1);
      }

      weeks.push(week);

      if (weeks.length >= 53 && current > endDate) {
        break;
      }
    }

    return weeks.slice(0, 53);
  }, [days]);

  /* =====================================================
     MONTH LABELS
  ===================================================== */

  const monthLabels = useMemo(() => {
    const labels: {
      name: string;
      week: number;
    }[] = [];

    let lastMonth = "";

    calendar.forEach((week, index) => {
      const firstDay = week[0];

      const date = new Date(
        `${firstDay.date}T00:00:00`
      );

      const month = date.toLocaleDateString("en-US", {
        month: "short",
      });

      if (month !== lastMonth) {
        labels.push({
          name: month,
          week: index,
        });

        lastMonth = month;
      }
    });

    return labels;
  }, [calendar]);

  return (
    <div className="w-full">
      {/* =================================================
          MONTH HEADER
      ================================================= */}

      <div className="relative ml-[38px] h-6 w-[calc(100%-38px)]">
        {monthLabels.map((month, index) => (
          <span
            key={`${month.name}-${index}`}
            className="absolute text-[10px] font-medium text-white/35"
            style={{
              left: `${(month.week / 53) * 100}%`,
            }}
          >
            {month.name}
          </span>
        ))}
      </div>

      {/* =================================================
          GRAPH
      ================================================= */}

      <div className="flex w-full">
        {/* WEEKDAY LABELS */}

        <div className="mr-2 flex w-[30px] shrink-0 flex-col justify-between py-[1px]">
          <span className="text-[9px] text-white/25">
            Sun
          </span>

          <span className="text-[9px] text-white/25">
            Mon
          </span>

          <span className="text-[9px] text-white/25">
            Tue
          </span>

          <span className="text-[9px] text-white/25">
            Wed
          </span>

          <span className="text-[9px] text-white/25">
            Thu
          </span>

          <span className="text-[9px] text-white/25">
            Fri
          </span>

          <span className="text-[9px] text-white/25">
            Sat
          </span>
        </div>

        {/* =================================================
            FULL WIDTH CONTRIBUTION GRAPH
        ================================================= */}

        <div className="flex flex-1 justify-between gap-[2px]">
          {calendar.map((week, weekIndex) => (
            <div
              key={weekIndex}
              className="flex flex-1 flex-col gap-[2px]"
            >
              {week.map((day) => (
                <div
                  key={day.date}
                  title={`${formatDate(day.date)} • ${
                    day.count
                  } contribution${
                    day.count === 1 ? "" : "s"
                  }`}
                  className={[
                    "h-[10px]",
                    "w-full",
                    "min-w-[3px]",
                    "shrink-0",
                    "rounded-[2px]",
                    "border",
                    "transition-all",
                    "duration-200",
                    "hover:z-20",
                    "hover:scale-125",
                    platform === "github"
                      ? "hover:border-cyan-300 hover:shadow-[0_0_10px_rgba(34,211,238,0.7)]"
                      : "hover:border-green-300 hover:shadow-[0_0_10px_rgba(74,222,128,0.7)]",
                    getLevel(day.count, platform),
                  ].join(" ")}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* =================================================
          LEGEND
      ================================================= */}

      <div className="mt-3 flex items-center justify-end gap-2">
        <span className="text-[9px] text-white/25">
          Less
        </span>

        <div className="flex gap-[2px]">
          {[0, 1, 3, 5, 8].map((count) => (
            <div
              key={count}
              className={[
                "h-[10px]",
                "w-[11px]",
                "rounded-[2px]",
                "border",
                getLevel(count, platform),
              ].join(" ")}
            />
          ))}
        </div>

        <span className="text-[9px] text-white/25">
          More
        </span>
      </div>
    </div>
  );
}

/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function Contribution() {
  const [activePlatform, setActivePlatform] =
    useState<Platform>("github");

  const [github, setGithub] =
    useState<Stats>(emptyStats);

  const [leetcode, setLeetcode] =
    useState<Stats>(emptyStats);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState<string | null>(null);

  /* =====================================================
     FETCH DATA
  ===================================================== */

  useEffect(() => {
    let mounted = true;

    async function fetchData() {
      try {
        setLoading(true);
        setError(null);

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

        if (!githubResponse.ok) {
          throw new Error(
            `GitHub API failed: ${githubResponse.status}`
          );
        }

        if (!leetcodeResponse.ok) {
          throw new Error(
            `LeetCode API failed: ${leetcodeResponse.status}`
          );
        }

        const githubData: Stats =
          await githubResponse.json();

        const leetcodeData: Stats =
          await leetcodeResponse.json();

        if (!mounted) return;

        setGithub(githubData);
        setLeetcode(leetcodeData);
      } catch (err) {
        console.error(
          "Failed to fetch coding data:",
          err
        );

        if (!mounted) return;

        setError(
          err instanceof Error
            ? err.message
            : "Failed to fetch coding data"
        );
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    fetchData();

    return () => {
      mounted = false;
    };
  }, []);

  /* =====================================================
     ACTIVE DATA
  ===================================================== */

  const activeStats =
    activePlatform === "github"
      ? github
      : leetcode;

  const isGithub =
    activePlatform === "github";

  /* =====================================================
     RENDER
  ===================================================== */

  return (
    <section
      id="contributions"
      className="scroll-mt-28 px-6 py-14 md:py-16"
    >
      <div className="mx-auto w-full max-w-7xl">
        {/* =================================================
            MAIN CARD
        ================================================= */}

        <div className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-transparent p-5 shadow-[0_0_50px_rgba(0,0,0,0.12)] backdrop-blur-xl md:p-7">
          {/* TOP GLOW */}

          <div
            className={[
              "pointer-events-none absolute -top-24 left-1/2 h-48 w-96 -translate-x-1/2 rounded-full blur-3xl",
              isGithub
                ? "bg-cyan-400/[0.06]"
                : "bg-green-400/[0.06]",
            ].join(" ")}
          />

          {/* =================================================
              HEADER
          ================================================= */}

          <div className="relative z-10 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            {/* TITLE */}

            <div>
              <div className="flex items-center gap-3">
                <div
                  className={[
                    "flex h-9 w-9 items-center justify-center rounded-lg border",
                    isGithub
                      ? "border-cyan-400/20 bg-cyan-400/[0.06] text-cyan-400"
                      : "border-green-400/20 bg-green-400/[0.06] text-green-400",
                  ].join(" ")}
                >
                  {isGithub ? (
                    <GithubIcon />
                  ) : (
                    <LeetCodeIcon />
                  )}
                </div>

                <div>
                  <h2 className="text-xl font-semibold tracking-tight text-white md:text-2xl">
                    Coding Contributions
                  </h2>

                  <p className="mt-0.5 text-[11px] text-white/35">
                    {isGithub
                      ? "GitHub activity"
                      : "LeetCode activity"}
                  </p>
                </div>
              </div>
            </div>

            {/* =================================================
                PLATFORM SWITCH
            ================================================= */}

            <div className="flex w-fit items-center rounded-xl border border-white/[0.08] bg-black/10 p-1 backdrop-blur-md">
              <button
                onClick={() =>
                  setActivePlatform("github")
                }
                className={[
                  "flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-medium transition-all duration-200",
                  activePlatform === "github"
                    ? "bg-cyan-400/10 text-cyan-300 shadow-[0_0_20px_rgba(34,211,238,0.08)]"
                    : "text-white/35 hover:text-white/70",
                ].join(" ")}
              >
                <GithubIcon />
                GitHub
              </button>

              <button
                onClick={() =>
                  setActivePlatform("leetcode")
                }
                className={[
                  "flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-medium transition-all duration-200",
                  activePlatform === "leetcode"
                    ? "bg-green-400/10 text-green-300 shadow-[0_0_20px_rgba(74,222,128,0.08)]"
                    : "text-white/35 hover:text-white/70",
                ].join(" ")}
              >
                <LeetCodeIcon />
                LeetCode
              </button>
            </div>
          </div>

          {/* =================================================
              ERROR
          ================================================= */}

          {error && (
            <div className="relative z-10 mt-5 rounded-xl border border-red-400/10 bg-red-400/[0.04] px-4 py-3 text-xs text-red-300/70">
              {error}
            </div>
          )}

          {/* =================================================
              GRAPH
          ================================================= */}

          <div className="relative z-10 mt-7 w-full rounded-2xl border border-white/[0.06] bg-black/[0.08] p-4 backdrop-blur-md md:p-5">
            {loading ? (
              <div className="flex h-[105px] items-center justify-center">
                <div className="flex items-center gap-2 text-xs text-white/30">
                  <div
                    className={[
                      "h-3 w-3 animate-spin rounded-full border-2 border-t-transparent",
                      isGithub
                        ? "border-cyan-400"
                        : "border-green-400",
                    ].join(" ")}
                  />

                  Loading contributions...
                </div>
              </div>
            ) : (
              <ContributionCalendar
                days={activeStats.days}
                platform={activePlatform}
              />
            )}
          </div>

          {/* =================================================
              STATS
          ================================================= */}

          <div className="relative z-10 mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
            {/* STAT 1 */}

            <div className="rounded-xl border border-white/[0.06] bg-black/[0.08] px-4 py-3 backdrop-blur-md">
              <p className="text-[9px] uppercase tracking-[0.18em] text-white/25">
                Day Streak
              </p>

              <p
                className={[
                  "mt-1 text-lg font-semibold",
                  isGithub
                    ? "text-cyan-300"
                    : "text-green-300",
                ].join(" ")}
              >
                {formatNumber(
                  activeStats.dayStreak
                )}
              </p>
            </div>

            {/* STAT 2 */}

            <div className="rounded-xl border border-white/[0.06] bg-black/[0.08] px-4 py-3 backdrop-blur-md">
              <p className="text-[9px] uppercase tracking-[0.18em] text-white/25">
                {isGithub
                  ? "Total Contributions"
                  : "Global Rank"}
              </p>

              <p
                className={[
                  "mt-1 text-lg font-semibold",
                  isGithub
                    ? "text-cyan-300"
                    : "text-green-300",
                ].join(" ")}
              >
                {isGithub
                  ? formatNumber(activeStats.total)
                  : formatNumber(
                      activeStats.globalRank
                    )}
              </p>
            </div>

            {/* STAT 3 */}

            <div className="rounded-xl border border-white/[0.06] bg-black/[0.08] px-4 py-3 backdrop-blur-md">
              <p className="text-[9px] uppercase tracking-[0.18em] text-white/25">
                {isGithub
                  ? "Active Days"
                  : "Total Questions"}
              </p>

              <p
                className={[
                  "mt-1 text-lg font-semibold",
                  isGithub
                    ? "text-cyan-300"
                    : "text-green-300",
                ].join(" ")}
              >
                {isGithub
                  ? formatNumber(
                      activeStats.activeDays
                    )
                  : formatNumber(
                      activeStats.solvedQuestions
                    )}
              </p>
            </div>
          </div>

          {/* =================================================
              LIVE DATA
          ================================================= */}

          <div className="relative z-10 mt-5 flex items-center justify-center gap-2">
            <span
              className={[
                "h-1.5 w-1.5 rounded-full",
                isGithub
                  ? "bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]"
                  : "bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.8)]",
              ].join(" ")}
            />

            <span className="text-[9px] uppercase tracking-[0.25em] text-white/25">
              Live Data
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}