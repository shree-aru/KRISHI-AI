import { motion } from 'framer-motion'
import { TrendingUp } from 'lucide-react'

interface RelatedDiseasesProps {
  diseases: { name: string; matchPercent: number }[]
}

export default function RelatedDiseases({ diseases }: RelatedDiseasesProps) {
  if (!diseases || diseases.length === 0) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.6 }}
      className="w-full"
    >
      <h3
        className="text-base font-semibold mb-4"
        style={{ color: '#2D5A3D', fontFamily: '"Inter", sans-serif' }}
      >
        Similar Conditions to Check
      </h3>

      <div className="flex flex-wrap gap-3">
        {diseases.map((disease, index) => (
          <motion.div
            key={disease.name}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7 + index * 0.1, duration: 0.3 }}
            className="flex items-center gap-3 rounded-xl px-4 py-3"
            style={{
              background: '#FFFCF7',
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
            }}
          >
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center"
              style={{ background: 'rgba(212, 149, 58, 0.1)' }}
            >
              <TrendingUp className="w-5 h-5 text-[#D4953A]" />
            </div>
            <div>
              <p
                className="text-sm font-medium"
                style={{ color: '#2A2A28', fontFamily: '"Inter", sans-serif' }}
              >
                {disease.name}
              </p>
              <p
                className="text-xs"
                style={{ color: '#6B6560', fontFamily: '"Inter", sans-serif' }}
              >
                {disease.matchPercent}% match
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
