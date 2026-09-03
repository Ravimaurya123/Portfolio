"use client";

import { FormEvent, useState } from "react";
import { Mail, MapPin, Clock, Send } from "lucide-react";

export default function Contact() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    setStatus("");

    const form = e.currentTarget;
    const formData = new FormData(form);

    const firstName = formData.get("firstName")?.toString().trim();
    const lastName = formData.get("lastName")?.toString().trim();
    const email = formData.get("email")?.toString().trim();
    const subject = formData.get("subject")?.toString().trim();
    const message = formData.get("message")?.toString().trim();

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          subject,
          message,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to send message");
      }

      setStatus("Message sent successfully!");
      form.reset();
    } catch (error) {
      console.error("Contact form error:", error);
      setStatus("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      className="relative overflow-hidden px-5 py-20 text-white sm:px-6"
    >
      <div className="relative z-10 mx-auto max-w-6xl">

        {/* ================= HEADER ================= */}
        <div className="mb-10 text-center">

          <div className="mb-3 flex items-center justify-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-cyan-400/30 bg-cyan-400/5">
              <Mail className="h-4 w-4 text-cyan-400" />
            </div>

            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Get In Touch
            </h2>
          </div>

          <p className="mx-auto max-w-lg text-sm text-gray-500 sm:text-base">
            Have a project in mind or want to connect? Feel free to send me
            a message.
          </p>
        </div>

        {/* ================= MAIN CARD ================= */}
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">

          {/* ================= LEFT SIDE ================= */}
          <div className="flex flex-col justify-center rounded-2xl border border-white/[0.08] bg-transparent p-6 sm:p-7">

            <div>
              <p className="mb-2 text-xs font-medium uppercase tracking-[0.2em] text-cyan-400">
                Contact
              </p>

              <h3 className="text-2xl font-semibold">
                Let's Connect
              </h3>

              <p className="mt-3 max-w-md text-sm leading-6 text-gray-500">
                I'm always open to discussing new opportunities, interesting
                projects, collaborations, or simply having a conversation
                about technology.
              </p>
            </div>

            {/* CONTACT DETAILS */}
            <div className="mt-8 space-y-5">

              {/* EMAIL */}
              <a
                href="mailto:ravikantsingh08032007@gmail.com"
                className="group flex items-center gap-4"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.02] transition group-hover:border-cyan-400/30 group-hover:bg-cyan-400/5">
                  <Mail className="h-4 w-4 text-gray-500 transition group-hover:text-cyan-400" />
                </div>

                <div className="min-w-0">
                  <p className="text-[11px] uppercase tracking-wider text-gray-600">
                    Email
                  </p>

                  <p className="truncate text-sm text-gray-300 transition group-hover:text-cyan-400">
                    ravikantsingh08032007@gmail.com
                  </p>
                </div>
              </a>

              {/* LOCATION */}
              <div className="flex items-center gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.02]">
                  <MapPin className="h-4 w-4 text-gray-500" />
                </div>

                <div>
                  <p className="text-[11px] uppercase tracking-wider text-gray-600">
                    Location
                  </p>

                  <p className="text-sm text-gray-300">
                    Buxar, Bihar, India
                  </p>
                </div>
              </div>

              {/* RESPONSE TIME */}
              <div className="flex items-center gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.02]">
                  <Clock className="h-4 w-4 text-gray-500" />
                </div>

                <div>
                  <p className="text-[11px] uppercase tracking-wider text-gray-600">
                    Response Time
                  </p>

                  <p className="text-sm text-gray-300">
                    Within 24 hours
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* ================= RIGHT FORM ================= */}
          <div className="rounded-2xl border border-white/[0.08] bg-transparent p-5 sm:p-7">

            <form
              onSubmit={handleSubmit}
              className="space-y-4"
            >

              {/* NAME */}
              <div className="grid gap-4 sm:grid-cols-2">

                <div>
                  <label className="mb-1.5 block text-xs font-medium text-gray-400">
                    First Name
                    <span className="ml-1 text-cyan-400">*</span>
                  </label>

                  <input
                    type="text"
                    name="firstName"
                    required
                    placeholder="First name"
                    className="h-11 w-full rounded-lg border border-white/[0.08] bg-white/[0.02] px-3 text-sm text-white outline-none transition placeholder:text-gray-700 focus:border-cyan-400/40 focus:bg-cyan-400/[0.02]"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-medium text-gray-400">
                    Last Name
                    <span className="ml-1 text-cyan-400">*</span>
                  </label>

                  <input
                    type="text"
                    name="lastName"
                    required
                    placeholder="Last name"
                    className="h-11 w-full rounded-lg border border-white/[0.08] bg-white/[0.02] px-3 text-sm text-white outline-none transition placeholder:text-gray-700 focus:border-cyan-400/40 focus:bg-cyan-400/[0.02]"
                  />
                </div>

              </div>

              {/* EMAIL */}
              <div>
                <label className="mb-1.5 block text-xs font-medium text-gray-400">
                  Email
                  <span className="ml-1 text-cyan-400">*</span>
                </label>

                <input
                  type="email"
                  name="email"
                  required
                  placeholder="your.email@example.com"
                  className="h-11 w-full rounded-lg border border-white/[0.08] bg-white/[0.02] px-3 text-sm text-white outline-none transition placeholder:text-gray-700 focus:border-cyan-400/40 focus:bg-cyan-400/[0.02]"
                />
              </div>

              {/* SUBJECT */}
              <div>
                <label className="mb-1.5 block text-xs font-medium text-gray-400">
                  Subject
                  <span className="ml-1 text-cyan-400">*</span>
                </label>

                <select
                  name="subject"
                  defaultValue=""
                  required
                  className="h-11 w-full rounded-lg border border-white/[0.08] bg-white/[0.02] px-3 text-sm text-gray-500 outline-none transition focus:border-cyan-400/40"
                >
                  <option value="" disabled>
                    Select a subject
                  </option>

                  <option value="Project Discussion">
                    Project Discussion
                  </option>

                  <option value="Freelance Work">
                    Freelance Work
                  </option>

                  <option value="Collaboration">
                    Collaboration
                  </option>

                  <option value="Other">
                    Other
                  </option>
                </select>
              </div>

              {/* MESSAGE */}
              <div>
                <label className="mb-1.5 block text-xs font-medium text-gray-400">
                  Message
                  <span className="ml-1 text-cyan-400">*</span>
                </label>

                <textarea
                  name="message"
                  required
                  minLength={10}
                  rows={4}
                  placeholder="Tell me about your project..."
                  className="w-full resize-none rounded-lg border border-white/[0.08] bg-white/[0.02] p-3 text-sm text-white outline-none transition placeholder:text-gray-700 focus:border-cyan-400/40 focus:bg-cyan-400/[0.02]"
                />
              </div>

              {/* STATUS */}
              {status && (
                <div
                  className={`rounded-lg border px-3 py-2.5 text-xs ${
                    status.includes("successfully")
                      ? "border-green-400/20 bg-green-400/5 text-green-400"
                      : "border-red-400/20 bg-red-400/5 text-red-400"
                  }`}
                >
                  {status}
                </div>
              )}

              {/* BOTTOM */}
              <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:items-center sm:justify-between">

                <p className="text-[11px] text-gray-600">
                  Your message will be sent directly to my email.
                </p>

                <button
                  type="submit"
                  disabled={loading}
                  className="group flex h-11 items-center justify-center gap-2 rounded-lg border border-cyan-400/30 bg-cyan-400/[0.06] px-6 text-sm font-medium text-cyan-400 transition-all duration-300 hover:border-cyan-400/60 hover:bg-cyan-400/10 hover:shadow-[0_0_25px_rgba(34,211,238,0.12)] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />

                  {loading ? "Sending..." : "Send Message"}
                </button>

              </div>

            </form>
          </div>

        </div>
      </div>
    </section>
  );
}