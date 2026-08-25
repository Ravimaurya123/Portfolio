"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const navItems = [
  { name: "Home", id: "home" },
  { name: "About", id: "about" },
  { name: "Contributions", id: "contributions" },
  { name: "Projects", id: "projects" },
  { name: "Achievements", id: "achievements" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] =
    useState("home");

  const [profileOpen, setProfileOpen] =
    useState(false);

  /*
  ============================================================
  SCROLL + ACTIVE SECTION
  ============================================================
  */

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      // Navbar scroll state
      setIsScrolled(scrollY > 40);

      let current = "home";

      navItems.forEach((item) => {
        const section =
          document.getElementById(item.id);

        if (!section) return;

        const sectionTop =
          section.getBoundingClientRect().top +
          window.scrollY;

        const sectionBottom =
          sectionTop +
          section.offsetHeight;

        if (
          scrollY >= sectionTop - 200 &&
          scrollY < sectionBottom - 200
        ) {
          current = item.id;
        }
      });

      setActiveSection(current);
    };

    window.addEventListener(
      "scroll",
      handleScroll,
      { passive: true }
    );

    handleScroll();

    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll
      );
    };
  }, []);

  /*
  ============================================================
  ESC CLOSE PROFILE
  ============================================================
  */

  useEffect(() => {
    const handleEscape = (
      e: KeyboardEvent
    ) => {
      if (e.key === "Escape") {
        setProfileOpen(false);
      }
    };

    window.addEventListener(
      "keydown",
      handleEscape
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleEscape
      );
    };
  }, []);

  return (
    <>
      {/* =====================================================
          NAVBAR
      ===================================================== */}

      <nav
        className={`
          fixed
          left-0
          top-0
          z-50
          w-full

          transition-all
          duration-700
          ease-[cubic-bezier(0.22,1,0.36,1)]

          ${
            isScrolled
              ? "px-4 pt-3 sm:px-6"
              : "px-0 pt-0"
          }
        `}
      >

        {/* ===================================================
            NAVBAR CONTAINER
        =================================================== */}

        <div
          className={`
            mx-auto
            flex
            items-center

            transition-all
            duration-700
            ease-[cubic-bezier(0.22,1,0.36,1)]

            ${
              isScrolled
                ? `
                  h-[58px]
                  w-fit
                  max-w-[calc(100vw-24px)]

                  rounded-full

                  border
                  border-cyan-400/25

                  bg-[#080808]/90

                  px-4

                  shadow-[0_0_30px_rgba(34,211,238,0.08)]

                  backdrop-blur-xl
                `
                : `
                  h-[72px]
                  w-full

                  rounded-none

                  border-b
                  border-white/5

                  bg-[#0b0b0b]

                  px-6
                  sm:px-8
                  lg:px-12
                `
            }
          `}
        >

          {/* =================================================
              LEFT SIDE - PROFILE
          ================================================= */}

          <div
            className={`
              flex
              shrink-0
              items-center

              transition-all
              duration-700
              ease-[cubic-bezier(0.22,1,0.36,1)]

              ${
                isScrolled
                  ? "mr-5"
                  : "mr-8 lg:mr-12"
              }
            `}
          >

            <button
              type="button"
              onClick={() =>
                setProfileOpen(true)
              }
              aria-label="Open profile photo"

              className="
                group
                relative
                flex
                h-11
                w-11
                cursor-pointer
                items-center
                justify-center
              "
            >

              {/* Blue Glow */}

              <div
                className="
                  absolute
                  -inset-1

                  bg-cyan-400/0
                  blur-md

                  transition-all
                  duration-300

                  group-hover:bg-cyan-400/40
                "
                style={{
                  clipPath:
                    "polygon(25% 6.7%, 75% 6.7%, 100% 50%, 75% 93.3%, 25% 93.3%, 0% 50%)",
                }}
              />

              {/* Hexagon Border */}

              <div
                className="
                  absolute
                  inset-0
                  bg-cyan-400
                "
                style={{
                  clipPath:
                    "polygon(25% 6.7%, 75% 6.7%, 100% 50%, 75% 93.3%, 25% 93.3%, 0% 50%)",
                }}
              />

              {/* Profile Image */}

              <div
                className="
                  relative
                  h-10
                  w-10
                  overflow-hidden
                  bg-black
                "
                style={{
                  clipPath:
                    "polygon(25% 6.7%, 75% 6.7%, 100% 50%, 75% 93.3%, 25% 93.3%, 0% 50%)",
                }}
              >

                <Image
                  src="/profile.jpg"
                  alt="Ravikant Singh"
                  fill
                  priority
                  sizes="40px"
                  className="object-cover"
                />

              </div>

            </button>

          </div>


          {/* =================================================
              CENTER NAVIGATION
          ================================================= */}

          <div
            className={`
              hidden
              items-center
              justify-center
              md:flex

              transition-all
              duration-700
              ease-[cubic-bezier(0.22,1,0.36,1)]

              ${
                isScrolled
                  ? "gap-5"
                  : "flex-1 gap-7 lg:gap-9"
              }
            `}
          >

            {navItems.map(
              (item) => {

                const active =
                  activeSection ===
                  item.id;

                return (
                  <a
                    key={item.id}
                    href={`#${item.id}`}

                    className={`
                      group
                      relative
                      whitespace-nowrap
                      py-2

                      transition-all
                      duration-500
                      ease-out

                      ${
                        isScrolled
                          ? "text-[13px]"
                          : "text-[15px]"
                      }

                      ${
                        active
                          ? "text-cyan-400"
                          : "text-gray-400 hover:text-cyan-400"
                      }
                    `}
                  >

                    {item.name}

                    {/* Underline */}

                    <span
                      className={`
                        absolute
                        bottom-0
                        left-1/2

                        h-[2px]

                        -translate-x-1/2

                        rounded-full
                        bg-cyan-400

                        shadow-[0_0_8px_rgba(34,211,238,0.8)]

                        transition-all
                        duration-300

                        ${
                          active
                            ? "w-full opacity-100"
                            : "w-0 opacity-0 group-hover:w-full group-hover:opacity-100"
                        }
                      `}
                    />

                    {/* Glow */}

                    <span
                      className={`
                        absolute
                        -bottom-1
                        left-1/2

                        h-3

                        -translate-x-1/2

                        rounded-full
                        bg-cyan-400/30
                        blur-md

                        transition-all
                        duration-300

                        ${
                          active
                            ? "w-8 opacity-100"
                            : "w-0 opacity-0 group-hover:w-8 group-hover:opacity-100"
                        }
                      `}
                    />

                  </a>
                );
              }
            )}

          </div>


          {/* =================================================
              RIGHT SIDE - GET IN TOUCH
          ================================================= */}

          <div
            className={`
              shrink-0

              transition-all
              duration-700
              ease-[cubic-bezier(0.22,1,0.36,1)]

              ${
                isScrolled
                  ? "ml-5"
                  : "ml-8 lg:ml-12"
              }
            `}
          >

            <a
              href="#contact"

              className={`
                block
                rounded-full

                border
                border-white/20

                font-medium
                tracking-wide
                text-white

                transition-all
                duration-300

                hover:border-cyan-400/70
                hover:bg-cyan-400/5
                hover:text-cyan-400
                hover:shadow-[0_0_18px_rgba(34,211,238,0.12)]

                ${
                  isScrolled
                    ? "px-4 py-2 text-[11px]"
                    : "px-5 py-2.5 text-xs sm:px-7 sm:py-3 sm:text-sm"
                }
              `}
            >
              GET IN TOUCH
            </a>

          </div>

        </div>

      </nav>


      {/* =====================================================
          PROFILE IMAGE MODAL
      ===================================================== */}

      {profileOpen && (

        <div
          className="
            fixed
            inset-0
            z-[100]

            flex
            items-center
            justify-center

            bg-black/70

            p-6

            backdrop-blur-xl
          "

          onClick={() =>
            setProfileOpen(false)
          }
        >

          {/* CLOSE BUTTON */}

          <button
            type="button"

            onClick={() =>
              setProfileOpen(false)
            }

            className="
              absolute
              right-8
              top-8
              z-10

              flex
              h-11
              w-11

              items-center
              justify-center

              rounded-full

              border
              border-white/20

              bg-black/60

              text-2xl
              text-white

              transition-all
              duration-300

              hover:border-cyan-400
              hover:text-cyan-400
            "
          >
            ×
          </button>


          {/* LARGE IMAGE */}

          <div
            className="
              relative

              h-[75vh]
              w-[min(500px,90vw)]

              overflow-hidden

              rounded-3xl

              border
              border-cyan-400/40

              shadow-[0_0_60px_rgba(34,211,238,0.18)]
            "

            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <Image
              src="/profile.jpg"
              alt="Ravikant Singh"

              fill

              sizes="
                (max-width: 768px)
                90vw,
                500px
              "

              className="object-cover"

              priority
            />

          </div>

        </div>
      )}
    </>
  );
}