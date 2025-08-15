import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from '@/components/SearchBar';
import { Switch } from '@/components/ui/switch';

const Search: React.FC = () => {
	const navigate = useNavigate();
	const [safeSearch, setSafeSearch] = useState<boolean>(() => {
		try {
			const v = localStorage.getItem('safeSearch');
			return v ? JSON.parse(v) : true;
		} catch {
			return true;
		}
	});

	useEffect(() => {
		try { localStorage.setItem('safeSearch', JSON.stringify(safeSearch)); } catch {}
	}, [safeSearch]);

	const handleSearch = (query: string) => {
		if (!query) return;
		// Pass safe search flag via query string for future use
		navigate(`/results?q=${encodeURIComponent(query)}&safe=${safeSearch ? '1' : '0'}`);
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-white text-black">
			<div className="w-full max-w-3xl px-6 py-16">
				<div className="flex items-center justify-between mb-6">
					<h1 className="text-2xl md:text-3xl font-bold tracking-tight">All‑in‑One Search</h1>
					<label className="flex items-center gap-3 text-sm">
						<span className="text-gray-700">Safe Search</span>
						<Switch checked={safeSearch} onCheckedChange={setSafeSearch} />
					</label>
				</div>

				<SearchBar
					onSearch={handleSearch}
					className="w-full bg-white border border-gray-300 text-black placeholder:text-gray-400 rounded-full px-6 py-4 shadow"
					buttonClassName="text-gray-700 hover:text-black bg-transparent hover:bg-gray-100 rounded-full"
				/>
			</div>
		</div>
	);
};

export default Search;