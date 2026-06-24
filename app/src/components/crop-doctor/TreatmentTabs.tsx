import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sprout, FlaskConical, Clock, IndianRupee, AlertCircle, CheckCircle2 } from 'lucide-react'
import type { OrganicTreatment, ChemicalTreatment } from '@/lib/gemini'

interface TreatmentTabsProps {
  organicTreatments: OrganicTreatment[]
  chemicalTreatments: ChemicalTreatment[]
  isHealthy: boolean
}

type TabId = 'organic' | 'chemical'

export default function TreatmentTabs({
  organicTreatments,
  chemicalTreatments,
  isHealthy,
}: TreatmentTabsProps) {
  const [activeTab, setActiveTab] = useState<TabId>(isHealthy ? 'organic' : 'organic')

  const tabs: { id: TabId; label: string; icon: React.ReactNode; count: number }[] = [
    {
      id: 'organic',
      label: 'Organic Treatment',
      icon: <Sprout className="w-4 h-4" />,
      count: organicTreatments.length,
    },
    {
      id: 'chemical',
      label: 'Chemical Treatment',
      icon: <FlaskConical className="w-4 h-4" />,
      count: chemicalTreatments.length,
    },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="w-full"
    >
      {/* Tab Bar */}
      <div className="flex w-full border-b border-[#E8E2DA]">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className="relative flex-1 flex items-center justify-center gap-2 py-4 text-sm font-medium transition-colors duration-200"
            style={{
              color: activeTab === tab.id ? '#2D5A3D' : '#6B6560',
              fontFamily: '"Inter", sans-serif',
            }}
          >
            {tab.icon}
            {tab.label}
            <span
              className="ml-1 w-5 h-5 rounded-full text-xs flex items-center justify-center"
              style={{
                background: activeTab === tab.id ? 'rgba(107, 143, 113, 0.15)' : '#E8E2DA',
                color: activeTab === tab.id ? '#2D5A3D' : '#6B6560',
              }}
            >
              {tab.count}
            </span>
            {activeTab === tab.id && (
              <motion.div
                layoutId="treatmentTabIndicator"
                className="absolute bottom-0 left-0 right-0 h-[3px]"
                style={{ background: '#6B8F71' }}
                transition={{ type: 'spring', stiffness: 500, damping: 35 }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="mt-6">
        <AnimatePresence mode="wait">
          {activeTab === 'organic' && (
            <OrganicTabContent key="organic" treatments={organicTreatments} />
          )}
          {activeTab === 'chemical' && (
            <ChemicalTabContent key="chemical" treatments={chemicalTreatments} />
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

// ---- Organic Tab Content ----

function OrganicTabContent({ treatments }: { treatments: OrganicTreatment[] }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 10 }}
      transition={{ duration: 0.3 }}
      className="space-y-4"
    >
      {treatments.map((treatment, index) => (
        <motion.div
          key={treatment.name}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.08, duration: 0.4 }}
          className="rounded-2xl p-6"
          style={{
            background: '#FFFCF7',
            boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
          }}
        >
          <div className="flex items-start justify-between gap-4 mb-3">
            <h4
              className="text-base font-semibold"
              style={{ color: '#2D5A3D', fontFamily: '"Inter", sans-serif' }}
            >
              {treatment.name}
            </h4>
            <span
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium whitespace-nowrap"
              style={{
                background: 'rgba(107, 143, 113, 0.1)',
                color: '#2D5A3D',
                fontFamily: '"Inter", sans-serif',
              }}
            >
              <IndianRupee className="w-3 h-3" />
              {treatment.costEstimate}
            </span>
          </div>

          <p
            className="text-sm leading-relaxed mb-4"
            style={{ color: '#2A2A28', fontFamily: '"Inter", sans-serif' }}
          >
            {treatment.description}
          </p>

          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0 text-[#6B8F71]" />
              <div>
                <span
                  className="text-xs font-semibold uppercase tracking-wider"
                  style={{ color: '#6B6560', fontFamily: '"Inter", sans-serif' }}
                >
                  Application
                </span>
                <p
                  className="text-sm leading-relaxed mt-0.5"
                  style={{ color: '#2A2A28', fontFamily: '"Inter", sans-serif' }}
                >
                  {treatment.applicationMethod}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock className="w-4 h-4 mt-0.5 flex-shrink-0 text-[#D4953A]" />
              <div>
                <span
                  className="text-xs font-semibold uppercase tracking-wider"
                  style={{ color: '#6B6560', fontFamily: '"Inter", sans-serif' }}
                >
                  Frequency
                </span>
                <p
                  className="text-sm leading-relaxed mt-0.5"
                  style={{ color: '#2A2A28', fontFamily: '"Inter", sans-serif' }}
                >
                  {treatment.frequency}
                </p>
              </div>
            </div>

            {treatment.expectedResults && treatment.expectedResults !== 'No additional cost' && (
              <div className="flex items-start gap-3">
                <Sprout className="w-4 h-4 mt-0.5 flex-shrink-0 text-[#4CAF50]" />
                <div>
                  <span
                    className="text-xs font-semibold uppercase tracking-wider"
                    style={{ color: '#6B6560', fontFamily: '"Inter", sans-serif' }}
                  >
                    Expected Results
                  </span>
                  <p
                    className="text-sm leading-relaxed mt-0.5"
                    style={{ color: '#2A2A28', fontFamily: '"Inter", sans-serif' }}
                  >
                    {treatment.expectedResults}
                  </p>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      ))}
    </motion.div>
  )
}

// ---- Chemical Tab Content ----

function ChemicalTabContent({ treatments }: { treatments: ChemicalTreatment[] }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -10 }}
      transition={{ duration: 0.3 }}
      className="space-y-4"
    >
      {treatments.map((treatment, index) => (
        <motion.div
          key={treatment.name}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.08, duration: 0.4 }}
          className="rounded-2xl p-6"
          style={{
            background: '#FFFCF7',
            boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
          }}
        >
          <div className="flex items-start justify-between gap-4 mb-3">
            <div>
              <h4
                className="text-base font-semibold"
                style={{ color: '#2D5A3D', fontFamily: '"Inter", sans-serif' }}
              >
                {treatment.name}
              </h4>
              {treatment.activeIngredient && treatment.activeIngredient !== 'Not required' && (
                <p
                  className="text-xs italic mt-0.5"
                  style={{ color: '#6B6560', fontFamily: '"Inter", sans-serif' }}
                >
                  Active: {treatment.activeIngredient}
                </p>
              )}
            </div>
            <span
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium whitespace-nowrap"
              style={{
                background: 'rgba(107, 143, 113, 0.1)',
                color: '#2D5A3D',
                fontFamily: '"Inter", sans-serif',
              }}
            >
              <IndianRupee className="w-3 h-3" />
              {treatment.costEstimate}
            </span>
          </div>

          {treatment.dosage && treatment.dosage !== 'Not applicable' && (
            <div
              className="rounded-lg px-4 py-2 mb-4 inline-block"
              style={{ background: 'rgba(66, 165, 245, 0.08)' }}
            >
              <span
                className="text-xs font-semibold uppercase tracking-wider"
                style={{ color: '#42A5F5', fontFamily: '"Inter", sans-serif' }}
              >
                Dosage
              </span>
              <p
                className="text-sm font-medium mt-0.5"
                style={{ color: '#2A2A28', fontFamily: '"Inter", sans-serif' }}
              >
                {treatment.dosage}
              </p>
            </div>
          )}

          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0 text-[#6B8F71]" />
              <div>
                <span
                  className="text-xs font-semibold uppercase tracking-wider"
                  style={{ color: '#6B6560', fontFamily: '"Inter", sans-serif' }}
                >
                  Application
                </span>
                <p
                  className="text-sm leading-relaxed mt-0.5"
                  style={{ color: '#2A2A28', fontFamily: '"Inter", sans-serif' }}
                >
                  {treatment.applicationMethod}
                </p>
              </div>
            </div>

            {treatment.safetyPrecautions && treatment.safetyPrecautions !== 'Avoid unnecessary chemical use on healthy plants to preserve beneficial insects.' && (
              <div
                className="flex items-start gap-3 rounded-xl p-4"
                style={{ background: 'rgba(229, 57, 53, 0.06)' }}
              >
                <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0 text-[#E53935]" />
                <div>
                  <span
                    className="text-xs font-semibold uppercase tracking-wider"
                    style={{ color: '#E53935', fontFamily: '"Inter", sans-serif' }}
                  >
                    Safety Precautions
                  </span>
                  <p
                    className="text-sm leading-relaxed mt-0.5"
                    style={{ color: '#5C3D2E', fontFamily: '"Inter", sans-serif' }}
                  >
                    {treatment.safetyPrecautions}
                  </p>
                </div>
              </div>
            )}

            {treatment.safetyPrecautions === 'Avoid unnecessary chemical use on healthy plants to preserve beneficial insects.' && (
              <div
                className="flex items-start gap-3 rounded-xl p-4"
                style={{ background: 'rgba(76, 175, 80, 0.06)' }}
              >
                <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0 text-[#4CAF50]" />
                <div>
                  <span
                    className="text-xs font-semibold uppercase tracking-wider"
                    style={{ color: '#4CAF50', fontFamily: '"Inter", sans-serif' }}
                  >
                    Note
                  </span>
                  <p
                    className="text-sm leading-relaxed mt-0.5"
                    style={{ color: '#2A2A28', fontFamily: '"Inter", sans-serif' }}
                  >
                    {treatment.safetyPrecautions}
                  </p>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      ))}
    </motion.div>
  )
}
