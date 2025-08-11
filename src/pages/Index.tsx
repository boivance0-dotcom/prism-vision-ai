
import React, { useRef } from 'react';
import SearchBar from '@/components/SearchBar';
import forestHeroBg from '@/assets/forest-hero-bg.jpg';

const Index = () => {
  const experienceRef = useRef<HTMLDivElement | null>(null);

  const handleSearch = (query: string) => {
    console.log(`Searching:`, query);
    // Integrate with your actual AI search API here
  };

  const scrollToExperience = () => {
    experienceRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section with Nature Background */}
      <div className="relative min-h-screen">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${forestHeroBg})` }}
        />

        {/* Dark Overlay for Text Readability */}
        <div className="absolute inset-0 bg-black/40" />

        {/* Subtle Fog/Mist Overlay */}
        <div className="fog-overlay pointer-events-none" />

        {/* Floating Leaves */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <span className="floating-leaf left-[8%] top-[10%]" />
          <span className="floating-leaf left-[75%] top-[15%] delay-150" />
          <span className="floating-leaf left-[55%] top-[45%] delay-300" />
          <span className="floating-leaf left-[20%] top-[60%] delay-500" />
          <span className="floating-leaf left-[88%] top-[70%] delay-[700ms]" />
        </div>

        <div className="relative z-10 container mx-auto px-6 py-16 min-h-screen flex flex-col">
          {/* Main Hero Content */}
          <div className="flex-1 flex flex-col justify-center items-center text-center">
            {/* Large Hero Title */}
            <div className="mb-8 animate-fade-in">
              <div className="kicker mb-6">Nature AI Project</div>
              <h1 className="headline-cinematic text-gradient-premium text-center text-balance animate-scale-fade-in">
                Nature Makes <span className="accent-earth">Us Happy</span>
              </h1>

              <p className="mt-6 subheadline max-w-[600px] mx-auto text-center animate-fade-up-delayed">
                Explore the emotional state of real happiness through immersive, nature-inspired intelligence.
              </p>
            </div>

            {/* CTA Button */}
            <div className="mt-8 animate-fade-up-late">
              <button onClick={scrollToExperience} className="cta-premium">
                Start Experience
              </button>
            </div>
          </div>

          {/* Bottom brand marker */}
          <div className="pb-6 text-left">
            <span className="inline-block text-white/80 text-xs tracking-widest uppercase px-2 py-1 bg-black/20 rounded-md backdrop-blur">
              Nature Studios
            </span>
          </div>
        </div>
      </div>

      {/* Experience Section with Search */}
      <section ref={experienceRef} className="bg-background border-t border-border/50">
        <div className="container mx-auto px-6 py-20">
          <h2 className="text-2xl md:text-4xl font-semibold tracking-tight mb-6">Explore with our specialized AIs</h2>
          <p className="text-muted-foreground max-w-2xl mb-8">
            Ask anything about environments, ecosystems, and sustainability. Our tailored AI systems provide deep, contextual insights.
          </p>

          <div className="w-full max-w-4xl">
            <SearchBar onSearch={handleSearch} />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 bg-background">
        <div className="container mx-auto px-6 py-8">
          <div className="text-center text-muted-foreground">
            <p>&copy; 2024 Nature AI Intelligence. Advanced environmental research platform.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
