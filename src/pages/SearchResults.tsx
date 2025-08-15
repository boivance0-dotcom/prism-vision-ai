import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import SearchBar from '@/components/SearchBar';
import SettingsSheet from '@/components/SettingsSheet';
import { Settings } from 'lucide-react';

const TABS: Array<{ key: string; label: string }> = [
	{ key: 'all', label: 'All' },
	{ key: 'images', label: 'Images' },
	{ key: 'videos', label: 'Videos' },
	{ key: 'news', label: 'News' },
	{ key: 'maps', label: 'Maps' },
];

const DOMAIN_POOL = [
	'example.org',
	'nature.org',
	'planetdata.io',
	'wildwatch.net',
	'climatehub.ai',
];

const makeResults = (q: string, type: string, offset: number) =>
	Array.from({ length: 10 }).map((_, i) => {
		const idx = offset + i + 1;
		const domain = DOMAIN_POOL[(offset + i) % DOMAIN_POOL.length];
		const href = `https://${domain}/search?q=${encodeURIComponent(q)}&n=${idx}`;
		return {
			id: `r-${idx}`,
			title: `${q || 'Result'} — ${type.toUpperCase()} ${idx}`,
			url: href,
			displayUrl: `${domain}/…`,
			snippet: 'A concise, relevant summary for this result. Replace with server-provided snippet for higher fidelity.',
			site: domain.replace(/\..*$/, ''),
			date: 'Today',
			thumb: `https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=60&w=${420 + i * 15}&auto=format&fit=crop`,
		};
	});

const SearchResults: React.FC = () => {
	const navigate = useNavigate();
	const [params] = useSearchParams();
	const q = params.get('q')?.trim() || '';
	const t = (params.get('t') || 'all').toLowerCase();
	const page = Math.max(1, Number(params.get('page') || 1));
	const safe = params.get('safe') === '0' ? 0 : 1;

	const results = useMemo(() => makeResults(q, t, (page - 1) * 10), [q, t, page]);

	const onSearch = (query: string) => {
		if (!query) return;
		navigate(`/search/results?q=${encodeURIComponent(query)}&t=${encodeURIComponent(t)}&page=1&safe=${safe}`);
	};

	const setTab = (tab: string) => {
		navigate(`/search/results?q=${encodeURIComponent(q)}&t=${encodeURIComponent(tab)}&page=1&safe=${safe}`);
	};

	const goPage = (p: number) => {
		navigate(`/search/results?q=${encodeURIComponent(q)}&t=${encodeURIComponent(t)}&page=${p}&safe=${safe}`);
	};

	const [localSafe, setLocalSafe] = useState<boolean>(safe === 1);
	useEffect(() => { setLocalSafe(safe === 1); }, [safe]);
	useEffect(() => {
		const nextSafe = localSafe ? 1 : 0;
		navigate(`/search/results?q=${encodeURIComponent(q)}&t=${encodeURIComponent(t)}&page=${page}&safe=${nextSafe}`);
		try { localStorage.setItem('safeSearch', JSON.stringify(localSafe)); } catch {}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [localSafe]);

	return (
		<div className="min-h-screen bg-white text-gray-800">
			{/* Sticky header */}
			<div className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b">
				<div className="mx-auto max-w-6xl px-4 py-3 flex items-center gap-4">
					{/* Brand left */}
					<div className="min-w-[140px]">
						<Link to="/search" className="font-extrabold tracking-tight text-lg md:text-xl text-gray-900">Prism Vision</Link>
					</div>
					{/* Center search */}
					<div className="flex-1 max-w-3xl">
						<SearchBar
							onSearch={onSearch}
							className="w-full bg-white border border-gray-300 rounded-full px-6 py-3 text-[15px] text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500"
							buttonClassName="bg-transparent text-gray-600 hover:bg-gray-100 rounded-full"
						/>
					</div>
					{/* Right controls */}
					<div className="min-w-[200px] flex items-center justify-end gap-3">
						<label className="flex items-center gap-2 text-xs text-gray-700">
							<span>Safe Search</span>
							<input
								type="checkbox"
								checked={localSafe}
								onChange={(e) => setLocalSafe(e.target.checked)}
								className="h-5 w-9 appearance-none rounded-full bg-gray-300 checked:bg-blue-600 relative transition-colors cursor-pointer"
								aria-label="Safe Search"
							/>
						</label>
						<SettingsSheet>
							<button aria-label="Settings" className="h-10 w-10 grid place-items-center rounded-full border border-gray-300 text-gray-800 hover:bg-white">
								<Settings className="h-5 w-5" />
							</button>
						</SettingsSheet>
					</div>
				</div>
				{/* Tabs row */}
				<div className="mx-auto max-w-6xl px-4 pb-2">
					<div className="flex items-center gap-3 text-sm text-gray-600">
						{TABS.map((tab) => (
							<button
								key={tab.key}
								onClick={() => setTab(tab.key)}
								className={`px-3 py-2 rounded-full ${t === tab.key ? 'bg-gray-900 text-white' : 'hover:bg-gray-100'}`}
							>
								{tab.label}
							</button>
						))}
					</div>
				</div>
			</div>

			{/* Main content */}
			<div className="mx-auto max-w-6xl px-4 py-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
				{/* Left: results */}
				<div className="lg:col-span-8">
					<div className="text-sm text-gray-500 mb-3">Showing results for <span className="text-gray-900 font-medium">{q || 'Search'}</span></div>
					<div className="grid gap-6">
						{results.map((r) => (
							<div key={r.id} className="group">
								<div className="text-xs text-gray-500">{r.displayUrl} · {r.date}</div>
								<a href={r.url} className="mt-1 block text-xl leading-snug text-blue-700 hover:underline">
									{r.title}
								</a>
								<div className="mt-1 flex items-start gap-3">
									<p className="text-[15px] text-gray-700 flex-1">{r.snippet}</p>
									<div className="hidden md:block w-28 h-20 rounded-md bg-gray-100 bg-cover bg-center" style={{ backgroundImage: `url(${r.thumb})` }} />
								</div>
								<div className="mt-2 flex items-center gap-3 text-xs text-gray-500">
									<button className="hover:text-gray-700">About this result</button>
									<span>·</span>
									<button className="hover:text-gray-700">Share</button>
									<span>·</span>
									<button className="hover:text-gray-700">Cached</button>
								</div>
							</div>
						))}
					</div>

					{/* Pagination */}
					<div className="mt-6 flex items-center gap-2 text-sm">
						<button onClick={() => goPage(Math.max(1, page - 1))} className="px-3 py-1 rounded border bg-white hover:bg-gray-50">Prev</button>
						<span className="text-gray-600">Page {page}</span>
						<button onClick={() => goPage(page + 1)} className="px-3 py-1 rounded border bg-white hover:bg-gray-50">Next</button>
					</div>
				</div>

				{/* Right: knowledge panel */}
				<aside className="lg:col-span-4">
					<div className="sticky top-28">
						<div className="rounded-2xl border bg-white shadow-sm overflow-hidden">
							<div className="h-40 bg-cover bg-center" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop)' }} />
							<div className="p-4">
								<div className="text-sm text-gray-500">Quick info</div>
								<div className="text-lg font-semibold text-gray-900">{q || 'Topic'}</div>
								<div className="mt-3 grid gap-2 text-sm text-gray-700">
									<div><span className="font-medium">Category:</span> {t.charAt(0).toUpperCase() + t.slice(1)}</div>
									<div><span className="font-medium">Relevance:</span> High</div>
									<div><span className="font-medium">Updated:</span> Today</div>
								</div>
								<div className="mt-4 flex flex-wrap items-center gap-2">
									<button className="px-3 py-1 rounded-full border bg-white hover:bg-gray-50 text-sm">Overview</button>
									<button className="px-3 py-1 rounded-full border bg-white hover:bg-gray-50 text-sm">News</button>
									<button className="px-3 py-1 rounded-full border bg-white hover:bg-gray-50 text-sm">Images</button>
								</div>
							</div>
						</div>
					</div>
				</aside>
			</div>
		</div>
	);
};

export default SearchResults;