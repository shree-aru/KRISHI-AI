import { motion } from 'framer-motion'
import {
  Wheat,
  Bean,
  Apple,
  Cherry,
  Leaf,
  Sprout,
  CircleDot,
} from 'lucide-react'

// Using Lucide icons where possible, for crops without direct icons we use generic plant icons
const CROPS = [
  { name: 'Rice', icon: <Wheat className="w-6 h-6" />, status: 'Fully Supported' as const, diseases: 18 },
  { name: 'Groundnut', icon: <CircleDot className="w-6 h-6" />, status: 'Fully Supported' as const, diseases: 14 },
  { name: 'Tomato', icon: <Apple className="w-6 h-6" />, status: 'Fully Supported' as const, diseases: 16 },
  { name: 'Banana', icon: <Leaf className="w-6 h-6" />, status: 'Fully Supported' as const, diseases: 12 },
  { name: 'Cotton', icon: <Sprout className="w-6 h-6" />, status: 'Fully Supported' as const, diseases: 15 },
  { name: 'Chili', icon: <Cherry className="w-6 h-6" />, status: 'Fully Supported' as const, diseases: 10 },
  { name: 'Onion', icon: <CircleDot className="w-6 h-6" />, status: 'Beta' as const, diseases: 8 },
  { name: 'Mango', icon: <Apple className="w-6 h-6" />, status: 'Beta' as const, diseases: 9 },
  { name: 'Maize', icon: <Wheat className="w-6 h-6" />, status: 'Beta' as const, diseases: 7 },
  { name: 'Black Gram', icon: <Bean className="w-6 h-6" />, status: 'Beta' as const, diseases: 6 },
  { name: 'Sugarcane', icon: <Leaf className="w-6 h-6" />, status: 'Coming Soon' as const, diseases: 0 },
  { name: 'Brinjal', icon: <CircleDot className="w-6 h-6" />, status: 'Coming Soon' as const, diseases: 0 },
]

function getStatusStyle(status: string) {
  switch (status) {
    case 'Fully Supported':
      return {
        bg: 'rgba(76, 175, 80, 0.1)',
        text: '#4CAF50',
      }
    case 'Beta':
      return {
        bg: 'rgba(212, 149, 58, 0.1)',
        text: '#D4953A',
      }
    case 'Coming Soon':
      return {
        bg: 'rgba(107, 101, 96, 0.1)',
        text: '#6B6560',
      }
    default:
      return {
        bg: 'rgba(107, 101, 96, 0.1)',
        text: '#6B6560',
      }
  }
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  },
}

export default function SupportedCrops() {
  return (
    <section
      className="w-full"
      style={{ background: '#F5F0E8' }}
    >
      <div className="max-w-[1280px] mx-auto px-6 sm:px-8 lg:px-12 py-24">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          {/* Badge */}
          <span
            className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-[0.08em] mb-5"
            style={{
              background: 'rgba(107, 143, 113, 0.12)',
              color: '#2D5A3D',
              fontFamily: '"Inter", sans-serif',
            }}
          >
            Expanding Daily
          </span>

          <h2
            className="mb-4"
            style={{
              fontFamily: '"Playfair Display", serif',
              fontWeight: 700,
              fontSize: 'clamp(2rem, 4vw, 3.5rem)',
              lineHeight: 1.1,
              letterSpacing: '-0.01em',
              color: '#2D5A3D',
            }}
          >
            Crops We Currently Support
          </h2>

          <p
            className="max-w-lg mx-auto"
            style={{
              color: '#6B6560',
              fontFamily: '"Inter", sans-serif',
              fontSize: '1.125rem',
              lineHeight: 1.6,
            }}
          >
            Our AI is trained on major Tamil Nadu crops with more added regularly.
          </p>
        </motion.div>

        {/* Crop Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {CROPS.map((crop) => {
            const statusStyle = getStatusStyle(crop.status)
            return (
              <motion.div
                key={crop.name}
                variants={cardVariants}
                whileHover={{ y: -3, boxShadow: '0 8px 24px rgba(0,0,0,0.1)' }}
                transition={{ duration: 0.3 }}
                className="rounded-2xl p-6 flex items-start gap-4"
                style={{
                  background: '#FFFCF7',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                }}
              >
                {/* Icon */}
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{
                    background: 'rgba(107, 143, 113, 0.1)',
                    color: '#6B8F71',
                  }}
                >
                  {crop.icon}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1.5">
                    <h3
                      className="text-base font-semibold"
                      style={{ color: '#2A2A28', fontFamily: '"Inter", sans-serif' }}
                    >
                      {crop.name}
                    </h3>
                  </div>

                  <span
                    className="inline-block px-2.5 py-0.5 rounded-full text-xs font-medium mb-2"
                    style={{
                      background: statusStyle.bg,
                      color: statusStyle.text,
                      fontFamily: '"Inter", sans-serif',
                    }}
                  >
                    {crop.status}
                  </span>

                  {crop.diseases > 0 && (
                    <p
                      className="text-xs"
                      style={{ color: '#6B6560', fontFamily: '"Inter", sans-serif' }}
                    >
                      {crop.diseases} diseases tracked
                    </p>
                  )}
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
