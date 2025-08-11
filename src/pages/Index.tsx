
import React from 'react';
import SearchBar from '@/components/SearchBar';
import forestHeroBg from '@/assets/forest-landscape-bg.jpg';

const Index = () => {
  const handleSearch = (query: string) => {
    console.log(`Searching:`, query);
    // Integrate with your actual AI search API here
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
          </div>
        </div>
      </div>

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
