'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function NotFound() {
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsGlitching(true);
      setTimeout(() => setIsGlitching(false), 200);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Cyberpunk Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,140,0,0.1),transparent_50%)]"></div>
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="grid grid-cols-12 grid-rows-12 h-full w-full">
          {Array.from({ length: 144 }).map((_, i) => (
            <div
              key={i}
              className="border border-gray-800 animate-pulse"
              style={{
                animationDelay: `${i * 0.1}s`,
                animationDuration: '2s'
              }}
            ></div>
          ))}
        </div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-orange-400 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          ></div>
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4">
        {/* Hero Container */}
        <div className="hero-container relative mb-12">
          {/* Environment Effects */}
          <div className="environment absolute inset-0">
            {/* Neon Lines */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-orange-500 to-transparent animate-pulse"></div>
            <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent animate-pulse"></div>
            <div className="absolute top-0 left-0 w-px h-full bg-gradient-to-b from-transparent via-orange-500 to-transparent animate-pulse"></div>
            <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-blue-500 to-transparent animate-pulse"></div>
          </div>

          {/* Glitch Text */}
          <h1 className={`hero glitch layers text-8xl md:text-9xl font-bold text-center ${isGlitching ? 'glitch-active' : ''}`} data-text="404">
            <span>404</span>
          </h1>
        </div>

        {/* Navigation */}
        <div className="mt-12">
          <Link
            href="/"
            className="group relative bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-200 text-center overflow-hidden"
          >
            <span className="relative z-10">GO HOME</span>
            <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </Link>
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        .hero-container {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .environment {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }

        .hero {
          position: relative;
          font-family: 'Orbitron', monospace;
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }

        .glitch {
          position: relative;
          color: #fff;
          font-size: 4rem;
          font-weight: bold;
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }

        .glitch::before,
        .glitch::after {
          content: attr(data-text);
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: transparent;
        }

        .glitch::before {
          animation: glitch-1 0.5s infinite;
          color: #ff6b6b;
          z-index: -1;
        }

        .glitch::after {
          animation: glitch-2 0.5s infinite;
          color: #4ecdc4;
          z-index: -2;
        }

        .glitch-active::before {
          animation: glitch-1 0.2s infinite;
        }

        .glitch-active::after {
          animation: glitch-2 0.2s infinite;
        }

        .layers {
          position: relative;
        }

        .layers::before,
        .layers::after {
          content: attr(data-text);
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: transparent;
          clip-path: polygon(0 0, 100% 0, 100% 45%, 0 45%);
        }

        .layers::after {
          clip-path: polygon(0 55%, 100% 55%, 100% 100%, 0 100%);
        }

        @keyframes glitch-1 {
          0%, 14%, 15%, 49%, 50%, 99%, 100% {
            transform: translate(0);
          }
          15%, 49% {
            transform: translate(-2px, 2px);
          }
        }

        @keyframes glitch-2 {
          0%, 20%, 21%, 62%, 63%, 99%, 100% {
            transform: translate(0);
          }
          21%, 62% {
            transform: translate(2px, -2px);
          }
        }

        /* Additional cyberpunk effects */
        .hero-container::before {
          content: '';
          position: absolute;
          top: -10px;
          left: -10px;
          right: -10px;
          bottom: -10px;
          background: linear-gradient(45deg, transparent, rgba(255, 140, 0, 0.1), transparent);
          border-radius: 10px;
          animation: scan 3s linear infinite;
        }

        @keyframes scan {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        /* Responsive adjustments */
        @media (max-width: 768px) {
          .glitch {
            font-size: 3rem;
          }
        }
      `}</style>
    </div>
  );
}
