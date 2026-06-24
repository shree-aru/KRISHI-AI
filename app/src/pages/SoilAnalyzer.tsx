import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Sprout,
  FlaskConical,
  Leaf,
  Calendar,
  Beaker,
  Recycle,
  Shuffle,
  Droplets,
  TestTube,
  Bug,
  Sparkles,
  Info,
  Loader2,
} from 'lucide-react'
import { getGeminiResponse } from '@/lib/gemini'
import {
  cropsDatabase,
  soilTypesList,
  organicFertilizers,
  chemicalFertilizers,
  micronutrients,
  applicationTimeline,
  soilHealthTips,
  calculateCropMatch,
  getPHStatus,
  getNStatus,
  getPStatus,
  getKStatus,
  getMoistureStatus,
  getOverallSoilHealth,
} from '@/data/soilData'
import CircularGauge from '@/components/soil-analyzer/CircularGauge'
import CropMatchCard from '@/components/soil-analyzer/CropMatchCard'

const iconMap: Record<string, React.ElementType> = {
  Recycle,
  Shuffle,
  Droplets,
  Leaf,
  TestTube,
  Bug,
}

type TabType = 'organic' | 'chemical' | 'schedule'

interface FormData {
  ph: string
  nitrogen: string
  phosphorus: string
  potassium: string
  moisture: string
  soilType: string
  farmSize: string
}

const initialForm: FormData = {
  ph: '',
  nitrogen: '',
  phosphorus: '',
  potassium: '',
  moisture: '',
  soilType: '',
  farmSize: '',
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

export default function SoilAnalyzer() {
  const [form, setForm] = useState<FormData>(initialForm)
  const [analyzed, setAnalyzed] = useState(false)
  const [analyzing, setAnalyzing] = useState(false)
  const [activeTab, setActiveTab] = useState<TabType>('organic')
  const [aiSummary, setAiSummary] = useState('')
  const [matchedCrops, setMatchedCrops] = useState<{ crop: typeof cropsDatabase[0]; match: number }[]>([])

  const handleChange = (field: keyof FormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleAnalyze = useCallback(async () => {
    if (!form.ph || !form.nitrogen || !form.phosphorus || !form.potassium || !form.moisture || !form.soilType) return

    setAnalyzing(true)

    const ph = parseFloat(form.ph)
    const n = parseFloat(form.nitrogen)
    const p = parseFloat(form.phosphorus)
    const k = parseFloat(form.potassium)
    const moisture = parseFloat(form.moisture)

    const scored = cropsDatabase
      .map((crop) => ({
        crop,
        match: calculateCropMatch(crop, ph, n, p, k, moisture, form.soilType),
      }))
      .sort((a, b) => b.match - a.match)
      .slice(0, 5)

    setMatchedCrops(scored)

    const prompt = `Given soil parameters: pH ${ph}, Nitrogen ${n} kg/ha, Phosphorus ${p} kg/ha, Potassium ${k} kg/ha, Moisture ${moisture}%, Soil type: ${form.soilType}. Provide a 2-3 sentence summary of the soil health and one key recommendation for improvement. Keep it concise and actionable for a smallholder farmer in Tamil Nadu.`

    try {
      const response = await getGeminiResponse(prompt)
      setAiSummary(response)
    } catch {
      setAiSummary(`Your soil analysis shows pH ${ph} with balanced nutrients. Continue maintaining organic matter levels and monitor phosphorus content regularly.`)
    }

    setAnalyzing(false)
    setAnalyzed(true)

    // Scroll to results
    setTimeout(() => {
      document.getElementById('analysis-results')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 100)
  }, [form])

  const phVal = parseFloat(form.ph) || 0
  const nVal = parseFloat(form.nitrogen) || 0
  const pVal = parseFloat(form.phosphorus) || 0
  const kVal = parseFloat(form.potassium) || 0
  const moistureVal = parseFloat(form.moisture) || 0

  const phStatus = getPHStatus(phVal)
  const nStatus = getNStatus(nVal)
  const pStatus = getPStatus(pVal)
  const kStatus = getKStatus(kVal)
  const moistureStatus = getMoistureStatus(moistureVal)

  const overallHealth = phVal && nVal && pVal && kVal && moistureVal
    ? getOverallSoilHealth(phVal, nVal, pVal, kVal, moistureVal)
    : 0

  const getHealthLabel = (score: number) => {
    if (score >= 80) return { label: 'EXCELLENT', color: '#4CAF50' }
    if (score >= 60) return { label: 'GOOD', color: '#4CAF50' }
    if (score >= 40) return { label: 'NEEDS IMPROVEMENT', color: '#FF9800' }
    return { label: 'POOR', color: '#E53935' }
  }

  const healthInfo = getHealthLabel(overallHealth)

  const formValid = form.ph && form.nitrogen && form.phosphorus && form.potassium && form.moisture && form.soilType

  return (
    <div>
      {/* ===== SECTION 1: PAGE HERO ===== */}
      <section
        className="relative flex items-center justify-center text-center px-6"
        style={{
          background: 'linear-gradient(180deg, #5C3D2E 0%, #2D5A3D 100%)',
          minHeight: '45vh',
          paddingTop: '8rem',
          paddingBottom: '3rem',
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
            Home / Soil Analyzer
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-5"
            style={{ background: '#D4953A' }}
          >
            <Sprout className="w-7 h-7 text-white" />
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
            Soil Analyzer
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mx-auto"
            style={{
              color: 'rgba(255,255,255,0.8)',
              fontFamily: '"Inter", sans-serif',
              fontSize: '1.125rem',
              lineHeight: 1.6,
              maxWidth: 580,
            }}
          >
            Tell us about your soil, and our AI will recommend the best crops, fertilizers, and improvement techniques for your land.
          </motion.p>
        </div>
      </section>

      {/* ===== SECTION 2: SOIL INPUT FORM ===== */}
      <section style={{ background: '#FAF6F0', padding: '6rem 1.5rem' }}>
        <div className="max-w-[800px] mx-auto">
          <div className="text-center mb-10">
            <SectionBadge text="SOIL PARAMETERS" />
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
              Enter Your Soil Details
            </h2>
            <p
              style={{
                color: '#6B6560',
                fontFamily: '"Inter", sans-serif',
                fontSize: '1.125rem',
                lineHeight: 1.6,
              }}
            >
              Fill in the values from your soil test report. Don&apos;t have one? Use our estimate guide below each field.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="rounded-3xl p-6 sm:p-8 md:p-10"
            style={{
              background: '#FFFCF7',
              boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
            }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* pH Level */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.06 }}
              >
                <label className="flex items-center gap-1.5 text-base font-semibold mb-2" style={{ color: '#2D5A3D', fontFamily: '"Inter", sans-serif' }}>
                  Soil pH Level
                  <Info className="w-4 h-4" style={{ color: '#6B6560' }} />
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min="0"
                    max="14"
                    step="0.1"
                    placeholder="e.g., 6.5"
                    value={form.ph}
                    onChange={(e) => handleChange('ph', e.target.value)}
                    className="w-full h-14 rounded-xl px-4 text-base outline-none transition-all duration-200 focus:ring-[3px]"
                    style={{
                      border: '2px solid #E8E2DA',
                      background: '#FAF6F0',
                      fontFamily: '"Inter", sans-serif',
                      color: '#2A2A28',
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = '#6B8F71'
                      e.currentTarget.style.boxShadow = '0 0 0 3px rgba(107,143,113,0.15)'
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = '#E8E2DA'
                      e.currentTarget.style.boxShadow = 'none'
                    }}
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm" style={{ color: '#6B6560', fontFamily: '"Inter", sans-serif' }}>
                    pH
                  </span>
                </div>
                {/* Range Indicator */}
                <div className="mt-2">
                  <div className="w-full h-1.5 rounded-full relative" style={{ background: '#E8E2DA' }}>
                    <div className="absolute left-[42%] right-[46%] h-full rounded-full" style={{ background: '#4CAF5060' }} />
                    {phVal > 0 && (
                      <div
                        className="absolute top-1/2 -translate-y-1/2 w-0 h-0 border-l-[4px] border-r-[4px] border-t-[5px] border-l-transparent border-r-transparent"
                        style={{
                          borderTopColor: '#2D5A3D',
                          left: `${Math.min(100, (phVal / 14) * 100)}%`,
                          transform: 'translate(-50%, -50%)',
                        }}
                      />
                    )}
                  </div>
                  <div className="flex justify-between mt-1">
                    <span className="text-[0.6875rem]" style={{ color: '#6B6560' }}>Acidic</span>
                    <span className="text-[0.6875rem]" style={{ color: '#4CAF50' }}>Optimal (6.0–7.5)</span>
                    <span className="text-[0.6875rem]" style={{ color: '#6B6560' }}>Alkaline</span>
                  </div>
                </div>
                <p className="text-xs mt-1" style={{ color: '#6B6560', fontFamily: '"Inter", sans-serif' }}>
                  Most crops prefer 6.0–7.5. Below 6 is acidic, above 7.5 is alkaline.
                </p>
              </motion.div>

              {/* Nitrogen */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.12 }}
              >
                <label className="flex items-center gap-1.5 text-base font-semibold mb-2" style={{ color: '#2D5A3D', fontFamily: '"Inter", sans-serif' }}>
                  Nitrogen Content
                  <Info className="w-4 h-4" style={{ color: '#6B6560' }} />
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min="0"
                    max="500"
                    placeholder="e.g., 180"
                    value={form.nitrogen}
                    onChange={(e) => handleChange('nitrogen', e.target.value)}
                    className="w-full h-14 rounded-xl px-4 text-base outline-none transition-all duration-200"
                    style={{
                      border: '2px solid #E8E2DA',
                      background: '#FAF6F0',
                      fontFamily: '"Inter", sans-serif',
                      color: '#2A2A28',
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = '#6B8F71'
                      e.currentTarget.style.boxShadow = '0 0 0 3px rgba(107,143,113,0.15)'
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = '#E8E2DA'
                      e.currentTarget.style.boxShadow = 'none'
                    }}
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm" style={{ color: '#6B6560', fontFamily: '"Inter", sans-serif' }}>
                    kg/ha
                  </span>
                </div>
                <div className="mt-2">
                  <div className="w-full h-1.5 rounded-full relative" style={{ background: '#E8E2DA' }}>
                    <div className="absolute left-[30%] right-[50%] h-full rounded-full" style={{ background: '#4CAF5060' }} />
                  </div>
                  <div className="flex justify-between mt-1">
                    <span className="text-[0.6875rem]" style={{ color: '#6B6560' }}>Low (&lt;100)</span>
                    <span className="text-[0.6875rem]" style={{ color: '#4CAF50' }}>Optimal (150–250)</span>
                    <span className="text-[0.6875rem]" style={{ color: '#6B6560' }}>High (&gt;250)</span>
                  </div>
                </div>
              </motion.div>

              {/* Phosphorus */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.18 }}
              >
                <label className="flex items-center gap-1.5 text-base font-semibold mb-2" style={{ color: '#2D5A3D', fontFamily: '"Inter", sans-serif' }}>
                  Phosphorus Content
                  <Info className="w-4 h-4" style={{ color: '#6B6560' }} />
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min="0"
                    max="100"
                    placeholder="e.g., 25"
                    value={form.phosphorus}
                    onChange={(e) => handleChange('phosphorus', e.target.value)}
                    className="w-full h-14 rounded-xl px-4 text-base outline-none transition-all duration-200"
                    style={{
                      border: '2px solid #E8E2DA',
                      background: '#FAF6F0',
                      fontFamily: '"Inter", sans-serif',
                      color: '#2A2A28',
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = '#6B8F71'
                      e.currentTarget.style.boxShadow = '0 0 0 3px rgba(107,143,113,0.15)'
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = '#E8E2DA'
                      e.currentTarget.style.boxShadow = 'none'
                    }}
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm" style={{ color: '#6B6560', fontFamily: '"Inter", sans-serif' }}>
                    kg/ha
                  </span>
                </div>
                <div className="mt-2">
                  <div className="w-full h-1.5 rounded-full relative" style={{ background: '#E8E2DA' }}>
                    <div className="absolute left-[20%] right-[60%] h-full rounded-full" style={{ background: '#4CAF5060' }} />
                  </div>
                  <div className="flex justify-between mt-1">
                    <span className="text-[0.6875rem]" style={{ color: '#6B6560' }}>Low (&lt;10)</span>
                    <span className="text-[0.6875rem]" style={{ color: '#4CAF50' }}>Optimal (20–40)</span>
                    <span className="text-[0.6875rem]" style={{ color: '#6B6560' }}>High (&gt;40)</span>
                  </div>
                </div>
              </motion.div>

              {/* Potassium */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.24 }}
              >
                <label className="flex items-center gap-1.5 text-base font-semibold mb-2" style={{ color: '#2D5A3D', fontFamily: '"Inter", sans-serif' }}>
                  Potassium Content
                  <Info className="w-4 h-4" style={{ color: '#6B6560' }} />
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min="0"
                    max="500"
                    placeholder="e.g., 200"
                    value={form.potassium}
                    onChange={(e) => handleChange('potassium', e.target.value)}
                    className="w-full h-14 rounded-xl px-4 text-base outline-none transition-all duration-200"
                    style={{
                      border: '2px solid #E8E2DA',
                      background: '#FAF6F0',
                      fontFamily: '"Inter", sans-serif',
                      color: '#2A2A28',
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = '#6B8F71'
                      e.currentTarget.style.boxShadow = '0 0 0 3px rgba(107,143,113,0.15)'
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = '#E8E2DA'
                      e.currentTarget.style.boxShadow = 'none'
                    }}
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm" style={{ color: '#6B6560', fontFamily: '"Inter", sans-serif' }}>
                    kg/ha
                  </span>
                </div>
                <div className="mt-2">
                  <div className="w-full h-1.5 rounded-full relative" style={{ background: '#E8E2DA' }}>
                    <div className="absolute left-[30%] right-[50%] h-full rounded-full" style={{ background: '#4CAF5060' }} />
                  </div>
                  <div className="flex justify-between mt-1">
                    <span className="text-[0.6875rem]" style={{ color: '#6B6560' }}>Low (&lt;100)</span>
                    <span className="text-[0.6875rem]" style={{ color: '#4CAF50' }}>Optimal (150–250)</span>
                    <span className="text-[0.6875rem]" style={{ color: '#6B6560' }}>High (&gt;250)</span>
                  </div>
                </div>
              </motion.div>

              {/* Moisture - full width */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.30 }}
                className="sm:col-span-2"
              >
                <label className="flex items-center gap-1.5 text-base font-semibold mb-2" style={{ color: '#2D5A3D', fontFamily: '"Inter", sans-serif' }}>
                  Soil Moisture Level
                  <Info className="w-4 h-4" style={{ color: '#6B6560' }} />
                </label>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={form.moisture || 0}
                    onChange={(e) => handleChange('moisture', e.target.value)}
                    className="flex-1 h-2 rounded-full appearance-none cursor-pointer"
                    style={{
                      background: form.moisture
                        ? `linear-gradient(to right, #42A5F5 0%, #6B8F71 25%, #4CAF50 60%, #42A5F5 100%)`
                        : '#E8E2DA',
                      accentColor: '#6B8F71',
                    }}
                  />
                  <div className="relative w-24 flex-shrink-0">
                    <input
                      type="number"
                      min="0"
                      max="100"
                      placeholder="45"
                      value={form.moisture}
                      onChange={(e) => handleChange('moisture', e.target.value)}
                      className="w-full h-12 rounded-xl px-3 text-base outline-none text-center"
                      style={{
                        border: '2px solid #E8E2DA',
                        background: '#FAF6F0',
                        fontFamily: '"Inter", sans-serif',
                        color: '#2A2A28',
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = '#6B8F71'
                        e.currentTarget.style.boxShadow = '0 0 0 3px rgba(107,143,113,0.15)'
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = '#E8E2DA'
                        e.currentTarget.style.boxShadow = 'none'
                      }}
                    />
                    <span className="absolute right-2 top-1/2 -translate-y-1/2 text-sm" style={{ color: '#6B6560' }}>%</span>
                  </div>
                </div>
                <div className="mt-2">
                  <div className="w-full h-1.5 rounded-full relative" style={{ background: '#E8E2DA' }}>
                    <div className="absolute left-[25%] right-[40%] h-full rounded-full" style={{ background: '#4CAF5060' }} />
                  </div>
                  <div className="flex justify-between mt-1">
                    <span className="text-[0.6875rem]" style={{ color: '#6B6560' }}>Dry (&lt;25%)</span>
                    <span className="text-[0.6875rem]" style={{ color: '#4CAF50' }}>Optimal (25–60%)</span>
                    <span className="text-[0.6875rem]" style={{ color: '#6B6560' }}>Waterlogged (&gt;60%)</span>
                  </div>
                </div>
              </motion.div>

              {/* Soil Type - full width */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.36 }}
                className="sm:col-span-2"
              >
                <label className="flex items-center gap-1.5 text-base font-semibold mb-2" style={{ color: '#2D5A3D', fontFamily: '"Inter", sans-serif' }}>
                  Soil Type
                  <Info className="w-4 h-4" style={{ color: '#6B6560' }} />
                </label>
                <div className="relative">
                  <select
                    value={form.soilType}
                    onChange={(e) => handleChange('soilType', e.target.value)}
                    className="w-full h-14 rounded-xl px-4 text-base outline-none appearance-none cursor-pointer transition-all duration-200"
                    style={{
                      border: '2px solid #E8E2DA',
                      background: '#FAF6F0',
                      fontFamily: '"Inter", sans-serif',
                      color: form.soilType ? '#2A2A28' : '#6B6560',
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = '#6B8F71'
                      e.currentTarget.style.boxShadow = '0 0 0 3px rgba(107,143,113,0.15)'
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = '#E8E2DA'
                      e.currentTarget.style.boxShadow = 'none'
                    }}
                  >
                    <option value="" disabled>Select your soil type</option>
                    {soilTypesList.map((st) => (
                      <option key={st.name} value={st.name}>
                        {st.name}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
                      <path d="M1 1.5L6 6.5L11 1.5" stroke="#6B6560" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
              </motion.div>

              {/* Farm Size - full width */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.42 }}
                className="sm:col-span-2"
              >
                <label className="flex items-center gap-1.5 text-base font-semibold mb-2" style={{ color: '#2D5A3D', fontFamily: '"Inter", sans-serif' }}>
                  Farm Size (Optional)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min="0"
                    step="0.1"
                    placeholder="e.g., 2"
                    value={form.farmSize}
                    onChange={(e) => handleChange('farmSize', e.target.value)}
                    className="w-full h-14 rounded-xl px-4 text-base outline-none transition-all duration-200"
                    style={{
                      border: '2px solid #E8E2DA',
                      background: '#FAF6F0',
                      fontFamily: '"Inter", sans-serif',
                      color: '#2A2A28',
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = '#6B8F71'
                      e.currentTarget.style.boxShadow = '0 0 0 3px rgba(107,143,113,0.15)'
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = '#E8E2DA'
                      e.currentTarget.style.boxShadow = 'none'
                    }}
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm" style={{ color: '#6B6560', fontFamily: '"Inter", sans-serif' }}>
                    acres
                  </span>
                </div>
                <p className="text-xs mt-1" style={{ color: '#6B6560', fontFamily: '"Inter", sans-serif' }}>
                  Helps us calculate total fertilizer requirements.
                </p>
              </motion.div>
            </div>

            {/* Soil Type Quick Guide */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.48 }}
              className="mt-8 rounded-2xl p-5"
              style={{ background: 'rgba(107,143,113,0.08)' }}
            >
              <h4 className="text-base font-semibold mb-1" style={{ color: '#2D5A3D', fontFamily: '"Inter", sans-serif' }}>
                Don't Know Your Soil Type?
              </h4>
              <p className="text-sm mb-3" style={{ color: '#6B6560', fontFamily: '"Inter", sans-serif' }}>
                Here's a quick guide to identify your soil:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {soilTypesList.slice(0, 3).map((st) => (
                  <div key={st.name} className="flex items-start gap-3">
                    <div
                      className="w-8 h-8 rounded-lg flex-shrink-0 mt-0.5"
                      style={{ backgroundColor: st.color }}
                    />
                    <div>
                      <p className="text-sm font-medium" style={{ color: '#2A2A28', fontFamily: '"Inter", sans-serif' }}>
                        {st.name}
                      </p>
                      <p className="text-xs" style={{ color: '#6B6560', fontFamily: '"Inter", sans-serif' }}>
                        {st.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Analyze Button */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.54 }}
              className="mt-8 flex justify-center"
            >
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAnalyze}
                disabled={!formValid || analyzing}
                className="flex items-center gap-2 px-10 py-4 rounded-full text-lg font-semibold text-white transition-all duration-250 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  background: '#D4953A',
                  fontFamily: '"Inter", sans-serif',
                  letterSpacing: '0.02em',
                  boxShadow: formValid && !analyzing ? '0 4px 20px rgba(212,149,58,0.3)' : 'none',
                }}
              >
                {analyzing ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Analyzing with Gemini AI...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    Analyze My Soil
                  </>
                )}
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ===== SECTION 3: ANALYSIS RESULTS ===== */}
      <AnimatePresence>
        {analyzed && (
          <motion.section
            id="analysis-results"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            style={{ background: '#FAF6F0', padding: '4rem 1.5rem 6rem' }}
          >
            <div className="max-w-[900px] mx-auto">
              {/* Results Header */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center mb-8"
              >
                <span
                  className="inline-flex items-center gap-1.5 text-xs font-semibold px-4 py-1.5 rounded-full mb-4"
                  style={{
                    backgroundColor: '#4CAF5015',
                    color: '#4CAF50',
                    fontFamily: '"Inter", sans-serif',
                  }}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  Analysis Complete
                </span>
                <h2
                  style={{
                    fontFamily: '"Playfair Display", serif',
                    fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                    fontWeight: 700,
                    color: '#2D5A3D',
                    lineHeight: 1.1,
                    marginBottom: '0.5rem',
                  }}
                >
                  Your Personalized Soil Report
                </h2>
                <p className="text-sm" style={{ color: '#6B6560', fontFamily: '"Inter", sans-serif' }}>
                  Generated on {new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })} by Google Gemini
                </p>
              </motion.div>

              {/* Soil Health Summary Card */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="rounded-3xl p-6 sm:p-8 mb-6"
                style={{
                  background: '#FFFCF7',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
                }}
              >
                <h3 className="text-base font-semibold mb-5 text-center" style={{ color: '#2D5A3D', fontFamily: '"Inter", sans-serif' }}>
                  Soil Parameter Summary
                </h3>
                <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
                  <CircularGauge
                    value={phVal}
                    maxValue={14}
                    label="pH Level"
                    status={phStatus.label}
                    statusColor={phStatus.color}
                    delay={0}
                  />
                  <CircularGauge
                    value={nVal}
                    maxValue={300}
                    label="Nitrogen"
                    status={nStatus.label}
                    statusColor={nStatus.color}
                    unit=""
                    delay={100}
                  />
                  <CircularGauge
                    value={pVal}
                    maxValue={60}
                    label="Phosphorus"
                    status={pStatus.label}
                    statusColor={pStatus.color}
                    delay={200}
                  />
                  <CircularGauge
                    value={kVal}
                    maxValue={300}
                    label="Potassium"
                    status={kStatus.label}
                    statusColor={kStatus.color}
                    delay={300}
                  />
                  <CircularGauge
                    value={moistureVal}
                    maxValue={100}
                    label="Moisture"
                    status={moistureStatus.label}
                    statusColor={moistureStatus.color}
                    unit="%"
                    delay={400}
                  />
                </div>

                {/* Overall Verdict */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.5 }}
                  className="mt-6 rounded-xl p-4 text-center"
                  style={{ backgroundColor: `${healthInfo.color}15` }}
                >
                  <p
                    className="text-sm font-medium mb-1"
                    style={{ color: healthInfo.color, fontFamily: '"Inter", sans-serif' }}
                  >
                    Your soil health:{' '}
                    <span className="text-lg font-bold">{healthInfo.label}</span>
                  </p>
                  <p
                    className="text-sm"
                    style={{ color: '#2A2A28', fontFamily: '"Inter", sans-serif' }}
                  >
                    {aiSummary || `Your soil shows a score of ${overallHealth}/100. Review the recommendations below to optimize your soil for better yields.`}
                  </p>
                </motion.div>
              </motion.div>

              {/* Crop Recommendations */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <h3
                  className="text-lg font-semibold mb-5"
                  style={{ color: '#2D5A3D', fontFamily: '"Inter", sans-serif' }}
                >
                  <Sprout className="w-5 h-5 inline-block mr-1.5" />
                  Recommended Crops for Your Soil
                </h3>
                <div className="flex flex-col gap-4">
                  {matchedCrops.map((item, idx) => (
                    <CropMatchCard
                      key={item.crop.name}
                      crop={item.crop}
                      index={idx}
                      matchPercentage={item.match}
                    />
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* ===== SECTION 4: FERTILIZER RECOMMENDATIONS ===== */}
      <AnimatePresence>
        {analyzed && (
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ background: '#F5F0E8', padding: '6rem 1.5rem' }}
          >
            <div className="max-w-[900px] mx-auto">
              <div className="text-center mb-10">
                <SectionBadge text="FERTILIZER PLAN" />
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
                  Personalized Fertilizer Recommendations
                </h2>
                <p
                  style={{
                    color: '#6B6560',
                    fontFamily: '"Inter", sans-serif',
                    fontSize: '1.125rem',
                    lineHeight: 1.6,
                  }}
                >
                  Based on your soil analysis, here's what your soil needs.
                </p>
              </div>

              {/* Tabs */}
              <div className="flex gap-2 mb-6 justify-center flex-wrap">
                {[
                  { key: 'organic' as TabType, label: 'Organic', icon: Leaf },
                  { key: 'chemical' as TabType, label: 'Chemical', icon: FlaskConical },
                  { key: 'schedule' as TabType, label: 'Schedule', icon: Calendar },
                ].map(({ key, label, icon: Icon }) => (
                  <button
                    key={key}
                    onClick={() => setActiveTab(key)}
                    className="flex items-center gap-1.5 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200"
                    style={{
                      background: activeTab === key ? '#2D5A3D' : '#FFFCF7',
                      color: activeTab === key ? '#fff' : '#6B6560',
                      fontFamily: '"Inter", sans-serif',
                      border: activeTab === key ? 'none' : '1px solid #E8E2DA',
                    }}
                  >
                    <Icon className="w-4 h-4" />
                    {label}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <AnimatePresence mode="wait">
                {activeTab === 'organic' && (
                  <motion.div
                    key="organic"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                  >
                    {organicFertilizers.map((item, idx) => (
                      <FertilizerItem key={idx} item={item} borderColor="#4CAF50" icon={<Leaf className="w-5 h-5" />} idx={idx} />
                    ))}
                  </motion.div>
                )}

                {activeTab === 'chemical' && (
                  <motion.div
                    key="chemical"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                  >
                    {chemicalFertilizers.map((item, idx) => (
                      <FertilizerItem key={idx} item={item} borderColor="#42A5F5" icon={<FlaskConical className="w-5 h-5" />} idx={idx} />
                    ))}
                    <div className="md:col-span-2">
                      <h4 className="text-base font-semibold mb-3 mt-2" style={{ color: '#2D5A3D', fontFamily: '"Inter", sans-serif' }}>
                        <Beaker className="w-5 h-5 inline-block mr-1.5" style={{ color: '#FF9800' }} />
                        Micronutrient Supplements
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {micronutrients.map((item, idx) => (
                          <FertilizerItem key={idx} item={item} borderColor="#FF9800" icon={<Beaker className="w-5 h-5" />} idx={idx} />
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'schedule' && (
                  <motion.div
                    key="schedule"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="rounded-2xl p-6" style={{ background: '#FFFCF7', borderLeft: '4px solid #6B8F71' }}>
                      <div className="flex items-center gap-3 mb-5">
                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center"
                          style={{ background: 'rgba(107,143,113,0.15)' }}
                        >
                          <Calendar className="w-5 h-5" style={{ color: '#6B8F71' }} />
                        </div>
                        <h4 className="text-base font-semibold" style={{ color: '#2D5A3D', fontFamily: '"Inter", sans-serif' }}>
                          Application Timeline
                        </h4>
                      </div>
                      <div className="relative">
                        <div
                          className="absolute left-[15px] top-2 bottom-2 w-px"
                          style={{ background: '#E8E2DA' }}
                        />
                        {applicationTimeline.map((entry, idx) => (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.4, delay: idx * 0.08 }}
                            className="relative flex gap-4 mb-4 last:mb-0"
                          >
                            <div
                              className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 z-10"
                              style={{ background: '#6B8F71' }}
                            >
                              <span className="text-white text-xs font-bold">{idx + 1}</span>
                            </div>
                            <div className="flex-1 pt-1">
                              <p
                                className="text-sm font-semibold"
                                style={{ color: '#2D5A3D', fontFamily: '"Inter", sans-serif' }}
                              >
                                {entry.phase}
                              </p>
                              <p
                                className="text-sm mt-0.5"
                                style={{ color: '#2A2A28', fontFamily: '"Inter", sans-serif' }}
                              >
                                {entry.action}
                              </p>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* ===== SECTION 5: SOIL IMPROVEMENT TIPS ===== */}
      <section
        style={{ background: '#2D5A3D', padding: '6rem 1.5rem' }}
      >
        <div className="max-w-[1280px] mx-auto">
          <div className="text-center mb-10">
            <SectionBadge text="SUSTAINABLE FARMING" light />
            <h2
              className="text-white mb-3"
              style={{
                fontFamily: '"Playfair Display", serif',
                fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                fontWeight: 700,
                lineHeight: 1.1,
              }}
            >
              Improve Your Soil Over Time
            </h2>
            <p
              style={{
                color: 'rgba(255,255,255,0.7)',
                fontFamily: '"Inter", sans-serif',
                fontSize: '1.125rem',
                lineHeight: 1.6,
                maxWidth: 600,
                margin: '0 auto',
              }}
            >
              Follow these practices to build healthier, more productive soil year after year.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {soilHealthTips.map((tip, idx) => {
              const IconComp = iconMap[tip.icon] || Leaf
              return (
                <motion.div
                  key={tip.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
                  whileHover={{ y: -3, backgroundColor: 'rgba(255,255,255,0.12)' }}
                  className="rounded-2xl p-6 transition-colors duration-300"
                  style={{
                    background: 'rgba(255,255,255,0.08)',
                    backdropFilter: 'blur(8px)',
                    border: '1px solid rgba(255,255,255,0.1)',
                  }}
                >
                  <IconComp className="w-10 h-10 mb-4" style={{ color: '#E8C547' }} />
                  <h4
                    className="text-lg font-semibold text-white mb-2"
                    style={{ fontFamily: '"Inter", sans-serif' }}
                  >
                    {tip.title}
                  </h4>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: 'rgba(255,255,255,0.7)', fontFamily: '"Inter", sans-serif' }}
                  >
                    {tip.description}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}

// Sub-component for fertilizer items
function FertilizerItem({
  item,
  borderColor,
  icon,
  idx,
}: {
  item: { name: string; amount: string; application: string }
  borderColor: string
  icon: React.ReactNode
  idx: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: idx * 0.1 }}
      className="rounded-2xl p-5"
      style={{
        background: '#FFFCF7',
        borderLeft: `4px solid ${borderColor}`,
        boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
      }}
    >
      <div className="flex items-start gap-3">
        <div style={{ color: borderColor }}>{icon}</div>
        <div className="flex-1">
          <div className="flex items-center justify-between flex-wrap gap-1">
            <p className="text-sm font-semibold" style={{ color: '#2A2A28', fontFamily: '"Inter", sans-serif' }}>
              {item.name}
            </p>
            <span
              className="text-xs font-medium px-2.5 py-0.5 rounded-full"
              style={{
                backgroundColor: `${borderColor}15`,
                color: borderColor,
                fontFamily: '"Inter", sans-serif',
              }}
            >
              {item.amount}
            </span>
          </div>
          <p className="text-sm mt-1" style={{ color: '#6B6560', fontFamily: '"Inter", sans-serif' }}>
            {item.application}
          </p>
        </div>
      </div>
    </motion.div>
  )
}
