
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
import PlanetHero from '@/components/PlanetHero';


const Index = () => {
  const [started, setStarted] = useState(false);
  const [planetSequenceDone, setPlanetSequenceDone] = useState(false);
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

  const forestHeroBgUrl = 'https://raw.githubusercontent.com/varunsingh3545/search-engine/refs/heads/main/forest.jpg';

  const before = 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?q=80&w=1600&auto=format&fit=crop';
  const after = 'https://images.unsplash.com/photo-1482192505345-5655af888cc4?q=80&w=1600&auto=format&fit=crop';

  return (
    <div className="relative z-10 min-h-screen">

      {/* New 3D Planet Hero Section */}
      <PlanetHero
        line1Text="Every ecosystem tells a story — we just have to listen."
        brandText="BioVance"
        autoRedirect={false}
        redirectTo="/ai/forest"
        redirectDelayMs={3000}
        onAfterSequence={() => setPlanetSequenceDone(true)}
      />

      {/* Reveal Section: Earth Intelligence */}
      <div className="container mx-auto px-6">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={planetSequenceDone ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: EASE }}
          className="mt-12 md:mt-16"
        >
          <div className="max-w-4xl">
            <h2 className="text-3xl md:text-5xl font-extrabold text-white">Earth Intelligence</h2>
            <p className="mt-2 text-xl md:text-3xl font-extrabold text-white/95">Beautifully Rendered</p>
            <h3 className="mt-8 text-2xl md:text-3xl font-extrabold text-white">Our Vision</h3>
            <p className="mt-3 text-white/90 text-base md:text-lg leading-relaxed">
              We believe in harnessing the power of Earth observation to create intelligent systems that understand our planet's complex ecosystems. Through advanced AI and real-time data analysis, we transform satellite imagery into actionable insights that drive environmental conservation and sustainable development.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="rounded-xl bg-black/50 border border-white/10 p-5">
              <div className="text-3xl font-extrabold text-white">24/7</div>
              <div className="text-white/80">Global Monitoring</div>
            </div>
            <div className="rounded-xl bg-black/50 border border-white/10 p-5">
              <div className="text-3xl font-extrabold text-white">AI-Powered</div>
              <div className="text-white/80">Intelligent Analysis</div>
            </div>
            <div className="rounded-xl bg-black/50 border border-white/10 p-5">
              <div className="text-3xl font-extrabold text-white">Real-Time</div>
              <div className="text-white/80">Data Processing</div>
            </div>
          </div>

          <div className="mt-8">
            <Link to="/ai/forest" className="inline-block px-6 py-3 rounded-lg bg-[var(--accent,#86C232)] text-black font-bold hover:brightness-110 transition">
              Explore Our Technology
            </Link>
          </div>
        </motion.section>
      </div>

      {/* Rest of page content */}
      <div className="relative container mx-auto px-6 py-16 min-h-screen flex flex-col page-enter">
        <div className="flex-1 grid place-items-center">
          {/* Stack the two states and animate between them */}
          <div className="relative w-full max-w-5xl mx-auto">
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
                  Nature Intelligence, Beautifully Rendered
                </motion.h1>

                <motion.div
                  className="mt-5 mx-auto max-w-[820px]"
                  initial={prefersReducedMotion ? false : { y: 20, opacity: 0 }}
                  animate={prefersReducedMotion ? {} : { y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, ease: EASE, delay: 0.4 }}
                >
                  <p className="text-white/95 text-base md:text-xl font-medium tracking-wide bg-black/55 backdrop-blur-sm border border-white/15 rounded-lg px-5 py-4 shadow-[0_8px_30px_rgba(0,0,0,0.55)]">
                    Explore forests, ecosystems, wildlife and climate signals with a sleek, theme-aware dashboard. Built for clarity. Designed to inspire.
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
                    <Link to="/ai/forest" className="px-5 md:px-6 py-3 rounded-lg border border-white/30 text-white/95 hover:bg-white/10 transition">Explore Forest AI</Link>
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
                      Explore forests, ecosystems, wildlife, and the rhythms of nature — our AI will guide you.
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

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
