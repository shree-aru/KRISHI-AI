import { motion } from 'framer-motion'
import { Camera, Upload, Brain, Pill } from 'lucide-react'

const STEPS = [
  {
    icon: <Camera className="w-7 h-7" />,
    title: 'Take Photo',
    description: 'Capture a clear, well-lit photo of the affected crop area.',
  },
  {
    icon: <Upload className="w-7 h-7" />,
    title: 'Upload',
    description: 'Drag and drop or select your image in the upload area.',
  },
  {
    icon: <Brain className="w-7 h-7" />,
    title: 'AI Analysis',
    description: 'Google Gemini analyzes the image against thousands of crop disease patterns.',
  },
  {
    icon: <Pill className="w-7 h-7" />,
    title: 'Get Treatment',
    description: 'Receive detailed organic and chemical treatment recommendations.',
  },
]

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
}

const stepVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  },
}

export default function HowItWorks() {
  return (
    <section
      className="w-full"
      style={{ background: '#2D5A3D' }}
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
              background: 'rgba(255,255,255,0.12)',
              color: 'rgba(255,255,255,0.9)',
              fontFamily: '"Inter", sans-serif',
            }}
          >
            Simple Process
          </span>

          <h2
            className="text-white mb-4"
            style={{
              fontFamily: '"Playfair Display", serif',
              fontWeight: 700,
              fontSize: 'clamp(2rem, 4vw, 3.5rem)',
              lineHeight: 1.1,
              letterSpacing: '-0.01em',
            }}
          >
            How Crop Doctor Works
          </h2>

          <p
            className="max-w-lg mx-auto"
            style={{
              color: 'rgba(255,255,255,0.8)',
              fontFamily: '"Inter", sans-serif',
              fontSize: '1.125rem',
              lineHeight: 1.6,
            }}
          >
            Four easy steps from photo to treatment plan.
          </p>
        </motion.div>

        {/* Steps Timeline */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="relative"
        >
          {/* Connector Line - Desktop */}
          <div className="hidden lg:block absolute top-[31px] left-[12.5%] right-[12.5%] h-[2px]">
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
              className="w-full h-full origin-left"
              style={{ background: 'rgba(232, 197, 71, 0.3)' }}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-6">
            {STEPS.map((step, index) => (
              <motion.div
                key={step.title}
                variants={stepVariants}
                className="flex flex-col items-center text-center"
              >
                {/* Step Circle */}
                <div
                  className="relative w-16 h-16 rounded-full flex items-center justify-center text-white mb-5 z-10"
                  style={{ background: '#D4953A' }}
                >
                  {step.icon}
                  {/* Step Number */}
                  <span
                    className="absolute -top-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                    style={{
                      background: '#E8C547',
                      color: '#2D5A3D',
                      fontFamily: '"Inter", sans-serif',
                    }}
                  >
                    {index + 1}
                  </span>
                </div>

                {/* Title */}
                <h3
                  className="text-base font-semibold text-white mb-2"
                  style={{ fontFamily: '"Inter", sans-serif' }}
                >
                  {step.title}
                </h3>

                {/* Description */}
                <p
                  className="text-sm leading-relaxed max-w-[240px]"
                  style={{
                    color: 'rgba(255,255,255,0.8)',
                    fontFamily: '"Inter", sans-serif',
                  }}
                >
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
