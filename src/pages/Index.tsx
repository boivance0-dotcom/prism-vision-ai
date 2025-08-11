
import React, { useState } from 'react';
import SearchBar from '@/components/SearchBar';
import AIModesSlider from '@/components/AIModesSlider';
import { Bot, Sparkles } from 'lucide-react';

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
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
        
        <div className="relative container mx-auto px-6 py-16">
          {/* Header */}
          <div className="text-center mb-12 animate-fade-in">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="p-3 bg-primary/10 rounded-xl border border-primary/20">
                <Bot className="h-8 w-8 text-primary" />
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-foreground">
                AI Search
              </h1>
              <div className="p-3 bg-accent/10 rounded-xl border border-accent/20">
                <Sparkles className="h-8 w-8 text-accent-foreground" />
              </div>
            </div>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Advanced AI-powered environmental intelligence platform with specialized domain expertise
            </p>
          </div>

          {/* Search Bar */}
          <div className="mb-16 animate-slide-in">
            <SearchBar onSearch={handleSearch} />
          </div>

          {/* AI Modes Slider */}
          <div className="mb-12">
            <AIModesSlider 
              selectedMode={selectedMode} 
              onModeChange={handleModeChange} 
            />
          </div>

          {/* Search Results */}
          {searchResults && (
            <div className="max-w-4xl mx-auto">
              <div className="bg-card/50 border border-border/50 rounded-xl p-8 backdrop-blur-sm animate-fade-in">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-3 h-3 bg-primary rounded-full animate-pulse" />
                  <h3 className="text-lg font-medium text-foreground">Processing Request</h3>
                </div>
                <p className="text-muted-foreground">{searchResults}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border/50 mt-20">
        <div className="container mx-auto px-6 py-8">
          <div className="text-center text-muted-foreground">
            <p>&copy; 2024 AI Search Engine. Professional environmental intelligence.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
