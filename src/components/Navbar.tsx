import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Settings } from 'lucide-react';

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
        {/* Left: Logo + Company Name */}
        <Link to="/" className="flex items-center gap-3 rounded hover:opacity-90 focus-visible:underline" >
          <div className="h-10 w-10 md:h-12 md:w-12 rounded bg-white/10 border border-white/20 backdrop-blur flex items-center justify-center text-white font-bold">
            NA
          </div>
          <span className="text-white/95 font-semibold tracking-wide hidden sm:inline">Nature AI</span>
          <span className="sr-only">Nature AI Home</span>
        </Link>

        {/* Right: About us, Contact, Log in, Settings */}
        <div className="flex items-center justify-end gap-6 text-[14px] tracking-[0.08em] uppercase">
          <a href="#about" className="text-white/80 hover:text-white/100 transition-colors rounded px-1">About us</a>
          <a href="#contact" className="text-white/80 hover:text-white/100 transition-colors rounded px-1">Contact</a>
          <a href="#login" className="inline-flex items-center rounded-full border border-white/70 px-4 py-2 text-white font-medium transition-all hover:bg-white hover:text-slate-900 hover:shadow-[0_8px_24px_rgba(0,0,0,0.35)]">Log in</a>
          <button aria-label="Settings" className="h-10 w-10 grid place-items-center rounded-full border border-white/30 text-white/90 hover:text-white hover:bg-white/10 transition-colors">
            <Settings className="h-5 w-5" />
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;