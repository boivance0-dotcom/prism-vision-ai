import React from 'react';
import forestHero from '@/assets/forest-hero-bg.jpg';
import forestPremium from '@/assets/forest-hero-premium.jpg';
import forestLandscape from '@/assets/forest-landscape-bg.jpg';

type Topic = {
  title: string;
  img: string;
  desc: string;
};

const topics: Topic[] = [
  { title: 'Forests', img: forestHero, desc: 'Canopies, biodiversity, carbon sinks' },
  { title: 'Wildlife', img: forestPremium, desc: 'Species, habitats, migrations' },
  { title: 'Rivers', img: forestLandscape, desc: 'Watersheds, flow, health' },
  { title: 'Mountains', img: forestPremium, desc: 'Alpine zones, glaciers, terrain' },
  { title: 'Oceans', img: forestLandscape, desc: 'Currents, reefs, marine life' },
  { title: 'Climate', img: forestHero, desc: 'Weather, cycles, resilience' },
];

const NatureTopicCards: React.FC = () => {
  return (
    <section className="w-full mt-10">
      <div className="max-w-6xl mx-auto px-6">
        <h3 className="text-white/95 text-xl font-semibold mb-4">Explore nature topics</h3>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {topics.map((t) => (
            <button
              key={t.title}
              className="group relative overflow-hidden rounded-xl border border-white/15 bg-black/20 backdrop-blur-sm hover:border-[#86C232]/40 transition-all text-left"
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
          ))}
        </div>
      </div>
    </section>
  );
};

export default NatureTopicCards;