"use client";

import { useState } from "react";
import {
  FaCode,
  FaGraduationCap,
  FaBriefcase,
  FaCertificate,
  FaUniversity,
  FaCalendarAlt,
  FaExternalLinkAlt,
} from "react-icons/fa";

type Tab = "SKILLS" | "EDUCATION" | "EXPERIENCE" | "CERTIFICATIONS";

const tabs: { name: Tab; icon: React.ReactNode }[] = [
  { name: "SKILLS", icon: <FaCode /> },
  { name: "EDUCATION", icon: <FaGraduationCap /> },
  { name: "EXPERIENCE", icon: <FaBriefcase /> },
  { name: "CERTIFICATIONS", icon: <FaCertificate /> },
];

const skills = [
  {
    title: "Languages",
    items: ["C++", "Java", "JavaScript", "Python", "TypeScript", "SQL"],
  },
  {
    title: "Frontend",
    items: ["HTML", "CSS", "React", "Next.js", "Tailwind CSS"],
  },
  {
    title: "Backend",
    items: ["Node.js", "Express.js", "REST APIs", "Socket.io"],
  },
  {
    title: "Database",
    items: ["MongoDB", "MySQL", "Mongoose", "DBMS"],
  },
  {
    title: "Core CS",
    items: [
      "Data Structures & Algorithms",
      "OOP",
      "Computer Networks",
      "Operating Systems",
      "DBMS",
    ],
  },
  {
    title: "Tools",
    items: ["Git", "GitHub", "VS Code", "Postman", "Vercel"],
  },
];

const education = [
  {
    degree: "B.Tech in Computer Science",
    institute: "Lovely Professional University",
    shortInstitute: "LPU",
    year: "2023 - Present",
    score: "55.4%",
    detail: "5.54 / 10 CGPA",
  },
  {
    degree: "Higher Secondary",
    institute: "SB College ARA",
    shortInstitute: "SB College",
    year: "2021 - 2023",
    score: "73.6%",
    detail: "353 / 500",
  },
  {
    degree: "Matriculation",
    institute: "Raj +2 High School Dumraon (Buxar)",
    shortInstitute: "Raj +2 High School",
    year: "2019 - 2021",
    score: "82.4%",
    detail: "412 / 500",
  },
];

const experience = [
  {
    date: "Jun 2026 — Jul 2026",
    title: "DSA Placement Bootcamp",
    company: "Lovely Professional University",
    description:
      "Mastered Data Structures and Algorithms through intensive problem-solving, coding practice, and placement-focused preparation.",
  },
];

const certificates = [
  {
    title: "Effective Time Management",
    issuer: "Lovely Professional University",
    date: "2026",
    description:
      "Certificate demonstrating practical understanding of time management, productivity and task prioritization.",
    path: "/certificates/effective-time-management.pdf",
  },
  {
    title: "Introduction to Data Structures & Algorithms",
    issuer: "Lovely Professional University",
    date: "2026",
    description:
      "Covered fundamental data structures, algorithms and problem-solving techniques.",
    path: "/certificates/introduction-to-dsa.pdf",
  },
  {
    title: "React JS",
    issuer: "Lovely Professional University",
    date: "2026",
    description:
      "Certificate covering React fundamentals, components, state management and modern frontend development.",
    path: "/certificates/react-js.pdf",
  },
  {
    title: "Computer Programming - 72 Hours",
    issuer: "Lovely Professional University",
    date: "2026",
    description:
      "Intensive programming certification focused on programming fundamentals and problem-solving.",
    path: "/certificates/computer-programming-72-hours.pdf",
  },
  {
    title: "Leadership Skills",
    issuer: "Lovely Professional University",
    date: "2026",
    description:
      "Certificate focused on leadership, communication, teamwork and effective decision-making.",
    path: "/certificates/leadership-skills.pdf",
  },
  {
    title: "DSA Certification",
    issuer: "Lovely Professional University",
    date: "2026",
    description:
      "Certification demonstrating knowledge of data structures, algorithms and competitive problem-solving.",
    path: "/certificates/dsa-certificates.pdf",
  },
];

export default function About() {
  const [activeTab, setActiveTab] = useState<Tab>("SKILLS");
  const [showMoreCertificates, setShowMoreCertificates] = useState(false);

  return (
    <section
      id="about"
      className="relative w-full overflow-hidden px-4 py-16 sm:px-6 lg:px-8"
    >
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/[0.025] blur-[120px]" />

        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(34,211,238,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.5) 1px, transparent 1px)",
            backgroundSize: "45px 45px",
          }}
        />
      </div>

      {/* Heading */}
      <div className="mx-auto max-w-7xl text-center">
        <p className="mb-2 text-xs font-medium tracking-[0.35em] text-cyan-400/70">
          GET TO KNOW ME
        </p>

        <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          About <span className="text-cyan-400">Me</span>
        </h2>

        <div className="mx-auto mt-4 h-px w-16 bg-cyan-400/60" />
      </div>

      {/* Tabs */}
      <div className="mx-auto mt-10 flex max-w-6xl justify-center">
        <div className="flex w-full max-w-3xl flex-wrap justify-center gap-2 rounded-xl border border-cyan-400/10 bg-black/20 p-2 backdrop-blur-md">
          {tabs.map((tab) => {
            const active = activeTab === tab.name;

            return (
              <button
                key={tab.name}
                onClick={() => setActiveTab(tab.name)}
                className={`group flex items-center gap-2 rounded-lg px-4 py-2.5 text-[11px] font-semibold tracking-[0.12em] transition-all duration-300 sm:px-5 ${
                  active
                    ? "border border-cyan-400/40 bg-cyan-400/10 text-cyan-300 shadow-[0_0_20px_rgba(34,211,238,0.08)]"
                    : "border border-transparent text-gray-500 hover:border-cyan-400/15 hover:bg-cyan-400/[0.03] hover:text-cyan-300"
                }`}
              >
                <span
                  className={`text-xs transition-transform duration-300 ${
                    active
                      ? "text-cyan-400"
                      : "text-gray-600 group-hover:text-cyan-400"
                  }`}
                >
                  {tab.icon}
                </span>

                {tab.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Stable Content Area */}
      <div className="mx-auto mt-10 min-h-[560px] max-w-6xl">
        {/* ================= SKILLS ================= */}
        {activeTab === "SKILLS" && (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {skills.map((skill) => (
              <SkillCard
                key={skill.title}
                title={skill.title}
                items={skill.items}
              />
            ))}
          </div>
        )}

        {/* ================= EDUCATION ================= */}
        {activeTab === "EDUCATION" && (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {education.map((item) => (
              <EducationCard key={item.degree} {...item} />
            ))}
          </div>
        )}

        {/* ================= EXPERIENCE ================= */}
        {activeTab === "EXPERIENCE" && (
          <div className="mx-auto max-w-4xl">
            <div className="relative pl-8 sm:pl-12">
              {/* Timeline */}
              <div className="absolute bottom-0 left-[7px] top-0 w-px bg-gradient-to-b from-cyan-400/60 via-cyan-400/20 to-transparent sm:left-[15px]" />

              {experience.map((item, index) => (
                <div key={index} className="relative pb-8">
                  {/* Dot */}
                  <div className="absolute -left-[29px] top-1 h-4 w-4 rounded-full border border-cyan-400/60 bg-[#05080b] shadow-[0_0_15px_rgba(34,211,238,0.25)] sm:-left-[37px]">
                    <div className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400" />
                  </div>

                  <div className="rounded-xl border border-cyan-400/10 bg-white/[0.015] p-5 backdrop-blur-sm transition-all duration-300 hover:border-cyan-400/25 hover:bg-cyan-400/[0.025]">
                    <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                      <span className="rounded-full border border-cyan-400/15 bg-cyan-400/[0.04] px-3 py-1 text-[10px] font-medium tracking-wider text-cyan-400">
                        {item.date}
                      </span>

                      <FaBriefcase className="text-sm text-cyan-400/60" />
                    </div>

                    <h3 className="text-lg font-semibold text-white">
                      {item.title}
                    </h3>

                    <p className="mt-1 text-sm text-cyan-400/80">
                      {item.company}
                    </p>

                    <p className="mt-4 text-sm leading-6 text-gray-500">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= CERTIFICATIONS ================= */}
        {activeTab === "CERTIFICATIONS" && (
          <div>
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {certificates
                .slice(0, showMoreCertificates ? certificates.length : 3)
                .map((certificate) => (
                  <CertificateCard
                    key={certificate.title}
                    {...certificate}
                  />
                ))}
            </div>

            {/* See More / See Less */}
            <div className="mt-7 flex justify-center">
              <button
                onClick={() =>
                  setShowMoreCertificates(!showMoreCertificates)
                }
                className="group flex items-center gap-2 rounded-lg border border-cyan-400/20 bg-cyan-400/[0.04] px-5 py-2.5 text-xs font-medium tracking-wider text-cyan-400 transition-all duration-300 hover:border-cyan-400/40 hover:bg-cyan-400/[0.08] hover:shadow-[0_0_20px_rgba(34,211,238,0.08)]"
              >
                {showMoreCertificates
                  ? "Show Less"
                  : "See More Certificates"}

                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  {showMoreCertificates ? "↑" : "→"}
                </span>
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

/* =========================================================
   SKILL CARD
========================================================= */

function SkillCard({
  title,
  items,
}: {
  title: string;
  items: string[];
}) {
  return (
    <div className="group relative h-[250px] overflow-hidden rounded-xl border border-cyan-400/10 bg-white/[0.012] p-5 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/30 hover:bg-cyan-400/[0.025] hover:shadow-[0_10px_35px_rgba(34,211,238,0.07)]">
      {/* Glow */}
      <div className="pointer-events-none absolute -right-16 -top-16 h-36 w-36 rounded-full bg-cyan-400/[0.06] blur-3xl transition-all duration-500 group-hover:bg-cyan-400/[0.11]" />

      {/* Grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(34,211,238,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.6) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      />

      <div className="relative z-10">
        <div className="mb-5 flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-cyan-400/20 bg-cyan-400/[0.05] text-cyan-400">
            <FaCode className="text-sm" />
          </div>

          <h3 className="text-sm font-semibold tracking-wide text-white">
            {title}
          </h3>
        </div>

        <div className="flex flex-wrap gap-2">
          {items.map((item) => (
            <span
              key={item}
              className="rounded-md border border-white/[0.06] bg-white/[0.025] px-2.5 py-1.5 text-[10px] text-gray-400 transition-colors duration-300 hover:border-cyan-400/20 hover:text-cyan-300"
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* Bottom Line */}
      <div className="absolute bottom-0 left-0 h-px w-0 bg-cyan-400/70 transition-all duration-500 group-hover:w-full" />
    </div>
  );
}

/* =========================================================
   EDUCATION CARD
========================================================= */

function EducationCard({
  degree,
  institute,
  shortInstitute,
  year,
  score,
  detail,
}: {
  degree: string;
  institute: string;
  shortInstitute: string;
  year: string;
  score: string;
  detail: string;
}) {
  return (
    <div className="group relative h-[250px] overflow-hidden rounded-xl border border-cyan-400/10 bg-white/[0.015] p-5 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/30 hover:bg-cyan-400/[0.025] hover:shadow-[0_10px_35px_rgba(34,211,238,0.07)]">
      {/* Top Glow */}
      <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-cyan-400/[0.06] blur-3xl" />

      {/* Top accent */}
      <div className="absolute left-0 top-0 h-px w-0 bg-cyan-400 transition-all duration-500 group-hover:w-full" />

      <div className="relative z-10 h-full">
        {/* Header */}
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-[10px] text-gray-500">
            <FaCalendarAlt className="text-cyan-400/60" />
            {year}
          </span>

          <span className="rounded-full border border-cyan-400/15 bg-cyan-400/[0.04] px-2.5 py-1 text-[9px] font-medium text-cyan-400">
            EDUCATION
          </span>
        </div>

        {/* Degree */}
        <h3 className="mt-4 text-base font-semibold leading-5 text-white">
          {degree}
        </h3>

        {/* Institute */}
        <div className="mt-3 flex items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-cyan-400/15 bg-cyan-400/[0.04] text-cyan-400">
            <FaUniversity className="text-sm" />
          </div>

          <div className="min-w-0">
            <p className="truncate text-xs font-medium text-gray-300">
              {shortInstitute}
            </p>

            <p className="truncate text-[10px] text-gray-600">
              {institute}
            </p>
          </div>
        </div>

        {/* Bottom Stats */}
        <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between border-t border-white/[0.06] pt-3">
          <div>
            <p className="text-[9px] uppercase tracking-wider text-gray-600">
              Score
            </p>

            <p className="mt-0.5 text-sm font-semibold text-cyan-400">
              {score}
            </p>
          </div>

          <div className="text-right">
            <p className="text-[9px] uppercase tracking-wider text-gray-600">
              Result
            </p>

            <p className="mt-0.5 text-xs text-gray-400">{detail}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   CERTIFICATE CARD
========================================================= */

function CertificateCard({
  title,
  issuer,
  date,
  description,
  path,
}: {
  title: string;
  issuer: string;
  date: string;
  description: string;
  path: string;
}) {
  return (
    <div className="group relative min-h-[300px] overflow-hidden rounded-xl border border-cyan-400/10 bg-white/[0.015] p-5 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/30 hover:bg-cyan-400/[0.025] hover:shadow-[0_10px_35px_rgba(34,211,238,0.07)]">
      {/* Glow */}
      <div className="pointer-events-none absolute -right-14 -top-14 h-36 w-36 rounded-full bg-cyan-400/[0.05] blur-3xl" />

      {/* Grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(34,211,238,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.6) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />

      {/* Top Line */}
      <div className="absolute left-0 top-0 h-px w-0 bg-cyan-400 transition-all duration-500 group-hover:w-full" />

      <div className="relative z-10">
        {/* Icon + Date */}
        <div className="flex items-center justify-between">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-cyan-400/20 bg-cyan-400/[0.05] text-cyan-400">
            <FaCertificate className="text-sm" />
          </div>

          <span className="flex items-center gap-1.5 text-[10px] text-gray-600">
            <FaCalendarAlt className="text-cyan-400/50" />
            {date}
          </span>
        </div>

        {/* Title */}
        <h3 className="mt-5 text-base font-semibold leading-6 text-white">
          {title}
        </h3>

        {/* Issuer */}
        <p className="mt-2 text-xs text-cyan-400/70">{issuer}</p>

        {/* Description */}
        <p className="mt-4 text-xs leading-5 text-gray-500">
          {description}
        </p>

        {/* Bottom */}
        <div className="mt-5 border-t border-white/[0.06] pt-4">
          <a
            href={path}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[10px] font-medium tracking-wider text-cyan-400 transition-colors duration-300 hover:text-cyan-300"
          >
            VIEW CERTIFICATE
            <FaExternalLinkAlt className="text-[8px] transition-transform duration-300 group-hover:translate-x-0.5" />
          </a>
        </div>
      </div>
    </div>
  );
}