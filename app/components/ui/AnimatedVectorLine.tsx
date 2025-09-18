'use client';

import { useEffect, useRef, useState } from 'react';

interface AnimatedVectorLineProps {
  className?: string;
  sectionId?: string; // ID of the section where this should animate
  animationSpeed?: number; // Speed of animation (default: 1)
  strokeColor?: string; // Custom stroke color
  strokeWidth?: number; // Custom stroke width
}

const AnimatedVectorLine = ({ 
  className = '', 
  sectionId = 'vector-section',
  animationSpeed = 1,
  strokeColor = '#f97316',
  strokeWidth = 2
}: AnimatedVectorLineProps) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById(sectionId);
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate if section is in view
      const sectionTop = rect.top;
      const sectionBottom = rect.bottom;
      const sectionHeight = rect.height;
      
      // Section is in view if any part is visible
      const inView = sectionTop < windowHeight && sectionBottom > 0;
      setIsInView(inView);
      
      if (inView) {
        // Calculate scroll progress within the section
        const scrollStart = sectionTop;
        const currentScroll = window.scrollY;
        
        // Progress from 0 to 1 as we scroll through the section
        const progress = Math.max(0, Math.min(1, 
          (currentScroll - scrollStart + windowHeight) / (sectionHeight + windowHeight)
        ));
        
        setScrollProgress(progress * animationSpeed);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call

    return () => window.removeEventListener('scroll', handleScroll);
  }, [sectionId, animationSpeed]);

  // Calculate the path length for stroke-dasharray animation
  const pathLength = 523; // Approximate path length based on your SVG

  return (
    <div className={`w-full h-full ${className}`}>
      <svg 
        ref={svgRef}
        width="523" 
        height="283" 
        viewBox="0 0 523 283" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <defs>
          <linearGradient id="animated-gradient" x1="-180.483" y1="119.182" x2="510.084" y2="141.363" gradientUnits="userSpaceOnUse">
            <stop stopColor={strokeColor} stopOpacity="0.8"/>
            <stop offset="0.5" stopColor="#06b6d4" stopOpacity="0.6"/>
            <stop offset="1" stopColor={strokeColor} stopOpacity="0.2"/>
          </linearGradient>
          
          {/* Glow filter for neon effect */}
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Main animated path */}
        <path 
          d="M522.196 139.712C486.686 191.188 399.809 291.553 336.386 281.203C257.107 268.265 361.039 133.067 297.297 94.5668C224.367 50.5181 152.777 142.465 100.751 189.261C48.7237 236.058 -12.112 189.261 26.1511 60.708C56.7617 -42.1345 -45.6955 10.8833 -100.75 50.2476" 
          stroke="url(#animated-gradient)" 
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#glow)"
          style={{
            strokeDasharray: pathLength,
            strokeDashoffset: isInView ? pathLength - (scrollProgress * pathLength) : pathLength,
            transition: 'stroke-dashoffset 0.1s ease-out',
            opacity: isInView ? 1 : 0.3
          }}
        />
        
        {/* Secondary glow path for extra effect */}
        <path 
          d="M522.196 139.712C486.686 191.188 399.809 291.553 336.386 281.203C257.107 268.265 361.039 133.067 297.297 94.5668C224.367 50.5181 152.777 142.465 100.751 189.261C48.7237 236.058 -12.112 189.261 26.1511 60.708C56.7617 -42.1345 -45.6955 10.8833 -100.75 50.2476" 
          stroke={strokeColor} 
          strokeWidth={strokeWidth * 3}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.2"
          style={{
            strokeDasharray: pathLength,
            strokeDashoffset: isInView ? pathLength - (scrollProgress * pathLength * 0.8) : pathLength,
            transition: 'stroke-dashoffset 0.1s ease-out',
            opacity: isInView ? 0.2 : 0.1
          }}
        />
        
        {/* Animated dots along the path */}
        {isInView && (
          <>
            <circle 
              cx={522.196 - (scrollProgress * 622.946)} 
              cy={139.712 + (scrollProgress * 51.491)} 
              r="3" 
              fill={strokeColor}
              opacity={scrollProgress > 0.1 ? 1 : 0}
              style={{
                transition: 'opacity 0.3s ease-out',
                filter: 'url(#glow)'
              }}
            />
            <circle 
              cx={522.196 - (scrollProgress * 622.946 * 0.7)} 
              cy={139.712 + (scrollProgress * 51.491 * 0.7)} 
              r="2" 
              fill="#06b6d4"
              opacity={scrollProgress > 0.3 ? 0.8 : 0}
              style={{
                transition: 'opacity 0.3s ease-out',
                filter: 'url(#glow)'
              }}
            />
          </>
        )}
      </svg>
    </div>
  );
};

export default AnimatedVectorLine;
