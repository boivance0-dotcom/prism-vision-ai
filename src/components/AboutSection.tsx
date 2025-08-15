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

          <div className="mt-3 space-y-4 text-white/85 max-w-4xl">
            <h3 className="text-white font-semibold" style={{ color: accent }}>What We Are: A Conservation Data & Collaboration Platform</h3>
            <p>
              Zytherion Biovance is building the world's first comprehensive conservation infrastructure platform — think of it as the
              foundational operating system that connects every aspect of wildlife research, environmental monitoring, and conservation
              efforts globally. We're a platform company that happens to leverage AI technology, not an AI company building conservation tools.
            </p>

            <h3 className="text-white font-semibold" style={{ color: accent }}>The Core Platform: “Digital Nervous System of the Planet”</h3>
            <div className="rounded-lg border border-white/10 bg-black/30 p-4">
              <p className="text-white/85">
                <span className="font-semibold">Primary Function: Conservation Data Infrastructure.</span> Our platform serves as the central hub where conservation
                organizations, researchers, and government agencies can store, access, analyze, and collaborate on wildlife and environmental data.
                It's the missing infrastructure layer that currently forces every conservation project to work in isolation.
              </p>
            </div>

            <h3 className="text-white font-semibold" style={{ color: accent }}>Search & Discovery Engine</h3>
            <p>
              Think of it as “Google for Conservation” — a comprehensive search and discovery system that indexes conservation research,
              wildlife data, habitat information, and scientific findings from across the globe. Users can search across decades of research,
              current monitoring projects, and real‑time environmental conditions.
            </p>

            <h3 className="text-white font-semibold" style={{ color: accent }}>Platform Architecture: Dual‑Layer Infrastructure</h3>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="rounded-xl p-4 bg-black/40 border border-white/10">
                <h4 className="text-white/90 font-semibold">Public Layer: Open Conservation Hub</h4>
                <ul className="mt-2 list-disc pl-5 text-white/80 text-sm space-y-1">
                  <li>
                    <span className="font-medium">Data Discovery:</span> Search and explore conservation research, wildlife databases, and environmental studies
                  </li>
                  <li>
                    <span className="font-medium">Educational Resources:</span> Access to scientific findings, habitat maps, species information
                  </li>
                  <li>
                    <span className="font-medium">Citizen Science Portal:</span> Tools for public participation in data collection and monitoring
                  </li>
                  <li>
                    <span className="font-medium">Collaboration Space:</span> Connect researchers, students, and conservation enthusiasts
                  </li>
                </ul>
              </div>

              <div className="rounded-xl p-4 bg-black/40 border border-white/10">
                <h4 className="text-white/90 font-semibold">Private Layer: Secure Research Infrastructure</h4>
                <p className="mt-2 text-white/80 text-sm">
                  A protected workspace for sensitive research data and active field projects. Provides secure storage, fine‑grained access
                  controls, encrypted collaboration, audit trails, and compliant data sharing across institutions — so teams can move faster
                  without compromising trust or integrity.
                </p>
              </div>
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