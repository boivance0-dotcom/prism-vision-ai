import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

const features = [
  { title: 'Wildlife AI', desc: 'Track biodiversity and animal habitats.', img: '/images/ai-explore-1920.webp' },
  { title: 'Climate AI', desc: 'Climate trends and renewable energy insights.', img: 'https://raw.githubusercontent.com/varunsingh3545/search-engine/main/climate.jpg' },
  { title: 'Marine AI', desc: 'Protect oceans and marine ecosystems.', img: 'https://raw.githubusercontent.com/varunsingh3545/search-engine/main/marine.jpg' },
  { title: 'Forest AI', desc: 'Monitor deforestation and forest health.', img: '/images/ai-forest-1920.webp' },
  { title: 'Research AI', desc: 'Discover papers, datasets, and findings.', img: '' },
  { title: 'Career AI', desc: 'Explore roles, skills, and opportunities.', img: '' },
  { title: 'Education AI', desc: 'Learn with curated courses and tutorials.', img: '' },
];

const EASE: any = [0.2, 0.9, 0.3, 1];

const FeatureCarousel: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const itemCount = features.length;
  const stepAngle = 360 / itemCount;

  const { radius, cardWidth, cardHeight } = useMemo(() => {
    const isSmall = typeof window !== 'undefined' ? window.innerWidth < 640 : false;
    const isMedium = typeof window !== 'undefined' ? window.innerWidth >= 640 && window.innerWidth < 1024 : false;
    const baseWidth = isSmall ? 220 : isMedium ? 260 : 300;
    const baseHeight = Math.round(baseWidth * 0.625);
    const r = isSmall ? 220 : isMedium ? 280 : 320;
    return { radius: r, cardWidth: baseWidth, cardHeight: baseHeight };
  }, []);

  const rotateYDeg = -(activeIndex * stepAngle);

  const next = () => setActiveIndex((i) => (i + 1) % itemCount);
  const prev = () => setActiveIndex((i) => (i - 1 + itemCount) % itemCount);

  const handleChangeAI = () => {
    const active = features[activeIndex];
    console.log('Change AI for:', active?.title);
  };

  return (
    <section className="relative w-full py-20">
      <div className="max-w-6xl mx-auto px-6">
        <h3 className="text-white/95 text-xl font-semibold mb-6 text-center">Explore other AI's</h3>

        <div className="relative" style={{ perspective: 2000 }}>
          <motion.div className="relative mx-auto" style={{ width: '100%', height: cardHeight + 220 }}>
            <div className="pointer-events-none absolute inset-0 flex items-center justify-between">
              <div className="pointer-events-auto pl-1 sm:pl-3">
                <button
                  aria-label="Previous"
                  onClick={prev}
                  className="h-10 w-10 grid place-items-center rounded-full bg-black/50 text-white hover:bg-black/70 border border-white/20 transition"
                >
                  ‹
                </button>
              </div>
              <div className="pointer-events-auto pr-1 sm:pr-3">
                <button
                  aria-label="Next"
                  onClick={next}
                  className="h-10 w-10 grid place-items-center rounded-full bg-black/50 text-white hover:bg-black/70 border border-white/20 transition"
                >
                  ›
                </button>
              </div>
            </div>

            <motion.div
              className="absolute left-1/2 top-12 -translate-x-1/2 will-change-transform z-50"
              style={{ transformStyle: 'preserve-3d' as any }}
              animate={{ rotateY: rotateYDeg }}
              transition={{ duration: 0.6, ease: EASE }}
            >
              {features.map((f, index) => {
                const angle = index * stepAngle;
                const norm = Math.min(
                  Math.abs(((angle + rotateYDeg) % 360 + 360) % 360),
                  Math.abs((((angle + rotateYDeg) % 360 + 360) % 360) - 360)
                );
                const depthT = 1 - Math.min(norm / 180, 1);
                const scale = 0.85 + depthT * 0.25;
                const opacity = 0.35 + depthT * 0.65;
                const isActive = index === activeIndex;
                const zIndex = 10 + Math.round(depthT * 100);

                return (
                  <div
                    key={f.title}
                    className="absolute left-1/2 top-0"
                    style={{
                      width: cardWidth,
                      height: cardHeight,
                      transformStyle: 'preserve-3d',
                      transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
                      marginLeft: -cardWidth / 2,
                      zIndex,
                    }}
                  >
                    <motion.article
                      className="relative rounded-xl overflow-hidden border border-white/15 bg-gradient-to-br from-[#0B3D2E] via-[#0E4A2D] to-[#1A5630] shadow-[0_20px_60px_rgba(0,0,0,0.45)] backdrop-blur-md"
                      style={{ opacity, backfaceVisibility: 'hidden' as any }}
                      animate={{ scale }}
                      transition={{ duration: 0.45, ease: EASE }}
                    >
                      <img
                        src={f.img || '/placeholder.svg'}
                        onError={(e) => {
                          // @ts-ignore
                          e.currentTarget.src = '/placeholder.svg';
                        }}
                        alt={f.title}
                        className="w-full h-full object-cover"
                      />

                      {isActive && (
                        <div className="pointer-events-none absolute inset-0 ring-2 ring-[#86C232]/70 rounded-xl" />
                      )}
                    </motion.article>
                  </div>
                );
              })}
            </motion.div>
          </motion.div>
        </div>

        <div className="mt-6 text-center">
          <h4 className="text-white text-lg font-semibold">{features[activeIndex].title}</h4>
          <p className="text-white/70 text-sm mt-1">{features[activeIndex].desc}</p>
          <div className="mt-3 flex justify-center">
            <Button size="sm" className="bg-[#86C232] hover:bg-[#76b028] text-black font-semibold" onClick={handleChangeAI}>
              Change AI
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureCarousel;