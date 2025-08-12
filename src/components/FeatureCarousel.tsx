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

  const handleChangeAI = () => {
    // TODO: Wire up navigation/action once routes are available
    // For now, log the active feature
    const activeFeature = features[activeIndex];
    console.log('Change AI clicked for:', activeFeature?.title);
  };

  return (
    <section className="relative w-full py-20">
      <div className="max-w-6xl mx-auto px-6">
        <h3 className="text-white/95 text-xl font-semibold mb-4">Explore other AI's</h3>
        <Swiper
          modules={[Navigation, Pagination, Keyboard, Autoplay, A11y]}
          slidesPerView={'auto'}
          centeredSlides
          spaceBetween={16}
          loop
          speed={600}
          keyboard={{ enabled: true, onlyInViewport: true }}
          autoplay={{ delay: 4500, disableOnInteraction: false, pauseOnMouseEnter: true }}
          pagination={{ clickable: true }}
          navigation
          onSwiper={(swiper) => setActiveIndex((swiper as any).realIndex ?? 0)}
          onSlideChange={(swiper) => setActiveIndex((swiper as any).realIndex ?? 0)}
          breakpoints={{
            320: { slidesPerView: 1.05, spaceBetween: 12 },
            640: { slidesPerView: 2.1, spaceBetween: 14 },
            1024: { slidesPerView: 3.2, spaceBetween: 16 }
          }}
          className="relative"
        >
          {features.map((f, i) => {
            const isActive = i === activeIndex;
            return (
              <SwiperSlide key={f.title} className="!w-[280px] sm:!w-[340px]">
                <motion.article
                  className={`rounded-xl overflow-hidden bg-[rgba(7,16,12,0.65)] border border-white/15 shadow-[0_20px_60px_rgba(0,0,0,0.45)] backdrop-blur-md tilt-hover hover:border-[#86C232]/40 transition-transform duration-300 ${isActive ? 'border-[#86C232]/60 shadow-[0_12px_50px_rgba(134,194,50,0.25)] scale-[1.02]' : ''}`}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, delay: i * 0.05 }}
                >
                  {f.img ? (
                    <div className="aspect-[16/10] w-full bg-cover bg-center" style={{ backgroundImage: `url(${f.img})` }} />
                  ) : (
                    <div className="aspect-[16/10] w-full bg-gradient-to-br from-[#0B3D2E] via-[#0E4A2D] to-[#1A5630]" />
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
      </div>
    </section>
  );
};

export default FeatureCarousel;