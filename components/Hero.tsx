"use client";

import Image from "next/image";
import { useState } from "react";

export default function Hero() {
  const [currentImage, setCurrentImage] = useState(0);

  const images = [
    "/profile.jpg",
    "/profile2.jpeg",
  ];

  const changeImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  return (
    <section
      id="home"
      className="flex min-h-screen items-center px-6 pt-24"
    >
      <div className="mx-auto grid w-full max-w-7xl items-center gap-16 md:grid-cols-2">

        {/* =====================================================
            LEFT SIDE - PROFILE IMAGE
        ===================================================== */}

        <div className="flex justify-center md:justify-start">
          <div className="group relative ml-[5px]">

            {/* Blue Glow */}
            <div
              className="
                absolute
                -inset-5
                rounded-3xl
                bg-cyan-400/0
                blur-3xl
                transition-all
                duration-700
                group-hover:bg-cyan-400/20
              "
            />

            {/* =================================================
                OUTER IMAGE BORDER
            ================================================= */}

            <div
              className="
                relative
                rounded-3xl
                border-2
                border-cyan-400/40
                p-[5px]
                transition-all
                duration-500
                group-hover:border-cyan-400/80
                group-hover:shadow-[0_0_45px_rgba(34,211,238,0.25)]
              "
            >

              {/* Image Container */}
              <button
                type="button"
                onClick={changeImage}
                aria-label="Change profile image"
                className="
                  relative
                  block
                  h-[500px]
                  w-[400px]
                  cursor-pointer
                  overflow-hidden
                  rounded-[22px]
                  bg-black
                  text-left
                "
              >

                <Image
                  src={images[currentImage]}
                  alt="Ravikant Singh"
                  fill
                  priority
                  sizes="(max-width: 768px) 400px, 400px"
                  className="
                    object-cover
                    transition-all
                    duration-700
                    group-hover:scale-105
                  "
                />

                {/* Image Overlay */}
                <div
                  className="
                    absolute
                    inset-0
                    bg-cyan-400/0
                    transition-all
                    duration-500
                    group-hover:bg-cyan-400/5
                  "
                />

              </button>
            </div>

          </div>
        </div>


        {/* =====================================================
            RIGHT SIDE - TEXT
        ===================================================== */}

        <div>

          {/* Small Heading */}
          <p
            className="
              mb-6
              text-sm
              font-medium
              uppercase
              tracking-[0.3em]
              text-gray-500
            "
          >
            B.Tech CSE Student
          </p>


          {/* =================================================
              NAME
          ================================================= */}

          <h1
            className="
              text-5xl
              font-bold
              leading-tight
              tracking-tight
              sm:text-6xl
              md:text-7xl
            "
          >

            Hi, I'm

            <br />

            {/* =================================================
                NAME - OUTLINE + LEFT TO RIGHT HOVER
            ================================================= */}

            <span
              className="
                group
                relative
                inline-block
                cursor-pointer
                font-bold
                text-transparent
                [-webkit-text-stroke:1px_rgba(255,255,255,0.8)]
              "
            >

              {/* White Fill - Left to Right */}
              <span
                className="
                  absolute
                  inset-0
                  overflow-hidden
                  whitespace-nowrap
                  text-white
                  [clip-path:inset(0_100%_0_0)]
                  transition-[clip-path]
                  duration-700
                  ease-out
                  group-hover:[clip-path:inset(0_0_0_0)]
                "
              >
                Ravikant Singh
              </span>

              {/* Outline Text */}
              Ravikant Singh

            </span>

          </h1>


          {/* =================================================
              ROLE
          ================================================= */}

          <p className="mt-4 text-lg font-medium text-cyan-400">
            Full Stack Developer
          </p>


          {/* =================================================
              DESCRIPTION
          ================================================= */}

          <p className="mt-8 max-w-2xl text-lg leading-8 text-gray-400">
            I build modern web applications, solve Data Structures
            &amp; Algorithms problems, and turn ideas into practical
            software projects.
          </p>


          {/* =====================================================
              RESUME + SOCIAL LINKS
          ===================================================== */}

          <div className="mt-8 flex items-center gap-2">

            {/* =================================================
                RESUME - RECTANGULAR BUTTON
            ================================================= */}

            <a
              href="/resume.pdf"
              download
              className="
                relative
                -ml-[5px]
                flex
                items-center
                gap-2
                rounded-md
                bg-cyan-400
                px-6
                py-3
                text-sm
                font-semibold
                text-black
                transition-all
                duration-300
                hover:scale-[1.03]
                hover:bg-cyan-300
                hover:shadow-[0_0_25px_rgba(34,211,238,0.4)]
              "
            >

              {/* Rectangular Download Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="h-5 w-5"
              >
                {/* Rectangle */}
                <rect
                  x="4"
                  y="3"
                  width="16"
                  height="18"
                  rx="2"
                />

                {/* Download Arrow */}
                <path d="M12 7v7" />
                <path d="m9 11 3 3 3-3" />
              </svg>

              Resume

            </a>


            {/* =================================================
                SOCIAL LINKS - PILL BORDER
            ================================================= */}

            <div
              className="
                flex
                items-center
                gap-1
                rounded-full
                border
                border-cyan-400/30
                bg-cyan-400/[0.02]
                px-2
                py-1
                backdrop-blur-md
                transition-all
                duration-300
                hover:border-cyan-400/50
                hover:shadow-[0_0_25px_rgba(34,211,238,0.08)]
              "
            >

              {/* =================================================
                  LINKEDIN
              ================================================= */}

              <a
                href="https://www.linkedin.com/in/ravi-kant-singh-a039ab321/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-full
                  text-gray-400
                  transition-all
                  duration-300
                  hover:bg-cyan-400/10
                  hover:text-cyan-400
                "
              >
                <span className="text-sm font-bold">
                  in
                </span>
              </a>


              {/* =================================================
                  MAIL
              ================================================= */}

              <a
                href="mailto:ravikantsingh08032007@gmail.com"
                aria-label="Email"
                className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-full
                  text-gray-400
                  transition-all
                  duration-300
                  hover:bg-cyan-400/10
                  hover:text-cyan-400
                "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  className="h-5 w-5"
                >
                  <rect
                    x="3"
                    y="5"
                    width="18"
                    height="14"
                    rx="2"
                  />

                  <path d="m3 7 9 6 9-6" />
                </svg>
              </a>


              {/* =================================================
                  GITHUB
              ================================================= */}

              <a
                href="https://github.com/Ravimaurya123"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-full
                  text-gray-400
                  transition-all
                  duration-300
                  hover:bg-cyan-400/10
                  hover:text-cyan-400
                "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-5 w-5"
                >
                  <path d="M12 .5a12 12 0 0 0-3.79 23.39c.6.11.82-.26.82-.58v-2.04c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.74.08-.74 1.2.08 1.83 1.23 1.83 1.23 1.07 1.83 2.8 1.3 3.48.99.11-.77.42-1.3.76-1.6-2.67-.3-5.47-1.34-5.47-5.95 0-1.31.47-2.38 1.23-3.22-.12-.3-.53-1.52.12-3.17 0 0 1-.32 3.3 1.23a11.4 11.4 0 0 1 6 0c2.29-1.55 3.29-1.23 3.29-1.23.65 1.65.24 2.87.24 3.17.77.84 1.23 1.91 1.23 3.22 0 4.62-2.81 5.64-5.49 5.94.43.37.81 1.1.81 2.22v3.29c0 .32.22.69.83.57A12 12 0 0 0 12 .5Z" />
                </svg>
              </a>


              {/* =================================================
                  TWITTER / X
              ================================================= */}

              <a
                href="https://twitter.com/YOUR-TWITTER"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-full
                  text-gray-400
                  transition-all
                  duration-300
                  hover:bg-cyan-400/10
                  hover:text-cyan-400
                "
              >
                <span className="text-lg font-medium">
                  𝕏
                </span>
              </a>


              {/* =================================================
                  LEETCODE
              ================================================= */}

              <a
                href="https://leetcode.com/u/lHukd8gKwR/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LeetCode"
                className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-full
                  text-gray-400
                  transition-all
                  duration-300
                  hover:bg-cyan-400/10
                  hover:text-cyan-400
                "
              >
                <span className="text-[11px] font-bold">
                  LC
                </span>
              </a>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}