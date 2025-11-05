'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function Logo6RadarScan() {
  return (
    <div className="relative w-full h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900 overflow-hidden">
      {/* Grid background */}
      <div className="absolute inset-0 opacity-20">
        <div
          className="w-full h-full"
          style={{
            backgroundImage:
              'linear-gradient(#10b981 1px, transparent 1px), linear-gradient(90deg, #10b981 1px, transparent 1px)',
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      {/* Radar circles */}
      <div className="relative">
        {[1, 2, 3, 4, 5].map((i) => (
          <motion.div
            key={i}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-emerald-500/40"
            style={{
              width: `${i * 120}px`,
              height: `${i * 120}px`,
            }}
            animate={{
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}

        {/* Rotating radar sweep */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          <svg width="600" height="600" className="absolute -translate-x-1/2 -translate-y-1/2">
            <defs>
              <linearGradient id="radarGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#10b981" stopOpacity="0" />
                <stop offset="50%" stopColor="#10b981" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
              </linearGradient>
              <radialGradient id="radarSweep">
                <stop offset="0%" stopColor="#10b981" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
              </radialGradient>
            </defs>
            {/* Sweep beam */}
            <path
              d="M 300 300 L 300 0 A 300 300 0 0 1 520 130 Z"
              fill="url(#radarSweep)"
            />
            {/* Sweep line */}
            <line
              x1="300"
              y1="300"
              x2="300"
              y2="0"
              stroke="#10b981"
              strokeWidth="2"
              filter="drop-shadow(0 0 8px #10b981)"
            />
          </svg>
        </motion.div>

        {/* Scanning dots around the radar */}
        {[...Array(12)].map((_, i) => {
          const angle = (Math.PI * 2 * i) / 12;
          const radius = 250;
          return (
            <motion.div
              key={i}
              className="absolute w-3 h-3 bg-emerald-400 rounded-full shadow-lg shadow-emerald-400/70"
              style={{
                left: `calc(50% + ${Math.cos(angle) * radius}px)`,
                top: `calc(50% + ${Math.sin(angle) * radius}px)`,
              }}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.4, 1, 0.4],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.15,
              }}
            />
          );
        })}

        {/* Corner brackets */}
        <div className="absolute" style={{ width: '500px', height: '500px', left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}>
          {/* Top-left */}
          <div className="absolute top-0 left-0 w-16 h-16 border-l-4 border-t-4 border-emerald-500" />
          {/* Top-right */}
          <div className="absolute top-0 right-0 w-16 h-16 border-r-4 border-t-4 border-emerald-500" />
          {/* Bottom-left */}
          <div className="absolute bottom-0 left-0 w-16 h-16 border-l-4 border-b-4 border-emerald-500" />
          {/* Bottom-right */}
          <div className="absolute bottom-0 right-0 w-16 h-16 border-r-4 border-b-4 border-emerald-500" />
        </div>

        {/* Scanning lines overlay */}
        <motion.div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent"
          animate={{
            y: [0, 600],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'linear',
          }}
        />

        {/* Central logo */}
        <motion.div
          className="relative z-10"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <motion.div
            animate={{
              boxShadow: [
                '0 0 30px rgba(16, 185, 129, 0.4)',
                '0 0 50px rgba(16, 185, 129, 0.8)',
                '0 0 30px rgba(16, 185, 129, 0.4)',
              ],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          >
            <div className="relative">
              {/* Hexagon border effect */}
              <div className="absolute inset-0 flex items-center justify-center">
                <svg width="320" height="320" viewBox="0 0 100 100">
                  <defs>
                    <linearGradient id="hexGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#10b981" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#34d399" stopOpacity="0.4" />
                    </linearGradient>
                  </defs>
                  <polygon
                    points="50,5 95,27.5 95,72.5 50,95 5,72.5 5,27.5"
                    fill="none"
                    stroke="url(#hexGradient)"
                    strokeWidth="2"
                  />
                </svg>
              </div>

              <div className="relative rounded-2xl p-10 bg-slate-900/90 backdrop-blur-md border-2 border-emerald-500/50">
                <Image
                  src="/pcs-logo.png"
                  alt="PCS Logo"
                  width={300}
                  height={300}
                  className="w-60 h-60 object-contain"
                />

                {/* Status indicators */}
                <motion.div
                  className="absolute top-4 right-4 flex gap-2"
                  animate={{ opacity: [1, 0.5, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  <div className="w-2 h-2 bg-emerald-400 rounded-full" />
                  <div className="w-2 h-2 bg-emerald-400 rounded-full" />
                  <div className="w-2 h-2 bg-emerald-400 rounded-full" />
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Data stream effect */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-emerald-400/40 text-xs font-mono"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0, 1, 0],
                y: [0, -50, -100],
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            >
              {Math.random().toString(16).substring(2, 8)}
            </motion.div>
          ))}
        </div>
      </div>

      {/* HUD-style corner info */}
      <div className="absolute top-8 left-8 text-emerald-400 font-mono text-sm">
        <motion.div animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity }}>
          <div>STATUS: ACTIVE</div>
          <div>SIGNAL: 98%</div>
        </motion.div>
      </div>

      <div className="absolute top-8 right-8 text-emerald-400 font-mono text-sm text-right">
        <motion.div animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}>
          <div>SCAN: ONLINE</div>
          <div>RANGE: 360°</div>
        </motion.div>
      </div>

      {/* Title */}
      <motion.div
        className="absolute bottom-20 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <h2 className="text-4xl font-bold text-white mb-2">Radar Scan</h2>
        <p className="text-emerald-300">Military-style radar with scanning sweep</p>
      </motion.div>
    </div>
  );
}
