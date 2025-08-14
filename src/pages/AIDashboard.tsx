import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import FeatureCarousel from '@/components/FeatureCarousel';
import ForestHealthMap from '@/components/ForestHealthMap';
import TrendChart from '@/components/TrendChart';
import BeforeAfterSlider from '@/components/BeforeAfterSlider';
import ThreatAnalysis from '@/components/ThreatAnalysis';
import SearchBar from '@/components/SearchBar';

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

const mapWeights: Record<string, { title: string; weights: { healthy?: number; stressed?: number; critical?: number } }> = {
  forest: { title: 'Forest Health Index', weights: { healthy: 6, stressed: 3, critical: 1 } },
  wildlife: { title: 'Habitat Health Index', weights: { healthy: 5, stressed: 3, critical: 2 } },
  climate: { title: 'Vegetation Stress Index', weights: { healthy: 4, stressed: 4, critical: 2 } },
  marine: { title: 'Coastal Canopy Index', weights: { healthy: 5, stressed: 2, critical: 3 } },
  nature: { title: 'Ecosystem Health Index', weights: { healthy: 6, stressed: 2, critical: 2 } },
  research: { title: 'Field Sites Index', weights: { healthy: 5, stressed: 3, critical: 2 } },
  career: { title: 'Regions of Interest', weights: { healthy: 5, stressed: 3, critical: 2 } },
  education: { title: 'Study Areas Index', weights: { healthy: 6, stressed: 2, critical: 2 } },
};

const chartCfg: Record<string, { title: string; values?: number[] }> = {
  forest: { title: '12-Month Forest Health Trend' },
  wildlife: { title: 'Species Activity Trend' },
  climate: { title: 'CO2/Temperature Trend' },
  marine: { title: 'Coastal Vegetation Trend' },
  nature: { title: 'Ecosystem Vitality Trend' },
  research: { title: 'Publications Trend' },
  career: { title: 'Opportunities Trend' },
  education: { title: 'Learning Engagement Trend' },
};

const AIDashboard: React.FC = () => {
  const { slug = 'forest' } = useParams();
  const navigate = useNavigate();
  const bgUrl = bgMap[slug] || bgMap.forest;
  const aiTitle = titleMap[slug] || 'Forest AI';
  const mapCfg = mapWeights[slug] || mapWeights.forest;
  const trend = chartCfg[slug] || chartCfg.forest;

  const before = 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?q=80&w=1600&auto=format&fit=crop';
  const after = 'https://images.unsplash.com/photo-1482192505345-5655af888cc4?q=80&w=1600&auto=format&fit=crop';

  const handleSearch = (q: string) => {
    if (!q) return;
    navigate(`/results?q=${encodeURIComponent(q)}&ai=${encodeURIComponent(slug)}`);
  };

  return (
    <div className="relative z-10 min-h-screen">
      <div className="relative overflow-hidden">
        {/* AI background (no blur) */}
        <div
          className="fixed-bg hero-image-filter"
          style={{ backgroundImage: `url(${bgUrl})`, zIndex: 0 as unknown as number }}
          aria-hidden
        />
        <div className="hero-gradient-top" />
        <div className="hero-gradient-bottom" />
        <div className="hero-vignette" />

        <div className="relative z-10 container mx-auto px-6 py-10 md:py-14">
          <div className="page-enter text-center max-w-4xl mx-auto">
            <h1 className="hero-title-clean" style={{ fontSize: 'clamp(1.6rem, 4.5vw, 3rem)' }}>{aiTitle} Dashboard</h1>
            <p className="mt-2 text-white/85 max-w-3xl mx-auto">Live insights, monitoring, and AI-driven analysis.</p>
            <div className="mt-5">
              <SearchBar onSearch={handleSearch} className="search-input" buttonClassName="search-button" />
            </div>
          </div>

          {/* Slider at top (compact), initialized to this AI */}
          <div className="mt-6 max-w-5xl mx-auto transform origin-top scale-90 md:scale-95">
            <FeatureCarousel initialTitle={aiTitle} />
          </div>

          {/* Dashboard below slider */}
          <div className="mt-0 grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2 grid gap-6">
              <ForestHealthMap title={mapCfg.title} statusWeights={mapCfg.weights} />
              <TrendChart title={trend.title} values={trend.values} />
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