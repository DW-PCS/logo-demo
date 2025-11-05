'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function Logo4HexagonLines() {
  // Generate hexagon points
  const hexPoints = [...Array(6)].map((_, i) => {
    const angle = (Math.PI / 3) * i - Math.PI / 2;
    return {
      x: Math.cos(angle) * 250,
      y: Math.sin(angle) * 250,
    };
  });

  return (
    <div className="relative w-full h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-cyan-950 to-slate-950 overflow-hidden">
      {/* Hexagon pattern background */}
      <div className="absolute inset-0 opacity-10">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="hexPattern" width="60" height="52" patternUnits="userSpaceOnUse">
              <path
                d="M30,2 L52,15 L52,39 L30,52 L8,39 L8,15 Z"
                fill="none"
                stroke="#06b6d4"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hexPattern)" />
        </svg>
      </div>

      {/* Central hexagon structure */}
      <div className="relative">
        {/* Outer hexagon layers */}
        {[1, 1.3, 1.6].map((scale, layerIndex) => (
          <motion.svg
            key={layerIndex}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            width="600"
            height="600"
            viewBox="-300 -300 600 600"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: layerIndex * 0.2 }}
          >
            {/* Hexagon */}
            <motion.path
              d={`M ${hexPoints.map((p, i) => `${p.x * scale},${p.y * scale} ${i < hexPoints.length - 1 ? 'L' : 'Z'}`).join(' ')}`}
              fill="none"
              stroke="#06b6d4"
              strokeWidth="2"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, delay: layerIndex * 0.3 }}
            />

            {/* Lines from center to vertices */}
            {hexPoints.map((point, i) => (
              <motion.line
                key={i}
                x1="0"
                y1="0"
                x2={point.x * scale}
                y2={point.y * scale}
                stroke={`rgba(6, 182, 212, ${0.3 - layerIndex * 0.1})`}
                strokeWidth="1"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1, delay: 0.5 + i * 0.1 }}
              />
            ))}

            {/* Vertices as glowing dots */}
            {hexPoints.map((point, i) => (
              <motion.circle
                key={`vertex-${i}`}
                cx={point.x * scale}
                cy={point.y * scale}
                r="5"
                fill="#06b6d4"
                initial={{ scale: 0 }}
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.6, 1, 0.6],
                }}
                transition={{
                  scale: { duration: 2, repeat: Infinity, delay: i * 0.2 },
                  opacity: { duration: 2, repeat: Infinity, delay: i * 0.2 },
                }}
              />
            ))}
          </motion.svg>
        ))}

        {/* Rotating outer hexagon */}
        <motion.svg
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          width="700"
          height="700"
          viewBox="-350 -350 700 700"
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        >
          <path
            d={`M ${hexPoints.map((p, i) => `${p.x * 2},${p.y * 2} ${i < hexPoints.length - 1 ? 'L' : 'Z'}`).join(' ')}`}
            fill="none"
            stroke="#06b6d4"
            strokeWidth="1"
            opacity="0.3"
            strokeDasharray="10 10"
          />
        </motion.svg>

        {/* Logo container */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 0.8, type: 'spring' }}
          className="relative z-10"
        >
          {/* Hexagonal border */}
          <div className="absolute -inset-8 flex items-center justify-center">
            <svg width="400" height="400" viewBox="0 0 100 100">
              <defs>
                <linearGradient id="hexGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#0891b2" stopOpacity="0.4" />
                </linearGradient>
              </defs>
              <motion.polygon
                points="50,5 92,28 92,72 50,95 8,72 8,28"
                fill="none"
                stroke="url(#hexGlow)"
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, delay: 1 }}
              />
            </svg>
          </div>

          <motion.div
            animate={{
              boxShadow: [
                '0 0 40px rgba(6, 182, 212, 0.3)',
                '0 0 70px rgba(6, 182, 212, 0.6)',
                '0 0 40px rgba(6, 182, 212, 0.3)',
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="relative p-12 bg-slate-900/90 backdrop-blur-md"
            style={{
              clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)',
            }}
          >
            <Image
              src="/pcs-logo.png"
              alt="PCS Logo"
              width={300}
              height={300}
              className="w-64 h-64 object-contain"
            />
          </motion.div>
        </motion.div>

        {/* Animated data streams along lines */}
        {hexPoints.map((point, i) => (
          <motion.div
            key={`stream-${i}`}
            className="absolute w-2 h-2 bg-cyan-400 rounded-full"
            style={{
              left: '50%',
              top: '50%',
            }}
            animate={{
              x: [0, point.x * 1.6],
              y: [0, point.y * 1.6],
              opacity: [1, 0],
              scale: [1, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.3,
              ease: 'easeOut',
            }}
          />
        ))}

        {/* Orbiting particles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={`orbit-${i}`}
            className="absolute w-3 h-3 bg-cyan-400/60 rounded-full shadow-lg shadow-cyan-400/50"
            style={{
              left: '50%',
              top: '50%',
            }}
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              delay: i * 0.5,
              ease: 'linear',
            }}
          >
            <div
              className="w-full h-full"
              style={{
                transform: `translateX(${200 + i * 20}px)`,
              }}
            />
          </motion.div>
        ))}
      </div>

      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-20 text-center"
      >
        <h2 className="text-4xl font-bold text-white mb-2">Sieć Heksagonalna</h2>
        <p className="text-cyan-300">Geometryczne linie heksagonalne ze strumieniami danych</p>
      </motion.div>
    </div>
  );
}
