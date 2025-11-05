'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';

export default function Logo4AnimatedLines() {
  const containerRef = useRef<HTMLDivElement>(null);
  const linesRef = useRef<(SVGLineElement | null)[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    // Animate lines drawing in
    linesRef.current.forEach((line, index) => {
      if (line) {
        gsap.fromTo(
          line,
          { strokeDashoffset: 1000 },
          {
            strokeDashoffset: 0,
            duration: 2,
            delay: index * 0.1,
            ease: 'power2.inOut',
          }
        );

        // Continuous glow animation
        gsap.to(line, {
          opacity: 0.3,
          duration: 1.5,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: index * 0.2,
        });
      }
    });

    // Animate logo entrance
    const logo = containerRef.current.querySelector('.logo-container');
    if (logo) {
      gsap.fromTo(
        logo,
        { scale: 0, rotation: -180, opacity: 0 },
        {
          scale: 1,
          rotation: 0,
          opacity: 1,
          duration: 1.5,
          ease: 'elastic.out(1, 0.5)',
          delay: 0.5,
        }
      );

      // Continuous floating animation
      gsap.to(logo, {
        y: -20,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    }
  }, []);

  // Generate geometric pattern points
  const centerX = 400;
  const centerY = 400;
  const points = [];
  for (let i = 0; i < 12; i++) {
    const angle = (Math.PI * 2 * i) / 12;
    const radius = 300;
    points.push({
      x: centerX + Math.cos(angle) * radius,
      y: centerY + Math.sin(angle) * radius,
    });
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-violet-950 to-slate-900 overflow-hidden"
    >
      {/* Animated background hexagon pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg width="100%" height="100%" className="absolute inset-0">
          <defs>
            <pattern
              id="hexagons"
              width="100"
              height="87"
              patternUnits="userSpaceOnUse"
              patternTransform="scale(2)"
            >
              <path
                d="M50,0 L93.3,25 L93.3,75 L50,100 L6.7,75 L6.7,25 Z"
                fill="none"
                stroke="#8b5cf6"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hexagons)" />
        </svg>
      </div>

      {/* SVG lines container */}
      <svg
        className="absolute"
        style={{ width: '800px', height: '800px' }}
        viewBox="0 0 800 800"
      >
        <defs>
          <linearGradient id="lineGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8b5cf6" />
            <stop offset="50%" stopColor="#a78bfa" />
            <stop offset="100%" stopColor="#8b5cf6" />
          </linearGradient>

          <filter id="glow">
            <feGaussianBlur stdDeviation="4" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Geometric lines from center to points */}
        {points.map((point, index) => (
          <line
            key={`center-${index}`}
            ref={(el) => {
              linesRef.current[index] = el;
            }}
            x1={centerX}
            y1={centerY}
            x2={point.x}
            y2={point.y}
            stroke="url(#lineGradient1)"
            strokeWidth="3"
            strokeDasharray="1000"
            strokeDashoffset="1000"
            filter="url(#glow)"
          />
        ))}

        {/* Connecting lines between points */}
        {points.map((point, index) => {
          const nextPoint = points[(index + 1) % points.length];
          return (
            <line
              key={`connect-${index}`}
              ref={(el) => {
                linesRef.current[points.length + index] = el;
              }}
              x1={point.x}
              y1={point.y}
              x2={nextPoint.x}
              y2={nextPoint.y}
              stroke="url(#lineGradient1)"
              strokeWidth="2"
              strokeDasharray="1000"
              strokeDashoffset="1000"
              filter="url(#glow)"
            />
          );
        })}

        {/* Animated circles at connection points */}
        {points.map((point, index) => (
          <g key={`point-${index}`}>
            <circle
              cx={point.x}
              cy={point.y}
              r="8"
              fill="#8b5cf6"
              filter="url(#glow)"
              opacity="0.8"
            />
            <circle
              cx={point.x}
              cy={point.y}
              r="4"
              fill="#a78bfa"
            />
          </g>
        ))}
      </svg>

      {/* Central logo */}
      <div className="logo-container relative z-10">
        <div className="relative">
          <div className="absolute inset-0 bg-violet-500/20 blur-3xl rounded-full" />
          <div className="relative rounded-2xl p-10 bg-slate-900/90 backdrop-blur-xl border-2 border-violet-500/50 shadow-2xl shadow-violet-500/30">
            <Image
              src="/pcs-logo.png"
              alt="PCS Logo"
              width={300}
              height={300}
              className="w-64 h-64 object-contain"
            />
          </div>
        </div>
      </div>

      {/* Decorative corner elements */}
      <div className="absolute top-10 left-10 w-20 h-20 border-l-4 border-t-4 border-violet-500 opacity-50" />
      <div className="absolute top-10 right-10 w-20 h-20 border-r-4 border-t-4 border-violet-500 opacity-50" />
      <div className="absolute bottom-10 left-10 w-20 h-20 border-l-4 border-b-4 border-violet-500 opacity-50" />
      <div className="absolute bottom-10 right-10 w-20 h-20 border-r-4 border-b-4 border-violet-500 opacity-50" />

      {/* Title */}
      <div className="absolute bottom-20 text-center">
        <h2 className="text-4xl font-bold text-white mb-2">Geometric Lines</h2>
        <p className="text-violet-300">GSAP animated geometric patterns</p>
      </div>
    </div>
  );
}
