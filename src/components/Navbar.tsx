import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Settings } from 'lucide-react';
import SettingsSheet from '@/components/SettingsSheet';
import SearchBar from '@/components/SearchBar';

const Navbar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const aiMatch = location.pathname.match(/^\/ai\/([^/]+)/);
  const currentAISlug = aiMatch ? aiMatch[1] : undefined;

  const handleSearch = (query: string) => {
    if (!query) return;
    const ai = currentAISlug || 'forest';
    navigate(`/results?q=${encodeURIComponent(query)}&ai=${encodeURIComponent(ai)}`);
  };

  return (
    <header
      className={"fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-black/60 shadow-[0_6px_24px_rgba(0,0,0,0.35)]"}
      role="banner"
    >
      <nav
        className={"mx-auto max-w-7xl flex items-center justify-between gap-4 px-4 md:px-8 h-16"}
        aria-label="Primary"
      >
        {/* Left: Logo + Brand */}
        <Link to="/forest-ai" className="flex items-center gap-3 rounded hover:opacity-90 focus-visible:underline" >
          <div className="h-10 w-10 md:h-12 md:w-12 rounded bg-white/10 border border-white/20 flex items-center justify-center text-white font-bold">
            FA
          </div>
          <span className="text-white/95 font-semibold tracking-wide hidden sm:inline">Forest AI</span>
          <span className="sr-only">Forest AI Home</span>
        </Link>

        {/* Center: Global Search */}
        <div className="flex-1 hidden sm:block">
          <div className="max-w-xl mx-auto">
            <SearchBar onSearch={handleSearch} className="search-input" buttonClassName="search-button" />
          </div>
        </div>

        {/* Right: Links + Settings */}
        <div className="flex items-center justify-end gap-3 md:gap-6 text-[14px] tracking-[0.08em] uppercase">
          <Link to="/login" className="text-white/80 hover:text-white/100 transition-colors rounded px-1">Log in</Link>
          <a href="#about" className="hidden md:inline text-white/80 hover:text-white/100 transition-colors rounded px-1">About us</a>
          <a href="#contact" className="hidden md:inline text-white/80 hover:text-white/100 transition-colors rounded px-1">Contact</a>
          <SettingsSheet>
            <button aria-label="Settings" className="h-10 w-10 grid place-items-center rounded-full border border-white/30 text-white/90 hover:text-white hover:bg-white/10 transition-colors">
              <Settings className="h-5 w-5" />
            </button>
          </SettingsSheet>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;