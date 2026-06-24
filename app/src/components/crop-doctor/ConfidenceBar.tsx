import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

interface ConfidenceBarProps {
  confidence: number
  delay?: number
}

function getConfidenceColor(confidence: number): string {
  if (confidence >= 85) return '#4CAF50'
  if (confidence >= 60) return '#FF9800'
  return '#E53935'
}

function getConfidenceLabel(confidence: number): string {
  if (confidence >= 85) return 'High Confidence'
  if (confidence >= 60) return 'Moderate Confidence'
  return 'Low Confidence — Consult an expert'
}

export default function ConfidenceBar({ confidence, delay = 0 }: ConfidenceBarProps) {
  const [displayPercent, setDisplayPercent] = useState(0)
  const color = getConfidenceColor(confidence)

  useEffect(() => {
    const timer = setTimeout(() => {
      const duration = 1500
      const startTime = Date.now()

      const animate = () => {
        const elapsed = Date.now() - startTime
        const progress = Math.min(elapsed / duration, 1)
        // Ease out
        const eased = 1 - Math.pow(1 - progress, 3)
        setDisplayPercent(Math.round(eased * confidence))
        if (progress < 1) {
          requestAnimationFrame(animate)
        }
      }

      requestAnimationFrame(animate)
    }, delay)

    return () => clearTimeout(timer)
  }, [confidence, delay])

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        <span
          className="text-sm font-medium"
          style={{ color: '#6B6560', fontFamily: '"Inter", sans-serif' }}
        >
          AI Confidence
        </span>
        <div className="flex items-center gap-3">
          {confidence < 60 && (
            <span
              className="text-xs font-medium px-2 py-0.5 rounded-full"
              style={{
                background: 'rgba(229, 57, 53, 0.1)',
                color: '#E53935',
                fontFamily: '"Inter", sans-serif',
              }}
            >
              We recommend consulting an agricultural expert
            </span>
          )}
          <motion.span
            className="text-2xl font-bold"
            style={{
              color,
              fontFamily: '"Playfair Display", serif',
              fontWeight: 800,
            }}
          >
            {displayPercent}%
          </motion.span>
        </div>
      </div>

      {/* Progress bar track */}
      <div
        className="w-full h-3 rounded-full overflow-hidden"
        style={{ background: '#E8E2DA' }}
      >
        {/* Animated fill */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${confidence}%` }}
          transition={{ duration: 1.5, delay: delay / 1000, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          className="h-full rounded-full"
          style={{ background: color }}
        />
      </div>

      {/* Label */}
      <p
        className="text-xs mt-2"
        style={{ color: '#6B6560', fontFamily: '"Inter", sans-serif' }}
      >
        {getConfidenceLabel(confidence)}
      </p>
    </div>
  )
}
