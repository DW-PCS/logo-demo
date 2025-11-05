'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function Logo3OrbitalRings() {
  return (
    <div className="relative w-full h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 overflow-hidden">
      {/* Animated background stars */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Central logo container */}
      <div className="relative">
        {/* Orbital ring 1 - Horizontal */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          animate={{
            rotateX: [0, 360],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'linear',
          }}
          style={{
            transformStyle: 'preserve-3d',
            perspective: 1000,
          }}
        >
          <div className="relative" style={{ transform: 'rotateX(75deg)' }}>
            <div className="w-96 h-96 rounded-full border-4 border-blue-500 shadow-[0_0_30px_rgba(59,130,246,0.5)]" />
            {/* Orbiting particle 1 */}
            <motion.div
              className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-4 bg-blue-400 rounded-full shadow-lg shadow-blue-400/70"
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'linear',
              }}
              style={{
                transformOrigin: '0 192px',
              }}
            />
          </div>
        </motion.div>

        {/* Orbital ring 2 - Tilted */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          animate={{
            rotateY: [0, 360],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'linear',
          }}
          style={{
            transformStyle: 'preserve-3d',
            perspective: 1000,
          }}
        >
          <div className="relative" style={{ transform: 'rotateY(60deg)' }}>
            <div className="w-[28rem] h-[28rem] rounded-full border-4 border-cyan-500 shadow-[0_0_30px_rgba(6,182,212,0.5)]" />
            {/* Orbiting particle 2 */}
            <motion.div
              className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-4 bg-cyan-400 rounded-full shadow-lg shadow-cyan-400/70"
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: 'linear',
              }}
              style={{
                transformOrigin: '0 224px',
              }}
            />
          </div>
        </motion.div>

        {/* Orbital ring 3 - Vertical */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          animate={{
            rotateZ: [0, 360],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'linear',
          }}
          style={{
            transformStyle: 'preserve-3d',
          }}
        >
          <div className="w-[32rem] h-[32rem] rounded-full border-4 border-indigo-500 shadow-[0_0_30px_rgba(99,102,241,0.5)]" />
          {/* Orbiting particle 3 */}
          <motion.div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-4 bg-indigo-400 rounded-full shadow-lg shadow-indigo-400/70"
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: 'linear',
            }}
            style={{
              transformOrigin: '0 256px',
            }}
          />
        </motion.div>

        {/* Central logo with glow */}
        <motion.div
          className="relative z-10"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <motion.div
            className="relative"
            animate={{
              rotateY: [0, 360],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            <motion.div
              animate={{
                boxShadow: [
                  '0 0 40px rgba(59, 130, 246, 0.4)',
                  '0 0 80px rgba(59, 130, 246, 0.8)',
                  '0 0 40px rgba(59, 130, 246, 0.4)',
                ],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
              }}
              className="rounded-full p-12 bg-slate-900/90 backdrop-blur-sm border-4 border-blue-500/30"
            >
              <Image
                src="/pcs-logo.png"
                alt="PCS Logo"
                width={300}
                height={300}
                className="w-56 h-56 object-contain"
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Title */}
      <motion.div
        className="absolute bottom-20 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <h2 className="text-4xl font-bold text-white mb-2">Orbital Rings</h2>
        <p className="text-blue-300">3D rotating rings with orbiting particles</p>
      </motion.div>
    </div>
  );
}
