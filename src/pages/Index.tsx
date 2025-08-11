
import React, { useState } from 'react';
import SearchBar from '@/components/SearchBar';
import AIModesSlider from '@/components/AIModesSlider';
import { Bot, Sparkles } from 'lucide-react';
import forestHeroBg from '@/assets/forest-landscape-bg.jpg';

const Index = () => {
  const [selectedMode, setSelectedMode] = useState('climate');
  const [searchResults, setSearchResults] = useState<string | null>(null);

  const handleSearch = (query: string) => {
    console.log(`Searching with ${selectedMode} AI:`, query);
    setSearchResults(`Searching "${query}" with ${selectedMode} AI...`);
    // Here you would integrate with your actual AI search API
  };

  const handleModeChange = (mode: string) => {
    setSelectedMode(mode);
    console.log('AI mode changed to:', mode);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section with Nature Background */}
      <div className="relative min-h-screen">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${forestHeroBg})` }}
        />
        
        {/* Dark Overlay for Text Readability */}
        <div className="absolute inset-0 bg-black/40" />
        
        <div className="relative z-10 container mx-auto px-6 py-16 min-h-screen flex flex-col">
          {/* Main Hero Content */}
          <div className="flex-1 flex flex-col justify-center items-center text-center">
            {/* Large Hero Title */}
            <div className="mb-8 animate-fade-in">
              <div className="kicker mb-6">Nature AI Intelligence</div>
              <h1 className="display-hero text-white text-shadow-xl text-balance">
                NATURE MAKES
                <br />
                <span className="block">US HAPPY</span>
              </h1>
              
              <p className="mt-6 text-lg md:text-2xl text-white/95 max-w-4xl mx-auto leading-relaxed font-light tracking-wide">
                Explore Advanced Environmental Intelligence Through Specialized AI Systems
              </p>
            </div>

            {/* Search Bar */}
            <div className="w-full max-w-4xl mb-12 animate-slide-in">
              <SearchBar onSearch={handleSearch} />
            </div>

            {/* Start Experience Button */}
            <button 
              onClick={() => document.getElementById('ai-modes')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-12 py-4 border-2 border-white/50 text-white text-lg font-medium rounded-full hover:bg-white/10 hover:border-white transition-all duration-300 backdrop-blur-sm"
            >
              START EXPERIENCE
            </button>
          </div>
        </div>
      </div>

      {/* AI Modes Section */}
      <div id="ai-modes" className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <AIModesSlider 
            selectedMode={selectedMode} 
            onModeChange={handleModeChange} 
          />
        </div>
      </div>

      {/* Search Results */}
      {searchResults && (
        <div className="py-16 bg-background">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <div className="bg-card/50 border border-border/50 rounded-xl p-8 backdrop-blur-sm animate-fade-in">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-3 h-3 bg-primary rounded-full animate-pulse" />
                  <h3 className="text-lg font-medium text-foreground">Processing Request</h3>
                </div>
                <p className="text-muted-foreground">{searchResults}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-border/50 bg-background">
        <div className="container mx-auto px-6 py-8">
          <div className="text-center text-muted-foreground">
            <p>&copy; 2024 Nature AI Intelligence. Advanced environmental research platform.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
