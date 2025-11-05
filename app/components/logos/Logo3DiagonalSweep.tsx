'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function Logo3DiagonalSweep() {
  return (
    <div className="relative w-full h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 overflow-hidden">
      {/* Diagonal sweep lines */}
      <svg className="absolute inset-0 w-full h-full">
        <defs>
          <linearGradient id="sweepGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#a855f7" stopOpacity="0" />
            <stop offset="50%" stopColor="#a855f7" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Animated diagonal lines sweeping across */}
        {[...Array(8)].map((_, i) => (
          <motion.line
            key={i}
            x1="-100%"
            y1="0%"
            x2="100%"
            y2="100%"
            stroke="url(#sweepGradient)"
            strokeWidth="2"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{
              pathLength: [0, 1, 0],
              opacity: [0, 0.8, 0],
              x1: ['-100%', '100%'],
              x2: ['0%', '200%'],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.4,
              ease: 'linear',
            }}
          />
        ))}
      </svg>

      {/* Central content */}
      <div className="relative z-10">
        {/* Diagonal frame lines */}
        <div className="absolute inset-0 -m-20">
          {/* Top-left to center lines */}
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={`tl-${i}`}
              className="absolute bg-gradient-to-br from-purple-500 to-transparent"
              style={{
                width: '2px',
                height: `${150 + i * 30}px`,
                left: `-${80 + i * 20}px`,
                top: `-${80 + i * 20}px`,
                transform: 'rotate(45deg)',
                transformOrigin: 'bottom right',
              }}
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 0.8, delay: 0.3 + i * 0.1 }}
            />
          ))}

          {/* Top-right to center lines */}
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={`tr-${i}`}
              className="absolute bg-gradient-to-bl from-purple-500 to-transparent"
              style={{
                width: '2px',
                height: `${150 + i * 30}px`,
                right: `-${80 + i * 20}px`,
                top: `-${80 + i * 20}px`,
                transform: 'rotate(-45deg)',
                transformOrigin: 'bottom left',
              }}
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 0.8, delay: 0.3 + i * 0.1 }}
            />
          ))}

          {/* Bottom-left to center lines */}
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={`bl-${i}`}
              className="absolute bg-gradient-to-tr from-purple-500 to-transparent"
              style={{
                width: '2px',
                height: `${150 + i * 30}px`,
                left: `-${80 + i * 20}px`,
                bottom: `-${80 + i * 20}px`,
                transform: 'rotate(-45deg)',
                transformOrigin: 'top right',
              }}
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 0.8, delay: 0.3 + i * 0.1 }}
            />
          ))}

          {/* Bottom-right to center lines */}
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={`br-${i}`}
              className="absolute bg-gradient-to-tl from-purple-500 to-transparent"
              style={{
                width: '2px',
                height: `${150 + i * 30}px`,
                right: `-${80 + i * 20}px`,
                bottom: `-${80 + i * 20}px`,
                transform: 'rotate(45deg)',
                transformOrigin: 'top left',
              }}
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 0.8, delay: 0.3 + i * 0.1 }}
            />
          ))}
        </div>

        {/* Logo container */}
        <motion.div
          initial={{ scale: 0, rotate: -45, opacity: 0 }}
          animate={{ scale: 1, rotate: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.5, type: 'spring', stiffness: 100 }}
          className="relative"
        >
          {/* Rotating border effect */}
          <motion.div
            className="absolute -inset-6 border-2 border-purple-500/30"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          />

          <motion.div
            className="absolute -inset-3 border border-purple-500/50"
            animate={{ rotate: -360 }}
            transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
          />

          <motion.div
            animate={{
              boxShadow: [
                '0 0 40px rgba(168, 85, 247, 0.4)',
                '0 0 80px rgba(168, 85, 247, 0.7)',
                '0 0 40px rgba(168, 85, 247, 0.4)',
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="relative p-12 bg-slate-900/90 backdrop-blur-lg border border-purple-500/40"
          >
            <Image
              src="/pcs-logo.png"
              alt="PCS Logo"
              width={300}
              height={300}
              className="w-64 h-64 object-contain"
            />

            {/* Corner accents */}
            <div className="absolute top-0 left-0 w-8 h-8 border-l-4 border-t-4 border-purple-400" />
            <div className="absolute top-0 right-0 w-8 h-8 border-r-4 border-t-4 border-purple-400" />
            <div className="absolute bottom-0 left-0 w-8 h-8 border-l-4 border-b-4 border-purple-400" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-r-4 border-b-4 border-purple-400" />
          </motion.div>
        </motion.div>
      </div>

      {/* Particle trails along diagonals */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute w-3 h-3 bg-purple-400 rounded-full shadow-lg shadow-purple-400/50"
          style={{
            left: '50%',
            top: '50%',
          }}
          animate={{
            x: [0, Math.cos(((i * 45) * Math.PI) / 180) * 400],
            y: [0, Math.sin(((i * 45) * Math.PI) / 180) * 400],
            opacity: [1, 0],
            scale: [1, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.25,
            ease: 'easeOut',
          }}
        />
      ))}

      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-20 text-center"
      >
        <h2 className="text-4xl font-bold text-white mb-2">Przekątne Linie</h2>
        <p className="text-purple-300">Dynamiczne linie przekątne zbiegające się do centrum</p>
      </motion.div>
    </div>
  );
}
