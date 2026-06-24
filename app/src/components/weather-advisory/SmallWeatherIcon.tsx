import { memo } from 'react'
import { Sun, Cloud, CloudRain, CloudLightning, CloudDrizzle, CloudSun } from 'lucide-react'

interface SmallWeatherIconProps {
  condition: string
  size?: number
  className?: string
}

const SmallWeatherIcon = memo(function SmallWeatherIcon({
  condition,
  size = 40,
  className = '',
}: SmallWeatherIconProps) {
  const c = condition.toLowerCase()
  const style = { width: size, height: size }

  if (c.includes('sun') || c.includes('clear')) {
    return <Sun className={`${className}`} style={{ ...style, color: '#E8C547' }} strokeWidth={1.5} />
  }
  if (c.includes('partly')) {
    return <CloudSun className={`${className}`} style={{ ...style, color: '#E8C547' }} strokeWidth={1.5} />
  }
  if (c.includes('thunder')) {
    return <CloudLightning className={`${className}`} style={{ ...style, color: '#E8C547' }} strokeWidth={1.5} />
  }
  if (c.includes('heavy rain') || c.includes('rain')) {
    return <CloudRain className={`${className}`} style={{ ...style, color: '#42A5F5' }} strokeWidth={1.5} />
  }
  if (c.includes('drizzle') || c.includes('shower')) {
    return <CloudDrizzle className={`${className}`} style={{ ...style, color: '#42A5F5' }} strokeWidth={1.5} />
  }
  return <Cloud className={`${className}`} style={{ ...style, color: '#6B6560' }} strokeWidth={1.5} />
})

export default SmallWeatherIcon
