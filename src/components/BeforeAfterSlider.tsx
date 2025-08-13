import React, { useRef, useState } from 'react';

const BeforeAfterSlider: React.FC<{ beforeSrc: string; afterSrc: string; alt?: string }> = ({ beforeSrc, afterSrc, alt }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [pos, setPos] = useState(0.5);

  const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    const x = Math.min(Math.max(clientX - rect.left, 0), rect.width);
    setPos(x / rect.width);
  };

  return (
    <div className="rounded-xl p-5 bg-[rgba(7,16,12,0.65)] border border-white/15 shadow-[0_20px_60px_rgba(0,0,0,0.45)] backdrop-blur-md">
      <h3 className="text-white/95 font-semibold mb-3">Satellite Imagery Viewer</h3>
      <div
        ref={containerRef}
        className="relative w-full overflow-hidden rounded-lg border border-white/10 select-none"
        style={{ aspectRatio: '16 / 9' }}
        onMouseMove={handleMove}
        onTouchMove={handleMove}
      >
        <img src={beforeSrc} alt={alt || 'Before'} className="absolute inset-0 w-full h-full object-cover" draggable={false} />
        <div className="absolute inset-0" style={{ width: `${pos * 100}%`, overflow: 'hidden' }}>
          <img src={afterSrc} alt={alt || 'After'} className="absolute inset-0 w-full h-full object-cover" draggable={false} />
        </div>
        <div className="absolute inset-y-0" style={{ left: `${pos * 100}%` }}>
          <div className="w-0.5 h-full bg-white/80 shadow-[0_0_12px_rgba(255,255,255,0.6)]" />
          <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 bg-white/90 text-black text-xs font-semibold px-2 py-1 rounded-full">
            Drag
          </div>
        </div>
      </div>
      <div className="mt-2 flex items-center justify-between text-xs text-white/75">
        <span>Before</span>
        <span>After</span>
      </div>
    </div>
  );
};

export default BeforeAfterSlider;