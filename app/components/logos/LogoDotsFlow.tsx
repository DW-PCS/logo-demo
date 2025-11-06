'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

interface Position {
  x: number;
  y: number;
}

interface DotConfig {
  angle: number;
  distance: number;
}

export default function LogoDotsFlow() {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 1000, height: 600 });
  const [dotPositions, setDotPositions] = useState<Position[]>([]);
  const [logoCorners, setLogoCorners] = useState<Position[]>([]);
  const [logoCenter, setLogoCenter] = useState<Position>({ x: 500, y: 300 });
  const [logoRadius, setLogoRadius] = useState<number>(120);

  const dotConfigs: DotConfig[] = [
    { angle: 180, distance: 150 },
    { angle: 0, distance: 150 },
    { angle: 180, distance: 120 },
    { angle: 0, distance: 120 },
  ];

  useEffect(() => {
    const updatePositions = () => {
      if (!containerRef.current || !logoRef.current) return;

      const containerRect = containerRef.current.getBoundingClientRect();
      const logoRect = logoRef.current.getBoundingClientRect();

      const isSmallScreen = window.innerWidth < 1200;
      const scaleFactor = isSmallScreen ? 0.85 : 1;

      const viewBoxWidth = 1000;
      const viewBoxHeight = 600;

      setDimensions({ width: viewBoxWidth, height: viewBoxHeight });

      const centerX = viewBoxWidth / 2;
      const centerY = viewBoxHeight / 2;

      const scaleX = viewBoxWidth / containerRect.width;
      const scaleY = viewBoxHeight / containerRect.height;
      const logoWidthInViewBox = logoRect.width * scaleX * scaleFactor;
      const logoHeightInViewBox = logoRect.height * scaleY * scaleFactor;

      const center = { x: centerX, y: centerY };
      setLogoCenter(center);
      setLogoRadius(Math.max(logoWidthInViewBox + 20, logoHeightInViewBox) / 2 + 174);

      const corners: Position[] = [
        { x: centerX / 0.79 - logoWidthInViewBox / 2, y: centerY - logoHeightInViewBox / 1.05 },
        { x: centerX / 1.05 + logoWidthInViewBox / 2, y: centerY - logoHeightInViewBox / 1.18 },
        { x: centerX / 0.85 - logoWidthInViewBox / 6, y: centerY + logoHeightInViewBox / 1 },
        { x: centerX + logoWidthInViewBox / 2, y: centerY + logoHeightInViewBox / 2 },
      ];
      setLogoCorners(corners);

      const dots: Position[] = dotConfigs.map((config, index) => {
        const adjustedDistance = config.distance * scaleFactor;
        const angleRad = (config.angle * Math.PI) / 180;
        const corner = corners[index];
        const verticalOffset = index < 2 ? -20 * scaleFactor : 40 * scaleFactor;
        return {
          x: corner.x + Math.cos(angleRad) * adjustedDistance,
          y: corner.y + verticalOffset,
        };
      });

      setDotPositions(dots);
    };

    updatePositions();
    const resizeObserver = new ResizeObserver(updatePositions);
    if (containerRef.current) resizeObserver.observe(containerRef.current);
    window.addEventListener('resize', updatePositions);
    const timeout = setTimeout(updatePositions, 100);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', updatePositions);
      clearTimeout(timeout);
    };
  }, []);

  const generatePath = (start: Position, end: Position, index: number): string => {
    const isLeft = index === 0 || index === 2;
    const isTop = index < 2;
    const offset = 5;

    if (isTop) {
      if (isLeft) {
        return `M ${start.x} ${start.y} L ${end.x - offset} ${start.y} Q ${end.x} ${start.y} ${
          end.x
        } ${start.y + offset} L ${end.x} ${end.y + 20.25}`;
      } else {
        return `M ${start.x} ${start.y} L ${end.x + offset} ${start.y} Q ${end.x} ${start.y} ${
          end.x
        } ${start.y + offset} L ${end.x} ${end.y}`;
      }
    } else {
      if (isLeft) {
        return `M ${start.x} ${start.y} L ${end.x - offset} ${start.y} Q ${end.x} ${start.y} ${
          end.x
        } ${start.y - offset} L ${end.x} ${end.y}`;
      } else {
        return `M ${start.x} ${start.y} L ${end.x + offset} ${start.y} Q ${end.x} ${start.y} ${
          end.x
        } ${start.y - offset} L ${end.x} ${end.y}`;
      }
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-video bg-[#0a0a2e] flex items-center justify-center overflow-hidden"
    >
      {/* background glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-1/3 aspect-square bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-1/3 aspect-square bg-cyan-500/10 rounded-full blur-3xl" />
      </div>

      <svg
        className="absolute inset-0 w-full h-full"
        viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* --- Animated circular ring around logo --- */}
        <motion.circle
          cx={logoCenter.x + 40}
          cy={logoCenter.y}
          r={logoRadius}
          stroke="#00ffff"
          strokeWidth="15"
          fill="none"
          strokeLinecap="round"
          strokeDasharray="300 800"
          initial={{ rotate: 0, opacity: 0 }}
          animate={{
            rotate: 360,
            opacity: [0, 1, 0],
          }}
          transition={{
            rotate: { duration: 12, repeat: Infinity, ease: 'linear' },
            opacity: { duration: 6, repeat: Infinity, ease: 'easeInOut' },
          }}
          style={{ transformOrigin: `${logoCenter.x}px ${logoCenter.y}px` }}
          filter="url(#glow)"
        />

        {/* --- Second closer circle --- */}
        <motion.circle
          cx={logoCenter.x + 40}
          cy={logoCenter.y}
          r={logoRadius * 0.7} // smaller radius for closer ring
          stroke="#00ffff"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          strokeDasharray="200 600"
          initial={{ rotate: 0, opacity: 0 }}
          animate={{
            rotate: -360, // opposite direction for visual contrast
            opacity: [0, 0.9, 0],
          }}
          transition={{
            rotate: { duration: 10, repeat: Infinity, ease: 'linear' },
            opacity: { duration: 5, repeat: Infinity, ease: 'easeInOut' },
          }}
          style={{ transformOrigin: `${logoCenter.x}px ${logoCenter.y}px` }}
          filter="url(#glow)"
        />

        {/* animated connection paths */}
        {dotPositions.length > 0 &&
          logoCorners.length > 0 &&
          dotPositions.map((dot, index) => {
            const corner = logoCorners[index];
            const pathData = generatePath(dot, corner, index);
            return (
              <g key={`line-${index}`}>
                <path d={pathData} stroke="#4a5568" strokeWidth="1" fill="none" opacity="0.3" />
                <motion.path
                  d={pathData}
                  stroke="#00ffff"
                  strokeWidth="2"
                  fill="none"
                  strokeDasharray="50 1000"
                  initial={{ strokeDashoffset: 0, opacity: 0 }}
                  animate={{
                    strokeDashoffset: -1050,
                    opacity: [0, 1, 1],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: 'linear',
                    delay: index * 1.95,
                    times: [0, 0.01, 1],
                  }}
                  filter="url(#glow)"
                />
                <circle
                  cx={corner.x}
                  cy={corner.y + (index === 0 ? 20.25 : 0)}
                  r="2"
                  fill="#4a5568"
                  opacity="0.6"
                />
              </g>
            );
          })}

        {/* dots */}
        {dotPositions.map((dot, index) => (
          <motion.circle
            key={`dot-${index}`}
            cx={dot.x}
            cy={dot.y}
            r="15"
            fill="#d1d5db"
            initial={{ scale: 1 }}
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
          />
        ))}
      </svg>

      {/* logo */}
      <motion.div
        ref={logoRef}
        className="relative z-10 w-[22%] max-w-[400px] min-w-[180px] px-4 max-lg:w-[30%] max-md:w-[40%]"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
      >
        <Image
          src="/pcs-logo.png"
          alt="Polski PCS Logo"
          width={500}
          height={167}
          className="object-contain w-full h-auto"
          priority
        />
      </motion.div>
    </div>
  );
}
