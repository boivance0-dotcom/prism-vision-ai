
import React, { useRef, useState } from 'react';
import SearchBar from '@/components/SearchBar';
import AIModesSlider from '@/components/AIModesSlider';
import forestHeroBg from '@/assets/forest-hero-bg.jpg';
import { useParallax } from '@/lib/hooks/useParallax';
import { useReveal } from '@/lib/hooks/useReveal';
import HeroShowcase from '@/components/HeroShowcase';
import AnimatedGradient from '@/components/AnimatedGradient';
import FeatureCarousel from '@/components/FeatureCarousel';
import Testimonials from '@/components/Testimonials';
import { motion, useReducedMotion } from 'framer-motion';
import NatureTopicCards from '@/components/NatureTopicCards';

const Index = () => {
  const [started, setStarted] = useState(false);
  const experienceRef = useRef<HTMLDivElement | null>(null);

  useParallax('.parallax-item');
  useReveal('.reveal-on-scroll');

  const prefersReducedMotion = useReducedMotion();
  const EASE: any = [0.2, 0.9, 0.3, 1];

  const handleSearch = (query: string) => {
    console.log(`Searching:`, query);
  };

  const startExperience = () => setStarted(true);

  return (
    <div className="relative z-10 min-h-screen">

      {/* Hero Section with Nature Background */}
      <div className="relative min-h-screen overflow-hidden">
        {/* Fixed Background Image with cinematic treatment */}
        <div
          className="fixed-bg hero-image-filter"
          style={{ backgroundImage: `url(${forestHeroBg})`, zIndex: 0 as unknown as number }}
          aria-hidden
        />
        <AnimatedGradient />

        {/* Matte and readability overlays */}
        <div className="hero-gradient-top" />
        <div className="hero-gradient-bottom" />
        <div className="hero-vignette" />

        <div className="relative z-10 container mx-auto px-6 py-16 min-h-screen flex flex-col page-enter">
          <div className="flex-1 grid place-items-center">
            {/* Stack the two states and animate between them */}
            <div className="relative w-full">
              {/* Initial State */}
              {!started && (
                <div className="text-center animate-scale-fade-in parallax-item" data-speed="1">
                  <motion.h1
                    className="hero-title-clean"
                    initial={prefersReducedMotion ? false : { x: -50, opacity: 0 }}
                    animate={prefersReducedMotion ? {} : { x: 0, opacity: 1 }}
                    transition={{ duration: 0.6, ease: EASE, delay: 0.2 }}
                  >
                    Nature Makes Us Happy
                  </motion.h1>

                  <motion.p
                    className="mt-5 inline-block max-w-[720px] bg-black/80 text-white px-6 py-3 rounded-lg text-base md:text-xl font-medium tracking-wide shadow-[0_8px_30px_rgba(0,0,0,0.55)]"
                    initial={prefersReducedMotion ? false : { y: 20, opacity: 0 }}
                    animate={prefersReducedMotion ? {} : { y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, ease: EASE, delay: 0.4 }}
                  >
                    Immersive nature intelligence for curious minds.
                  </motion.p>

                  <motion.div
                    className="mt-8"
                    initial={prefersReducedMotion ? false : { y: 30, opacity: 0 }}
                    animate={prefersReducedMotion ? {} : { y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, ease: EASE, delay: 0.9 }}
                  >
                    <button onClick={startExperience} className="cta-outline-white cta-outline-white--lg hover-lift">
                      Start Experience
                    </button>
                  </motion.div>
                </div>
              )}

              {/* Experience State */}
              {started && (
                <div className="animate-hero-in parallax-item mt-16 md:mt-24" data-speed="1">
                  <div className="max-w-3xl mx-auto text-center">
                    <motion.h2
                      className="text-white font-extrabold leading-tight"
                      style={{ fontSize: 'clamp(1.6rem, 4.5vw, 3rem)', letterSpacing: '-0.01em', textShadow: '0 10px 20px rgba(0,0,0,0.45)' }}
                      initial={prefersReducedMotion ? false : { x: -50, opacity: 0 }}
                      animate={prefersReducedMotion ? {} : { x: 0, opacity: 1 }}
                      transition={{ duration: 0.6, ease: EASE, delay: 0.2 }}
                    >
                      What do you want to explore?
                    </motion.h2>
                    <motion.p
                      className="mt-3 text-white/90 text-base md:text-lg"
                      initial={prefersReducedMotion ? false : { y: 20, opacity: 0 }}
                      animate={prefersReducedMotion ? {} : { y: 0, opacity: 1 }}
                      transition={{ duration: 0.6, ease: EASE, delay: 0.4 }}
                    >
                      Explore forests, ecosystems, wildlife, and the rhythms of nature — our AI will guide you.
                    </motion.p>
                    <motion.div
                      className="mt-6"
                      initial={prefersReducedMotion ? false : { scale: 0.95, opacity: 0 }}
                      animate={prefersReducedMotion ? {} : { scale: 1, opacity: 1 }}
                      transition={{ duration: 0.5, ease: EASE, delay: 0.8 }}
                    >
                      <SearchBar onSearch={handleSearch} className="search-input" buttonClassName="search-button" />
                    </motion.div>

                    {/* Nature topic cards under search */}
                    <NatureTopicCards />
                  </div>

                  {/* Cards shown only after start */}
                  <div className="mt-12 reveal-on-scroll reveal-up" data-duration="600ms" data-delay="120ms">
                    <FeatureCarousel />
                  </div>
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

      {/* No cards on initial landing; cards appear after Start Experience */}

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
