import { motion } from 'framer-motion'
import { AlertTriangle, Leaf, CheckCircle } from 'lucide-react'
import type { DiagnosisResult } from '@/lib/gemini'

interface DiseaseCardProps {
  diagnosis: DiagnosisResult
}

function getSeverityColor(severity: string): string {
  switch (severity) {
    case 'High':
      return '#E53935'
    case 'Medium':
      return '#FF9800'
    case 'Low':
      return '#4CAF50'
    default:
      return '#6B6560'
  }
}

function getSeverityBg(severity: string): string {
  switch (severity) {
    case 'High':
      return 'rgba(229, 57, 53, 0.1)'
    case 'Medium':
      return 'rgba(255, 152, 0, 0.1)'
    case 'Low':
      return 'rgba(76, 175, 80, 0.1)'
    default:
      return 'rgba(107, 101, 96, 0.1)'
  }
}

export default function DiseaseCard({ diagnosis }: DiseaseCardProps) {
  const severityColor = getSeverityColor(diagnosis.severity)
  const severityBg = getSeverityBg(diagnosis.severity)

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
      className="w-full rounded-[20px] p-8"
      style={{
        background: '#FFFCF7',
        boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
      }}
    >
      <div className="flex flex-col sm:flex-row gap-6">
        {/* Icon Area */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="flex-shrink-0 w-20 h-20 rounded-2xl flex items-center justify-center"
          style={{
            background: diagnosis.isHealthy
              ? 'rgba(76, 175, 80, 0.1)'
              : 'rgba(229, 57, 53, 0.1)',
          }}
        >
          {diagnosis.isHealthy ? (
            <CheckCircle className="w-10 h-10 text-[#4CAF50]" />
          ) : (
            <AlertTriangle className="w-10 h-10 text-[#E53935]" />
          )}
        </motion.div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Disease Name */}
          <h3
            className="text-xl font-semibold mb-1"
            style={{
              color: diagnosis.isHealthy ? '#2D5A3D' : '#E53935',
              fontFamily: '"Inter", sans-serif',
            }}
          >
            {diagnosis.diseaseName}
          </h3>

          {/* Scientific Name */}
          <p
            className="text-sm italic mb-3"
            style={{ color: '#6B6560', fontFamily: '"Inter", sans-serif' }}
          >
            {diagnosis.scientificName}
          </p>

          {/* Badges Row */}
          <div className="flex flex-wrap gap-2 mb-4">
            {/* Affected Crop Badge */}
            <span
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium"
              style={{
                background: 'rgba(107, 143, 113, 0.12)',
                color: '#2D5A3D',
                fontFamily: '"Inter", sans-serif',
              }}
            >
              <Leaf className="w-3 h-3" />
              {diagnosis.affectedCrop}
            </span>

            {/* Severity Badge */}
            {!diagnosis.isHealthy && (
              <span
                className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold"
                style={{
                  background: severityBg,
                  color: severityColor,
                  fontFamily: '"Inter", sans-serif',
                }}
              >
                {diagnosis.severity} Severity
              </span>
            )}

            {diagnosis.isHealthy && (
              <span
                className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold"
                style={{
                  background: 'rgba(76, 175, 80, 0.12)',
                  color: '#4CAF50',
                  fontFamily: '"Inter", sans-serif',
                }}
              >
                Healthy
              </span>
            )}
          </div>

          {/* Description */}
          <p
            className="text-[0.9375rem] leading-relaxed mb-5"
            style={{ color: '#2A2A28', fontFamily: '"Inter", sans-serif' }}
          >
            {diagnosis.description}
          </p>

          {/* Symptoms List */}
          {!diagnosis.isHealthy && (
            <div className="mb-5">
              <h4
                className="text-sm font-semibold mb-3"
                style={{ color: '#2D5A3D', fontFamily: '"Inter", sans-serif' }}
              >
                Visible Symptoms
              </h4>
              <ul className="space-y-2">
                {diagnosis.symptoms.map((symptom, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.08, duration: 0.3 }}
                    className="flex items-start gap-2"
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                      style={{ background: '#D4953A' }}
                    />
                    <span
                      className="text-sm leading-relaxed"
                      style={{ color: '#2A2A28', fontFamily: '"Inter", sans-serif' }}
                    >
                      {symptom}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </div>
          )}

          {/* Healthy Symptoms */}
          {diagnosis.isHealthy && (
            <div className="mb-5">
              <h4
                className="text-sm font-semibold mb-3"
                style={{ color: '#2D5A3D', fontFamily: '"Inter", sans-serif' }}
              >
                Observations
              </h4>
              <ul className="space-y-2">
                {diagnosis.symptoms.map((symptom, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.08, duration: 0.3 }}
                    className="flex items-start gap-2"
                  >
                    <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0 text-[#4CAF50]" />
                    <span
                      className="text-sm leading-relaxed"
                      style={{ color: '#2A2A28', fontFamily: '"Inter", sans-serif' }}
                    >
                      {symptom}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </div>
          )}

          {/* Spread Info */}
          {!diagnosis.isHealthy && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="rounded-xl p-4"
              style={{ background: 'rgba(232, 197, 71, 0.1)' }}
            >
              <h4
                className="text-sm font-semibold mb-1"
                style={{ color: '#5C3D2E', fontFamily: '"Inter", sans-serif' }}
              >
                How It Spreads
              </h4>
              <p
                className="text-sm leading-relaxed"
                style={{ color: '#5C3D2E', fontFamily: '"Inter", sans-serif' }}
              >
                {diagnosis.spreadInfo}
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  )
}
