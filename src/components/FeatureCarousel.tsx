import React from 'react';
import { motion } from 'framer-motion';

const features = [
  {
    title: 'Forest Monitoring',
    desc: 'Ecosystem health assessment and conservation strategies.',
    img: '/images/ai-forest-1920.webp'
  },
  {
    title: 'Climate Intelligence',
    desc: 'Predictive analytics for resilient planning and risk.',
    img: '/images/ai-climate-1920.webp'
  },
  {
    title: 'Exploration Studio',
    desc: 'Create and explore nature scenarios with powerful tools.',
    img: '/images/ai-explore-1920.webp'
  }
];

const FeatureCarousel: React.FC = () => {
  return (
    <section className="relative w-full py-20">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-6">
        {features.map((f, i) => (
          <motion.article key={f.title} className="rounded-xl overflow-hidden bg-white/5 border border-white/10 backdrop-blur-md tilt-hover"
            initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.6, delay: i * 0.05 }}>
            <div className="aspect-[16/10] w-full bg-cover bg-center" style={{ backgroundImage: `url(${f.img})` }} />
            <div className="p-5">
              <h3 className="text-white text-lg font-semibold">{f.title}</h3>
              <p className="text-white/70 text-sm mt-2">{f.desc}</p>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
};

export default FeatureCarousel;