import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

interface ExampleQA {
  question: string
  answer: string
  language: 'en' | 'ta'
}

const examples: ExampleQA[] = [
  {
    question: '🌾 What crops should I grow in red soil during monsoon?',
    answer: `For **red soil (laterite/alfisol)** during monsoon in Tamil Nadu, here are the best options:\n\n1. **Ragi (Finger Millet)** — Excellent for red soil, needs moderate water, high iron content helps\n2. **Groundnut** — Well-suited, good market demand, fixes nitrogen in soil\n3. **Maize** — Grows well with monsoon rains, ready in 90-100 days\n4. **Red Gram (Tur Dal)** — Deep roots handle red soil well, good prices\n\nConsider your **local market prices** and **water availability** before deciding!`,
    language: 'en',
  },
  {
    question: '🐛 How to control fruit borer in brinjal without chemicals?',
    answer: `Organic methods for **brinjal fruit borer**:\n\n1. **Neem seed kernel extract (5%)** spray every 10 days\n2. **Pheromone traps** — 5 per acre for monitoring\n3. **Release Trichogramma parasitoids** — 1 lakh eggs/acre\n4. **Handpick and destroy** affected fruits every 3 days\n5. **Grow marigold as border crop** — traps the pest\n\nThis **integrated approach** can reduce damage by **70-80%**!`,
    language: 'en',
  },
  {
    question: '🌱 நெற்பயிருக்கு எவ்வளவு உரம் கொடுக்க வேண்டும்?',
    answer: `நெற்பயிருக்கு உரம் பரிந்துரை:\n\n**அடிஉரம்:**\n- DAP 50 கிலோ/ஏக்கர்\n- மக்கிய தொழு உரம் 5 டன்/ஏக்கர்\n\n**வளர்ச்சி காலத்தில்:**\n- யூரியா 100 கிலோ/ஏக்கர் (3 தடவைகளாக பிரித்து)\n  1. 25 நாட்களில் — 35 கிலோ\n  2. 45 நாட்களில் — 35 கிலோ\n  3. 65 நாட்களில் — 30 கிலோ\n\n**இயற்கை மாற்று:**\nபஞ்சகவ்யா 3% தெளிப்பு — 30, 50, 70 ஆம் நாட்களில்\n\n⚠️ கனமழைக்கு முன் உரம் இட வேண்டாம்!`,
    language: 'ta',
  },
]

export default function ExampleAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="w-full max-w-[800px] mx-auto space-y-3">
      {examples.map((example, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
          className="rounded-2xl overflow-hidden"
          style={{ background: '#FFFCF7' }}
        >
          {/* Accordion Header */}
          <button
            onClick={() => toggle(index)}
            className="w-full flex items-center justify-between px-6 py-5 text-left transition-colors duration-200 cursor-pointer"
            style={{
              borderBottom: openIndex === index ? '1px solid #E8E2DA' : '1px solid transparent',
              background: openIndex === index ? '#FAF6F0' : '#FFFCF7',
            }}
            onMouseEnter={(e) => {
              if (openIndex !== index) e.currentTarget.style.background = '#FAF6F0'
            }}
            onMouseLeave={(e) => {
              if (openIndex !== index) e.currentTarget.style.background = '#FFFCF7'
            }}
          >
            <span
              className="text-[0.9375rem] font-medium pr-4"
              style={{
                fontFamily: example.language === 'ta' ? '"Baloo Thambi 2", sans-serif' : '"Inter", sans-serif',
                color: '#2A2A28',
              }}
            >
              {example.question}
            </span>
            <motion.div
              animate={{ rotate: openIndex === index ? 180 : 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className="flex-shrink-0"
            >
              <ChevronDown className="w-5 h-5" style={{ color: '#6B6560' }} />
            </motion.div>
          </button>

          {/* Accordion Content */}
          <AnimatePresence>
            {openIndex === index && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ height: { duration: 0.3, ease: 'easeInOut' }, opacity: { duration: 0.2, delay: 0.05 } }}
                className="overflow-hidden"
              >
                <div className="px-6 py-5 space-y-4">
                  {/* Mini conversation preview */}
                  <div className="flex items-start gap-3">
                    <div
                      className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ background: '#FFF3E0' }}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="8" r="4" stroke="#D4953A" strokeWidth="2" fill="none" />
                        <path d="M4 20C4 15.5817 7.58172 12 12 12" stroke="#D4953A" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                    </div>
                    <div
                      className="px-4 py-2.5 rounded-[20px_4px_20px_20px]"
                      style={{ background: '#FFF3E0', maxWidth: '85%' }}
                    >
                      <p
                        className="text-sm"
                        style={{
                          fontFamily: example.language === 'ta' ? '"Baloo Thambi 2", sans-serif' : '"Inter", sans-serif',
                          color: '#2A2A28',
                        }}
                      >
                        {example.question}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div
                      className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ background: '#E8F5E9' }}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                        <rect x="4" y="10" width="16" height="10" rx="3" fill="#6B8F71" />
                        <circle cx="12" cy="7" r="3" fill="#6B8F71" />
                      </svg>
                    </div>
                    <div
                      className="px-4 py-3 rounded-[4px_20px_20px_20px]"
                      style={{ background: '#E8F5E9', maxWidth: '90%' }}
                    >
                      <div
                        className="text-sm leading-relaxed space-y-1"
                        style={{
                          fontFamily: example.language === 'ta' ? '"Baloo Thambi 2", sans-serif' : '"Inter", sans-serif',
                          color: '#2A2A28',
                        }}
                      >
                        {example.answer.split('\n').map((line, i) => {
                          const trimmed = line.trim()
                          if (!trimmed) return null
                          if (trimmed.startsWith('**') && trimmed.endsWith('**')) {
                            return (
                              <p key={i} className="font-semibold" style={{ color: '#2D5A3D' }}>
                                {trimmed.replace(/\*\*/g, '')}
                              </p>
                            )
                          }
                          const numMatch = trimmed.match(/^(\d+)\.\s+(.+)$/)
                          if (numMatch) {
                            return (
                              <div key={i} className="flex gap-2 ml-1">
                                <span className="font-semibold flex-shrink-0" style={{ color: '#D4953A' }}>
                                  {numMatch[1]}.
                                </span>
                                <span dangerouslySetInnerHTML={{ __html: numMatch[2].replace(/\*\*(.*?)\*\*/g, '<strong style="font-weight:600;color:#2D5A3D;">$1</strong>') }} />
                              </div>
                            )
                          }
                          return (
                            <p key={i} className="ml-1" dangerouslySetInnerHTML={{
                              __html: trimmed.replace(/\*\*(.*?)\*\*/g, '<strong style="font-weight:600;color:#2D5A3D;">$1</strong>')
                            }} />
                          )
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  )
}
