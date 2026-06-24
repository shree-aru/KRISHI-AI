import { memo } from 'react'
import { motion } from 'framer-motion'
import { Sun, Cloud, CloudRain, CloudLightning, CloudDrizzle, CloudSun } from 'lucide-react'

interface AnimatedWeatherIconProps {
  condition: string
  size?: number
  className?: string
}

const AnimatedWeatherIcon = memo(function AnimatedWeatherIcon({
  condition,
  size = 96,
  className = '',
}: AnimatedWeatherIconProps) {
  const c = condition.toLowerCase()

  // Sunny / Mostly Sunny
  if (c.includes('sun') || c.includes('clear')) {
    return (
      <motion.div
        className={className}
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        style={{ width: size, height: size, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <Sun className="w-full h-full" style={{ color: '#E8C547' }} strokeWidth={1.5} />
      </motion.div>
    )
  }

  // Partly Cloudy
  if (c.includes('partly')) {
    return (
      <div className={`relative ${className}`} style={{ width: size, height: size }}>
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={{ x: [-3, 3, -3] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        >
          <CloudSun className="w-full h-full" style={{ color: '#E8C547' }} strokeWidth={1.5} />
        </motion.div>
      </div>
    )
  }

  // Thunderstorm
  if (c.includes('thunder')) {
    return (
      <div className={`relative ${className}`} style={{ width: size, height: size }}>
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={{ x: [-2, 2, -2] }}
          transition={{ duration: 0.5, repeat: Infinity, ease: 'easeInOut', repeatDelay: 3 }}
        >
          <CloudLightning className="w-full h-full" style={{ color: '#E8C547' }} strokeWidth={1.5} />
        </motion.div>
        <motion.div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 0.3, repeat: Infinity, repeatDelay: 4 }}
        >
          <div
            className="w-1/2 h-1/2 rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(255,255,200,0.4) 0%, transparent 70%)' }}
          />
        </motion.div>
      </div>
    )
  }

  // Heavy Rain / Rain
  if (c.includes('heavy rain') || c.includes('rain')) {
    return (
      <div className={`relative ${className}`} style={{ width: size, height: size }}>
        <div className="absolute inset-0 flex items-center justify-center">
          <CloudRain className="w-full h-full" style={{ color: '#42A5F5' }} strokeWidth={1.5} />
        </div>
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100">
          {[20, 40, 60, 80].map((x, i) => (
            <motion.line
              key={i}
              x1={x}
              y1={55}
              x2={x - 5}
              y2={70}
              stroke="#42A5F5"
              strokeWidth="2"
              strokeLinecap="round"
              animate={{ y1: [55, 60, 55], y2: [70, 75, 70], opacity: [1, 0.3, 1] }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 0.2,
              }}
            />
          ))}
        </svg>
      </div>
    )
  }

  // Drizzle / Scattered Showers
  if (c.includes('drizzle') || c.includes('shower')) {
    return (
      <div className={`relative ${className}`} style={{ width: size, height: size }}>
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={{ x: [-2, 2, -2] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        >
          <CloudDrizzle className="w-full h-full" style={{ color: '#42A5F5' }} strokeWidth={1.5} />
        </motion.div>
      </div>
    )
  }

  // Cloudy
  return (
    <div className={`relative ${className}`} style={{ width: size, height: size }}>
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        animate={{ x: [-5, 5, -5] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      >
        <Cloud className="w-full h-full" style={{ color: '#6B6560' }} strokeWidth={1.5} />
      </motion.div>
    </div>
  )
})

export default AnimatedWeatherIcon
