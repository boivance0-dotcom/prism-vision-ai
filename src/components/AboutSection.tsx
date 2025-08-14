import React from 'react';

const AboutSection: React.FC<{ accentColor?: string }> = ({ accentColor }) => {
  const accent = accentColor || 'var(--accent, #86C232)';

  return (
    <section id="about" className="relative mt-16 md:mt-20">
      <div className="relative rounded-2xl p-6 md:p-8 bg-[rgba(7,16,12,0.65)] border border-white/15 backdrop-blur-md shadow-[0_20px_60px_rgba(0,0,0,0.45)] overflow-hidden">
        <div className="pointer-events-none absolute -top-24 -left-24 w-[480px] h-[480px] rounded-full opacity-[0.18] blur-3xl" style={{ background: accent }} />
        <div className="pointer-events-none absolute -bottom-24 -right-24 w-[520px] h-[520px] rounded-full opacity-[0.12] blur-3xl" style={{ background: accent }} />

        <div className="relative z-10">
          <h2 className="text-white font-extrabold tracking-tight" style={{ fontSize: 'clamp(1.4rem, 3.8vw, 2.2rem)' }}>
            About Us
          </h2>
          <p className="mt-2 text-white/85 max-w-3xl">
            We are a collective of researchers, engineers, and designers building AI tools to understand and protect our natural world.
            From forests and wildlife to climate and oceans, our mission is to make environmental intelligence accessible and actionable.
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <div className="rounded-xl p-4 bg-black/40 border border-white/10">
              <h3 className="text-white/90 font-semibold">Mission</h3>
              <p className="mt-1 text-white/70 text-sm">
                Combine state-of-the-art AI with field expertise to deliver trustworthy insights for conservation and climate resiliency.
              </p>
            </div>
            <div className="rounded-xl p-4 bg-black/40 border border-white/10">
              <h3 className="text-white/90 font-semibold">Team</h3>
              <p className="mt-1 text-white/70 text-sm">
                A multidisciplinary crew spanning data science, ecology, cartography, and UX—united by care for the planet.
              </p>
            </div>
            <div className="rounded-xl p-4 bg-black/40 border border-white/10">
              <h3 className="text-white/90 font-semibold">Vision</h3>
              <p className="mt-1 text-white/70 text-sm">
                An open, beautiful dashboard of Earth—where anyone can explore ecosystems, monitor change, and take informed action.
              </p>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3 text-xs">
            <span className="px-3 py-1 rounded-full text-black font-semibold" style={{ backgroundColor: accent }}>Open Science</span>
            <span className="px-3 py-1 rounded-full bg-white/10 border border-white/15 text-white/80">Responsible AI</span>
            <span className="px-3 py-1 rounded-full bg-white/10 border border-white/15 text-white/80">Community</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;