import React from 'react';
import forestHero from '@/assets/forest-hero-bg.jpg';
import forestPremium from '@/assets/forest-hero-premium.jpg';
import forestLandscape from '@/assets/forest-landscape-bg.jpg';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Keyboard, Autoplay, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

type Topic = {
  title: string;
  img: string;
  desc: string;
};

const topics: Topic[] = [
  { title: "Forests", img: forestHero, desc: 'Canopies, biodiversity, carbon sinks' },
  { title: "Wildlife", img: forestPremium, desc: 'Species, habitats, migrations' },
  { title: "Rivers", img: forestLandscape, desc: 'Watersheds, flow, health' },
  { title: "Mountains", img: forestPremium, desc: 'Alpine zones, glaciers, terrain' },
  { title: "Oceans", img: forestLandscape, desc: 'Currents, reefs, marine life' },
  { title: "Climate", img: forestHero, desc: 'Weather, cycles, resilience' },
];

const NatureTopicCards: React.FC = () => {
  return (
    <section className="w-full mt-10">
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
          breakpoints={{
            320: { slidesPerView: 1.05, spaceBetween: 12 },
            640: { slidesPerView: 2.1, spaceBetween: 14 },
            1024: { slidesPerView: 3.2, spaceBetween: 16 }
          }}
          className="relative"
        >
          {topics.map((t) => (
            <SwiperSlide key={t.title} className="!w-[280px] sm:!w-[340px]">
              <button
                className="group relative block overflow-hidden rounded-xl border border-white/15 bg-black/20 backdrop-blur-sm hover:border-[#86C232]/40 transition-all text-left"
                aria-label={`Explore ${t.title}`}
              >
                <div
                  className="aspect-[16/10] w-full bg-cover bg-center"
                  style={{ backgroundImage: `url(${t.img})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-4">
                  <div className="text-white text-lg font-semibold drop-shadow">{t.title}</div>
                  <div className="text-white/80 text-sm">{t.desc}</div>
                </div>
              </button>
            </SwiperSlide>
          ))}
        </Swiper>

        <style>{`
          .swiper-button-prev, .swiper-button-next { color: rgba(255,255,255,0.9); }
          .swiper-pagination-bullet { background: rgba(255,255,255,0.4); }
          .swiper-pagination-bullet-active { background: linear-gradient(90deg, #86C232, #b4ff6b); }
        `}</style>
      </div>
    </section>
  );
};

export default NatureTopicCards;