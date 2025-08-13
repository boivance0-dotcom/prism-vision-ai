import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import SearchBar from '@/components/SearchBar';

const ResultCard: React.FC<{ title: string; snippet: string; url?: string }> = ({ title, snippet, url }) => {
  return (
    <article className="rounded-xl p-5 bg-[rgba(7,16,12,0.65)] border border-white/15 shadow-[0_20px_60px_rgba(0,0,0,0.45)] backdrop-blur-md hover:border-[#86C232]/40 transition-colors">
      <h3 className="text-white font-semibold text-lg leading-snug">
        {url ? (
          <a href={url} target="_blank" rel="noreferrer" className="hover:underline">
            {title}
          </a>
        ) : (
          title
        )}
      </h3>
      <p className="text-white/70 mt-2 text-sm leading-relaxed">{snippet}</p>
      {url && (
        <p className="text-xs text-white/50 mt-3 truncate">{url}</p>
      )}
    </article>
  );
};

const Results: React.FC = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const query = params.get('q')?.trim() || '';

  const handleSearch = (next: string) => {
    if (!next) return;
    navigate(`/results?q=${encodeURIComponent(next)}`);
  };

  // Placeholder results for design; wire to real data later
  const placeholder = Array.from({ length: 9 }).map((_, i) => ({
    title: `Insight ${i + 1} on "${query || 'Nature'}"`,
    snippet:
      'High-level overview with accurate, concise information. This area presents a brief, readable summary that helps users quickly assess relevance.',
    url: undefined,
  }));

  return (
    <div className="relative z-10 min-h-screen">
      <div className="relative min-h-[60vh] overflow-hidden">
        <div className="hero-gradient-top" />
        <div className="hero-gradient-bottom" />
        <div className="hero-vignette" />

        <div className="relative z-10 container mx-auto px-6 py-10 md:py-14">
          <div className="text-center max-w-3xl mx-auto page-enter">
            <h1 className="hero-title-clean" style={{ fontSize: 'clamp(1.6rem, 4.5vw, 3rem)' }}>
              Results
            </h1>
            <p className="mt-3 text-white/90 text-base md:text-lg">
              {query ? (
                <>
                  Showing results for <span className="text-white font-semibold">"{query}"</span>
                </>
              ) : (
                'Explore curated, high-quality insights.'
              )}
            </p>

            <div className="mt-6">
              <SearchBar onSearch={handleSearch} className="search-input" buttonClassName="search-button" />
            </div>

            <div className="mt-4 flex items-center justify-center gap-3 text-xs text-white/70">
              <span className="px-2 py-1 rounded bg-white/10 border border-white/15">Relevance</span>
              <span className="px-2 py-1 rounded bg-white/10 border border-white/15">Latest</span>
              <span className="px-2 py-1 rounded bg-white/10 border border-white/15">Trusted</span>
            </div>
          </div>

          <div className="mt-10 grid gap-5 md:gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {placeholder.map((r, idx) => (
              <ResultCard key={idx} title={r.title} snippet={r.snippet} url={r.url} />
            ))}
          </div>

          <div className="mt-10 text-center">
            <button
              onClick={() => handleSearch(query)}
              className="cta-outline-white hover-lift"
            >
              Load more
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;