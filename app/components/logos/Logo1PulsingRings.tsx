'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function Logo1PulsingRings() {
  return (
    <div className="relative w-full h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 overflow-hidden">
      {/* Background animated grid */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f46e5_1px,transparent_1px),linear-gradient(to_bottom,#4f46e5_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div>

      {/* Central logo with pulsing rings */}
      <div className="relative z-10">
        {/* Outer pulsing ring 1 */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.6, 0, 0.6],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <div className="w-96 h-96 rounded-full border-4 border-indigo-500" />
        </motion.div>

        {/* Outer pulsing ring 2 */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.6, 0, 0.6],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1,
          }}
        >
          <div className="w-96 h-96 rounded-full border-4 border-purple-500" />
        </motion.div>

        {/* Outer pulsing ring 3 */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.6, 0, 0.6],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 2,
          }}
        >
          <div className="w-96 h-96 rounded-full border-4 border-blue-500" />
        </motion.div>

        {/* Middle static ring */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          <div className="w-80 h-80 rounded-full border-2 border-indigo-400 opacity-40" />
        </motion.div>

        {/* Inner rotating ring */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          animate={{
            rotate: -360,
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          <div className="w-72 h-72 rounded-full border-2 border-purple-400 opacity-50" />
        </motion.div>

        {/* Logo with glow effect */}
        <motion.div
          className="relative"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <motion.div
            animate={{
              boxShadow: [
                '0 0 20px rgba(79, 70, 229, 0.5)',
                '0 0 60px rgba(79, 70, 229, 0.8)',
                '0 0 20px rgba(79, 70, 229, 0.5)',
              ],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="rounded-xl p-8 bg-white/10 backdrop-blur-sm"
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
      </div>

      {/* Title */}
      <motion.div
        className="absolute bottom-20 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <h2 className="text-4xl font-bold text-white mb-2">Pulsujące Pierścienie</h2>
        <p className="text-indigo-300">Koncentryczne animowane pierścienie z efektem świecenia</p>
      </motion.div>
    </div>
  );
}
