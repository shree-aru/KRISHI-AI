import { motion } from 'framer-motion'
import { Shield } from 'lucide-react'

interface PreventionTipsProps {
  tips: string[]
}

export default function PreventionTips({ tips }: PreventionTipsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.5 }}
      className="w-full rounded-2xl p-6"
      style={{ background: 'rgba(107, 143, 113, 0.08)' }}
    >
      <div className="flex items-center gap-2 mb-4">
        <Shield className="w-5 h-5 text-[#2D5A3D]" />
        <h3
          className="text-base font-semibold"
          style={{ color: '#2D5A3D', fontFamily: '"Inter", sans-serif' }}
        >
          Prevention Tips
        </h3>
      </div>

      <ul className="space-y-3">
        {tips.map((tip, index) => (
          <motion.li
            key={index}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 + index * 0.08, duration: 0.3 }}
            className="flex items-start gap-3"
          >
            <Shield className="w-4 h-4 mt-0.5 flex-shrink-0 text-[#6B8F71]" />
            <span
              className="text-sm leading-relaxed"
              style={{ color: '#2A2A28', fontFamily: '"Inter", sans-serif' }}
            >
              {tip}
            </span>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  )
}
