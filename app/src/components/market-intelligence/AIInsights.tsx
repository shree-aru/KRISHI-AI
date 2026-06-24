import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Sparkles, Loader2 } from 'lucide-react'
import { getGeminiResponse } from '@/lib/gemini'

interface AIInsightProps {
  id: number
  text: string
}

export default function AIInsights() {
  const [insights, setInsights] = useState<AIInsightProps[]>([
    { id: 1, text: 'Tomato prices at Hosur market are expected to remain elevated for the next 3-4 days due to lower supply from recent rains in neighboring districts. Consider selling within this window.' },
    { id: 2, text: 'Onion prices are declining as fresh harvests from Karnataka enter the market. Hold your stock if possible, or sell in smaller batches to avoid losses.' },
    { id: 3, text: 'Groundnut export demand from oil mills is surging. Prices may rise 8-12% over the next week. Best time to sell for maximum profit.' },
    { id: 4, text: 'Rice prices remain stable with steady demand from institutional buyers. Sona Masuri variety at Dharmapuri is performing well.' },
  ])
  const [loading, setLoading] = useState(true)

  const fetchInsights = useCallback(async () => {
    try {
      const response = await getGeminiResponse(
        'Provide 4 short bullet-point market insights for Tamil Nadu farmers about tomato, onion, groundnut, and rice prices. Keep each point under 150 characters. Focus on actionable selling advice.'
      )
      // Parse the response into bullet points
      const lines = response
        .split('\n')
        .filter((line) => line.trim().startsWith('-') || line.trim().startsWith('*') || line.trim().match(/^\d+\./))
        .map((line) => line.replace(/^[-*\d.]+\s*/, '').trim())
        .filter((line) => line.length > 0)

      if (lines.length >= 3) {
        setInsights(
          lines.slice(0, 4).map((text, i) => ({
            id: i + 1,
            text,
          }))
        )
      }
    } catch {
      // Keep default insights on error
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchInsights()
  }, [fetchInsights])

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.6,
        delay: 0.3,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      }}
      className="mt-8 rounded-[20px] p-6 sm:p-8"
      style={{
        background: 'linear-gradient(135deg, #2D5A3D, #6B8F71)',
        boxShadow: '0 8px 24px rgba(45, 90, 61, 0.2)',
      }}
    >
      <div className="flex flex-col sm:flex-row gap-5">
        {/* Icon */}
        <div
          className="w-16 h-16 rounded-2xl flex-shrink-0 flex items-center justify-center"
          style={{ background: 'rgba(255,255,255,0.15)' }}
        >
          <Sparkles className="w-8 h-8 text-white" />
        </div>

        {/* Content */}
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-4">
            <h3
              className="text-lg font-semibold text-white"
              style={{ fontFamily: '"Inter", sans-serif' }}
            >
              Gemini AI Market Analysis
            </h3>
            {loading && (
              <Loader2 className="w-4 h-4 text-white animate-spin" />
            )}
          </div>

          <ul className="space-y-3">
            {insights.map((insight, i) => (
              <motion.li
                key={insight.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.5,
                  delay: 0.4 + i * 0.1,
                  ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
                }}
                className="flex items-start gap-3"
              >
                <span
                  className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                  style={{ background: '#E8C547' }}
                />
                <span
                  className="text-[0.9375rem] leading-relaxed"
                  style={{
                    color: 'rgba(255,255,255,0.9)',
                    fontFamily: '"Inter", sans-serif',
                  }}
                >
                  {insight.text}
                </span>
              </motion.li>
            ))}
          </ul>

          <div
            className="mt-5 pt-4 text-xs flex items-center justify-between"
            style={{
              color: 'rgba(255,255,255,0.6)',
              fontFamily: '"Inter", sans-serif',
              borderTop: '1px solid rgba(255,255,255,0.15)',
            }}
          >
            <span>Updated today</span>
            <span className="flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              Powered by Google Gemini
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
