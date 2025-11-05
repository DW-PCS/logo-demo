'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function Logo2HeroLines() {
  return (
    <div className="relative w-full h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-950 overflow-hidden">
      {/* Animated diagonal lines background */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-px bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent"
            style={{
              width: '200%',
              left: '-50%',
              top: `${i * 5}%`,
              transform: 'rotate(-15deg)',
            }}
            animate={{
              x: ['-100%', '100%'],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: 8 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.3,
              ease: 'linear',
            }}
          />
        ))}
      </div>

      {/* Central hero section */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Top lines */}
        <div className="relative mb-12">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={`top-${i}`}
              className="h-px bg-gradient-to-r from-transparent via-indigo-400 to-transparent mb-4"
              style={{ width: `${300 - i * 50}px` }}
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 1, delay: i * 0.2 }}
            />
          ))}
        </div>

        {/* Logo container with side lines */}
        <div className="relative">
          {/* Left decorative lines */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-full pr-8">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={`left-${i}`}
                className="h-px bg-gradient-to-l from-indigo-400 to-transparent mb-3"
                style={{ width: `${80 + i * 20}px` }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.5 + i * 0.1 }}
              />
            ))}
          </div>

          {/* Right decorative lines */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full pl-8">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={`right-${i}`}
                className="h-px bg-gradient-to-r from-indigo-400 to-transparent mb-3"
                style={{ width: `${80 + i * 20}px` }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.5 + i * 0.1 }}
              />
            ))}
          </div>

          {/* Main logo */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3, type: 'spring' }}
            className="relative"
          >
            <div className="relative">
              {/* Corner brackets */}
              <div className="absolute -inset-4">
                <div className="absolute top-0 left-0 w-12 h-12 border-l-2 border-t-2 border-indigo-400" />
                <div className="absolute top-0 right-0 w-12 h-12 border-r-2 border-t-2 border-indigo-400" />
                <div className="absolute bottom-0 left-0 w-12 h-12 border-l-2 border-b-2 border-indigo-400" />
                <div className="absolute bottom-0 right-0 w-12 h-12 border-r-2 border-b-2 border-indigo-400" />
              </div>

              <motion.div
                animate={{
                  boxShadow: [
                    '0 0 30px rgba(99, 102, 241, 0.3)',
                    '0 0 60px rgba(99, 102, 241, 0.6)',
                    '0 0 30px rgba(99, 102, 241, 0.3)',
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="p-12 bg-slate-900/80 backdrop-blur-sm border border-indigo-500/30"
              >
                <Image
                  src="/pcs-logo.png"
                  alt="PCS Logo"
                  width={300}
                  height={300}
                  className="w-64 h-64 object-contain"
                />
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Bottom lines */}
        <div className="relative mt-12">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={`bottom-${i}`}
              className="h-px bg-gradient-to-r from-transparent via-indigo-400 to-transparent mt-4"
              style={{ width: `${300 - i * 50}px` }}
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 1, delay: 1 + i * 0.2 }}
            />
          ))}
        </div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
          className="mt-12 text-center"
        >
          <h2 className="text-4xl font-bold text-white mb-2">Linie Hero</h2>
          <p className="text-indigo-300">Symetryczne linie poziome z nawiasami w rogach</p>
        </motion.div>
      </div>

      {/* Animated accent dots */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={`dot-${i}`}
          className="absolute w-2 h-2 bg-indigo-400 rounded-full"
          style={{
            left: `${20 + i * 20}%`,
            top: `${20 + i * 15}%`,
          }}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.3, 1, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.5,
          }}
        />
      ))}
    </div>
  );
}
