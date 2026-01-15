import React from 'react';

interface HeroProps {
  name?: string;
  subtitle?: string;
  children?: React.ReactNode;
}

export default function Hero({
  name = 'Carlos Vazquez Baur',
  subtitle = 'Software Developer — Performer — Outdoorsman',
  children,
}: HeroProps) {
  return (
    <section
      role="banner"
      aria-label="Landing hero"
      className="min-h-screen flex items-center justify-center relative text-white"
    >
      <div className="text-center px-6 py-9 sm:px-10 sm:py-12 rounded-2xl bg-gradient-to-b from-black/70 via-black/40 to-black/30 shadow-2xl max-w-[90%]">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tight">
          {name}
        </h1>
        <p className="mt-3 text-base sm:text-lg md:text-xl text-white/95">{subtitle}</p>
        {children}
      </div>
    </section>
  );
}
