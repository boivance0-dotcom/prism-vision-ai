
import React, { useRef, useState } from 'react';
import SearchBar from '@/components/SearchBar';
import AIModesSlider from '@/components/AIModesSlider';
// import forestHeroBg from '@/assets/forest-hero-bg.jpg';
import { useParallax } from '@/lib/hooks/useParallax';
import { useReveal } from '@/lib/hooks/useReveal';
import HeroShowcase from '@/components/HeroShowcase';
import AnimatedGradient from '@/components/AnimatedGradient';
import FeatureCarousel from '@/components/FeatureCarousel';
import Testimonials from '@/components/Testimonials';
import { motion, useReducedMotion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import ForestHealthMap from '@/components/ForestHealthMap';
import TrendChart from '@/components/TrendChart';
import ThreatAnalysis from '@/components/ThreatAnalysis';
import BeforeAfterSlider from '@/components/BeforeAfterSlider';
import AboutSection from '@/components/AboutSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import SatelliteGallery from '@/components/SatelliteGallery';
import Earth3D from '@/components/Earth3D';
import EarthCSS from '@/components/EarthCSS';
import EarthSimple from '@/components/EarthSimple';
import EarthFallback from '@/components/EarthFallback';



const Index = () => {
  const [started, setStarted] = useState(false);
  const experienceRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  useParallax('.parallax-item');
  useReveal('.reveal-on-scroll');

  const prefersReducedMotion = useReducedMotion();
  const EASE: any = [0.2, 0.9, 0.3, 1];

  const handleSearch = (query: string) => {
    if (!query) return;
    navigate(`/results?q=${encodeURIComponent(query)}`);
  };

  const startExperience = () => setStarted(true);

  const before = 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?q=80&w=1600&auto=format&fit=crop';
  const after = 'https://images.unsplash.com/photo-1482192505345-5655af888cc4?q=80&w=1600&auto=format&fit=crop';

  return (
    <div className="relative min-h-screen">

      {/* Hero Section with Earth and Space Background */}
      <div className="relative min-h-screen overflow-hidden">
        {/* Earth and Space Background */}
        <div className="fixed inset-0 z-0" style={{
          background: 'radial-gradient(ellipse at center, #0a0a2e 0%, #1a1a3a 25%, #2d1b69 50%, #1a1a3a 75%, #0a0a2e 100%)'
        }}>
          {/* Large Earth in Background */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-[800px] h-[800px] rounded-full relative overflow-hidden opacity-20 earth-spin" style={{
              background: 'linear-gradient(45deg, #4a90e2 0%, #357abd 25%, #2c5aa0 50%, #1e3a8a 75%, #1e40af 100%)',
              boxShadow: 'inset 0 0 100px rgba(0,0,0,0.5), 0 0 100px rgba(74, 144, 226, 0.2)',
              animationDuration: '60s'
            }}>
              {/* Continents */}
              <div className="absolute inset-0">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <path d="M20 30 Q25 25 30 30 Q35 35 30 40 Q25 45 20 40 Q15 35 20 30" fill="#8FBC8F" opacity="0.8" />
                  <path d="M25 45 Q30 50 35 55 Q30 60 25 65 Q20 60 25 55 Q20 50 25 45" fill="#8FBC8F" opacity="0.8" />
                  <path d="M45 25 Q50 20 55 25 Q50 30 45 25" fill="#8FBC8F" opacity="0.8" />
                  <path d="M45 35 Q50 40 55 45 Q50 50 45 55 Q40 50 45 45 Q40 40 45 35" fill="#8FBC8F" opacity="0.8" />
                  <path d="M55 25 Q70 20 75 30 Q70 40 65 35 Q60 30 55 25" fill="#8FBC8F" opacity="0.8" />
                  <path d="M70 60 Q75 65 80 60 Q75 55 70 60" fill="#8FBC8F" opacity="0.8" />
                </svg>
              </div>
              {/* Cloud Layer */}
              <div className="absolute inset-0 rounded-full" style={{
                background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.05) 50%, transparent 100%)',
              }} />
              {/* Atmosphere Glow */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400/10 via-transparent to-blue-400/10" />
            </div>
            {/* Orbital Ring */}
            <div className="absolute inset-0 rounded-full border border-white/10 earth-ring" style={{ 
              margin: '-20px',
              animationDuration: '90s'
            }} />
          </div>
          
          {/* Stars */}
          <div className="absolute inset-0">
            {[...Array(200)].map((_, i) => (
              <div
                key={`star-${i}`}
                className="absolute w-0.5 h-0.5 bg-white rounded-full animate-pulse"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  opacity: 0.3 + Math.random() * 0.7,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${2 + Math.random() * 4}s`
                }}
              />
            ))}
          </div>
          
          {/* Nebula Effects */}
          <div className="absolute inset-0">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-10" style={{
              background: 'radial-gradient(circle, rgba(138, 43, 226, 0.3) 0%, transparent 70%)',
              filter: 'blur(40px)'
            }} />
            <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full opacity-10" style={{
              background: 'radial-gradient(circle, rgba(74, 144, 226, 0.3) 0%, transparent 70%)',
              filter: 'blur(30px)'
            }} />
          </div>
        </div>

        {/* Accent glow decorations */}
        <div className="pointer-events-none absolute -top-24 -left-24 w-[520px] h-[520px] rounded-full opacity-[0.1] blur-3xl" style={{ background: 'var(--accent,#86C232)' }} />
        <div className="pointer-events-none absolute -bottom-24 -right-24 w-[560px] h-[560px] rounded-full opacity-[0.08] blur-3xl" style={{ background: 'var(--accent,#86C232)' }} />
        {/* Localized readability scrim behind hero content */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(800px_420px_at_50%_30%,rgba(0,0,0,0.25),transparent_70%)]" />

        <div className="relative z-20 container mx-auto px-6 py-16 min-h-screen flex flex-col page-enter">
          <div className="flex-1 grid place-items-center">
            {/* Stack the two states and animate between them */}
            <div className="relative w-full max-w-7xl mx-auto">
              {/* Initial State */}
              {!started && (
                <div className="text-center animate-scale-fade-in parallax-item" data-speed="1">

                  <motion.h1
                    className="font-extrabold leading-tight text-transparent bg-clip-text bg-gradient-to-b from-white via-white/95 to-white/80 drop-shadow-[0_20px_80px_rgba(0,0,0,0.6)]"
                    style={{ fontSize: 'clamp(2rem, 6vw, 4rem)', letterSpacing: '-0.02em', textShadow: '0 8px 32px rgba(0,0,0,0.75)' }}
                    initial={prefersReducedMotion ? false : { x: -50, opacity: 0 }}
                    animate={prefersReducedMotion ? {} : { x: 0, opacity: 1 }}
                    transition={{ duration: 0.6, ease: EASE, delay: 0.2 }}
                  >
                    Earth Intelligence, Beautifully Rendered ✨
                  </motion.h1>

                  <motion.div
                    className="mt-5 mx-auto max-w-[820px]"
                    initial={prefersReducedMotion ? false : { y: 20, opacity: 0 }}
                    animate={prefersReducedMotion ? {} : { y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, ease: EASE, delay: 0.4 }}
                  >
                    <p className="text-white/95 text-base md:text-xl font-medium tracking-wide bg-black/55 backdrop-blur-sm border border-white/15 rounded-lg px-5 py-4 shadow-[0_8px_30px_rgba(0,0,0,0.55)]">
                      Explore our planet, monitor climate signals, and discover Earth's ecosystems with a sleek, space-themed dashboard. Built for clarity. Designed to inspire.
                    </p>
                  </motion.div>

                  <motion.div
                    className="mt-8 flex items-center justify-center"
                    initial={prefersReducedMotion ? false : { y: 30, opacity: 0 }}
                    animate={prefersReducedMotion ? {} : { y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, ease: EASE, delay: 0.9 }}
                  >
                    <div className="inline-flex items-center gap-3 md:gap-4 rounded-xl bg-black/65 border border-white/15 backdrop-blur-sm px-4 py-3">
                      <button
                        onClick={startExperience}
                        aria-label="Start Experience"
                        className="px-6 md:px-7 py-3.5 md:py-4 rounded-xl bg-[var(--accent,#86C232)] text-white font-extrabold tracking-wide text-[15px] md:text-[16px] shadow-[0_16px_40px_rgba(134,194,50,0.65)] ring-1 ring-white/40 hover:brightness-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 transition"
                        style={{ textShadow: '0 1px 0 rgba(0,0,0,0.65), 0 0 10px rgba(0,0,0,0.35)' }}
                      >
                        Start Experience
                      </button>
                      <Link to="/ai/forest" className="px-5 md:px-6 py-3 rounded-lg border border-white/30 text-white/95 hover:bg-white/10 transition">Explore Earth AI</Link>
                    </div>
                  </motion.div>

                  {/* Quick benefits strip */}
                  <motion.div
                    className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-4xl mx-auto"
                    initial={prefersReducedMotion ? false : { y: 20, opacity: 0 }}
                    animate={prefersReducedMotion ? {} : { y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, ease: EASE, delay: 1.1 }}
                  >
                    <div className="rounded-xl bg-black/55 border border-white/20 px-4 py-3 text-white/90 text-sm">4K themed backgrounds</div>
                    <div className="rounded-xl bg-black/55 border border-white/20 px-4 py-3 text-white/90 text-sm">Interactive maps & media</div>
                    <div className="rounded-xl bg-black/55 border border-white/20 px-4 py-3 text-white/90 text-sm">Per‑AI color & layout harmony</div>
                  </motion.div>

                  {/* Search upfront for public */}
                  <motion.div
                    className="mt-8 max-w-xl mx-auto"
                    initial={prefersReducedMotion ? false : { scale: 0.98, opacity: 0 }}
                    animate={prefersReducedMotion ? {} : { scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, ease: EASE, delay: 1.0 }}
                  >
                    <SearchBar onSearch={handleSearch} className="search-input" buttonClassName="search-button" />
                  </motion.div>
                </div>
              )}

              {/* Experience State */}
              {started && (
                <div className="animate-hero-in parallax-item mt-16 md:mt-24" data-speed="1">

                  <div className="max-w-3xl mx-auto text-center">
                    <motion.div
                      className="inline-block text-left rounded-lg bg-black/55 border border-white/15 backdrop-blur-sm px-5 py-4"
                      initial={prefersReducedMotion ? false : { x: -50, opacity: 0 }}
                      animate={prefersReducedMotion ? {} : { x: 0, opacity: 1 }}
                      transition={{ duration: 0.6, ease: EASE, delay: 0.2 }}
                    >
                      <h2
                        className="font-extrabold leading-tight text-transparent bg-clip-text bg-gradient-to-b from-white via-white/95 to-white/80"
                        style={{ fontSize: 'clamp(1.8rem, 5vw, 3.2rem)', letterSpacing: '-0.02em', textShadow: '0 8px 28px rgba(0,0,0,0.6)' }}
                      >
                        What do you want to explore?
                      </h2>
                      <p className="mt-2 text-white/95 text-base md:text-lg">
                        Explore our planet, monitor climate signals, and discover Earth's ecosystems — our AI will guide you.
                      </p>
                    </motion.div>
                    <motion.div
                      className="mt-6"
                      initial={prefersReducedMotion ? false : { scale: 0.95, opacity: 0 }}
                      animate={prefersReducedMotion ? {} : { scale: 1, opacity: 1 }}
                      transition={{ duration: 0.5, ease: EASE, delay: 0.8 }}
                    >
                      <SearchBar onSearch={handleSearch} className="search-input" buttonClassName="search-button" />
                    </motion.div>


                  </div>

                  {/* Cards shown only after start */}
                  <div key="feature-cards" className="mt-12 reveal-on-scroll reveal-up" data-duration="600ms" data-delay="120ms">
                    <FeatureCarousel />
                  </div>

                  {/* Forest AI Dashboard below slider (compact) */}
                  <div className="mt-6">
                    <div className="grid gap-6 lg:grid-cols-3">
                      <div className="lg:col-span-2 grid gap-6">
                        <ForestHealthMap />
                        <TrendChart />
                      </div>
                      <div className="lg:col-span-1">
                        <ThreatAnalysis />
                      </div>
                    </div>
                    <div className="mt-6">
                      <SatelliteGallery images={[
                        { url: before, caption: 'Morning pass', time: '09:10' },
                        { url: after, caption: 'Afternoon pass', time: '14:25' },
                        { url: forestHeroBgUrl, caption: 'Wide area capture' },
                      ]} />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* About us */}
          <AboutSection />

          {/* Contact us */}
          <ContactSection />

          {/* Bottom brand marker */}
          <div className="pb-6 text-left">
            <span className="inline-block text-white/80 text-xs tracking-widest uppercase px-2 py-1 bg-black/20 rounded-md backdrop-blur">
              Zytherion Biovance
            </span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
