import { motion } from 'framer-motion'
import { CheckCircle } from 'lucide-react'
import type { DiagnosisResult } from '@/lib/gemini'
import ConfidenceBar from './ConfidenceBar'
import DiseaseCard from './DiseaseCard'
import TreatmentTabs from './TreatmentTabs'
import PreventionTips from './PreventionTips'
import RelatedDiseases from './RelatedDiseases'

interface AnalysisResultsProps {
  diagnosis: DiagnosisResult
  imageBase64: string
}

export default function AnalysisResults({ diagnosis, imageBase64 }: AnalysisResultsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
      className="w-full space-y-8"
    >
      {/* Results Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        className="flex flex-col sm:flex-row sm:items-center gap-4"
      >
        {/* Analyzed Image Thumbnail */}
        <div className="flex items-center gap-4">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.15, duration: 0.4 }}
            className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0"
            style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
          >
            <img
              src={`data:image/jpeg;base64,${imageBase64}`}
              alt="Analyzed crop"
              className="w-full h-full object-cover"
            />
          </motion.div>

          <div>
            {/* Status Badge */}
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium mb-2"
              style={{
                background: diagnosis.isHealthy
                  ? 'rgba(76, 175, 80, 0.12)'
                  : 'rgba(76, 175, 80, 0.12)',
                color: '#4CAF50',
                fontFamily: '"Inter", sans-serif',
              }}
            >
              <CheckCircle className="w-3 h-3" />
              Analysis Complete
            </motion.span>

            <h2
              style={{
                fontFamily: '"Playfair Display", serif',
                fontWeight: 700,
                fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
                lineHeight: 1.1,
                letterSpacing: '-0.01em',
                color: '#2D5A3D',
              }}
            >
              Diagnosis Results
            </h2>

            <p
              className="text-xs mt-1"
              style={{ color: '#6B6560', fontFamily: '"Inter", sans-serif' }}
            >
              Analyzed just now
            </p>
          </div>
        </div>
      </motion.div>

      {/* Confidence Score Bar */}
      <ConfidenceBar confidence={diagnosis.confidence} delay={200} />

      {/* Disease Info Card */}
      <DiseaseCard diagnosis={diagnosis} />

      {/* Treatment Recommendations */}
      <div>
        <h3
          className="text-base font-semibold mb-4"
          style={{ color: '#2D5A3D', fontFamily: '"Inter", sans-serif' }}
        >
          Treatment Recommendations
        </h3>
        <TreatmentTabs
          organicTreatments={diagnosis.organicTreatments}
          chemicalTreatments={diagnosis.chemicalTreatments}
          isHealthy={diagnosis.isHealthy}
        />
      </div>

      {/* Prevention Tips */}
      <PreventionTips tips={diagnosis.preventionTips} />

      {/* Related Diseases */}
      {!diagnosis.isHealthy && (
        <RelatedDiseases diseases={diagnosis.relatedDiseases} />
      )}
    </motion.div>
  )
}
