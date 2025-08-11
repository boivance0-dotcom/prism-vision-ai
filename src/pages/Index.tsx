
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
        {/* Background Image with cinematic treatment */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat hero-image-filter"
          style={{ backgroundImage: `url(${forestHeroBg})` }}
        />

        {/* Matte and readability overlays */}
        <div className="absolute inset-0 bg-black/40" />
        <div className="hero-gradient-top" />
        <div className="hero-gradient-bottom" />
        <div className="hero-vignette" />

        {/* Remove floating leaves to keep text area clean */}

        <div className="relative z-10 container mx-auto px-6 py-16 min-h-screen flex flex-col">
          {/* Main Hero Content */}
          <div className="flex-1 flex flex-col justify-center items-center text-center">
            {/* Large Hero Title */}
            <div className="mb-8 animate-fade-in">
              <h1 className="hero-title-clean text-center animate-scale-fade-in">
                Nature Makes Us Happy
              </h1>

              <p className="mt-5 hero-subtitle-contrast max-w-[600px] mx-auto text-center animate-fade-up-delayed">
                Immersive nature intelligence for curious minds.
              </p>
            </div>

            {/* CTA Button */}
            <div className="mt-8 animate-fade-up-late">
              <button onClick={scrollToExperience} className="cta-outline-white cta-outline-white--lg">
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
