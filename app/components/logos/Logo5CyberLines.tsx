'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function Logo5CyberLines() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Animate glitch effect on lines
    const lines = containerRef.current.querySelectorAll('.glitch-line');
    lines.forEach((line, index) => {
      gsap.to(line, {
        scaleX: 0.95,
        duration: 0.1,
        repeat: -1,
        yoyo: true,
        delay: index * 0.3,
        repeatDelay: 2,
      });
    });
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen flex items-center justify-center bg-slate-950 overflow-hidden"
    >
      {/* Cyber grid background */}
      <div className="absolute inset-0">
        <div
          className="w-full h-full opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 255, 255, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 255, 255, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      {/* Scanning lines */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ y: 0 }}
        animate={{ y: '100%' }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        <div className="h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent w-full" />
      </motion.div>

      {/* Central structure */}
      <div className="relative">
        {/* Horizontal cyber lines */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px]">
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={`h-${i}`}
              className="glitch-line absolute left-0 right-0 h-px bg-gradient-to-r from-cyan-500 via-cyan-400 to-cyan-500"
              style={{
                top: `${(i - 5) * 40}px`,
                opacity: 1 - Math.abs(i - 5) * 0.15,
              }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: i * 0.05 }}
            >
              {/* Animated segments */}
              <motion.div
                className="absolute left-0 h-full bg-cyan-400"
                style={{ width: `${30 + Math.random() * 40}%` }}
                animate={{
                  x: ['0%', '200%'],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 2 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            </motion.div>
          ))}
        </div>

        {/* Vertical cyber lines */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px]">
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={`v-${i}`}
              className="glitch-line absolute top-0 bottom-0 w-px bg-gradient-to-b from-cyan-500 via-cyan-400 to-cyan-500"
              style={{
                left: `${(i - 5) * 40}px`,
                opacity: 1 - Math.abs(i - 5) * 0.15,
              }}
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 0.8, delay: i * 0.05 }}
            >
              {/* Animated segments */}
              <motion.div
                className="absolute top-0 w-full bg-cyan-400"
                style={{ height: `${30 + Math.random() * 40}%` }}
                animate={{
                  y: ['0%', '200%'],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 2 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            </motion.div>
          ))}
        </div>

        {/* Corner connections */}
        {[
          { x: -300, y: -250, angle: 45 },
          { x: 300, y: -250, angle: -45 },
          { x: -300, y: 250, angle: -45 },
          { x: 300, y: 250, angle: 45 },
        ].map((corner, i) => (
          <motion.div
            key={`corner-${i}`}
            className="absolute w-32 h-px bg-gradient-to-r from-cyan-400 to-transparent"
            style={{
              left: '50%',
              top: '50%',
              transform: `translate(${corner.x}px, ${corner.y}px) rotate(${corner.angle}deg)`,
            }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, delay: 1 + i * 0.1 }}
          />
        ))}

        {/* Logo container with cyber frame */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5, type: 'spring' }}
          className="relative z-10"
        >
          {/* Animated corner brackets */}
          <div className="absolute -inset-6">
            {[
              'top-0 left-0 border-l-4 border-t-4',
              'top-0 right-0 border-r-4 border-t-4',
              'bottom-0 left-0 border-l-4 border-b-4',
              'bottom-0 right-0 border-r-4 border-b-4',
            ].map((position, i) => (
              <motion.div
                key={i}
                className={`absolute ${position} border-cyan-400 w-16 h-16`}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 + i * 0.1 }}
              >
                {/* Animated corner dots */}
                <motion.div
                  className="absolute w-2 h-2 bg-cyan-400 rounded-full"
                  style={{
                    [position.includes('top') ? 'top' : 'bottom']: 0,
                    [position.includes('left') ? 'left' : 'right']: 0,
                  }}
                  animate={{
                    scale: [1, 1.5, 1],
                    boxShadow: [
                      '0 0 10px rgba(0, 255, 255, 0.5)',
                      '0 0 20px rgba(0, 255, 255, 1)',
                      '0 0 10px rgba(0, 255, 255, 0.5)',
                    ],
                  }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              </motion.div>
            ))}
          </div>

          {/* Digital frame lines */}
          <div className="absolute -inset-2 border-2 border-cyan-500/30" />

          <motion.div
            className="relative p-12 bg-slate-950/95 backdrop-blur-sm border border-cyan-500/50"
            animate={{
              boxShadow: [
                '0 0 30px rgba(0, 255, 255, 0.3), inset 0 0 30px rgba(0, 255, 255, 0.1)',
                '0 0 60px rgba(0, 255, 255, 0.6), inset 0 0 40px rgba(0, 255, 255, 0.2)',
                '0 0 30px rgba(0, 255, 255, 0.3), inset 0 0 30px rgba(0, 255, 255, 0.1)',
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Image
              src="/pcs-logo.png"
              alt="PCS Logo"
              width={300}
              height={300}
              className="w-64 h-64 object-contain"
            />

            {/* Status indicators */}
            <div className="absolute top-4 right-4 flex flex-col gap-2">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="flex items-center gap-2"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }}
                >
                  <div className="w-2 h-2 bg-cyan-400 rounded-full" />
                  <div className="w-12 h-px bg-cyan-400" />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Data flow particles */}
        {[...Array(12)].map((_, i) => {
          const angle = (i * 30 * Math.PI) / 180;
          return (
            <motion.div
              key={`particle-${i}`}
              className="absolute w-1 h-1 bg-cyan-400"
              style={{
                left: '50%',
                top: '50%',
              }}
              animate={{
                x: [0, Math.cos(angle) * 350],
                y: [0, Math.sin(angle) * 350],
                opacity: [1, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.15,
                ease: 'linear',
              }}
            />
          );
        })}
      </div>

      {/* HUD elements */}
      <div className="absolute top-8 left-8 font-mono text-xs text-cyan-400 space-y-1">
        <motion.div animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity }}>
          <div>SYSTEM: ONLINE</div>
          <div>PROTOCOL: ACTIVE</div>
          <div>SIGNAL: 100%</div>
        </motion.div>
      </div>

      <div className="absolute top-8 right-8 font-mono text-xs text-cyan-400 text-right space-y-1">
        <motion.div animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}>
          <div>NODE: CONNECTED</div>
          <div>LATENCY: 12ms</div>
          <div>UPTIME: 99.9%</div>
        </motion.div>
      </div>

      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-20 text-center"
      >
        <h2 className="text-4xl font-bold text-white mb-2">Siatka Cyber</h2>
        <p className="text-cyan-300">Futurystyczne linie cyber ze strumieniami danych</p>
      </motion.div>
    </div>
  );
}
