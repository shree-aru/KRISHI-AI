import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

interface CircularGaugeProps {
  value: number
  maxValue: number
  label: string
  status: string
  statusColor: string
  unit?: string
  delay?: number
}

export default function CircularGauge({
  value,
  maxValue,
  label,
  status,
  statusColor,
  unit = '',
  delay = 0,
}: CircularGaugeProps) {
  const [animatedValue, setAnimatedValue] = useState(0)
  const radius = 26
  const circumference = 2 * Math.PI * radius
  const percentage = Math.min(animatedValue / maxValue, 1)
  const strokeDashoffset = circumference * (1 - percentage)

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedValue(value)
    }, delay + 100)
    return () => clearTimeout(timer)
  }, [value, delay])

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: delay / 1000 }}
      className="flex flex-col items-center gap-2"
      style={{ width: 120 }}
    >
      <div className="relative" style={{ width: 60, height: 60 }}>
        <svg width="60" height="60" viewBox="0 0 60 60">
          <circle
            cx="30"
            cy="30"
            r={radius}
            fill="none"
            stroke="#E8E2DA"
            strokeWidth={6}
          />
          <motion.circle
            cx="30"
            cy="30"
            r={radius}
            fill="none"
            stroke={statusColor}
            strokeWidth={6}
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1, ease: 'easeOut', delay: delay / 1000 }}
            transform="rotate(-90 30 30)"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span
            className="text-sm font-semibold"
            style={{ fontFamily: '"Inter", sans-serif', color: '#2A2A28' }}
          >
            {value}
            {unit}
          </span>
        </div>
      </div>
      <span
        className="text-xs"
        style={{ color: '#6B6560', fontFamily: '"Inter", sans-serif' }}
      >
        {label}
      </span>
      <span
        className="text-[0.6875rem] font-medium px-2 py-0.5 rounded-full"
        style={{
          color: statusColor,
          backgroundColor: `${statusColor}15`,
          fontFamily: '"Inter", sans-serif',
        }}
      >
        {status}
      </span>
    </motion.div>
  )
}
