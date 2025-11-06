'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function LogoDotsFlow() {
  const centerX = 520;
  const centerY = 300;

  const dotMargin = 210;
  const dots = [
    { x: dotMargin + 130, y: dotMargin },
    { x: 1000 - dotMargin - 50, y: dotMargin },
    { x: dotMargin + 170, y: 600 - dotMargin },
    { x: 1000 - dotMargin - 100, y: 600 - dotMargin },
  ];

  return (
    <div className="relative w-full aspect-video bg-[#0a0a2e] flex items-center justify-center overflow-hidden">
      {/* Background gradient circles */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-1/3 aspect-square bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-1/3 aspect-square bg-cyan-500/10 rounded-full blur-3xl" />
      </div>

      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1000 600"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Lines from dots to center */}
        {dots.map((dot, index) => {
          const dx = centerX - dot.x;

          const logoPadding = 80;
          const logoPaddingHorizontal = 0;
          const cornerRadius = 5;

          let midX, midY, endX, endY;

          if (index === 0) {
            midX = centerX - logoPaddingHorizontal;
            midY = dot.y;
            endX = midX;
            endY = centerY - logoPadding;
          } else if (index === 1) {
            midX = dot.x - Math.abs(dx) * 0.75;
            midY = dot.y;
            endX = midX;
            endY = centerY - logoPadding;
          } else if (index === 2) {
            midX = centerX - logoPaddingHorizontal;
            midY = dot.y;
            endX = midX;
            endY = centerY + logoPadding;
          } else {
            midX = dot.x - Math.abs(dx) * 0.75;
            midY = dot.y;
            endX = midX;
            endY = centerY + logoPadding;
          }

          const pathData = `M ${dot.x} ${dot.y} L ${
            midX - (index === 0 || index === 2 ? cornerRadius : -cornerRadius)
          } ${midY} Q ${midX} ${midY} ${midX} ${
            midY + (index < 2 ? cornerRadius : -cornerRadius)
          } L ${endX} ${endY}`;

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
                  opacity: [0, 1, 1]
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
              <circle cx={endX} cy={endY} r="2" fill="#4a5568" opacity="0.6" />
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
        className="relative z-10 w-[30%] max-w-[400px] px-4"
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
