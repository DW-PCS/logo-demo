'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function Logo5RippleWaves() {
  const waves = [0, 1, 2, 3, 4, 5, 6];

  return (
    <div className="relative w-full h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-teal-950 to-slate-900 overflow-hidden">
      {/* Animated water ripple effect background */}
      <div className="absolute inset-0">
        <svg width="100%" height="100%" className="opacity-10">
          <defs>
            <radialGradient id="rippleGradient">
              <stop offset="0%" stopColor="#14b8a6" stopOpacity="0" />
              <stop offset="50%" stopColor="#14b8a6" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#14b8a6" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#rippleGradient)" />
        </svg>
      </div>

      {/* Ripple waves emanating from center */}
      <div className="relative">
        {waves.map((wave) => (
          <motion.div
            key={wave}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            initial={{ scale: 0, opacity: 0.8 }}
            animate={{
              scale: [0, 3],
              opacity: [0.8, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: wave * 0.6,
              ease: 'easeOut',
            }}
          >
            <div className="w-96 h-96 rounded-full border-4 border-teal-400 shadow-[0_0_30px_rgba(20,184,166,0.5)]" />
          </motion.div>
        ))}

        {/* Secondary ripple set with different timing */}
        {waves.slice(0, 5).map((wave) => (
          <motion.div
            key={`secondary-${wave}`}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            initial={{ scale: 0, opacity: 0.6 }}
            animate={{
              scale: [0, 2.5],
              opacity: [0.6, 0],
            }}
            transition={{
              duration: 3.5,
              repeat: Infinity,
              delay: wave * 0.6 + 0.3,
              ease: 'easeOut',
            }}
          >
            <div className="w-96 h-96 rounded-full border-2 border-cyan-400" />
          </motion.div>
        ))}

        {/* Pulsing inner circles */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.4, 0.8, 0.4],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <div className="w-[30rem] h-[30rem] rounded-full bg-teal-500/10 border-2 border-teal-400/30 shadow-[inset_0_0_50px_rgba(20,184,166,0.3)]" />
        </motion.div>

        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 0.5,
          }}
        >
          <div className="w-[26rem] h-[26rem] rounded-full bg-cyan-500/10 border-2 border-cyan-400/30" />
        </motion.div>

        {/* Central logo with wave distortion effect */}
        <motion.div
          className="relative z-10"
          initial={{ scale: 0, y: 50, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.5, type: 'spring' }}
        >
          <motion.div
            animate={{
              y: [0, -15, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <motion.div
              className="relative"
              animate={{
                boxShadow: [
                  '0 0 40px rgba(20, 184, 166, 0.4), 0 0 80px rgba(20, 184, 166, 0.2)',
                  '0 0 60px rgba(20, 184, 166, 0.6), 0 0 100px rgba(20, 184, 166, 0.3)',
                  '0 0 40px rgba(20, 184, 166, 0.4), 0 0 80px rgba(20, 184, 166, 0.2)',
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            >
              <div className="rounded-3xl p-12 bg-gradient-to-br from-slate-900/95 to-teal-900/40 backdrop-blur-md border-2 border-teal-400/40">
                {/* Animated glow effect around logo */}
                <motion.div
                  className="absolute inset-0 rounded-3xl"
                  animate={{
                    background: [
                      'radial-gradient(circle at 50% 50%, rgba(20, 184, 166, 0.2) 0%, transparent 70%)',
                      'radial-gradient(circle at 50% 50%, rgba(20, 184, 166, 0.4) 0%, transparent 70%)',
                      'radial-gradient(circle at 50% 50%, rgba(20, 184, 166, 0.2) 0%, transparent 70%)',
                    ],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                />
                <Image
                  src="/pcs-logo.png"
                  alt="PCS Logo"
                  width={300}
                  height={300}
                  className="w-64 h-64 object-contain relative z-10"
                />
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Floating particles */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-teal-400 rounded-full"
            style={{
              left: `${50 + (Math.random() - 0.5) * 60}%`,
              top: `${50 + (Math.random() - 0.5) * 60}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* Title */}
      <motion.div
        className="absolute bottom-20 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        <h2 className="text-4xl font-bold text-white mb-2">Ripple Waves</h2>
        <p className="text-teal-300">Continuous water ripple effect with particles</p>
      </motion.div>
    </div>
  );
}
