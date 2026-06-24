import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

interface ConicProgressProps {
  percentage: number
  color: string
  size?: number
  delay?: number
}

export default function ConicProgress({
  percentage,
  color,
  size = 56,
  delay = 0,
}: ConicProgressProps) {
  const [animatedPercent, setAnimatedPercent] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedPercent(percentage)
    }, delay + 100)
    return () => clearTimeout(timer)
  }, [percentage, delay])

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: delay / 1000 }}
      className="relative flex-shrink-0 rounded-full flex items-center justify-center"
      style={{
        width: size,
        height: size,
        background: `conic-gradient(${color} ${animatedPercent * 3.6}deg, #E8E2DA 0deg)`,
        transition: 'background 1.2s ease-out',
      }}
    >
      <div
        className="rounded-full flex items-center justify-center bg-white"
        style={{ width: size - 10, height: size - 10 }}
      >
        <span
          className="text-sm font-bold"
          style={{ color, fontFamily: '"Inter", sans-serif' }}
        >
          {animatedPercent}%
        </span>
      </div>
    </motion.div>
  )
}
