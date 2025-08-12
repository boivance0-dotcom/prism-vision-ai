import React from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Keyboard, Autoplay, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const features = [
  { title: 'Wildlife AI', desc: 'Species tracking & biodiversity insights.', img: '/placeholder.svg' },
  { title: 'Climate AI', desc: 'Climate trends & renewable energy insights.', img: '/placeholder.svg' },
  { title: 'Marine AI', desc: 'Protect oceans & marine ecosystems.', img: '/placeholder.svg' },
  { title: 'Forest AI', desc: 'Monitor deforestation & forest health.', img: '/placeholder.svg' },
  { title: 'Research AI', desc: 'Data-driven research and synthesis.', img: '/placeholder.svg' },
  { title: 'Career AI', desc: 'Personalized career guidance.', img: '/placeholder.svg' },
  { title: 'Education AI', desc: 'Adaptive learning & educational support.', img: '/placeholder.svg' },
];

const FeatureCarousel: React.FC = () => {
  return (
    <section className="relative w-full py-20">
      <div className="max-w-6xl mx-auto px-6">
        <h3 className="text-white/95 text-xl font-semibold mb-4">Explore AI categories</h3>
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