"use client";

import { useEffect, useState } from "react";
import { Code2, ExternalLink, Loader2 } from "lucide-react";

export default function Achievements() {
  const [leetcode, setLeetcode] = useState<number | null>(null);
  const [gfg, setGfg] = useState<number | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [lcRes, gfgRes] = await Promise.all([
          fetch("/api/leetcode", { cache: "no-store" }),
          fetch("/api/gfg", { cache: "no-store" }),
        ]);

        const lc = await lcRes.json();
        const gf = await gfgRes.json();

        setLeetcode(
          lc.error ? 0 : Number(lc.solvedQuestions || 0)
        );

        setGfg(
          gf.error ? 0 : Number(gf.solved || 0)
        );
      } catch (error) {
        console.error("Achievement fetch error:", error);

        setLeetcode(0);
        setGfg(0);
      }
    };

    fetchStats();
  }, []);

  const total = (leetcode ?? 0) + (gfg ?? 0);

  return (
    <section
      id="achievements"
      className="relative px-6 py-20"
    >
      {/* SAME WIDTH AS HOME */}
      <div className="mx-auto w-full max-w-7xl">

        {/* Heading */}
        <div className="mb-8 text-left">

          <p className="mb-2 font-mono text-xs tracking-[0.3em] text-cyan-400">
            CODING JOURNEY
          </p>

          <h2 className="text-3xl font-light tracking-wide text-white md:text-4xl">
            ACHIEVEMENTS
          </h2>

          <div className="mt-3 h-px w-16 bg-cyan-400/60" />

        </div>


        {/* Combined Card */}
        <div className="relative overflow-hidden rounded-lg border border-cyan-400/15 bg-black/20 px-6 py-5 backdrop-blur-sm transition-all duration-300 hover:border-cyan-400/40 hover:bg-cyan-400/[0.02]">

          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">


            {/* LEFT - PLATFORMS */}
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-10">

              {/* LeetCode */}
              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-md border border-green-400/20 bg-green-400/5">
                  <Code2
                    size={19}
                    className="text-green-400"
                  />
                </div>

                <div>
                  <h3 className="text-base font-medium text-white">
                    LeetCode
                  </h3>

                  <p className="font-mono text-[9px] tracking-widest text-gray-500">
                    PROBLEMS SOLVED
                  </p>
                </div>

                {leetcode === null ? (
                  <Loader2
                    size={15}
                    className="ml-2 animate-spin text-green-400"
                  />
                ) : (
                  <span className="ml-2 text-xl font-light text-green-400">
                    {leetcode}
                  </span>
                )}

              </div>


              {/* Divider */}
              <div className="hidden h-10 w-px bg-white/10 sm:block" />


              {/* GFG */}
              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-md border border-cyan-400/20 bg-cyan-400/5">
                  <Code2
                    size={19}
                    className="text-cyan-400"
                  />
                </div>

                <div>
                  <h3 className="text-base font-medium text-white">
                    GeeksforGeeks
                  </h3>

                  <p className="font-mono text-[9px] tracking-widest text-gray-500">
                    PROBLEMS SOLVED
                  </p>
                </div>

                {gfg === null ? (
                  <Loader2
                    size={15}
                    className="ml-2 animate-spin text-cyan-400"
                  />
                ) : (
                  <span className="ml-2 text-xl font-light text-cyan-400">
                    {gfg}
                  </span>
                )}

              </div>

            </div>


            {/* RIGHT - TOTAL */}
            <div className="flex items-center justify-between gap-6 border-t border-white/10 pt-4 md:border-l md:border-t-0 md:pl-10 md:pt-0">

              <div className="text-right">

                <p className="font-mono text-[9px] tracking-[0.2em] text-gray-500">
                  TOTAL SOLVED
                </p>

                <p className="mt-1 text-3xl font-light text-white">
                  {leetcode === null || gfg === null
                    ? "—"
                    : total}
                </p>

              </div>

            </div>

          </div>


          {/* Profile Links */}
          <div className="mt-5 flex gap-5 border-t border-white/5 pt-3">

            <a
              href="https://leetcode.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-[10px] text-gray-500 transition-colors hover:text-green-400"
            >
              LeetCode Profile
              <ExternalLink size={10} />
            </a>

            <a
              href="https://www.geeksforgeeks.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-[10px] text-gray-500 transition-colors hover:text-cyan-400"
            >
              GFG Profile
              <ExternalLink size={10} />
            </a>

          </div>

        </div>

      </div>
    </section>
  );
}