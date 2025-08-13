import React from 'react';
import { MapPin, Leaf, Activity, BookOpen, Camera, Shield } from 'lucide-react';

export type ResultType = 'project' | 'wildlife' | 'alert' | 'research';
export type HealthStatus = 'healthy' | 'stressed' | 'critical';

const STATUS_BORDER: Record<HealthStatus, string> = {
  healthy: 'border-[#3CB371]/60',
  stressed: 'border-[#F0AD4E]/60',
  critical: 'border-[#E15241]/70',
};

const TYPE_ICON: Record<ResultType, React.ReactNode> = {
  project: <Shield className="w-4 h-4" />,
  wildlife: <Camera className="w-4 h-4" />,
  alert: <Activity className="w-4 h-4" />,
  research: <BookOpen className="w-4 h-4" />,
};

export interface ResultItem {
  id: string;
  type: ResultType;
  title: string;
  description: string;
  location?: string;
  health?: HealthStatus;
  confidence?: number; // 0..1
  endangered?: boolean;
}

const ResultCard: React.FC<{ item: ResultItem; onView: (item: ResultItem) => void }>
= ({ item, onView }) => {
  const confidencePct = Math.round((item.confidence ?? 0.9) * 100);
  const border = STATUS_BORDER[item.health ?? 'healthy'];

  return (
    <article
      className={`group relative rounded-xl p-5 bg-[rgba(7,16,12,0.65)] border ${border} shadow-[0_20px_60px_rgba(0,0,0,0.45)] backdrop-blur-md hover:shadow-[0_24px_72px_rgba(0,0,0,0.6)] transition-transform duration-300 hover:-translate-y-2 overflow-hidden`}
    >
      {/* background micro-motion */}
      <div className="pointer-events-none absolute -inset-6 bg-[url('/placeholder.svg')] bg-center bg-cover opacity-0 group-hover:opacity-[0.06] scale-110 blur-md transition-all" />

      <div className="relative z-10 flex items-center gap-2 text-white/90 text-xs">
        <span className="inline-flex items-center gap-1 px-2 py-1 rounded bg-black/40 border border-white/10">
          {TYPE_ICON[item.type]}
          <span className="capitalize">{item.type}</span>
        </span>
        {item.endangered && (
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded bg-red-500/20 border border-red-400/40 text-red-200">
            <Leaf className="w-3 h-3" /> Endangered
          </span>
        )}
      </div>

      <h3 className="relative z-10 text-white font-semibold text-lg leading-snug mt-3">
        {item.title}
      </h3>
      <p className="relative z-10 text-white/75 mt-2 text-sm leading-relaxed line-clamp-2">
        {item.description}
      </p>

      <div className="relative z-10 mt-3 flex items-center justify-between text-xs text-white/75">
        <div className="flex items-center gap-2">
          {item.location && (
            <span className="inline-flex items-center gap-1"><MapPin className="w-3 h-3" /> {item.location}</span>
          )}
          <span className="inline-flex items-center gap-1"><Activity className="w-3 h-3" /> {confidencePct}%</span>
        </div>
        <button
          onClick={() => onView(item)}
          className="relative z-10 inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#86C232] text-black text-xs font-semibold hover:bg-[#76b028] transition-colors shadow-[0_8px_24px_rgba(134,194,50,0.35)]"
        >
          {item.type === 'alert' ? 'Monitor Area' : 'View Details'}
        </button>
      </div>

      {/* wildlife micro icons on hover */}
      {item.type === 'wildlife' && (
        <div className="pointer-events-none absolute right-2 bottom-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="text-white/80 text-lg">🦜</span>
        </div>
      )}
    </article>
  );
};

export default ResultCard;