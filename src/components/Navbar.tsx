import React, { useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'backdrop-blur-md bg-black/60 shadow-[0_6px_24px_rgba(0,0,0,0.35)]' : 'bg-transparent'
      }`}
      role="banner"
    >
      <nav
        className={`mx-auto max-w-7xl flex items-center justify-between px-4 md:px-8 ${
          scrolled ? 'h-16' : 'h-20 md:h-22'
        }`}
        aria-label="Primary"
      >
        {/* Left: Logo */}
        <Link to="/" className="flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#86C232] rounded">
          <div className="h-10 w-10 md:h-12 md:w-12 rounded bg-white/10 border border-white/20 backdrop-blur flex items-center justify-center text-white font-bold">
            NA
          </div>
          <span className="sr-only">Nature AI Home</span>
        </Link>

        {/* Center: Links (hidden on mobile) */}
        <div className="hidden md:flex items-center gap-8 text-[14px] tracking-[0.08em] uppercase">
          <a href="#about" className="text-white/90 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#86C232] rounded px-1">About</a>
          <a href="#studios" className="text-white/90 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#86C232] rounded px-1">Studios</a>
          <a href="#research" className="text-white/90 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#86C232] rounded px-1">Research</a>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-3">
          <button aria-label="Search" className="h-10 w-10 rounded-full bg-white/10 border border-white/20 text-white flex items-center justify-center hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#86C232]">
            <Search className="h-5 w-5" />
          </button>
          <a href="#start" className="hidden sm:inline-flex items-center rounded-full border border-white px-4 py-2 text-white font-medium hover:bg-white hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#86C232]">
            Join
          </a>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;