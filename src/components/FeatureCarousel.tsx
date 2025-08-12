import React from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Keyboard, Autoplay, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const features = [
  {
    title: 'Climate AI',
    desc: 'For climate trends & renewable energy insights.',
    img: '/images/ai-climate-1920.webp'
  },
  {
    title: 'Wildlife AI',
    desc: 'Tracks endangered species & biodiversity.',
    img: '/images/ai-explore-1920.webp'
  },
  {
    title: 'Forest AI',
    desc: 'Monitors deforestation & forest health.',
    img: '/images/ai-forest-1920.webp'
  },
  {
    title: 'Marine AI',
    desc: 'Protects oceans & marine ecosystems.',
    img: 'https://raw.githubusercontent.com/varunsingh3545/search-engine/main/marine.jpg'
  },
  {
    title: 'Air Quality AI',
    desc: 'Predicts and monitors city air quality.',
    img: ''
  },
  {
    title: 'Disaster Response AI',
    desc: 'Real-time disaster detection & response.',
    img: ''
  },
  {
    title: 'Agriculture AI',
    desc: 'Optimizes farming & crop health.',
    img: ''
  },
];

const FeatureCarousel: React.FC = () => {
  return (
    <section className="relative w-full py-20">
      <div className="max-w-6xl mx-auto px-6">
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
          breakpoints={{
            320: { slidesPerView: 1.05, spaceBetween: 12 },
            640: { slidesPerView: 2.1, spaceBetween: 14 },
            1024: { slidesPerView: 3.2, spaceBetween: 16 }
          }}
          className="relative"
        >
          {features.map((f, i) => (
            <SwiperSlide key={f.title} className="!w-[280px] sm:!w-[340px]">
              <motion.article className="rounded-xl overflow-hidden bg-[rgba(7,16,12,0.65)] border border-white/15 shadow-[0_20px_60px_rgba(0,0,0,0.45)] backdrop-blur-md tilt-hover hover:border-[#86C232]/40"
                initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.6, delay: i * 0.05 }}>
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
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default FeatureCarousel;