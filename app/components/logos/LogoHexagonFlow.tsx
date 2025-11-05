'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';

export default function LogoHexagonFlow() {
  const hexPoints = [...Array(6)].map((_, i) => {
    const angle = (Math.PI / 3) * i - Math.PI / 2;
    return {
      x: Math.cos(angle) * 200,
      y: Math.sin(angle) * 200,
    };
  });

  // Generate hexagon edges (6 segments connecting vertices)
  const hexEdges = hexPoints.map((point, i) => {
    const nextPoint = hexPoints[(i + 1) % hexPoints.length];
    return {
      id: i,
      start: point,
      end: nextPoint,
      length: Math.hypot(nextPoint.x - point.x, nextPoint.y - point.y),
    };
  });

  const [flowingLines] = useState(() => {
    const lines = [];
    const numLines = 12;

    for (let i = 0; i < numLines; i++) {
      const angle = (Math.PI * 2 * i) / numLines;
      const distance = 600;

      lines.push({
        id: i,
        startX: Math.cos(angle) * distance,
        startY: Math.sin(angle) * distance,
        endX: 0,
        endY: 0,
        angle: angle,
        delay: i * 0.3,
      });
    }
    return lines;
  });

  return (
    <div className="relative w-full h-screen flex items-center justify-center bg-black overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="relative w-full h-full flex items-center justify-center">
        <svg className="absolute inset-0 w-full h-full" style={{ overflow: 'visible' }}>
          <defs>
            {flowingLines.map(line => (
              <linearGradient
                key={`gradient-${line.id}`}
                id={`flowGradient-${line.id}`}
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0%" stopColor="rgba(6, 182, 212, 0)" />
                <motion.stop
                  offset="30%"
                  stopColor="rgba(6, 182, 212, 0.8)"
                  animate={{
                    stopColor: [
                      'rgba(6, 182, 212, 0)',
                      'rgba(6, 182, 212, 1)',
                      'rgba(6, 182, 212, 0)',
                    ],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: line.delay,
                    ease: 'easeInOut',
                  }}
                />
                <stop offset="60%" stopColor="rgba(6, 182, 212, 0)" />
              </linearGradient>
            ))}

            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Gradients for hexagon edge traveling lights */}
            {[1, 1.3, 1.6].map((scale, layerIndex) =>
              hexEdges.map((edge) => (
                <linearGradient
                  key={`hex-gradient-${layerIndex}-${edge.id}`}
                  id={`hexGradient-${layerIndex}-${edge.id}`}
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0%" stopColor="rgba(6, 182, 212, 0)" />
                  <stop offset="30%" stopColor="rgba(6, 182, 212, 0.6)" />
                  <stop offset="50%" stopColor="rgba(6, 182, 212, 1)" />
                  <stop offset="70%" stopColor="rgba(6, 182, 212, 0.6)" />
                  <stop offset="100%" stopColor="rgba(6, 182, 212, 0)" />
                </linearGradient>
              ))
            )}
          </defs>

          {flowingLines.map(line => {
            const centerX = typeof window !== 'undefined' ? window.innerWidth / 2 : 960;
            const centerY = typeof window !== 'undefined' ? window.innerHeight / 2 : 540;

            return (
              <g key={line.id}>
                <motion.line
                  x1={centerX + line.startX}
                  y1={centerY + line.startY}
                  x2={centerX + line.endX}
                  y2={centerY + line.endY}
                  stroke="rgba(6, 182, 212, 0.2)"
                  strokeWidth="1"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 2, delay: line.delay * 0.3 }}
                />

                <motion.line
                  x1={centerX + line.startX}
                  y1={centerY + line.startY}
                  x2={centerX + line.endX}
                  y2={centerY + line.endY}
                  stroke={`url(#flowGradient-${line.id})`}
                  strokeWidth="2"
                  filter="url(#glow)"
                  initial={{ pathLength: 0 }}
                  animate={{
                    pathLength: [0, 1, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    delay: line.delay,
                    ease: 'easeInOut',
                  }}
                />

                <motion.circle
                  cx={centerX + line.startX}
                  cy={centerY + line.startY}
                  r="3"
                  fill="#06b6d4"
                  filter="url(#glow)"
                  animate={{
                    cx: [centerX + line.startX, centerX + line.endX, centerX + line.startX],
                    cy: [centerY + line.startY, centerY + line.endY, centerY + line.startY],
                    opacity: [0, 1, 0.8, 1, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    delay: line.delay,
                    ease: 'easeInOut',
                  }}
                />
              </g>
            );
          })}
        </svg>

        <div className="relative z-10">
          {[1, 1.3, 1.6].map((scale, layerIndex) => (
            <motion.svg
              key={layerIndex}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              width="500"
              height="500"
              viewBox="-250 -250 500 500"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: layerIndex * 0.2 }}
            >
              {/* Static background hexagon edges */}
              {hexEdges.map((edge) => (
                <motion.line
                  key={`hex-bg-${edge.id}`}
                  x1={edge.start.x * scale}
                  y1={edge.start.y * scale}
                  x2={edge.end.x * scale}
                  y2={edge.end.y * scale}
                  stroke="rgba(6, 182, 212, 0.3)"
                  strokeWidth="2"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 2, delay: layerIndex * 0.3 + edge.id * 0.1 }}
                />
              ))}

              {/* Traveling light on hexagon edges */}
              {hexEdges.map((edge) => {
                const edgeLength = edge.length * scale;
                return (
                  <motion.line
                    key={`hex-light-${edge.id}`}
                    x1={edge.start.x * scale}
                    y1={edge.start.y * scale}
                    x2={edge.end.x * scale}
                    y2={edge.end.y * scale}
                    stroke={`url(#hexGradient-${layerIndex}-${edge.id})`}
                    strokeWidth="3"
                    strokeDasharray={80}
                    filter="url(#glow)"
                    initial={{ strokeDashoffset: 0 }}
                    animate={{
                      strokeDashoffset: [0, -edgeLength - 80],
                    }}
                    transition={{
                      duration: 0.8,
                      repeat: Infinity,
                      delay: edge.id * 0.2 + layerIndex * 0.1,
                      ease: 'linear',
                    }}
                  />
                );
              })}

              {hexPoints.map((point, i) => (
                <motion.circle
                  key={`vertex-${i}`}
                  cx={point.x * scale}
                  cy={point.y * scale}
                  r="4"
                  fill="#06b6d4"
                  filter="url(#glow)"
                  initial={{ scale: 0 }}
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.6, 1, 0.6],
                  }}
                  transition={{
                    scale: { duration: 2, repeat: Infinity, delay: i * 0.2 + layerIndex * 0.3 },
                    opacity: { duration: 2, repeat: Infinity, delay: i * 0.2 + layerIndex * 0.3 },
                  }}
                />
              ))}
            </motion.svg>
          ))}

          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 0.8, type: 'spring' }}
            className="relative z-10"
          >
            <motion.div
              animate={{
                boxShadow: [
                  '0 0 40px rgba(6, 182, 212, 0.3)',
                  '0 0 70px rgba(6, 182, 212, 0.6)',
                  '0 0 40px rgba(6, 182, 212, 0.3)',
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="relative p-12 bg-black/90 backdrop-blur-md border-2 border-cyan-500/50"
              style={{
                clipPath:
                  'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)',
              }}
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
        </div>
      </div>
    </div>
  );
}
