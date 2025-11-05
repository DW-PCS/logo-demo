'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface Point {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

export default function Logo2ConnectionLines() {
  const [points, setPoints] = useState<Point[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Initialize points around the logo
    const initialPoints: Point[] = [];
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const radius = 300;

    for (let i = 0; i < 20; i++) {
      const angle = (Math.PI * 2 * i) / 20;
      initialPoints.push({
        x: centerX + Math.cos(angle) * radius,
        y: centerY + Math.sin(angle) * radius,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
      });
    }
    setPoints(initialPoints);

    // Animate points
    const interval = setInterval(() => {
      setPoints((prevPoints) =>
        prevPoints.map((point) => {
          let newX = point.x + point.vx;
          let newY = point.y + point.vy;
          let newVx = point.vx;
          let newVy = point.vy;

          // Bounce off edges
          if (newX < 100 || newX > window.innerWidth - 100) {
            newVx = -newVx;
            newX = point.x + newVx;
          }
          if (newY < 100 || newY > window.innerHeight - 100) {
            newVy = -newVy;
            newY = point.y + newVy;
          }

          return { x: newX, y: newY, vx: newVx, vy: newVy };
        })
      );
    }, 50);

    return () => clearInterval(interval);
  }, []);

  if (!mounted) return null;

  const centerX = typeof window !== 'undefined' ? window.innerWidth / 2 : 0;
  const centerY = typeof window !== 'undefined' ? window.innerHeight / 2 : 0;

  return (
    <div className="relative w-full h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900 overflow-hidden">
      {/* SVG for connection lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#4f46e5" stopOpacity="0" />
            <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#4f46e5" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Lines from center to points */}
        {points.map((point, index) => {
          const distance = Math.sqrt(
            Math.pow(point.x - centerX, 2) + Math.pow(point.y - centerY, 2)
          );
          const opacity = Math.max(0, 1 - distance / 400);

          return (
            <motion.line
              key={index}
              x1={centerX}
              y1={centerY}
              x2={point.x}
              y2={point.y}
              stroke="url(#lineGradient)"
              strokeWidth="2"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, delay: index * 0.05 }}
              style={{ opacity }}
            />
          );
        })}

        {/* Lines between nearby points */}
        {points.map((point1, i) =>
          points.slice(i + 1).map((point2, j) => {
            const distance = Math.sqrt(
              Math.pow(point1.x - point2.x, 2) + Math.pow(point1.y - point2.y, 2)
            );
            if (distance < 150) {
              const opacity = 1 - distance / 150;
              return (
                <line
                  key={`${i}-${j}`}
                  x1={point1.x}
                  y1={point1.y}
                  x2={point2.x}
                  y2={point2.y}
                  stroke="#8b5cf6"
                  strokeWidth="1"
                  opacity={opacity * 0.3}
                />
              );
            }
            return null;
          })
        )}
      </svg>

      {/* Animated points */}
      {points.map((point, index) => (
        <motion.div
          key={index}
          className="absolute w-3 h-3 bg-indigo-500 rounded-full shadow-lg shadow-indigo-500/50"
          style={{
            left: point.x - 6,
            top: point.y - 6,
          }}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.6, 1, 0.6],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: index * 0.1,
          }}
        />
      ))}

      {/* Central logo */}
      <motion.div
        className="relative z-10"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
      >
        <div className="relative">
          <motion.div
            animate={{
              boxShadow: [
                '0 0 30px rgba(139, 92, 246, 0.5)',
                '0 0 60px rgba(139, 92, 246, 0.8)',
                '0 0 30px rgba(139, 92, 246, 0.5)',
              ],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
            className="rounded-2xl p-10 bg-slate-900/80 backdrop-blur-md border border-purple-500/30"
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

      {/* Title */}
      <motion.div
        className="absolute bottom-20 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <h2 className="text-4xl font-bold text-white mb-2">Connection Network</h2>
        <p className="text-purple-300">Dynamic particle connections with animated lines</p>
      </motion.div>
    </div>
  );
}
