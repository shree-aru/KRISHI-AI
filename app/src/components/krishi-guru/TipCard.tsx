import { motion } from 'framer-motion'
import type { LucideIcon } from 'lucide-react'

interface TipCardProps {
  icon: LucideIcon
  title: string
  description: string
  index: number
}

export default function TipCard({ icon: Icon, title, description, index }: TipCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      whileHover={{ y: -3, boxShadow: '0 8px 24px rgba(0,0,0,0.1)' }}
      className="p-6 rounded-2xl transition-shadow duration-300"
      style={{ background: '#FFFCF7' }}
    >
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
        style={{ background: 'rgba(107, 143, 113, 0.12)' }}
      >
        <Icon className="w-5 h-5" style={{ color: '#6B8F71' }} />
      </div>
      <h3
        className="text-[1.25rem] font-semibold mb-2"
        style={{ fontFamily: '"Inter", sans-serif', color: '#2A2A28' }}
      >
        {title}
      </h3>
      <p
        className="text-[0.9375rem] leading-relaxed"
        style={{ fontFamily: '"Inter", sans-serif', color: '#6B6560' }}
      >
        {description}
      </p>
    </motion.div>
  )
}
