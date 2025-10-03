'use client'

import { motion } from 'framer-motion'

export default function FloatingOrbs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Orb 1 - Cyan */}
      <motion.div
        className="absolute w-64 h-64 rounded-full bg-primary-cyan/30 blur-3xl"
        animate={{
          x: [0, 100, 0],
          y: [0, -50, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{
          top: '20%',
          left: '10%',
        }}
      />

      {/* Orb 2 - Pink */}
      <motion.div
        className="absolute w-96 h-96 rounded-full bg-primary-pink/20 blur-3xl"
        animate={{
          x: [0, -80, 0],
          y: [0, 80, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1,
        }}
        style={{
          bottom: '20%',
          right: '10%',
        }}
      />

      {/* Orb 3 - Purple */}
      <motion.div
        className="absolute w-72 h-72 rounded-full bg-primary-purple/25 blur-3xl"
        animate={{
          x: [0, 60, 0],
          y: [0, -60, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2,
        }}
        style={{
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      />

      {/* Orb 4 - Yellow */}
      <motion.div
        className="absolute w-56 h-56 rounded-full bg-yellow-400/15 blur-3xl"
        animate={{
          x: [0, -100, 0],
          y: [0, 50, 0],
          scale: [1, 1.25, 1],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 0.5,
        }}
        style={{
          top: '30%',
          right: '20%',
        }}
      />
    </div>
  )
}

