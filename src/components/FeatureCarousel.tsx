import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Keyboard, Autoplay, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Button } from '@/components/ui/button';

const features = [
  {
    title: 'Wildlife AI',
    desc: 'Track biodiversity and animal habitats.',
    img: '/images/ai-explore-1920.webp'
  },
  {
    title: 'Climate AI',
    desc: 'Climate trends and renewable energy insights.',
    img: 'https://raw.githubusercontent.com/varunsingh3545/search-engine/main/climate.jpg'
  },
  {
    title: 'Marine AI',
    desc: 'Protect oceans and marine ecosystems.',
    img: 'https://raw.githubusercontent.com/varunsingh3545/search-engine/main/marine.jpg'
  },
  {
    title: 'Forest AI',
    desc: 'Monitor deforestation and forest health.',
    img: '/images/ai-forest-1920.webp'
  },
  {
    title: 'Research AI',
    desc: 'Discover papers, datasets, and findings.',
    img: ''
  },
  {
    title: 'Career AI',
    desc: 'Explore roles, skills, and opportunities.',
    img: ''
  },
  {
    title: 'Education AI',
    desc: 'Learn with curated courses and tutorials.',
    img: ''
  },
];

const FeatureCarousel: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const handleChangeAI = () => {
    const activeFeature = features[activeIndex];
    console.log('Change AI clicked for:', activeFeature?.title);
    setIsExpanded(true);
  };

  const closeExpanded = () => setIsExpanded(false);

  const getSignedCircularDelta = (index: number, active: number, total: number) => {
    let diff = index - active;
    const abs = Math.abs(diff);
    if (abs > total / 2) diff = -Math.sign(diff) * (total - abs);
    return diff;
  };

  // Make active smaller and neighbors progressively smaller
  const getScale = (distance: number) => {
    const d = Math.abs(distance);
    if (d === 0) return 0.92;
    if (d === 1) return 0.84;
    if (d === 2) return 0.76;
    return 0.7;
  };

  const getOpacity = (distance: number) => {
    const d = Math.abs(distance);
    if (d === 0) return 1;
    if (d === 1) return 0.75;
    if (d === 2) return 0.55;
    return 0.4;
  };

  const getRotateY = (distance: number) => {
    const sign = distance < 0 ? -1 : distance > 0 ? 1 : 0;
    const d = Math.abs(distance);
    if (d === 0) return 0;
    if (d === 1) return 8 * sign;
    if (d === 2) return 12 * sign;
    return 16 * sign;
  };

  const getXOffset = (distance: number) => {
    const sign = distance < 0 ? -1 : distance > 0 ? 1 : 0;
    const d = Math.abs(distance);
    if (d === 0) return 0;
    if (d === 1) return 6 * sign;
    if (d === 2) return 10 * sign;
    return 12 * sign;
  };

  const getYOffset = (distance: number) => {
    const d = Math.abs(distance);
    if (d === 0) return -4;
    if (d === 1) return -2;
    if (d === 2) return 0;
    return 2;
  };

  const getZIndex = (distance: number) => 50 - Math.min(Math.abs(distance), 4);

  return (
    <section className="relative w-full py-20">
      {/* Blur/dim overlay behind the slider when expanded */}
      <div
        onClick={closeExpanded}
        className={`${isExpanded ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'} absolute inset-0 bg-black/35 backdrop-blur-sm transition-opacity duration-300`}
        aria-hidden
      />

      <div className="max-w-6xl mx-auto px-6 relative">
        <h3 className="text-white/95 text-xl font-semibold mb-4">Explore other AI's</h3>

        <motion.div
          className="relative z-10"
          style={{ perspective: '1200px' }}
          animate={{ scale: isExpanded ? 1.04 : 1 }}
          transition={{ duration: 0.25, ease: [0.2, 0.9, 0.3, 1] }}
        >
          <Swiper
            modules={[Navigation, Pagination, Keyboard, Autoplay, A11y]}
            slidesPerView={1.3}
            centeredSlides
            spaceBetween={isExpanded ? 20 : 14}
            loop
            speed={600}
            keyboard={{ enabled: true, onlyInViewport: true }}
            autoplay={{ delay: 4500, disableOnInteraction: false, pauseOnMouseEnter: true }}
            pagination={{ clickable: true }}
            navigation
            autoHeight
            onSwiper={(swiper) => setActiveIndex((swiper as any).realIndex ?? 0)}
            onSlideChange={(swiper) => setActiveIndex((swiper as any).realIndex ?? 0)}
            breakpoints={{
              320: { slidesPerView: 1.18, spaceBetween: isExpanded ? 16 : 12 },
              640: { slidesPerView: 1.28, spaceBetween: isExpanded ? 18 : 14 },
              1024: { slidesPerView: 1.45, spaceBetween: isExpanded ? 20 : 16 }
            }}
            className="relative transition-all duration-300 overflow-visible"
          >
            {features.map((f, i) => {
              const delta = getSignedCircularDelta(i, activeIndex, features.length);
              const isActive = delta === 0;
              const scale = getScale(delta);
              const opacity = getOpacity(delta);
              const rotateY = getRotateY(delta);
              const zIndex = getZIndex(delta);
              const x = getXOffset(delta);
              const y = getYOffset(delta);

              return (
                <SwiperSlide key={f.title}>
                  <motion.article
                    className={`relative rounded-xl overflow-hidden bg-[rgba(7,16,12,0.65)] border border-white/15 shadow-[0_20px_60px_rgba(0,0,0,0.45)] backdrop-blur-md hover:border-[#86C232]/40`}
                    style={{ opacity, zIndex }}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    animate={{ scale, rotateY, x, y }}
                    transition={{ duration: 0.45, ease: [0.2, 0.9, 0.3, 1] }}
                  >
                    {f.img ? (
                      <div className={`aspect-[16/10] w-full bg-cover bg-center`} style={{ backgroundImage: `url(${f.img})` }} />
                    ) : (
                      <div className={`aspect-[16/10] w-full bg-gradient-to-br from-[#0B3D2E] via-[#0E4A2D] to-[#1A5630]`} />
                    )}
                    <div className="p-5">
                      <h3 className={`text-white text-lg font-semibold`}>{f.title}</h3>
                      <p className="text-white/70 text-sm mt-2">{f.desc}</p>
                    </div>

                    {isActive && (
                      <div className="pointer-events-none absolute -bottom-5 left-1/2 -translate-x-1/2 w-[55%] h-6 rounded-full blur-md" style={{ background: 'radial-gradient(ellipse at center, rgba(134,194,50,0.35), rgba(134,194,50,0))' }} />
                    )}
                  </motion.article>

                  {isActive && (
                    <div className="mt-3 flex justify-center">
                      <Button size="sm" className="bg-[#86C232] hover:bg-[#76b028] text-black font-semibold" onClick={handleChangeAI}>
                        Change AI
                      </Button>
                    </div>
                  )}
                </SwiperSlide>
              );
            })}
          </Swiper>
        </motion.div>
      </div>
    </section>
  );
};

export default FeatureCarousel;