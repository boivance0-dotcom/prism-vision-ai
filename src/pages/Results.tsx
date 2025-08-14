import React, { useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import SearchBar from '@/components/SearchBar';
import ResultCard, { ResultItem, ResultType, HealthStatus } from '@/components/results/ResultCard';

const bgMap: Record<string, { url: string; accent: string; heading: string; blurb: string; theme: string }> = {
	nature: { url: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=90&w=3840&h=2160&fit=crop&auto=format', accent: '#86C232', heading: 'Nature Results', blurb: 'Curated nature intelligence and discoveries.', theme: 'forest' },
	forest: { url: 'https://raw.githubusercontent.com/varunsingh3545/search-engine/refs/heads/main/forest.jpg', accent: '#86C232', heading: 'Forest Results', blurb: 'Forest health, conservation, and monitoring insights.', theme: 'forest' },
	wildlife: { url: 'https://images.unsplash.com/photo-1546182990-dffeafbe841d?q=90&w=3840&h=2160&fit=crop&auto=format', accent: '#5C4033', heading: 'Wildlife Results', blurb: 'Species tracking, biodiversity, and habitat updates.', theme: 'wildlife' },
	climate: { url: 'https://raw.githubusercontent.com/varunsingh3545/search-engine/main/climate.jpg', accent: '#4DB6E2', heading: 'Climate Results', blurb: 'Trends, projections, and renewable transitions.', theme: 'climate' },
	marine: { url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=90&w=3840&h=2160&fit=crop&auto=format', accent: '#00B8D9', heading: 'Marine Results', blurb: 'Ocean health, coral status, and marine activity.', theme: 'marine' },
	research: { url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=90&w=3840&h=2160&fit=crop&auto=format', accent: '#2196F3', heading: 'Research Results', blurb: 'Papers, datasets, and field study findings.', theme: 'research' },
	career: { url: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?q=90&w=3840&h=2160&fit=crop&auto=format', accent: '#FFC107', heading: 'Career Results', blurb: 'Roles, skills, and opportunities in sustainability.', theme: 'career' },
	education: { url: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=90&w=3840&h=2160&fit=crop&auto=format', accent: '#1976D2', heading: 'Education Results', blurb: 'Courses, tutorials, and learning resources.', theme: 'education' },
};

const Results: React.FC = () => {
	const [params] = useSearchParams();
	const navigate = useNavigate();
	const query = params.get('q')?.trim() || '';
	const aiParam = (params.get('ai') || 'forest').toLowerCase();
	const theme = bgMap[aiParam] || bgMap.forest;

	const [items, setItems] = useState<ResultItem[]>(() =>
		Array.from({ length: 12 }).map((_, i) => ({
			id: `r-${i}`,
			type: (['project', 'wildlife', 'alert', 'research'] as ResultType[])[i % 4],
			title: `Result ${i + 1}: ${query || 'Insight'}`,
			description: 'Concise summary with high signal, tailored to the selected AI context.',
			location: ['Amazon', 'Congo Basin', 'Sumatra', 'Borneo'][i % 4],
			health: (['healthy', 'stressed', 'critical'] as HealthStatus[])[i % 3],
			confidence: 0.6 + (i % 5) * 0.08,
			endangered: i % 5 === 0,
		}))
	);

	const [showFilters, setShowFilters] = useState(false);
	const [activeItem, setActiveItem] = useState<ResultItem | null>(null);

	const handleSearch = (next: string) => {
		if (!next) return;
		navigate(`/results?q=${encodeURIComponent(next)}&ai=${encodeURIComponent(aiParam)}`);
	};

	const loadMore = () => {
		const start = items.length;
		const more = Array.from({ length: 9 }).map((_, i) => ({
			id: `r-${start + i}`,
			type: (['project', 'wildlife', 'alert', 'research'] as ResultType[])[(start + i) % 4],
			title: `Result ${start + i + 1}: ${query || 'Insight'}`,
			description: 'Additional relevant data appended seamlessly as you scroll.',
			location: ['Amazon', 'Congo Basin', 'Sumatra', 'Borneo'][(start + i) % 4],
			health: (['healthy', 'stressed', 'critical'] as HealthStatus[])[(start + i) % 3],
			confidence: 0.6 + ((start + i) % 5) * 0.08,
			endangered: (start + i) % 5 === 0,
		}));
		setItems((prev) => [...prev, ...more]);
	};

	return (
		<div className="relative z-10 min-h-screen">
			<div className="relative min-h-[60vh] overflow-hidden">
				{/* Themed AI background (no blur) */}
				<div
					className="fixed-bg hero-image-filter"
					style={{ backgroundImage: `url(${theme.url})`, zIndex: 0 as unknown as number }}
					aria-hidden
				/>
				{/* Subtle theme tint overlay */}
				<div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(1200px_800px_at_10%_10%, ${theme.accent}10, transparent 60%), radial-gradient(1000px_700px_at_90%_30%, ${theme.accent}12, transparent 55%)` }} />
				<div className="hero-gradient-top" />
				<div className="hero-gradient-bottom" />
				<div className="hero-vignette" />

				<div className="relative z-10 container mx-auto px-6 py-10 md:py-14">
					<div className="text-center max-w-3xl mx-auto page-enter">
						<h1 className="hero-title-clean" style={{ fontSize: 'clamp(1.6rem, 4.5vw, 3rem)', color: theme.accent }}>
							{theme.heading}
						</h1>
						<p className="mt-3 text-white/90 text-base md:text-lg">
							{query ? (
								<>
									Showing results for <span className="text-white font-semibold">"{query}"</span>
								</>
							) : (
								theme.blurb
							)}
						</p>

						<div className="mt-6">
							<SearchBar onSearch={handleSearch} className="search-input" buttonClassName="search-button" />
						</div>

						<div className="mt-4 flex items-center justify-center gap-3 text-xs text-white/70">
							<button onClick={() => setShowFilters((v) => !v)} className="px-3 py-1 rounded bg-white/10 border border-white/15">
								{showFilters ? 'Hide Filters' : 'Show Filters'}
							</button>
							<span className="px-2 py-1 rounded bg-white/10 border border-white/15">Relevance</span>
							<span className="px-2 py-1 rounded bg-white/10 border border-white/15">Latest</span>
							<span className="px-2 py-1 rounded bg-white/10 border border-white/15">Priority</span>
						</div>
					</div>

					{showFilters && (
						<div className="mt-6 rounded-xl p-5 bg-[rgba(7,16,12,0.65)] border border-white/15 shadow-[0_20px_60px_rgba(0,0,0,0.45)] backdrop-blur-md">
							<div className="grid gap-4 md:grid-cols-4 text-sm text-white/85">
								{/* filter chips here */}
							</div>
						</div>
					)}

					<div className="mt-8 grid gap-5 md:gap-6 sm:grid-cols-2 lg:grid-cols-3">
						{items.map((it) => (
							<ResultCard key={it.id} item={it} onView={setActiveItem} accentColor={theme.accent} theme={theme.theme} />
						))}
					</div>

					<div className="mt-10 text-center">
						<button onClick={loadMore} className="cta-outline-white hover-lift">Load more</button>
					</div>
				</div>
			</div>

			{activeItem && (
				<div className="fixed inset-0 z-50 grid place-items-center">
					<div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setActiveItem(null)} />
					<div className="relative z-10 w-[92%] max-w-3xl rounded-xl p-6 bg-[rgba(7,16,12,0.9)] border border-white/15 shadow-[0_24px_96px_rgba(0,0,0,0.6)]">
						<div className="flex items-center justify-between">
							<h3 className="text-white font-semibold text-lg" style={{ color: theme.accent }}>{activeItem.title}</h3>
							<button className="text-white/70 hover:text-white" onClick={() => setActiveItem(null)}>Close</button>
						</div>
						<p className="text-white/80 mt-2">{activeItem.description}</p>
						<div className="mt-4 h-48 rounded-lg bg-black/30 border border-white/10 grid place-items-center text-white/60">
							Interactive map and media placeholder
						</div>
						<div className="mt-4 flex items-center gap-3">
							<button className="px-3 py-2 rounded-md bg-white text-black text-sm font-semibold">Contribute Data</button>
							<button className="px-3 py-2 rounded-md text-black text-sm font-semibold" style={{ backgroundColor: theme.accent }}>Add Observation</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default Results;