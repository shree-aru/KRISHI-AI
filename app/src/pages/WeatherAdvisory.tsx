import { useState, useEffect, useMemo } from 'react'
import { motion } from 'framer-motion'
import {
  CloudSun,
  MapPin,
  Droplets,
  Wind,
  Sun,
  CloudRain,
  Sparkles,
  Check,
  AlertTriangle,
  Info,
  ThermometerSun,
  CloudLightning,
  Snowflake,
  Grid3x3,
  Sprout,
  SprayCan,
  Bug,
  Recycle,
  ArrowRight,
} from 'lucide-react'
import { getGeminiResponse } from '@/lib/gemini'
import {
  weeklyForecast,
  currentWeather,
  aiAdvisory,
  seasonalActivities,
  safetyGuidelines,
  getWeatherGradient,
  getWeatherCardGradient,
} from '@/data/weatherData'
import AnimatedWeatherIcon from '@/components/weather-advisory/AnimatedWeatherIcon'
import ForecastCard from '@/components/weather-advisory/ForecastCard'

const activityIconMap: Record<string, React.ElementType> = {
  Grid3x3,
  Sprout,
  SprayCan,
  Bug,
  Droplets,
  Recycle,
}

const safetyIconMap: Record<string, React.ElementType> = {
  ThermometerSun,
  CloudLightning,
  Snowflake,
}

const priorityConfig = {
  Urgent: { color: '#E53935', bg: '#E5393515' },
  Recommended: { color: '#FF9800', bg: '#FF980015' },
  Optional: { color: '#4CAF50', bg: '#4CAF5015' },
}

const actionTypeConfig = {
  good: { icon: Check, bg: '#4CAF5015', color: '#4CAF50' },
  warning: { icon: AlertTriangle, bg: '#FF980015', color: '#FF9800' },
  info: { icon: Info, bg: '#42A5F515', color: '#42A5F5' },
}

function SectionBadge({ text, light = false }: { text: string; light?: boolean }) {
  return (
    <span
      className="inline-block text-xs font-semibold px-4 py-1.5 rounded-full mb-4"
      style={{
        backgroundColor: light ? 'rgba(255,255,255,0.15)' : '#6B8F7115',
        color: light ? '#fff' : '#2D5A3D',
        fontFamily: '"Inter", sans-serif',
        letterSpacing: '0.02em',
      }}
    >
      {text}
    </span>
  )
}

export default function WeatherAdvisory() {
  const [geminiAdvisory, setGeminiAdvisory] = useState('')
  const [advisoryLoading, setAdvisoryLoading] = useState(false)

  const heroGradient = useMemo(
    () => getWeatherGradient(currentWeather.condition),
    []
  )
  const cardGradient = useMemo(
    () => getWeatherCardGradient(currentWeather.condition),
    []
  )

  useEffect(() => {
    let cancelled = false
    async function fetchAdvisory() {
      setAdvisoryLoading(true)
      const prompt = `Current weather in Krishnagiri, Tamil Nadu: ${currentWeather.temp}°C, ${currentWeather.condition}, humidity ${currentWeather.humidity}%, wind ${currentWeather.windSpeed} km/h. Provide 3-4 concise, actionable farming advice bullet points for smallholder farmers. Each bullet should be one sentence. Format as plain text with each point on a new line starting with "- ". Keep it practical and specific to these conditions.`
      try {
        const res = await getGeminiResponse(prompt)
        if (!cancelled) setGeminiAdvisory(res)
      } catch {
        if (!cancelled) setGeminiAdvisory('')
      } finally {
        if (!cancelled) setAdvisoryLoading(false)
      }
    }
    fetchAdvisory()
    return () => { cancelled = true }
  }, [])

  const parsedAdvisory = geminiAdvisory
    ? geminiAdvisory.split('\n').filter((l) => l.trim().startsWith('-')).map((l) => l.trim().replace(/^- /, ''))
    : aiAdvisory.actions.map((a) => a.text)

  return (
    <div>
      {/* ===== SECTION 1: DYNAMIC HERO ===== */}
      <section
        className="relative flex items-center justify-center text-center px-6"
        style={{
          background: heroGradient,
          minHeight: '45vh',
          paddingTop: '8rem',
          paddingBottom: '3rem',
          transition: 'background 2s ease',
        }}
      >
        <div className="max-w-[1280px] mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-sm mb-4"
            style={{ color: 'rgba(255,255,255,0.5)', fontFamily: '"Inter", sans-serif' }}
          >
            Home / Weather Advisory
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-5"
            style={{ background: '#D4953A' }}
          >
            <CloudSun className="w-7 h-7 text-white" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-white mb-4"
            style={{
              fontFamily: '"Playfair Display", serif',
              fontSize: 'clamp(2rem, 4vw, 3.5rem)',
              fontWeight: 700,
              letterSpacing: '-0.01em',
              lineHeight: 1.1,
            }}
          >
            Weather Advisory
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mx-auto mb-5"
            style={{
              color: 'rgba(255,255,255,0.8)',
              fontFamily: '"Inter", sans-serif',
              fontSize: '1.125rem',
              lineHeight: 1.6,
              maxWidth: 600,
            }}
          >
            Real-time weather updates with AI-powered farming advice tailored to current and forecasted conditions.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex items-center justify-center gap-1.5"
          >
            <MapPin className="w-4 h-4" style={{ color: 'rgba(255,255,255,0.8)' }} />
            <span
              style={{
                color: 'rgba(255,255,255,0.8)',
                fontFamily: '"Inter", sans-serif',
                fontSize: '1rem',
              }}
            >
              {currentWeather.location}
            </span>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-xs mt-1"
            style={{ color: 'rgba(255,255,255,0.5)', fontFamily: '"Inter", sans-serif' }}
          >
            Auto-detected • Updated {currentWeather.updatedAt}
          </motion.p>
        </div>
      </section>

      {/* ===== SECTION 2: CURRENT WEATHER + AI ADVISORY ===== */}
      <section style={{ background: '#FAF6F0', padding: '6rem 1.5rem' }}>
        <div className="max-w-[900px] mx-auto">
          {/* Current Weather Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] }}
            className="rounded-3xl p-6 sm:p-8 md:p-10 text-white overflow-hidden"
            style={{
              background: cardGradient,
              boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
              transition: 'background 2s ease',
            }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left: Main Weather */}
              <div className="flex flex-col items-center md:items-start text-center md:text-left">
                <div className="mb-4">
                  <AnimatedWeatherIcon condition={currentWeather.condition} size={96} />
                </div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 0.3 }}
                >
                  <span
                    style={{
                      fontFamily: '"Playfair Display", serif',
                      fontSize: 'clamp(3rem, 8vw, 5.5rem)',
                      fontWeight: 800,
                      lineHeight: 1,
                      letterSpacing: '-0.02em',
                    }}
                  >
                    {currentWeather.temp}°C
                  </span>
                </motion.div>
                <p
                  className="text-base mt-1"
                  style={{ color: 'rgba(255,255,255,0.8)', fontFamily: '"Inter", sans-serif' }}
                >
                  Feels like {currentWeather.feelsLike}°C
                </p>
                <h3
                  className="text-xl font-semibold mt-3"
                  style={{ fontFamily: '"Inter", sans-serif' }}
                >
                  {currentWeather.condition}
                </h3>
                <p
                  className="text-sm mt-2 leading-relaxed"
                  style={{ color: 'rgba(255,255,255,0.85)', fontFamily: '"Inter", sans-serif', maxWidth: 320 }}
                >
                  {currentWeather.description}
                </p>
                <p
                  className="text-xs mt-3"
                  style={{ color: 'rgba(255,255,255,0.5)', fontFamily: '"Inter", sans-serif' }}
                >
                  Updated {currentWeather.updatedAt}
                </p>
              </div>

              {/* Right: Weather Details Grid */}
              <div className="grid grid-cols-2 gap-3 content-center">
                {[
                  { icon: Droplets, label: 'Humidity', value: `${currentWeather.humidity}%` },
                  { icon: Wind, label: 'Wind Speed', value: `${currentWeather.windSpeed} km/h`, sub: `${currentWeather.windDirection} direction` },
                  { icon: Sun, label: 'UV Index', value: `${currentWeather.uvLabel} (${currentWeather.uvIndex})`, isWarning: currentWeather.uvIndex >= 6 },
                  { icon: CloudRain, label: 'Rain (today)', value: `${currentWeather.rainfall} mm`, sub: `${currentWeather.rainChance}% chance now` },
                ].map((detail, idx) => (
                  <motion.div
                    key={detail.label}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 + idx * 0.08 }}
                    className="rounded-xl p-4"
                    style={{ background: 'rgba(255,255,255,0.1)' }}
                  >
                    <detail.icon className="w-5 h-5 mb-2" style={{ color: 'rgba(255,255,255,0.7)' }} />
                    <p className="text-xs mb-1" style={{ color: 'rgba(255,255,255,0.7)', fontFamily: '"Inter", sans-serif' }}>
                      {detail.label}
                    </p>
                    <p
                      className="text-base font-semibold"
                      style={{
                        color: detail.isWarning ? '#FF9800' : '#fff',
                        fontFamily: '"Inter", sans-serif',
                      }}
                    >
                      {detail.value}
                    </p>
                    {'sub' in detail && detail.sub && (
                      <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.5)', fontFamily: '"Inter", sans-serif' }}>
                        {detail.sub}
                      </p>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* AI Weather Advisory Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-8 rounded-3xl p-6 sm:p-8"
            style={{
              background: '#FFFCF7',
              boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
              borderLeft: '4px solid #D4953A',
            }}
          >
            <div className="flex flex-col sm:flex-row gap-5">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
                style={{ background: 'rgba(212,149,58,0.15)' }}
              >
                <Sparkles className="w-7 h-7" style={{ color: '#D4953A' }} />
              </div>
              <div className="flex-1">
                <h4
                  className="text-lg font-semibold mb-3"
                  style={{ color: '#2D5A3D', fontFamily: '"Inter", sans-serif' }}
                >
                  Gemini AI Farming Advisory
                </h4>

                {advisoryLoading ? (
                  <div className="flex items-center gap-2 text-sm" style={{ color: '#6B6560' }}>
                    <div className="w-4 h-4 border-2 border-[#D4953A] border-t-transparent rounded-full animate-spin" />
                    Generating AI advisory...
                  </div>
                ) : (
                  <>
                    {geminiAdvisory && (
                      <div
                        className="text-sm leading-relaxed mb-4"
                        style={{ color: '#2A2A28', fontFamily: '"Inter", sans-serif' }}
                      >
                        {geminiAdvisory.split('\n').map((line, i) => (
                          <p key={i} className={line.trim().startsWith('-') ? 'ml-4 mb-1' : 'mb-2'}>
                            {line}
                          </p>
                        ))}
                      </div>
                    )}

                    <div className="flex flex-wrap gap-2">
                      {(geminiAdvisory ? parsedAdvisory : aiAdvisory.actions.map((a) => a.text)).map(
                        (action, idx) => {
                          const type = aiAdvisory.actions[idx]?.type || 'info'
                          const cfg = actionTypeConfig[type as keyof typeof actionTypeConfig] || actionTypeConfig.info
                          const Icon = cfg.icon
                          return (
                            <motion.div
                              key={idx}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.4, delay: 0.4 + idx * 0.1 }}
                              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm"
                              style={{ background: cfg.bg, color: cfg.color, fontFamily: '"Inter", sans-serif' }}
                            >
                              <Icon className="w-3.5 h-3.5" />
                              <span className="font-medium">{action}</span>
                            </motion.div>
                          )
                        }
                      )}
                    </div>
                  </>
                )}

                <p className="text-xs mt-4" style={{ color: '#6B6560', fontFamily: '"Inter", sans-serif' }}>
                  Advisory generated just now • Next update: 6 hours
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== SECTION 3: 5-DAY FORECAST ===== */}
      <section style={{ background: '#F5F0E8', padding: '6rem 1.5rem' }}>
        <div className="max-w-[900px] mx-auto">
          <div className="text-center mb-10">
            <SectionBadge text="5-DAY OUTLOOK" />
            <h2
              style={{
                fontFamily: '"Playfair Display", serif',
                fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                fontWeight: 700,
                color: '#2D5A3D',
                lineHeight: 1.1,
                marginBottom: '0.75rem',
              }}
            >
              Plan Your Farming Week
            </h2>
            <p
              style={{
                color: '#6B6560',
                fontFamily: '"Inter", sans-serif',
                fontSize: '1.125rem',
                lineHeight: 1.6,
              }}
            >
              Weather forecast with daily AI-powered farming recommendations.
            </p>
          </div>

          <div className="flex gap-4 overflow-x-auto pb-4" style={{ scrollbarWidth: 'thin' }}>
            {weeklyForecast.map((day, idx) => (
              <ForecastCard key={day.day} day={day} index={idx} />
            ))}
          </div>
        </div>
      </section>

      {/* ===== SECTION 4: SEASONAL FARMING CALENDAR ===== */}
      <section style={{ background: '#FAF6F0', padding: '6rem 1.5rem' }}>
        <div className="max-w-[1280px] mx-auto">
          <div className="text-center mb-10">
            <SectionBadge text="SEASONAL GUIDE" />
            <h2
              style={{
                fontFamily: '"Playfair Display", serif',
                fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                fontWeight: 700,
                color: '#2D5A3D',
                lineHeight: 1.1,
                marginBottom: '0.75rem',
              }}
            >
              {new Date().toLocaleDateString('en-IN', { month: 'long' })} Farming Calendar
            </h2>
            <p
              style={{
                color: '#6B6560',
                fontFamily: '"Inter", sans-serif',
                fontSize: '1.125rem',
                lineHeight: 1.6,
                marginBottom: '1rem',
              }}
            >
              Recommended activities for this month based on Tamil Nadu's seasonal patterns.
            </p>
            <span
              className="inline-flex items-center gap-1.5 text-xs font-semibold px-4 py-1.5 rounded-full"
              style={{
                backgroundColor: 'rgba(66,165,245,0.15)',
                color: '#42A5F5',
                fontFamily: '"Inter", sans-serif',
              }}
            >
              Winter / Rabi Season — Cool, dry weather ideal for vegetables and pulses
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {seasonalActivities.map((activity, idx) => {
              const IconComp = activityIconMap[activity.icon] || Recycle
              const pCfg = priorityConfig[activity.priority]
              return (
                <motion.div
                  key={activity.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.4, delay: idx * 0.08 }}
                  whileHover={{ y: -3, boxShadow: '0 8px 24px rgba(0,0,0,0.1)' }}
                  className="rounded-2xl p-6 transition-shadow duration-300"
                  style={{
                    background: '#FFFCF7',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                  }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: `${activity.iconColor}15` }}
                    >
                      <IconComp className="w-5 h-5" style={{ color: activity.iconColor }} />
                    </div>
                    <span
                      className="text-xs font-medium px-2.5 py-1 rounded-full"
                      style={{
                        backgroundColor: pCfg.bg,
                        color: pCfg.color,
                        fontFamily: '"Inter", sans-serif',
                      }}
                    >
                      {activity.priority}
                    </span>
                  </div>
                  <h4
                    className="text-base font-semibold mb-2"
                    style={{ color: '#2D5A3D', fontFamily: '"Inter", sans-serif' }}
                  >
                    {activity.name}
                  </h4>
                  <p
                    className="text-sm leading-relaxed mb-3"
                    style={{ color: '#6B6560', fontFamily: '"Inter", sans-serif' }}
                  >
                    {activity.description}
                  </p>
                  <div
                    className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full mb-2"
                    style={{
                      backgroundColor: '#6B8F7115',
                      color: '#2D5A3D',
                      fontFamily: '"Inter", sans-serif',
                    }}
                  >
                    {activity.weatherCondition}
                  </div>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {activity.crops.map((crop) => (
                      <span
                        key={crop}
                        className="text-xs px-2 py-0.5 rounded-full"
                        style={{
                          backgroundColor: '#E8E2DA',
                          color: '#5C3D2E',
                          fontFamily: '"Inter", sans-serif',
                        }}
                      >
                        {crop}
                      </span>
                    ))}
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ===== SECTION 5: WEATHER SAFETY GUIDELINES ===== */}
      <section style={{ background: '#2D5A3D', padding: '6rem 1.5rem' }}>
        <div className="max-w-[1280px] mx-auto">
          <div className="text-center mb-10">
            <SectionBadge text="FARMER SAFETY" light />
            <h2
              className="text-white mb-3"
              style={{
                fontFamily: '"Playfair Display", serif',
                fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                fontWeight: 700,
                lineHeight: 1.1,
              }}
            >
              Weather Safety Guidelines
            </h2>
            <p
              style={{
                color: 'rgba(255,255,255,0.7)',
                fontFamily: '"Inter", sans-serif',
                fontSize: '1.125rem',
                lineHeight: 1.6,
                maxWidth: 500,
                margin: '0 auto',
              }}
            >
              Protect yourself and your farm from extreme weather.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {safetyGuidelines.map((guideline, idx) => {
              const IconComp = safetyIconMap[guideline.icon] || ThermometerSun
              return (
                <motion.div
                  key={guideline.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  whileHover={{ y: -3, backgroundColor: 'rgba(255,255,255,0.12)' }}
                  className="rounded-2xl p-6 transition-colors duration-300"
                  style={{
                    background: 'rgba(255,255,255,0.08)',
                    border: '1px solid rgba(255,255,255,0.1)',
                  }}
                >
                  <IconComp className="w-10 h-10 mb-4" style={{ color: guideline.iconColor }} />
                  <h4
                    className="text-lg font-semibold text-white mb-4"
                    style={{ fontFamily: '"Inter", sans-serif' }}
                  >
                    {guideline.title}
                  </h4>
                  <ul className="space-y-2.5">
                    {guideline.tips.map((tip, tidx) => (
                      <li key={tidx} className="flex items-start gap-2">
                        <ArrowRight className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" style={{ color: 'rgba(255,255,255,0.4)' }} />
                        <span
                          className="text-sm leading-relaxed"
                          style={{ color: 'rgba(255,255,255,0.7)', fontFamily: '"Inter", sans-serif' }}
                        >
                          {tip}
                        </span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}
