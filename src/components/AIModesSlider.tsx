
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Leaf, Trees, Bird, Globe, Zap, Droplets } from 'lucide-react';

interface AIMode {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  gradient: string;
}

const aiModes: AIMode[] = [
  {
    id: 'climate',
    name: 'Climate AI',
    description: 'Advanced climate analysis and environmental insights',
    icon: <Globe className="h-8 w-8" />,
    gradient: 'from-blue-500/20 to-green-500/20'
  },
  {
    id: 'forest',
    name: 'Forest AI',
    description: 'Forest ecosystem monitoring and conservation strategies',
    icon: <Trees className="h-8 w-8" />,
    gradient: 'from-green-600/20 to-emerald-500/20'
  },
  {
    id: 'wildlife',
    name: 'Wildlife AI',
    description: 'Species tracking and biodiversity analysis',
    icon: <Bird className="h-8 w-8" />,
    gradient: 'from-orange-500/20 to-yellow-500/20'
  },
  {
    id: 'energy',
    name: 'Energy AI',
    description: 'Renewable energy optimization and grid analysis',
    icon: <Zap className="h-8 w-8" />,
    gradient: 'from-purple-500/20 to-blue-500/20'
  },
  {
    id: 'ocean',
    name: 'Ocean AI',
    description: 'Marine ecosystem health and ocean conservation',
    icon: <Droplets className="h-8 w-8" />,
    gradient: 'from-cyan-500/20 to-blue-600/20'
  },
  {
    id: 'sustainability',
    name: 'Sustainability AI',
    description: 'Corporate sustainability and environmental impact',
    icon: <Leaf className="h-8 w-8" />,
    gradient: 'from-green-500/20 to-teal-500/20'
  }
];

interface AIModesSliderProps {
  selectedMode: string;
  onModeChange: (mode: string) => void;
}

const AIModesSlider: React.FC<AIModesSliderProps> = ({ selectedMode, onModeChange }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const selectedIndex = aiModes.findIndex(mode => mode.id === selectedMode);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % Math.max(1, aiModes.length - 2));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + Math.max(1, aiModes.length - 2)) % Math.max(1, aiModes.length - 2));
  };

  const getVisibleModes = () => {
    const visible = [];
    for (let i = 0; i < 3; i++) {
      const index = (currentIndex + i) % aiModes.length;
      visible.push(aiModes[index]);
    }
    return visible;
  };

  const visibleModes = getVisibleModes();

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold text-foreground mb-2">
          Choose Your AI Specialist
        </h2>
        <p className="text-muted-foreground">
          Each AI is trained on specialized domains for expert-level insights
        </p>
      </div>

      <div className="relative flex items-center justify-center gap-6">
        {/* Left Arrow */}
        <button
          onClick={prevSlide}
          className="p-3 rounded-full bg-card/50 border border-border/50 hover:bg-card hover:border-primary/30 transition-all duration-300 backdrop-blur-sm"
        >
          <ChevronLeft className="h-5 w-5 text-muted-foreground" />
        </button>

        {/* AI Mode Cards */}
        <div className="flex gap-6 items-center">
          {visibleModes.map((mode, index) => {
            const isActive = mode.id === selectedMode;
            const isCenter = index === 1;
            
            return (
              <div
                key={mode.id}
                onClick={() => onModeChange(mode.id)}
                className={`ai-mode-card w-80 h-48 ${
                  isActive ? 'active' : isCenter ? '' : 'inactive'
                }`}
              >
                <div className={`gradient-overlay bg-gradient-to-br ${mode.gradient}`} />
                
                <div className="relative z-10 h-full flex flex-col justify-between">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`p-2 rounded-lg ${isActive ? 'bg-primary/20 text-primary' : 'bg-muted/20 text-muted-foreground'} transition-colors duration-300`}>
                      {mode.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-foreground">
                      {mode.name}
                    </h3>
                  </div>
                  
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {mode.description}
                  </p>
                  
                  {isActive && (
                    <div className="mt-4 flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                      <span className="text-primary text-sm font-medium">Active</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Arrow */}
        <button
          onClick={nextSlide}
          className="p-3 rounded-full bg-card/50 border border-border/50 hover:bg-card hover:border-primary/30 transition-all duration-300 backdrop-blur-sm"
        >
          <ChevronRight className="h-5 w-5 text-muted-foreground" />
        </button>
      </div>

      {/* Mode Indicators */}
      <div className="flex justify-center gap-2 mt-8">
        {aiModes.map((mode) => (
          <button
            key={mode.id}
            onClick={() => onModeChange(mode.id)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              mode.id === selectedMode ? 'bg-primary w-6' : 'bg-muted/40 hover:bg-muted/60'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default AIModesSlider;
