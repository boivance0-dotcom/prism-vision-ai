import React from 'react';
import { useParams } from 'react-router-dom';
import FeatureCarousel from '@/components/FeatureCarousel';
import ForestHealthMap from '@/components/ForestHealthMap';
import TrendChart from '@/components/TrendChart';
import BeforeAfterSlider from '@/components/BeforeAfterSlider';
import ThreatAnalysis from '@/components/ThreatAnalysis';

const bgMap: Record<string, string> = {
  nature: 'https://raw.githubusercontent.com/varunsingh3545/search-engine/main/31201.jpg',
  forest: 'https://raw.githubusercontent.com/varunsingh3545/search-engine/refs/heads/main/forest.jpg',
  wildlife: 'https://raw.githubusercontent.com/varunsingh3545/search-engine/main/OIP.webp',
  climate: 'https://raw.githubusercontent.com/varunsingh3545/search-engine/main/climate.jpg',
  marine: 'https://raw.githubusercontent.com/varunsingh3545/search-engine/main/marine.jpg',
  research: 'https://raw.githubusercontent.com/varunsingh3545/search-engine/main/representation-user-experience-interface-design.jpg',
  career: 'https://raw.githubusercontent.com/varunsingh3545/search-engine/main/business-concept-with-graphic-holography.jpg',
  education: 'https://raw.githubusercontent.com/varunsingh3545/search-engine/main/photography%20of%20shelves%20of%20books.jpg',
};

const titleMap: Record<string, string> = {
  nature: 'Nature AI',
  forest: 'Forest AI',
  wildlife: 'Wildlife AI',
  climate: 'Climate AI',
  marine: 'Marine AI',
  research: 'Research AI',
  career: 'Career AI',
  education: 'Education AI',
};

const AIDashboard: React.FC = () => {
  const { slug = 'forest' } = useParams();
  const bgUrl = bgMap[slug] || bgMap.forest;
  const aiTitle = titleMap[slug] || 'Forest AI';

  const before = 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?q=80&w=1600&auto=format&fit=crop';
  const after = 'https://images.unsplash.com/photo-1482192505345-5655af888cc4?q=80&w=1600&auto=format&fit=crop';

  return (
    <div className="relative z-10 min-h-screen">
      <div className="relative overflow-hidden">
        {/* Blurred AI background */}
        <div
          className="fixed-bg hero-image-filter"
          style={{ backgroundImage: `url(${bgUrl})`, filter: 'blur(3px) brightness(0.9)', transform: 'scale(1.04)', zIndex: 0 as unknown as number }}
          aria-hidden
        />
        <div className="hero-gradient-top" />
        <div className="hero-gradient-bottom" />
        <div className="hero-vignette" />

        <div className="relative z-10 container mx-auto px-6 py-10 md:py-14">
          <div className="page-enter text-center">
            <h1 className="hero-title-clean" style={{ fontSize: 'clamp(1.6rem, 4.5vw, 3rem)' }}>{aiTitle} Dashboard</h1>
            <p className="mt-2 text-white/85 max-w-3xl mx-auto">Live insights, monitoring, and AI-driven analysis.</p>
          </div>

          {/* Slider at top (compact), initialized to this AI */}
          <div className="mt-4 max-w-5xl mx-auto transform origin-top scale-90 md:scale-95">
            <FeatureCarousel initialTitle={aiTitle} />
          </div>

          {/* Dashboard below slider */}
          <div className="mt-0 grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2 grid gap-6">
              <ForestHealthMap />
              <TrendChart />
            </div>
            <div className="lg:col-span-1">
              <ThreatAnalysis />
            </div>
          </div>

          <div className="mt-6">
            <BeforeAfterSlider beforeSrc={before} afterSrc={after} alt={`${aiTitle} comparison`} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIDashboard;