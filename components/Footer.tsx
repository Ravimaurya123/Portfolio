
"use client";

import { useEffect, useState } from "react";
import {
  FaInstagram,
  FaFacebookF,
  FaWhatsapp,
  FaArrowUp,
} from "react-icons/fa";

export default function Footer() {
  const [showTopButton, setShowTopButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowTopButton(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const socials = [
    {
      name: "Instagram",
      icon: <FaInstagram />,
      href: "https://instagram.com/",
    },
    {
      name: "Facebook",
      icon: <FaFacebookF />,
      href: "https://facebook.com/",
    },
    {
      name: "WhatsApp",
      icon: <FaWhatsapp />,
      href: "https://wa.me/",
    },
  ];

  return (
    <>
      <footer className="border-t border-white/10 bg-transparent px-6 py-4">
        <div className="mx-auto flex max-w-7xl flex-col items-center text-center">

          {/* Thank You */}
          <p className="text-sm font-medium text-white">
            Thanks for visiting my portfolio
            <span className="ml-1 text-cyan-400">.</span>
          </p>

          {/* Social Icons */}
          <div className="mt-2.5 flex items-center justify-center gap-2.5">
            {socials.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
                title={social.name}
                className="
                  flex h-8 w-8 items-center justify-center
                  rounded-lg
                  border border-white/10
                  bg-white/[0.03]
                  text-gray-400
                  transition-all duration-300
                  hover:-translate-y-1
                  hover:border-cyan-400/50
                  hover:bg-cyan-400/10
                  hover:text-cyan-400
                  hover:shadow-[0_0_16px_rgba(34,211,238,0.18)]
                "
              >
                <span className="text-[14px]">
                  {social.icon}
                </span>
              </a>
            ))}
          </div>

          {/* Copyright */}
          <p className="mt-2.5 text-[11px] text-gray-600">
            © {new Date().getFullYear()} Ravikant Singh · Built with passion & code
          </p>

        </div>
      </footer>

      {/* Back To Top */}
      <button
        onClick={scrollToTop}
        aria-label="Back to top"
        title="Back to top"
        className={`
          fixed bottom-5 right-5 z-50
          flex h-7 w-7 items-center justify-center
          bg-transparent
          text-cyan-400
          transition-all duration-300
          hover:-translate-y-1
          hover:text-cyan-300
          hover:drop-shadow-[0_0_8px_rgba(34,211,238,0.7)]
          ${
            showTopButton
              ? "translate-y-0 opacity-100"
              : "pointer-events-none translate-y-3 opacity-0"
          }
        `}
      >
        <FaArrowUp size={13} />
      </button>
    </>
  );
}