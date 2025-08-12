import React, { useMemo } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Keyboard, Autoplay, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { motion, AnimatePresence } from 'framer-motion';
import { Bird, Globe, Droplets, Trees, Microscope, Briefcase, GraduationCap } from 'lucide-react';

interface ShowcaseSlide {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ReactNode;
  background: string; // image url
}

const slides: ShowcaseSlide[] = [
  {
    id: 'wildlife',
    title: 'Wildlife AI',
    subtitle: 'Species tracking & biodiversity insights',
    description: 'Track endangered species, monitor habitats, and inform conservation strategies with AI-driven analytics.',
    icon: <Bird className="h-8 w-8" />,
    background: '/placeholder.svg',
  },
  {
    id: 'climate',
    title: 'Climate AI',
    subtitle: 'Predictive climate and energy analytics',
    description: 'Model climate trends and optimize renewable energy decisions with interpretable projections.',
    icon: <Globe className="h-8 w-8" />,
    background: '/placeholder.svg',
  },
  {
    id: 'marine',
    title: 'Marine AI',
    subtitle: 'Ocean health monitoring',
    description: 'Protect oceans and marine ecosystems through real-time analysis and forecasting tools.',
    icon: <Droplets className="h-8 w-8" />,
    background: '/placeholder.svg',
  },
  {
    id: 'forest',
    title: 'Forest AI',
    subtitle: 'Ecosystem health and deforestation alerts',
    description: 'Assess forest health, biodiversity, and deforestation risk with satellite and in-situ data.',
    icon: <Trees className="h-8 w-8" />,
    background: '/placeholder.svg',
  },
  {
    id: 'research',
    title: 'Research AI',
    subtitle: 'Knowledge discovery & synthesis',
    description: 'Accelerate environmental research with data-driven literature mining and synthesis.',
    icon: <Microscope className="h-8 w-8" />,
    background: '/placeholder.svg',
  },
  {
    id: 'career',
    title: 'Career AI',
    subtitle: 'Personalized guidance in sustainability',
    description: 'Navigate green careers with tailored insights, skill mapping, and role recommendations.',
    icon: <Briefcase className="h-8 w-8" />,
    background: '/placeholder.svg',
  },
  {
    id: 'education',
    title: 'Education AI',
    subtitle: 'Adaptive learning experiences',
    description: 'Support environmental education with adaptive learning paths and interactive content.',
    icon: <GraduationCap className="h-8 w-8" />,
    background: '/placeholder.svg',
  },
];

const bgVariants = {
  initial: { opacity: 0, scale: 1.05 },
  enter: { opacity: 1, scale: 1, transition: { duration: 0.75, ease: [0.2, 0.9, 0.3, 1] } },
  exit: { opacity: 0, scale: 1.03, transition: { duration: 0.6, ease: 'easeOut' } },
};

const textStagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const textItem = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.2, 0.9, 0.3, 1] } },
};

const HeroShowcase: React.FC = () => {
  const pagination = useMemo(() => ({ clickable: true, bulletClass: 'swiper-bullet', bulletActiveClass: 'swiper-bullet-active' }), []);

  return (
    <section className="relative w-full h-[100vh] md:h-screen">
      {/* Backgrounds */}
      <div className="absolute inset-0 overflow-hidden">
        <AnimatePresence mode="wait">
          {slides.map((s) => (
            <motion.div key={s.id}
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${s.background})` }}
              variants={bgVariants}
              initial="initial"
              animate="enter"
              exit="exit"
            />
          ))}
        </AnimatePresence>
        {/* Global overlay for contrast */}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.28)_0%,rgba(0,0,0,0.44)_70%)]" />
      </div>

      {/* Foreground slider */}
      <Swiper
        modules={[Navigation, Pagination, Keyboard, Autoplay, A11y]}
        slidesPerView={1}
        loop
        speed={600}
        autoplay={{ delay: 5200, disableOnInteraction: false, pauseOnMouseEnter: true }}
        keyboard={{ enabled: true, onlyInViewport: true }}
        navigation
        pagination={pagination}
        className="relative z-10 h-full"
      >
        {slides.map((s, index) => (
          <SwiperSlide key={s.id} className="h-full">
            <div className="h-full max-w-7xl mx-auto flex items-center px-[10vw]">
              <motion.div
                className="max-w-3xl text-left md:text-left mx-auto md:mx-0"
                variants={textStagger}
                initial="hidden"
                animate="show"
              >
                <motion.div variants={textItem} className="inline-flex items-center gap-3 px-3 py-2 rounded-full bg-white/10 border border-white/20 text-white/90 backdrop-blur hover-lift">
                  {s.icon}
                  <span className="text-xs tracking-widest uppercase">AI Studio</span>
                </motion.div>
                <motion.h2 variants={textItem} className="mt-6 font-display font-extrabold text-white leading-tight"
                  style={{ fontSize: 'clamp(2rem, 6.5vw, 5.2rem)', letterSpacing: '-0.02em', textShadow: '0 12px 24px rgba(0,0,0,0.55)' }}>
                  <span className="bg-gradient-to-r from-[#6EC1E4] via-[#7A5AF8] to-[#B46AF0] bg-clip-text text-transparent">{s.title}</span>
                </motion.h2>
                <motion.p variants={textItem} className="mt-3 text-white/90 text-lg md:text-xl max-w-[60ch]">
                  {s.subtitle}
                </motion.p>
                <motion.p variants={textItem} className="mt-3 text-white/80 max-w-[60%] md:max-w-[48ch]">
                  {s.description}
                </motion.p>
                <motion.div variants={textItem} className="mt-8">
                  <a href="#" className="inline-flex items-center rounded-full border border-white px-6 py-3 text-white font-semibold transition transform hover:scale-105 hover:bg-white hover:text-slate-800 focus:outline-none focus:ring-4 focus:ring-white/30" aria-label="Open Studio">
                    Open Studio
                  </a>
                </motion.div>
              </motion.div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Dots styling */}
      <style>{`
        .swiper-bullet { width: 8px; height: 8px; border-radius: 9999px; background: rgba(255,255,255,0.4); margin: 0 6px; transition: all .3s ease; }
        .swiper-bullet-active { width: 22px; background: linear-gradient(90deg, #86C232, #b4ff6b); box-shadow: 0 0 0 2px rgba(134,194,50,0.35); }
      `}</style>
    </section>
  );
};

export default HeroShowcase;