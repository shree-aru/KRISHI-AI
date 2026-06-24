import { motion } from 'framer-motion'
import { Droplets } from 'lucide-react'
import type { WeatherDay } from '@/data/weatherData'
import SmallWeatherIcon from './SmallWeatherIcon'

interface ForecastCardProps {
  day: WeatherDay
  index: number
}

export default function ForecastCard({ day, index }: ForecastCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
      }}
      whileHover={{ y: -4, boxShadow: '0 8px 24px rgba(0,0,0,0.1)' }}
      className="flex flex-col items-center rounded-2xl p-4 transition-shadow duration-300 flex-shrink-0"
      style={{
        background: '#FFFCF7',
        boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
        minWidth: 160,
      }}
    >
      <span
        className="text-xs font-medium uppercase tracking-[0.08em]"
        style={{ color: '#6B6560', fontFamily: '"Inter", sans-serif' }}
      >
        {day.day}
      </span>
      <span
        className="text-[0.6875rem] mt-0.5"
        style={{ color: '#6B6560', fontFamily: '"Inter", sans-serif' }}
      >
        {day.date}
      </span>

      <div className="my-3">
        <SmallWeatherIcon condition={day.condition} size={40} />
      </div>

      <div className="flex items-center gap-1.5 mb-1">
        <span
          className="text-base font-semibold"
          style={{ color: '#E53935', fontFamily: '"Inter", sans-serif' }}
        >
          {day.tempHigh}°
        </span>
        <span
          className="text-sm"
          style={{ color: '#42A5F5', fontFamily: '"Inter", sans-serif' }}
        >
          / {day.tempLow}°
        </span>
      </div>

      <span
        className="text-xs text-center mb-2"
        style={{ color: '#2A2A28', fontFamily: '"Inter", sans-serif' }}
      >
        {day.condition}
      </span>

      {day.rainfall > 0 && (
        <div
          className="flex items-center gap-1 px-2 py-1 rounded-full mb-2"
          style={{ backgroundColor: '#42A5F515' }}
        >
          <Droplets className="w-3 h-3" style={{ color: '#42A5F5' }} />
          <span
            className="text-[0.6875rem]"
            style={{ color: '#42A5F5', fontFamily: '"Inter", sans-serif' }}
          >
            {Math.round((day.rainfall / 50) * 100)}%
          </span>
        </div>
      )}

      <div
        className="w-full h-px my-1"
        style={{ backgroundColor: '#E8E2DA' }}
      />

      <p
        className="text-[0.6875rem] text-center italic mt-1 leading-relaxed"
        style={{ color: '#2D5A3D', fontFamily: '"Inter", sans-serif' }}
      >
        {getFarmTip(day.condition)}
      </p>
    </motion.div>
  )
}

function getFarmTip(condition: string): string {
  const c = condition.toLowerCase()
  if (c.includes('sun')) return 'Irrigate early morning; avoid midday heat'
  if (c.includes('partly')) return 'Good for light fieldwork & weeding'
  if (c.includes('thunder')) return 'Prepare drainage; postpone spraying'
  if (c.includes('heavy rain')) return 'Good rain for paddy transplanting'
  if (c.includes('rain')) return 'Check drainage; delay fertilizing'
  if (c.includes('drizzle') || c.includes('shower')) return 'Monitor fields for waterlogging'
  if (c.includes('cloud')) return 'Good day for fertilizer application'
  return 'Good conditions for general farm work'
}
