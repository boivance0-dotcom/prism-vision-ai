import React from 'react';

const TrendChart: React.FC<{ values?: number[]; title?: string }> = ({ values, title }) => {
  const data = values && values.length ? values : Array.from({ length: 12 }, () => 60 + Math.round(Math.random() * 40));
  const max = Math.max(...data, 100);
  const min = Math.min(...data, 0);
  const width = 600;
  const height = 220;
  const dx = width / (data.length - 1);
  const points = data
    .map((v, i) => {
      const x = i * dx;
      const y = height - ((v - min) / (max - min)) * (height - 20) - 10;
      return `${x},${y}`;
    })
    .join(' ');

  return (
    <div className="rounded-xl p-5 bg-[rgba(7,16,12,0.65)] border border-white/15 shadow-[0_20px_60px_rgba(0,0,0,0.45)] backdrop-blur-md">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-white/95 font-semibold">{title || '12-Month Trend'}</h3>
        <div className="text-xs text-white/70">Index (0-100)</div>
      </div>
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto">
        <defs>
          <linearGradient id="g" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#86C232" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#86C232" stopOpacity="0" />
          </linearGradient>
        </defs>
        <polyline fill="none" stroke="#86C232" strokeWidth="2" points={points} />
        <polygon fill="url(#g)" opacity="0.25" points={`0,${height} ${points} ${width},${height}`} />
        {data.map((v, i) => (
          <circle key={i} cx={i * dx} cy={height - ((v - min) / (max - min)) * (height - 20) - 10} r="3" fill="#C8FF70" />
        ))}
      </svg>
    </div>
  );
};

export default TrendChart;