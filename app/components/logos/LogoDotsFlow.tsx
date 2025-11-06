'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

export default function LogoDotsFlow() {
  const logoRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [endPositions, setEndPositions] = useState([
    { x: 530, y: 258 },
    { x: 550, y: 250 },
    { x: 540, y: 350 },
    { x: 562.5, y: 350 },
  ]);

  const dots = [
    { x: 340, y: 210 },
    { x: 740, y: 210 },
    { x: 380, y: 390 },
    { x: 690, y: 390 },
  ];

  useEffect(() => {
    const updateEndPositions = () => {
      if (!logoRef.current || !svgRef.current) return;

      const logoRect = logoRef.current.getBoundingClientRect();
      const svgRect = svgRef.current.getBoundingClientRect();

      const viewBox = svgRef.current.viewBox.baseVal;
      const viewBoxWidth = viewBox.width;
      const viewBoxHeight = viewBox.height;

      const scaleX = viewBoxWidth / svgRect.width;
      const scaleY = (viewBoxHeight - 20) / svgRect.height;

      const logoLeftInSVG = (logoRect.left + 120 - svgRect.left) * scaleX;
      const logoRightInSVG = (logoRect.right - svgRect.left) * scaleX;
      const logoTopInSVG = (logoRect.top - svgRect.top) * scaleY - 10;
      const logoBottomInSVG = (logoRect.bottom - svgRect.top) * scaleY + 30;

      const offset = 8;

      setEndPositions([
        { x: logoLeftInSVG + offset, y: logoTopInSVG + offset },
        { x: logoRightInSVG - offset, y: logoTopInSVG - 3 },
        { x: logoLeftInSVG + offset + 10, y: logoBottomInSVG - offset },
        { x: logoRightInSVG - offset + 12.5, y: logoBottomInSVG - offset },
      ]);
    };

    updateEndPositions();
    window.addEventListener('resize', updateEndPositions);

    const timeout = setTimeout(updateEndPositions, 100);

    return () => {
      window.removeEventListener('resize', updateEndPositions);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <div className="relative w-full aspect-video bg-[#0a0a2e] flex items-center justify-center overflow-hidden">
      {/* Background gradient circles */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-1/3 aspect-square bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-1/3 aspect-square bg-cyan-500/10 rounded-full blur-3xl" />
      </div>

      <svg
        ref={svgRef}
        className="absolute inset-0 w-full h-full md:w-[90%] md:h-[90%] lg:w-full lg:h-full md:mx-auto md:my-auto"
        viewBox="0 0 1000 600"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Lines from dots to center */}
        {dots.map((dot, index) => {
          const endPos = endPositions[index];
          let pathData;

          if (index === 0) {
            pathData = `M ${dot.x} ${dot.y} L ${endPos.x - 5} ${dot.y} Q ${endPos.x} ${dot.y} ${
              endPos.x
            } ${dot.y + 5} L ${endPos.x} ${endPos.y}`;
          } else if (index === 1) {
            pathData = `M ${dot.x} ${dot.y} L ${endPos.x + 5} ${dot.y} Q ${endPos.x} ${dot.y} ${
              endPos.x
            } ${dot.y + 5} L ${endPos.x} ${endPos.y}`;
          } else if (index === 2) {
            pathData = `M ${dot.x} ${dot.y} L ${endPos.x - 5} ${dot.y} Q ${endPos.x} ${dot.y} ${
              endPos.x
            } ${dot.y - 5} L ${endPos.x} ${endPos.y}`;
          } else {
            pathData = `M ${dot.x} ${dot.y} L ${endPos.x + 5} ${dot.y} Q ${endPos.x} ${dot.y} ${
              endPos.x
            } ${dot.y - 5} L ${endPos.x} ${endPos.y}`;
          }

          return (
            <g key={index}>
              {/* Static line (gray) */}
              <path d={pathData} stroke="#4a5568" strokeWidth="1" fill="none" opacity="0.3" />

              {/* Animated colored segment */}
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

              {/* End dot near logo */}
              <circle cx={endPos.x} cy={endPos.y} r="2" fill="#4a5568" opacity="0.6" />
            </g>
          );
        })}

        {/* Glow filter for the traveling segments */}
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Dots */}
        {dots.map((dot, index) => (
          <motion.circle
            key={`dot-${index}`}
            cx={dot.x}
            cy={dot.y}
            r="15"
            fill="#d1d5db"
            initial={{ scale: 1 }}
            animate={{
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: index * 0.5,
            }}
          />
        ))}
      </svg>

      {/* Central Logo */}
      <motion.div
        ref={logoRef}
        className="relative z-10 w-[22%] max-w-[400px] px-4"
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
