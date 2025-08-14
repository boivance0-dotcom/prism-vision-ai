import React, { useRef, useState } from 'react';

const themeContainer: Record<string, string> = {
  forest: 'bg-[rgba(7,16,12,0.65)] border-white/15 backdrop-blur-md',
  wildlife: 'bg-[rgba(25,18,12,0.7)] border-white/15 backdrop-blur-md',
  climate: 'bg-[rgba(10,20,28,0.6)] border-white/20 backdrop-saturate-[1.2] backdrop-blur-md',
  marine: 'bg-white/8 border-white/20 backdrop-blur-xl',
  research: 'bg-[rgba(20,22,28,0.7)] border-white/15 backdrop-blur-md',
  career: 'bg-[rgba(14,20,34,0.7)] border-white/15 backdrop-blur-md',
  education: 'bg-[rgba(16,18,20,0.7)] border-white/15 backdrop-blur-md',
};

const BeforeAfterSlider: React.FC<{ beforeSrc: string; afterSrc: string; alt?: string; accentColor?: string; theme?: string }> = ({ beforeSrc, afterSrc, alt, accentColor = '#86C232', theme = 'forest' }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [pos, setPos] = useState(0.5);

  const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    const x = Math.min(Math.max(clientX - rect.left, 0), rect.width);
    setPos(x / rect.width);
  };

  const containerClass = themeContainer[theme] || themeContainer.forest;

  return (
    <div className={`rounded-xl p-5 border shadow-[0_20px_60px_rgba(0,0,0,0.45)] ${containerClass}`}>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-white/95 font-semibold">Satellite Imagery Viewer</h3>
        <span className="text-xs text-white/70">Drag the divider</span>
      </div>
      <div
        ref={containerRef}
        className="relative w-full overflow-hidden rounded-lg border border-white/10 select-none shadow-[0_10px_40px_rgba(0,0,0,0.35)]"
        style={{ aspectRatio: '16 / 9' }}
        onMouseMove={handleMove}
        onTouchMove={handleMove}
      >
        <img src={beforeSrc} alt={alt || 'Before'} className="absolute inset-0 w-full h-full object-cover" draggable={false} decoding="async" fetchpriority="high" />
        <div className="absolute inset-0" style={{ width: `${pos * 100}%`, overflow: 'hidden' }}>
          <img src={afterSrc} alt={alt || 'After'} className="absolute inset-0 w-full h-full object-cover" draggable={false} decoding="async" fetchpriority="high" />
        </div>

        {/* Before/After badges */}
        <span className="absolute top-2 left-2 text-[11px] md:text-xs font-semibold text-white/90 px-2 py-1 rounded-md bg-black/40 border border-white/15">Before</span>
        <span className="absolute top-2 right-2 text-[11px] md:text-xs font-semibold text-white/90 px-2 py-1 rounded-md bg-black/40 border border-white/15">After</span>

        {/* Handle */}
        <div className="absolute inset-y-0" style={{ left: `${pos * 100}%` }}>
          <div className="w-0.5 h-full" style={{ background: '#ffffffcc', boxShadow: '0 0 12px rgba(255,255,255,0.6)' }} />
          <div
            className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 text-black text-xs font-semibold px-2 py-1 rounded-full"
            style={{ background: '#ffffff', border: `1px solid ${accentColor}` }}
          >
            Drag
          </div>
        </div>
      </div>
    </div>
  );
};

export default BeforeAfterSlider;