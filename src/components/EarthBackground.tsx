import React from 'react';

const EarthBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 z-0">
      {/* Space Background */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, #0a0a2e 0%, #1a1a3a 25%, #2d1b69 50%, #1a1a3a 75%, #0a0a2e 100%)'
        }}
      />
      
      {/* Stars Layer 1 - Distant stars */}
      <div className="absolute inset-0">
        {[...Array(200)].map((_, i) => (
          <div
            key={`star1-${i}`}
            className="absolute w-0.5 h-0.5 bg-white rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: 0.3 + Math.random() * 0.7,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      {/* Stars Layer 2 - Brighter stars */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <div
            key={`star2-${i}`}
            className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: 0.6 + Math.random() * 0.4,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${1.5 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Large Earth in Background */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative">
          {/* Main Earth Sphere - Large and in background */}
          <div
            className="w-[800px] h-[800px] rounded-full relative overflow-hidden opacity-20"
            style={{
              background: 'linear-gradient(45deg, #4a90e2 0%, #357abd 25%, #2c5aa0 50%, #1e3a8a 75%, #1e40af 100%)',
              boxShadow: 'inset 0 0 100px rgba(0,0,0,0.5), 0 0 100px rgba(74, 144, 226, 0.2)',
              animation: 'earth-spin 60s linear infinite'
            }}
          >
            {/* Continents */}
            <div className="absolute inset-0">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                {/* North America */}
                <path
                  d="M20 30 Q25 25 30 30 Q35 35 30 40 Q25 45 20 40 Q15 35 20 30"
                  fill="#8FBC8F"
                  opacity="0.8"
                />
                {/* South America */}
                <path
                  d="M25 45 Q30 50 35 55 Q30 60 25 65 Q20 60 25 55 Q20 50 25 45"
                  fill="#8FBC8F"
                  opacity="0.8"
                />
                {/* Europe */}
                <path
                  d="M45 25 Q50 20 55 25 Q50 30 45 25"
                  fill="#8FBC8F"
                  opacity="0.8"
                />
                {/* Africa */}
                <path
                  d="M45 35 Q50 40 55 45 Q50 50 45 55 Q40 50 45 45 Q40 40 45 35"
                  fill="#8FBC8F"
                  opacity="0.8"
                />
                {/* Asia */}
                <path
                  d="M55 25 Q70 20 75 30 Q70 40 65 35 Q60 30 55 25"
                  fill="#8FBC8F"
                  opacity="0.8"
                />
                {/* Australia */}
                <path
                  d="M70 60 Q75 65 80 60 Q75 55 70 60"
                  fill="#8FBC8F"
                  opacity="0.8"
                />
              </svg>
            </div>

            {/* Cloud Layer */}
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.05) 50%, transparent 100%)',
              }}
            />

            {/* Atmosphere Glow */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400/10 via-transparent to-blue-400/10" />
          </div>

          {/* Orbital Ring */}
          <div
            className="absolute inset-0 rounded-full border border-white/10"
            style={{ 
              margin: '-20px',
              animation: 'earth-spin 90s linear infinite reverse'
            }}
          />
        </div>
      </div>

      {/* Nebula/Cloud Effects */}
      <div className="absolute inset-0">
        <div 
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-10"
          style={{
            background: 'radial-gradient(circle, rgba(138, 43, 226, 0.3) 0%, transparent 70%)',
            filter: 'blur(40px)'
          }}
        />
        <div 
          className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full opacity-10"
          style={{
            background: 'radial-gradient(circle, rgba(74, 144, 226, 0.3) 0%, transparent 70%)',
            filter: 'blur(30px)'
          }}
        />
      </div>

      {/* CSS Animation */}
      <style jsx>{`
        @keyframes earth-spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default EarthBackground;