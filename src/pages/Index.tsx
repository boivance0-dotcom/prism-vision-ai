
import React, { useRef, useState } from 'react';
import SearchBar from '@/components/SearchBar';
import AIModesSlider from '@/components/AIModesSlider';
import forestHeroBg from '@/assets/forest-hero-bg.jpg';
import { useParallax } from '@/lib/hooks/useParallax';
import HeroShowcase from '@/components/HeroShowcase';
import AnimatedGradient from '@/components/AnimatedGradient';
import FeatureCarousel from '@/components/FeatureCarousel';
import Testimonials from '@/components/Testimonials';

const Index = () => {
  const [started, setStarted] = useState(false);
  const experienceRef = useRef<HTMLDivElement | null>(null);

  useParallax('.parallax-item');

  const handleSearch = (query: string) => {
    console.log(`Searching:`, query);
  };

  const startExperience = () => setStarted(true);

  return (
    <div className="min-h-screen">
      {/* Hero Section with Nature Background */}
      <div className="relative min-h-screen overflow-hidden">
        {/* Fixed Background Image with cinematic treatment */}
        <div
          className="fixed-bg hero-image-filter"
          style={{ backgroundImage: `url(${forestHeroBg})` }}
          aria-hidden
        />
        <AnimatedGradient />

        {/* Matte and readability overlays */}
        <div className="absolute inset-0 bg-black/40" />
        <div className="hero-gradient-top" />
        <div className="hero-gradient-bottom" />
        <div className="hero-vignette" />

        <div className="relative z-10 container mx-auto px-6 py-16 min-h-screen flex flex-col">
          <div className="flex-1 grid place-items-center">
            {/* Stack the two states and animate between them */}
            <div className="relative w-full">
              {/* Initial State */}
              {!started && (
                <div className="text-center animate-scale-fade-in parallax-item" data-speed="1">
                  <h1 className="hero-title-clean">Nature Makes Us Happy</h1>
                  <p className="mt-5 hero-subtitle-contrast max-w-[600px] mx-auto">
                    Immersive nature intelligence for curious minds.
                  </p>
                  <div className="mt-8">
                    <button onClick={startExperience} className="cta-outline-white cta-outline-white--lg hover-lift">
                      Start Experience
                    </button>
                  </div>
                </div>
              )}

              {/* Experience State */}
              {started && (
                <div className="animate-hero-in parallax-item" data-speed="1">
                  <HeroShowcase />
                </div>
              )}
            </div>
          </div>

          {/* Bottom brand marker */}
          <div className="pb-6 text-left">
            <span className="inline-block text-white/80 text-xs tracking-widest uppercase px-2 py-1 bg-black/20 rounded-md backdrop-blur">
              Zytherion Biovance
            </span>
          </div>
        </div>
      </div>

      {/* Additional sections */}
      <FeatureCarousel />
      <Testimonials />

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
