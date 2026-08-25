const projects = [
  {
    title: "Tic-Tac-Toe",
    description:
      "Console-based Tic-Tac-Toe game using C++, OOP and DSA.",
  },
  {
    title: "RescueNet",
    description:
      "Disaster-management platform using React, Node.js and MongoDB.",
  },
  {
    title: "Northern Foodie",
    description:
      "Online food-ordering platform with a modern user interface.",
  },
  {
    title: "Smart Water Dispenser",
    description:
      "Touchless water dispenser using Arduino and an IR sensor.",
  },
];

export default function Projects() {
  return (
    <section id="projects" className="px-6 py-32">
      <div className="mx-auto max-w-7xl">

        <p className="text-sm uppercase tracking-[0.3em] text-gray-500">
          Projects
        </p>

        <h2 className="mt-6 text-4xl font-bold">
          Things I've Built
        </h2>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {projects.map((project) => (
            <div
              key={project.title}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-8 transition-all duration-500 hover:-translate-y-2 hover:border-cyan-400/50 hover:bg-cyan-400/[0.03] hover:shadow-[0_0_35px_rgba(34,211,238,0.15)]"
            >

              {/* Blue Hover Glow */}
              <div className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full bg-cyan-400/0 blur-3xl transition-all duration-500 group-hover:bg-cyan-400/20" />

              <div className="relative z-10">

                <h3 className="text-2xl font-bold transition-colors duration-300 group-hover:text-cyan-400">
                  {project.title}
                </h3>

                <p className="mt-4 leading-7 text-gray-400 transition-colors duration-300 group-hover:text-gray-300">
                  {project.description}
                </p>

                {/* Small blue line */}
                <div className="mt-6 h-[2px] w-0 bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)] transition-all duration-500 group-hover:w-16" />

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}