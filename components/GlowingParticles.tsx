"use client";

import { useEffect, useState } from "react";

type Particle = {
  left: string;
  top: string;
  size: number;
  delay: string;
  duration: string;
};

export default function GlowingParticles() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const generatedParticles = Array.from({ length: 70 }, () => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: Math.floor(Math.random() * 4) + 2,
      delay: `${Math.random() * 5}s`,
      duration: `${Math.floor(Math.random() * 5) + 4}s`,
    }));

    setParticles(generatedParticles);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {particles.map((particle, index) => (
        <span
          key={index}
          className="absolute rounded-full bg-white opacity-0 shadow-[0_0_10px_3px_rgba(255,255,255,0.8)] animate-particle"
          style={{
            left: particle.left,
            top: particle.top,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            animationDelay: particle.delay,
            animationDuration: particle.duration,
          }}
        />
      ))}
    </div>
  );
}