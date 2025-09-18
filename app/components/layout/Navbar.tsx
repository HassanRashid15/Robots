'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const shouldBeScrolled = scrollTop > 100;
      setIsScrolled(shouldBeScrolled);
      // Debug log to see if scroll is working
      console.log('Scroll position:', scrollTop, 'isScrolled:', shouldBeScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/services', label: 'Services' },
    { href: '/products', label: 'Products' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[9999] transition-all duration-500 ${
      isScrolled 
        ? 'bg-gradient-to-r from-slate-900/95 via-black/95 to-slate-900/95 backdrop-blur-md shadow-2xl shadow-orange-500/20' 
        : 'bg-black/20'
    }`}>
      {/* Neon glow effect when scrolled */}
      {isScrolled && (
        <>
          {/* Neon glow background */}
          <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 via-cyan-500/10 to-orange-500/10 animate-pulse"></div>
          
          {/* Top neon border */}
          <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-orange-500 to-transparent shadow-[0_0_10px_rgba(249,115,22,0.8)] animate-pulse"></div>
          
          {/* Bottom neon border */}
          <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_10px_rgba(6,182,212,0.8)] animate-pulse" style={{animationDelay: '0.5s'}}></div>
          
          {/* Left neon glow */}
          <div className="absolute left-0 top-0 w-0.5 h-full bg-gradient-to-b from-transparent via-orange-500/70 to-transparent shadow-[0_0_8px_rgba(249,115,22,0.6)] animate-pulse"></div>
          
          {/* Right neon glow */}
          <div className="absolute right-0 top-0 w-0.5 h-full bg-gradient-to-b from-transparent via-cyan-400/70 to-transparent shadow-[0_0_8px_rgba(6,182,212,0.6)] animate-pulse" style={{animationDelay: '1s'}}></div>
          
          {/* Corner neon accents */}
          <div className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 border-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.8)]"></div>
          <div className="absolute top-0 right-0 w-4 h-4 border-r-2 border-t-2 border-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.8)]"></div>
          <div className="absolute bottom-0 left-0 w-4 h-4 border-l-2 border-b-2 border-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.8)]"></div>
          <div className="absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2 border-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.8)]"></div>
        </>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Decorative SVG line */}
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center pointer-events-none">
          <svg width="570" height="22" viewBox="0 0 570 22" fill="none" xmlns="http://www.w3.org/2000/svg" className={`w-full max-w-4xl h-5 transition-opacity duration-500 ${isScrolled ? 'opacity-60' : 'opacity-30'}`}>
            <line x1="1.80044e-08" y1="0.794054" x2="135.924" y2="0.794066" stroke="white" strokeOpacity="0.19" strokeWidth="0.411892"/>
            <path d="M136.336 1L148.702 21.1827H421.976L432.899 1" stroke={isScrolled ? "#f97316" : "#383838"} strokeWidth="0.411892" className="transition-colors duration-500"/>
            <line x1="433.311" y1="0.794054" x2="569.235" y2="0.794042" stroke="white" strokeOpacity="0.19" strokeWidth="0.411892"/>
          </svg>
        </div>
        
        <div className="flex justify-between items-center h-16 relative z-20">
          {/* Logo - Left Side */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center shadow-lg transition-all duration-500 ${
                  isScrolled ? 'shadow-orange-500/50 shadow-2xl ring-2 ring-orange-500/30' : ''
                }`}>
                  <span className="text-white font-bold text-xl">R</span>
                </div>
                    <span className={`text-2xl font-bold text-white tracking-wider transition-all duration-500 ${
                      isScrolled ? 'text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-cyan-400' : ''
                    }`} style={{ fontFamily: 'var(--font-robot-reavers), "RobotReavers", Arial, sans-serif' }}>ROBOT RAVENS</span>
              </div>
            </Link>
          </div>

              {/* Navigation Links - Center (Desktop) */}
              <div className="hidden desktop-nav">
            <div className="ml-10 flex items-baseline space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-2 text-sm font-medium transition-all duration-300 uppercase tracking-wide relative group ${
                    isScrolled 
                      ? 'text-gray-200 hover:text-orange-400' 
                      : 'text-gray-300 hover:text-orange-400'
                  }`}
                >
                  {link.label}
                  <span className={`absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full ${
                    isScrolled 
                      ? 'bg-gradient-to-r from-orange-500 to-cyan-400' 
                      : 'bg-orange-500'
                  }`}></span>
                  {isScrolled && (
                    <span className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-cyan-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded"></span>
                  )}
                </Link>
              ))}
            </div>
          </div>

              {/* CTA Button - Right Side */}
              <div className="hidden desktop-cta">
            <Link
              href="/contact"
              className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-6 py-2 rounded-lg text-sm font-medium transition-all duration-200 shadow-lg hover:shadow-orange-500/25"
            >
              GET IN TOUCH
            </Link>
          </div>

              {/* Mobile menu button */}
              <div className="mobile-menu-btn">
            <button
              onClick={toggleMenu}
              className="text-gray-300 hover:text-orange-400 focus:outline-none focus:text-orange-400 transition-colors duration-200"
              aria-label="Toggle menu"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

            {/* Mobile menu */}
            {isMenuOpen && (
              <div className="mobile-menu">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-black/95 backdrop-blur-md border-t border-gray-800">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-gray-300 hover:text-orange-400 block px-3 py-2 text-base font-medium transition-colors duration-200 uppercase tracking-wide"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-4">
                <Link
                  href="/contact"
                  className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white block px-3 py-2 rounded-lg text-base font-medium transition-all duration-200 text-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  GET IN TOUCH
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
