'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function LogoDotsFlow() {
  const centerX = 520;
  const centerY = 300;

  const dots = [
    { x: 250, y: 150 },
    { x: 750, y: 150 },
    { x: 250, y: 450 },
    { x: 750, y: 450 },
  ];

  return (
    <div className="relative w-full h-screen bg-[#0a0a2e] flex items-center justify-center overflow-hidden">
      {/* Background gradient circles */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
      </div>

      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1000 600">
        {/* Lines from dots to center */}
        {dots.map((dot, index) => {
          const dx = centerX - dot.x;

          const logoPadding = 80;
          const logoPaddingHorizontal = 0;
          const cornerRadius = 30;

          let midX, midY, endX, endY;

          if (index === 0) {
            // Top-left: shorter horizontal, end at left edge of logo
            midX = centerX - logoPaddingHorizontal;
            midY = dot.y;
            endX = midX;
            endY = centerY - logoPadding;
          } else if (index === 1) {
            // Top-right: longer horizontal, end further from logo
            midX = dot.x - Math.abs(dx) * 0.75;
            midY = dot.y;
            endX = midX;
            endY = centerY - logoPadding;
          } else if (index === 2) {
            // Bottom-left: shorter horizontal, end at left edge of logo
            midX = centerX - logoPaddingHorizontal;
            midY = dot.y;
            endX = midX;
            endY = centerY + logoPadding;
          } else {
            // Bottom-right: longer horizontal, end further from logo
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
                initial={{ strokeDashoffset: 0 }}
                animate={{ strokeDashoffset: -1050 }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: 'linear',
                  delay: index * 1.95,
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
        className="relative z-10"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
      >
        <Image
          src="/pcs-logo.png"
          alt="Polski PCS Logo"
          width={300}
          height={100}
          className="object-contain"
          priority
        />
      </motion.div>
    </div>
  );
}
