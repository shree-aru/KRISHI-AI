import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Droplets } from 'lucide-react'
import type { CropData } from '@/data/soilData'
import ConicProgress from './ConicProgress'

interface CropMatchCardProps {
  crop: CropData
  index: number
  matchPercentage: number
}

const seasonColors: Record<string, string> = {
  'Monsoon Season': '#42A5F5',
  'Kharif Season': '#4CAF50',
  'Rabi Season': '#E8C547',
  'Year-round': '#6B8F71',
}

const waterColorMap: Record<string, string> = {
  Low: '#4CAF50',
  Medium: '#FF9800',
  High: '#42A5F5',
}

export default function CropMatchCard({ crop, index, matchPercentage }: CropMatchCardProps) {
  const [expanded, setExpanded] = useState(false)

  const getMatchColor = (pct: number) => {
    if (pct >= 70) return '#4CAF50'
    if (pct >= 50) return '#FF9800'
    return '#42A5F5'
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: index * 0.12,
        ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
      }}
      className="rounded-2xl p-5 transition-shadow duration-300 hover:shadow-lg"
      style={{
        background: '#FFFCF7',
        boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
      }}
    >
      {/* Main Row */}
      <div className="flex items-center gap-4">
        <ConicProgress
          percentage={matchPercentage}
          color={getMatchColor(matchPercentage)}
          size={56}
          delay={index * 150}
        />

        <div className="flex-1 min-w-0">
          <h4
            className="text-lg font-semibold"
            style={{ color: '#2D5A3D', fontFamily: '"Inter", sans-serif' }}
          >
            {crop.name}
          </h4>
          <p
            className="text-sm italic"
            style={{ color: '#6B6560', fontFamily: '"Inter", sans-serif' }}
          >
            {crop.scientificName}
          </p>
          <div className="flex items-center gap-2 mt-1.5 flex-wrap">
            <span
              className="text-xs font-medium px-2.5 py-0.5 rounded-full"
              style={{
                backgroundColor: `${seasonColors[crop.season] || '#6B8F71'}15`,
                color: seasonColors[crop.season] || '#6B8F71',
                fontFamily: '"Inter", sans-serif',
              }}
            >
              {crop.season}
            </span>
            <span
              className="text-xs flex items-center gap-1"
              style={{ color: waterColorMap[crop.waterRequirement] || '#6B6560' }}
            >
              <Droplets className="w-3 h-3" />
              {crop.waterRequirement} water
            </span>
          </div>
        </div>

        <button
          onClick={() => setExpanded(!expanded)}
          className="p-2 rounded-full transition-colors duration-200 hover:bg-[#E8E2DA] flex-shrink-0"
          aria-label={expanded ? 'Collapse details' : 'Expand details'}
        >
          <motion.div
            animate={{ rotate: expanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <ChevronDown className="w-5 h-5" style={{ color: '#6B6560' }} />
          </motion.div>
        </button>
      </div>

      {/* Expanded Details */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div
              className="mt-4 pt-4 border-t rounded-lg p-4"
              style={{ borderColor: '#E8E2DA', background: '#FAF6F0' }}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-3">
                <div>
                  <p
                    className="text-xs font-medium mb-1"
                    style={{ color: '#6B6560', fontFamily: '"Inter", sans-serif' }}
                  >
                    Ideal Conditions
                  </p>
                  <p
                    className="text-sm"
                    style={{ color: '#2A2A28', fontFamily: '"Inter", sans-serif' }}
                  >
                    pH: {crop.idealPH[0]}–{crop.idealPH[1]} | N: {crop.idealN[0]}–{crop.idealN[1]} kg/ha
                  </p>
                  <p
                    className="text-sm"
                    style={{ color: '#2A2A28', fontFamily: '"Inter", sans-serif' }}
                  >
                    P: {crop.idealP[0]}–{crop.idealP[1]} | K: {crop.idealK[0]}–{crop.idealK[1]} kg/ha
                  </p>
                </div>
                <div>
                  <p
                    className="text-xs font-medium mb-1"
                    style={{ color: '#6B6560', fontFamily: '"Inter", sans-serif' }}
                  >
                    Soil Types
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {crop.soilTypes.map((st) => (
                      <span
                        key={st}
                        className="text-xs px-2 py-0.5 rounded-full"
                        style={{
                          backgroundColor: '#6B8F7115',
                          color: '#2D5A3D',
                          fontFamily: '"Inter", sans-serif',
                        }}
                      >
                        {st}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <p
                className="text-sm italic"
                style={{ color: '#6B6560', fontFamily: '"Inter", sans-serif' }}
              >
                This crop matches your soil profile with {matchPercentage}% compatibility based on
                pH, nutrient levels, and moisture content.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
