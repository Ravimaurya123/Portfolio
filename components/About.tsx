"use client";

import { useState } from "react";

type Tab = "skills" | "education" | "experience" | "certifications";

export default function About() {
  const [activeTab, setActiveTab] = useState<Tab>("skills");

  const tabs = [
    {
      id: "skills" as Tab,
      label: "SKILLS",
      icon: "</>",
    },
    {
      id: "education" as Tab,
      label: "EDUCATION",
      icon: "🎓",
    },
    {
      id: "experience" as Tab,
      label: "EXPERIENCE",
      icon: "💼",
    },
    {
      id: "certifications" as Tab,
      label: "CERTIFICATIONS",
      icon: "♙",
    },
  ];

  return (
    <section
      id="about"
      className="relative min-h-screen bg-transparent px-5 py-20 text-white"
    >
      <div className="mx-auto w-full max-w-7xl">

        {/* =====================================================
            TABS
        ===================================================== */}

        <div className="grid grid-cols-2 border-b border-cyan-400/30 md:grid-cols-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                relative flex h-20 items-center justify-center gap-4
                border-r border-cyan-400/10
                text-sm tracking-widest
                transition-all duration-300
                md:h-24
                ${
                  activeTab === tab.id
                    ? "bg-gray-100 text-gray-900"
                    : "bg-transparent text-gray-400 hover:bg-white/[0.03] hover:text-cyan-400"
                }
              `}
            >
              <span
                className={`
                  flex h-8 w-8 items-center justify-center
                  rounded-full border text-xs
                  ${
                    activeTab === tab.id
                      ? "border-cyan-500 text-gray-800"
                      : "border-cyan-400/40 text-cyan-400"
                  }
                `}
              >
                {tab.icon}
              </span>

              {tab.label}

              {activeTab === tab.id && (
                <span className="absolute bottom-0 left-0 h-[3px] w-full bg-cyan-400" />
              )}
            </button>
          ))}
        </div>

        {/* =====================================================
            CONTENT
        ===================================================== */}

        <div className="mt-14">

          {/* ===================================================
              SKILLS
          =================================================== */}

          {activeTab === "skills" && (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">

              <SkillCard
                title="LANGUAGES"
                skills={[
                  "C++",
                  "Java",
                  "JavaScript",
                  "Python",
                  "TypeScript",
                  "SQL",
                ]}
              />

              <SkillCard
                title="FRONTEND"
                skills={[
                  "HTML",
                  "CSS",
                  "React",
                  "Next.js",
                  "Tailwind CSS",
                ]}
              />

              <SkillCard
                title="BACKEND"
                skills={[
                  "Node.js",
                  "Express.js",
                  "REST APIs",
                  "Socket.io",
                ]}
              />

              <SkillCard
                title="DATABASE"
                skills={[
                  "MongoDB",
                  "MySQL",
                  "Mongoose",
                  "DBMS",
                ]}
              />

              <SkillCard
                title="CORE CS"
                skills={[
                  "Data Structures & Algorithms",
                  "OOP",
                  "Computer Networks",
                  "Operating Systems",
                  "DBMS",
                ]}
              />

              <SkillCard
                title="TOOLS"
                skills={[
                  "Git",
                  "GitHub",
                  "VS Code",
                  "Postman",
                  "Vercel",
                ]}
              />

            </div>
          )}

          {/* ===================================================
              EDUCATION
          =================================================== */}

          {activeTab === "education" && (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

              <EducationCard
                status="2023 - Present"
                percentage="55.4%"
                title="B.Tech in Computer Science & Engineering"
                institute="Lovely Professional University (LPU)"
                board="LPU"
                description="Focusing on core Computer Science topics, Data Structures, Algorithms, Full-Stack Web Development, Node.js, and Database Systems."
                score="5.54 / 10 CGPA"
                current
              />

              <EducationCard
                status="Completed"
                percentage="73.6%"
                title="Higher Secondary (12th / Intermediate)"
                institute="SB College ARA"
                board="Bihar School Examination Board (BSEB)"
                description="Completed higher secondary education with a focus on Mathematics, Physics, and Chemistry."
                score="353 / 500"
              />

              <EducationCard
                status="Completed"
                percentage="82.4%"
                title="Matriculation (10th Standard)"
                institute="Raj +2 High School Dumraon (Buxar)"
                board="Bihar School Examination Board (BSEB)"
                description="Completed secondary education with strong fundamentals in Mathematics and Science."
                score="412 / 500"
              />

            </div>
          )}

          {/* ===================================================
              EXPERIENCE
          =================================================== */}

          {activeTab === "experience" && (
            <ExperienceSection />
          )}

          {/* ===================================================
              CERTIFICATIONS
          =================================================== */}

          {activeTab === "certifications" && (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

              {/* 1. EFFECTIVE TIME MANAGEMENT */}

              <CertificateCard
                title="Effective Time Management"
                issuer="Master Union"
                date="12 Feb 2025"
                description="Learned effective time management techniques, prioritization, planning, and productivity strategies."
                certificateLink="/certificates/effective-time-management.pdf"
              />

              {/* 2. INTRODUCTION TO DSA */}

              <CertificateCard
                title="Introduction To DSA"
                issuer="Coding Tantra"
                date="24 Jan 2025"
                description="Learned the fundamentals of Data Structures and Algorithms including arrays, searching, sorting, and problem-solving techniques."
                certificateLink="/certificates/introduction-to-dsa.pdf"
              />

              {/* 3. REACT JS */}

              <CertificateCard
                title="React JS"
                issuer="Tech Veda"
                date="28 Mar 2025"
                description="Learned React JS fundamentals including components, props, state, hooks, event handling, and building interactive user interfaces."
                certificateLink="/certificates/react-js.pdf"
              />

              {/* 4. COMPUTER PROGRAMMING */}

              <CertificateCard
                title="Computer Programming (72 Hours)"
                issuer="Tech Veda"
                date="30 Apr 2025"
                description="Completed 72 hours of computer programming training covering programming fundamentals, logic building, problem solving, and coding concepts."
                certificateLink="/certificates/computer-programming-72-hours.pdf"
              />

              {/* 5. LEADERSHIP SKILLS */}

              <CertificateCard
                title="Leadership Skills"
                issuer="LearnTube.ai"
                date="10 Apr 2026"
                description="Developed leadership, communication, teamwork, decision-making, and professional collaboration skills."
                certificateLink="/certificates/leadership-skills.pdf"
              />

              {/* 6. DSA PLACEMENT BOOTCAMP */}

              <CertificateCard
                title="DSA Placement Bootcamp – Fundamental Of DSA"
                issuer="Lovely Professional University"
                date="25 Jul 2026"
                description="Completed placement-focused Data Structures and Algorithms training with emphasis on problem solving, algorithms, optimization, and interview preparation."
                certificateLink="/certificates/dsa-certificates.pdf"
              />

            </div>
          )}

        </div>
      </div>
    </section>
  );
}


/* =========================================================
   SKILL CARD
========================================================= */

function SkillCard({
  title,
  skills,
}: {
  title: string;
  skills: string[];
}) {
  return (
    <div
      className="
        min-h-[290px]
        border border-cyan-400/30
        bg-transparent
        p-7
        transition-all duration-300
        hover:border-cyan-400/70
        hover:bg-cyan-400/[0.03]
      "
    >

      <h3 className="text-lg font-semibold tracking-wider text-cyan-400">
        {title}
      </h3>

      <div className="mt-6 flex flex-wrap gap-2">

        {skills.map((skill) => (
          <span
            key={skill}
            className="
              border border-gray-500/50
              bg-transparent
              px-3 py-2
              text-sm text-gray-300
              transition-all duration-200
              hover:border-cyan-400
              hover:bg-cyan-400/[0.03]
              hover:text-cyan-400
            "
          >
            {skill}
          </span>
        ))}

      </div>

    </div>
  );
}


/* =========================================================
   EDUCATION CARD
========================================================= */

function EducationCard({
  status,
  percentage,
  title,
  institute,
  board,
  description,
  score,
  current = false,
}: {
  status: string;
  percentage: string;
  title: string;
  institute: string;
  board: string;
  description: string;
  score: string;
  current?: boolean;
}) {
  return (
    <div
      className="
        group
        min-h-[380px]
        rounded-2xl
        border border-white/10
        bg-transparent
        p-7
        transition-all duration-300
        hover:border-cyan-400/40
        hover:bg-white/[0.02]
      "
    >

      {/* TOP */}

      <div className="flex items-center justify-between gap-3">

        {/* STATUS */}

        <div
          className="
            flex items-center gap-2
            rounded-lg
            border border-white/10
            bg-white/[0.04]
            px-4 py-2
            text-sm text-gray-300
          "
        >
          <span className="text-cyan-400">
            ▣
          </span>

          {status}
        </div>


        {/* PERCENTAGE */}

        <div
          className="
            flex items-center gap-2
            rounded-full
            border border-cyan-400/30
            bg-cyan-400/[0.08]
            px-4 py-2
            text-sm font-medium
            text-cyan-400
          "
        >
          <span>♙</span>

          {percentage}
        </div>

      </div>


      {/* TITLE */}

      <h3
        className="
          mt-7
          text-xl
          font-bold
          leading-7
          text-white
          transition-colors
          group-hover:text-cyan-400
        "
      >
        {title}
      </h3>


      {/* INSTITUTE */}

      <div className="mt-5 flex items-start gap-3">

        <span className="mt-0.5 text-xl text-cyan-400">
          ▥
        </span>

        <div>

          <p className="font-medium text-gray-200">
            {institute}
          </p>

          <p className="mt-1 text-sm text-gray-500">
            {board}
          </p>

        </div>

      </div>


      {/* DESCRIPTION */}

      <p
        className="
          mt-6
          min-h-[72px]
          text-sm
          leading-6
          text-gray-400
        "
      >
        {description}
      </p>


      {/* DIVIDER */}

      <div className="mt-7 h-px bg-white/10" />


      {/* SCORE */}

      <div className="mt-5 flex items-center justify-between">

        <span
          className="
            font-mono
            text-sm
            tracking-wide
            text-gray-500
          "
        >
          Score / Grade
        </span>

        <span
          className="
            font-mono
            text-sm
            font-bold
            text-cyan-400
          "
        >
          {score}
        </span>

      </div>

    </div>
  );
}


/* =========================================================
   EXPERIENCE SECTION
========================================================= */

function ExperienceSection() {
  return (
    <div className="relative ml-2">

      {/* TIMELINE LINE */}

      <div className="absolute left-0 top-0 h-full w-px bg-cyan-400/40" />


      {/* TIMELINE ITEM */}

      <div className="relative pl-9 pb-10">

        {/* DOT */}

        <span
          className="
            absolute
            -left-[6px]
            top-1
            h-3
            w-3
            rounded-full
            bg-cyan-400
            shadow-[0_0_12px_rgba(34,211,238,0.8)]
          "
        />


        {/* DATE */}

        <p className="text-sm font-medium text-cyan-400">
          Jun 2026 — Jul 2026
        </p>


        {/* TITLE */}

        <h3
          className="
            mt-3
            text-2xl
            font-bold
            leading-tight
            text-gray-100
            md:text-3xl
          "
        >
          DSA Placement Bootcamp – Master Data Structures and Algorithms
        </h3>


        {/* ORGANIZATION */}

        <p className="mt-2 text-lg text-gray-400">
          Lovely Professional University
        </p>


        {/* DESCRIPTION */}

        <ul
          className="
            mt-5
            space-y-2
            text-base
            leading-7
            text-gray-400
          "
        >

          <li className="flex gap-3">

            <span className="text-gray-500">
              •
            </span>

            <span>
              Developed strong problem-solving and analytical skills through
              structured Data Structures and Algorithms practice.
            </span>

          </li>


          <li className="flex gap-3">

            <span className="text-gray-500">
              •
            </span>

            <span>
              Practiced identifying problem patterns, selecting appropriate
              algorithms, and optimizing solutions.
            </span>

          </li>


          <li className="flex gap-3">

            <span className="text-gray-500">
              •
            </span>

            <span>
              Solved placement and interview-oriented DSA problems using
              efficient approaches and optimization techniques.
            </span>

          </li>

        </ul>


        {/* VIEW CERTIFICATE */}

        <a
          href="/certificates/dsa-certificates.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="
            mt-6
            inline-flex
            items-center
            gap-1
            text-sm
            font-medium
            text-cyan-400
            transition-all
            duration-200
            hover:gap-2
            hover:text-cyan-300
          "
        >
          View Certificate 
        </a>

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
  certificateLink,
}: {
  title: string;
  issuer: string;
  date: string;
  description: string;
  certificateLink: string;
}) {
  return (
    <div
      className="
        group
        relative
        border border-cyan-400/30
        bg-transparent
        p-7
        transition-all duration-300 ease-out

        hover:-translate-y-2
        hover:border-cyan-400/80
        hover:bg-cyan-400/[0.03]
        hover:shadow-[0_10px_30px_rgba(34,211,238,0.12)]
      "
    >

      {/* =====================================================
          DATE - TOP RIGHT
      ===================================================== */}

      <div
        className="
          absolute
          right-6
          top-6
          rounded-full
          border border-cyan-400/30
          bg-cyan-400/[0.08]
          px-4
          py-2
          text-sm
          font-medium
          text-cyan-400
          transition-all
          duration-300

          group-hover:border-cyan-400/70
          group-hover:bg-cyan-400/[0.12]
        "
      >
        {date}
      </div>


      {/* =====================================================
          CERTIFICATE ICON
      ===================================================== */}

      <div
        className="
          flex h-12 w-12
          items-center justify-center
          rounded-full
          border border-cyan-400/40
          text-cyan-400
          transition-all
          duration-300

          group-hover:-translate-y-1
          group-hover:border-cyan-400
          group-hover:bg-cyan-400/[0.08]
        "
      >
        ✓
      </div>


      {/* =====================================================
          TITLE
      ===================================================== */}

      <h3
        className="
          mt-6
          pr-20
          text-lg
          font-semibold
          text-white
          transition-all
          duration-300

          group-hover:translate-x-1
          group-hover:text-cyan-400
        "
      >
        {title}
      </h3>


      {/* =====================================================
          ISSUER
      ===================================================== */}

      <p
        className="
          mt-2
          text-gray-400
          transition-all
          duration-300

          group-hover:translate-x-1
          group-hover:text-gray-300
        "
      >
        {issuer}
      </p>


      {/* =====================================================
          DETAILS
      ===================================================== */}

      <p
        className="
          mt-4
          min-h-[72px]
          text-sm
          leading-6
          text-gray-500
          transition-all
          duration-300

          group-hover:text-gray-400
        "
      >
        {description}
      </p>


      {/* =====================================================
          LINE
      ===================================================== */}

      <div
        className="
          mt-6
          h-px
          bg-white/10
          transition-all
          duration-300

          group-hover:bg-cyan-400/40
        "
      />


      {/* =====================================================
          VIEW CERTIFICATE
      ===================================================== */}

      <a
        href={certificateLink}
        target="_blank"
        rel="noopener noreferrer"
        className="
          mt-5
          inline-flex
          items-center
          gap-1
          text-sm
          font-medium
          text-cyan-400
          transition-all
          duration-300

          hover:gap-2
          hover:text-cyan-300
        "
      >
        View Certificate 
      </a>

    </div>
  );
}