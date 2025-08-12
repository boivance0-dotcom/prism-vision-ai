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
          animate={{ scale: isExpanded ? 1.08 : 1 }}
          transition={{ duration: 0.25, ease: [0.2, 0.9, 0.3, 1] }}
        >
          <Swiper
            modules={[Navigation, Pagination, Keyboard, Autoplay, A11y]}
            slidesPerView={'auto'}
            centeredSlides
            spaceBetween={isExpanded ? 20 : 16}
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
              320: { slidesPerView: 1.05, spaceBetween: isExpanded ? 16 : 12 },
              640: { slidesPerView: 2.1, spaceBetween: isExpanded ? 18 : 14 },
              1024: { slidesPerView: 3.2, spaceBetween: isExpanded ? 20 : 16 }
            }}
            className="relative transition-all duration-300 overflow-visible"
          >
            {features.map((f, i) => {
              const isActive = i === activeIndex;
              const slideWidth = isExpanded ? '!w-[340px] sm:!w-[420px]' : '!w-[280px] sm:!w-[340px]';
              return (
                <SwiperSlide key={f.title} className={`${slideWidth} transition-[width] duration-300`}>
                  <motion.article
                    className={`rounded-xl overflow-hidden bg-[rgba(7,16,12,0.65)] border border-white/15 shadow-[0_20px_60px_rgba(0,0,0,0.45)] backdrop-blur-md tilt-hover hover:border-[#86C232]/40 transition-transform transition-opacity duration-300 ${isActive ? 'opacity-100 border-[#86C232]/60 shadow-[0_12px_50px_rgba(134,194,50,0.25)] scale-[1.02]' : 'opacity-60'}`}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6, delay: i * 0.05 }}
                  >
                    {f.img ? (
                      <div className={`aspect-[16/10] w-full bg-cover bg-center transition-[height] duration-300`} style={{ backgroundImage: `url(${f.img})` }} />
                    ) : (
                      <div className={`aspect-[16/10] w-full bg-gradient-to-br from-[#0B3D2E] via-[#0E4A2D] to-[#1A5630] transition-[height] duration-300`} />
                    )}
                    <div className="p-5">
                      <h3 className="text-white text-lg font-semibold">{f.title}</h3>
                      <p className="text-white/70 text-sm mt-2">{f.desc}</p>
                    </div>
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