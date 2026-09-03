import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
// import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Contribution from "@/components/Contribution";
// import DSA from "@/components/DSA";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import GlowingParticles from "@/components/GlowingParticles";
import Achievements from "@/components/Achievements";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-black">

      <GlowingParticles />

      <div className="relative z-10">
        <Navbar />

        <main>
          <Hero />
          <About />
          {/* <Skills /> */}
          <Projects />
          <Contribution/>
          <Achievements />
          <Contact />
        </main>

        <Footer />
      </div>

    </div>
  );
}