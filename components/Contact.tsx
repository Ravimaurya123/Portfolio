"use client";

import { Mail, MapPin, Clock } from "lucide-react";

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative min-h-screen overflow-hidden px-6 py-24 text-white"
    >
      {/* Content stays above your existing particle background */}
      <div className="relative z-10 mx-auto max-w-7xl">

        {/* HEADER */}
        <div className="mb-16 text-center">
          <div className="mb-5 flex items-center justify-center gap-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-full border border-cyan-400/40 bg-cyan-400/10">
              <Mail className="h-5 w-5 text-cyan-400" />
            </div>

            <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Get In Touch
            </h2>
          </div>

          <p className="text-lg text-gray-400">
            Let's discuss your next project or just say hello!
          </p>
        </div>

        {/* MAIN CONTENT */}
        <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr]">

          {/* LEFT */}
          <div className="flex flex-col justify-center">
            <h3 className="text-3xl font-bold">
              Let's Connect
            </h3>

            <p className="mt-6 max-w-xl text-lg leading-8 text-gray-400">
              I'm always open to discussing new opportunities,
              interesting projects, or just having a chat about
              technology and development.
            </p>

            <div className="mt-12 space-y-8">

              {/* EMAIL */}
              <div className="flex items-center gap-5">
                <div className="flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-white/[0.03]">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>

                <div>
                  <p className="text-sm text-gray-500">
                    Email
                  </p>

                  <a
                    href="mailto:yourmail@gmail.com"
                    className="text-lg text-gray-200 transition hover:text-cyan-400"
                  >
                    ravikantsingh08032007@gmail.com
                  </a>
                </div>
              </div>

              {/* LOCATION */}
              <div className="flex items-center gap-5">
                <div className="flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-white/[0.03]">
                  <MapPin className="h-5 w-5 text-gray-400" />
                </div>

                <div>
                  <p className="text-sm text-gray-500">
                    Location
                  </p>

                  <p className="text-lg text-gray-200">
                    Buxar Bihar, India
                  </p>
                </div>
              </div>

              {/* RESPONSE TIME */}
              <div className="flex items-center gap-5">
                <div className="flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-white/[0.03]">
                  <Clock className="h-5 w-5 text-gray-400" />
                </div>

                <div>
                  <p className="text-sm text-gray-500">
                    Response Time
                  </p>

                  <p className="text-lg text-gray-200">
                    Within 24 hours
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* RIGHT FORM */}
          <div className="relative rounded-3xl border border-white/10 bg-[#1b1b1b]/80 p-7 shadow-2xl backdrop-blur-md sm:p-10">

            {/* Decorative Circle */}
            <div className="absolute -top-5 left-14 flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-[#1b1b1b]">
              <div className="h-2.5 w-2.5 rounded-full bg-white" />
            </div>

            <form className="space-y-6">

              {/* FIRST + LAST NAME */}
              <div className="grid gap-6 sm:grid-cols-2">

                <div>
                  <label className="mb-2 block text-sm font-semibold">
                    First Name <span className="text-red-400">*</span>
                  </label>

                  <input
                    type="text"
                    placeholder="Your first name"
                    className="h-14 w-full rounded-xl border border-white/10 bg-black/30 px-4 text-white outline-none transition placeholder:text-gray-600 focus:border-cyan-400/50"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold">
                    Last Name <span className="text-red-400">*</span>
                  </label>

                  <input
                    type="text"
                    placeholder="Your last name"
                    className="h-14 w-full rounded-xl border border-white/10 bg-black/30 px-4 text-white outline-none transition placeholder:text-gray-600 focus:border-cyan-400/50"
                  />
                </div>

              </div>

              {/* EMAIL */}
              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Email <span className="text-red-400">*</span>
                </label>

                <input
                  type="email"
                  placeholder="your.email@example.com"
                  className="h-14 w-full rounded-xl border border-white/10 bg-black/30 px-4 text-white outline-none transition placeholder:text-gray-600 focus:border-cyan-400/50"
                />
              </div>

              {/* SUBJECT */}
              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Subject <span className="text-red-400">*</span>
                </label>

                <select
                  defaultValue=""
                  className="h-14 w-full rounded-xl border border-white/10 bg-black/30 px-4 text-gray-400 outline-none focus:border-cyan-400/50"
                >
                  <option value="" disabled>
                    Select a subject
                  </option>
                  <option value="project">
                    Project Discussion
                  </option>
                  <option value="freelance">
                    Freelance Work
                  </option>
                  <option value="collaboration">
                    Collaboration
                  </option>
                  <option value="other">
                    Other
                  </option>
                </select>
              </div>

              {/* MESSAGE */}
              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Message <span className="text-red-400">*</span>
                </label>

                <textarea
                  rows={5}
                  placeholder="Tell me about your project or how I can help you..."
                  className="w-full resize-none rounded-xl border border-white/10 bg-black/30 p-4 text-white outline-none placeholder:text-gray-600 focus:border-cyan-400/50"
                />
              </div>

              {/* INFO */}
              <p className="text-sm text-gray-500">
                💡 Write a meaningful message with at least 3 words and
                10 characters.
              </p>

              {/* BUTTON */}
              <button
                type="submit"
                className="h-16 w-full rounded-full border border-white/10 bg-black/20 text-lg font-semibold transition-all duration-300 hover:border-cyan-400/40 hover:bg-white hover:text-black"
              >
                Send Message
              </button>

            </form>
          </div>

        </div>
      </div>
    </section>
  );
}