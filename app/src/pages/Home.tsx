import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import CountUp from 'react-countup'
import {
  Users,
  TrendingDown,
  Leaf,
  CloudSun,
  Scan,
  MessageCircle,
  TrendingUp,
  FlaskConical,
  Upload,
  Sparkles,
  Sprout,
  Check,
  Star,
  Thermometer,
  Droplets,
  Play,
} from 'lucide-react'
import { tools } from '../data/tools'
import { testimonials } from '../data/testimonials'

/* ───────────────────── easing helpers ───────────────────── */
const easeOut = [0.16, 1, 0.3, 1] as [number, number, number, number]

/* ───────────────────── fade-up variant ───────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay, ease: easeOut },
  }),
}

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
}

const staggerItem = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: easeOut },
  },
}

/* ───────────────────── icon map ───────────────────── */
const toolIconMap: Record<string, React.ReactNode> = {
  Scan: <Scan className="w-5 h-5" />,
  MessageCircle: <MessageCircle className="w-5 h-5" />,
  TrendingUp: <TrendingUp className="w-5 h-5" />,
  FlaskConical: <FlaskConical className="w-5 h-5" />,
  CloudSun: <CloudSun className="w-5 h-5" />,
}

/* ═══════════════════════════════════════════════════════════
   SECTION 1 — HERO
   ═══════════════════════════════════════════════════════════ */
function HeroSection() {
  const titleWords = ['Smart', 'Farming', 'Starts', 'Here']

  return (
    <section className="relative min-h-[100dvh] flex items-center overflow-hidden">
      {/* Background image */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute inset-0"
      >
        <img
          src="/hero-farm-landscape.jpg"
          alt="Tamil Nadu paddy fields"
          className="w-full h-full object-cover"
        />
        {/* Gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to right, rgba(26, 37, 24, 0.88) 0%, rgba(26, 37, 24, 0.55) 60%, rgba(26, 37, 24, 0.4) 100%)',
          }}
        />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-[1280px] mx-auto px-6 py-20">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Left content */}
          <div className="max-w-[640px]">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.5, ease: easeOut }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6"
              style={{ background: 'rgba(107, 143, 113, 0.15)' }}
            >
              <span className="text-sm">🌾</span>
              <span
                className="text-sm font-semibold"
                style={{
                  color: '#2D5A3D',
                  fontFamily: '"Inter", sans-serif',
                }}
              >
                AI-Powered Farming for Tamil Nadu
              </span>
            </motion.div>

            {/* Title — kinetic word-by-word */}
            <h1
              className="mb-6"
              style={{
                fontFamily: '"Playfair Display", serif',
                fontWeight: 800,
                fontSize: 'clamp(2.5rem, 6vw, 5.5rem)',
                lineHeight: 1.05,
                letterSpacing: '-0.02em',
                color: '#fff',
              }}
            >
              {titleWords.map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, x: -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.7 + i * 0.15,
                    ease: easeOut,
                  }}
                  className="inline-block mr-[0.3em]"
                >
                  {word}
                </motion.span>
              ))}
            </h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.2, ease: easeOut }}
              className="max-w-[520px] mb-8"
              style={{
                fontFamily: '"Inter", sans-serif',
                fontSize: '1.25rem',
                lineHeight: 1.6,
                letterSpacing: '0.01em',
                color: 'rgba(255,255,255,0.85)',
              }}
            >
              KRISHI-AI combines Google Gemini intelligence with deep agricultural knowledge to
              help smallholder farmers grow more, earn more, and farm smarter.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 1.5, ease: easeOut }}
              className="flex flex-wrap items-center gap-4"
            >
              <Link
                to="/crop-doctor"
                className="inline-flex items-center px-8 py-4 rounded-full text-[0.9375rem] font-semibold text-white transition-all duration-250 hover:scale-[1.02] hover:shadow-lg"
                style={{
                  background: '#D4953A',
                  fontFamily: '"Inter", sans-serif',
                  letterSpacing: '0.02em',
                }}
              >
                Explore Our Tools
              </Link>
              <button
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-[0.9375rem] font-semibold text-white transition-all duration-250 hover:bg-white/10"
                style={{
                  border: '2px solid rgba(255,255,255,0.4)',
                  fontFamily: '"Inter", sans-serif',
                  letterSpacing: '0.02em',
                }}
              >
                <Play className="w-4 h-4" />
                Watch Demo
              </button>
            </motion.div>
          </div>

          {/* Floating Data Pills */}
          <div className="hidden lg:flex flex-col gap-6">
            <FloatingPill
              delay={1.8}
              floatDelay={0}
              icon={<Thermometer className="w-5 h-5 text-[#E8C547]" />}
              label="28°C"
              sublabel="Krishnagiri"
            />
            <FloatingPill
              delay={1.95}
              floatDelay={0.5}
              icon={<TrendingUp className="w-5 h-5 text-[#4CAF50]" />}
              label="+23%"
              sublabel="Yield Increase"
            />
            <FloatingPill
              delay={2.1}
              floatDelay={1}
              icon={<Droplets className="w-5 h-5 text-[#42A5F5]" />}
              label="Monsoon"
              sublabel="Expected Soon"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

function FloatingPill({
  delay,
  floatDelay,
  icon,
  label,
  sublabel,
}: {
  delay: number
  floatDelay: number
  icon: React.ReactNode
  label: string
  sublabel: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay, ease: easeOut }}
      className="animate-float flex items-center gap-3 px-5 py-3.5 rounded-2xl"
      style={{ animationDelay: `${floatDelay}s` }}
    >
      <div
        className="rounded-xl flex items-center gap-3 px-5 py-3.5"
        style={{
          background: 'rgba(255,255,255,0.1)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.15)',
        }}
      >
        {icon}
        <div>
          <div
            className="text-white font-semibold text-sm"
            style={{ fontFamily: '"Inter", sans-serif' }}
          >
            {label}
          </div>
          <div
            className="text-xs"
            style={{ color: 'rgba(255,255,255,0.6)', fontFamily: '"Inter", sans-serif' }}
          >
            {sublabel}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

/* ═══════════════════════════════════════════════════════════
   SECTION 2 — STATS STRIP
   ═══════════════════════════════════════════════════════════ */
function StatsSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-15%' })

  const stats = [
    {
      icon: <Users className="w-8 h-8 text-[#6B8F71]" />,
      number: 145,
      suffix: 'M+',
      label: 'SMALLHOLDER FARMERS IN INDIA',
      detail: 'The backbone of Indian agriculture',
    },
    {
      icon: <TrendingDown className="w-8 h-8 text-[#6B8F71]" />,
      number: 52,
      suffix: '%',
      label: 'OF FARMING HOUSEHOLDS IN DEBT',
      detail: 'Average debt: \u20b91,04,000 per household',
    },
    {
      icon: <Leaf className="w-8 h-8 text-[#6B8F71]" />,
      number: 30,
      suffix: '%',
      label: 'CROP YIELD LOST TO PESTS & DISEASE',
      detail: 'Costing India \u20b990,000 Crore annually',
    },
    {
      icon: <CloudSun className="w-8 h-8 text-[#6B8F71]" />,
      number: 68,
      suffix: '%',
      label: 'FARMLAND IS RAIN-FED',
      detail: 'Highly vulnerable to climate shifts',
    },
  ]

  return (
    <section ref={ref} style={{ background: '#F5F0E8' }} className="py-20 lg:py-24">
      <div className="max-w-[1280px] mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-15%' }}
          variants={fadeUp}
          className="text-center mb-12"
        >
          <span
            className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold mb-4"
            style={{
              background: 'rgba(107, 143, 113, 0.12)',
              color: '#2D5A3D',
              fontFamily: '"Inter", sans-serif',
            }}
          >
            THE REALITY OF INDIAN FARMING
          </span>
          <h2
            style={{
              fontFamily: '"Playfair Display", serif',
              fontWeight: 700,
              fontSize: 'clamp(2rem, 4vw, 3.5rem)',
              lineHeight: 1.1,
              letterSpacing: '-0.01em',
              color: '#2D5A3D',
            }}
          >
            Why Every Farmer Needs AI
          </h2>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-10%' }}
          variants={staggerContainer}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              variants={staggerItem}
              whileHover={{ y: -3, boxShadow: '0 8px 24px rgba(0,0,0,0.1)' }}
              transition={{ duration: 0.3 }}
              className="rounded-2xl p-8 text-center"
              style={{
                background: '#FFFCF7',
                boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
              }}
            >
              <div className="flex justify-center mb-4">{stat.icon}</div>
              <div
                style={{
                  fontFamily: '"Playfair Display", serif',
                  fontWeight: 800,
                  fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                  lineHeight: 1,
                  letterSpacing: '-0.02em',
                  color: '#2D5A3D',
                }}
              >
                {isInView ? (
                  <CountUp end={stat.number} duration={2.5} suffix={stat.suffix} />
                ) : (
                  <span>0{stat.suffix}</span>
                )}
              </div>
              <div
                className="mt-3 text-xs font-medium uppercase tracking-[0.08em]"
                style={{ color: '#6B6560', fontFamily: '"Inter", sans-serif' }}
              >
                {stat.label}
              </div>
              <div
                className="mt-2 text-xs"
                style={{ color: '#6B6560', fontFamily: '"Inter", sans-serif' }}
              >
                {stat.detail}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════
   SECTION 3 — TOOLS SHOWCASE
   ═══════════════════════════════════════════════════════════ */
function ToolsSection() {
  return (
    <section style={{ background: '#FAF6F0' }} className="py-20 lg:py-24">
      <div className="max-w-[1280px] mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-15%' }}
          variants={fadeUp}
          className="text-center mb-14"
        >
          <span
            className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold mb-4"
            style={{
              background: 'rgba(107, 143, 113, 0.12)',
              color: '#2D5A3D',
              fontFamily: '"Inter", sans-serif',
            }}
          >
            AI-POWERED TOOLS
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
            Your Complete Farming Toolkit
          </h2>
          <p
            className="max-w-[600px] mx-auto"
            style={{
              fontFamily: '"Inter", sans-serif',
              fontSize: '1.125rem',
              lineHeight: 1.6,
              color: '#6B6560',
            }}
          >
            Five powerful AI tools designed to help you at every stage of farming — from soil to
            market.
          </p>
        </motion.div>

        {/* Tool Cards Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-10%' }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8"
        >
          {/* Top row: 3 cards */}
          {tools.slice(0, 3).map((tool, i) => (
            <ToolCard key={tool.id} tool={tool} index={i} />
          ))}
        </motion.div>
        {/* Bottom row: 2 cards centered */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-10%' }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-[760px] mx-auto mt-8"
        >
          {tools.slice(3, 5).map((tool, i) => (
            <ToolCard key={tool.id} tool={tool} index={i + 3} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function ToolCard({ tool, index }: { tool: typeof tools[0]; index: number }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 40 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, delay: index * 0.1, ease: easeOut },
        },
      }}
      whileHover={{ y: -6, boxShadow: '0 12px 32px rgba(0,0,0,0.12)' }}
      transition={{ duration: 0.3 }}
      className="group rounded-[20px] overflow-hidden"
      style={{
        background: '#FFFCF7',
        boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
      }}
    >
              <div className="overflow-hidden">
                <img
                  src={tool.image}
                  alt={tool.title}
                  className="w-full h-[200px] object-cover transition-transform duration-400 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center mb-4"
                  style={{ background: '#6B8F71' }}
                >
                  <span className="text-white">{toolIconMap[tool.icon]}</span>
                </div>
                <h3
                  className="mb-2"
                  style={{
                    fontFamily: '"Inter", sans-serif',
                    fontSize: '1.25rem',
                    fontWeight: 600,
                    lineHeight: 1.4,
                    color: '#2D5A3D',
                  }}
                >
                  {tool.title}
                </h3>
                <p
                  className="mb-4"
                  style={{
                    fontFamily: '"Inter", sans-serif',
                    fontSize: '0.9375rem',
                    lineHeight: 1.6,
                    color: '#2A2A28',
                  }}
                >
                  {tool.description}
                </p>
                <Link
                  to={tool.link}
                  className="inline-flex items-center gap-1 text-sm font-semibold transition-all duration-300 hover:gap-2"
                  style={{ color: '#D4953A', fontFamily: '"Inter", sans-serif' }}
                >
                  Try {tool.title}
                  <span>→</span>
                </Link>
              </div>
            </motion.div>
  )
}

/* ═══════════════════════════════════════════════════════════
   SECTION 4 — HOW IT WORKS
   ═══════════════════════════════════════════════════════════ */
function HowItWorksSection() {
  const steps = [
    {
      num: '01',
      title: 'Capture Your Farm Data',
      desc: 'Upload crop photos, enter soil readings, or ask questions in your preferred language.',
      icon: <Upload className="w-6 h-6" />,
    },
    {
      num: '02',
      title: 'AI Analysis by Gemini',
      desc: 'Google Gemini processes your data with agricultural expertise — identifying diseases, predicting prices, and recommending solutions.',
      icon: <Sparkles className="w-6 h-6" />,
    },
    {
      num: '03',
      title: 'Take Informed Action',
      desc: 'Get clear, actionable recommendations — treatment plans, crop choices, market timing — all in simple language.',
      icon: <Sprout className="w-6 h-6" />,
    },
  ]

  return (
    <section style={{ background: '#2D5A3D' }} className="py-20 lg:py-24">
      <div className="max-w-[1280px] mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-15%' }}
          variants={fadeUp}
          className="text-center mb-16"
        >
          <span
            className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold mb-4"
            style={{
              background: 'rgba(255,255,255,0.1)',
              color: '#fff',
              fontFamily: '"Inter", sans-serif',
            }}
          >
            SIMPLE & POWERFUL
          </span>
          <h2
            className="mb-4"
            style={{
              fontFamily: '"Playfair Display", serif',
              fontWeight: 700,
              fontSize: 'clamp(2rem, 4vw, 3.5rem)',
              lineHeight: 1.1,
              letterSpacing: '-0.01em',
              color: '#fff',
            }}
          >
            How KRISHI-AI Works
          </h2>
          <p
            className="max-w-[600px] mx-auto"
            style={{
              fontFamily: '"Inter", sans-serif',
              fontSize: '1.125rem',
              lineHeight: 1.6,
              color: 'rgba(255,255,255,0.8)',
            }}
          >
            From soil analysis to market insights — three simple steps to smarter farming.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting line (desktop) */}
          <div className="hidden lg:block absolute top-7 left-[16.67%] right-[16.67%] h-0.5">
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.3, ease: easeOut }}
              className="w-full h-full origin-left"
              style={{
                background:
                  'repeating-linear-gradient(to right, #E8C547 0, #E8C547 8px, transparent 8px, transparent 16px)',
              }}
            />
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-10%' }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-10 relative z-10"
          >
            {steps.map((step, i) => (
              <motion.div
                key={step.num}
                variants={{
                  hidden: { opacity: 0, scale: 0 },
                  visible: {
                    opacity: 1,
                    scale: 1,
                    transition: { duration: 0.5, delay: i * 0.3, ease: easeOut },
                  },
                }}
                className="text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: i * 0.3,
                    type: 'spring',
                    stiffness: 200,
                  }}
                  className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-5"
                  style={{ background: '#D4953A' }}
                >
                  <span
                    className="text-white text-lg"
                    style={{
                      fontFamily: '"Playfair Display", serif',
                      fontWeight: 700,
                    }}
                  >
                    {step.num}
                  </span>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.3 + 0.2 }}
                  className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{ background: 'rgba(255,255,255,0.1)' }}
                >
                  <span className="text-white">{step.icon}</span>
                </motion.div>
                <motion.h3
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.3 + 0.2 }}
                  className="mb-3 text-lg font-semibold text-white"
                  style={{ fontFamily: '"Inter", sans-serif' }}
                >
                  {step.title}
                </motion.h3>
                <motion.p
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.3 + 0.3 }}
                  className="text-sm leading-relaxed"
                  style={{ color: 'rgba(255,255,255,0.7)', fontFamily: '"Inter", sans-serif' }}
                >
                  {step.desc}
                </motion.p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════
   SECTION 5 — FARMER TESTIMONIALS
   ═══════════════════════════════════════════════════════════ */
function TestimonialsSection() {
  return (
    <section style={{ background: '#F5F0E8' }} className="py-20 lg:py-24">
      <div className="max-w-[1280px] mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-15%' }}
          variants={fadeUp}
          className="mb-12"
        >
          <span
            className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold mb-4"
            style={{
              background: 'rgba(107, 143, 113, 0.12)',
              color: '#2D5A3D',
              fontFamily: '"Inter", sans-serif',
            }}
          >
            FARMER STORIES
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
            Trusted by Farmers Across Tamil Nadu
          </h2>
          <p
            className="max-w-[600px]"
            style={{
              fontFamily: '"Inter", sans-serif',
              fontSize: '1.125rem',
              lineHeight: 1.6,
              color: '#6B6560',
            }}
          >
            Real farmers, real results — hear how KRISHI-AI is transforming their farming journey.
          </p>
        </motion.div>

        {/* Carousel */}
        <div className="relative">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {testimonials.map((t, i) => (
              <motion.div
                key={t.id}
                variants={{
                  hidden: { opacity: 0, x: 40 },
                  visible: {
                    opacity: 1,
                    x: 0,
                    transition: { duration: 0.5, delay: i * 0.1, ease: easeOut },
                  },
                }}
                whileHover={{ y: -4, boxShadow: '0 8px 24px rgba(0,0,0,0.1)' }}
                transition={{ duration: 0.3 }}
                className="flex-shrink-0 w-[360px] max-w-[85vw] snap-center rounded-[20px] p-8"
                style={{
                  background: '#FFFCF7',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
                }}
              >
                {/* Quote icon */}
                <div
                  className="text-5xl mb-4 leading-none"
                  style={{
                    fontFamily: '"Playfair Display", serif',
                    color: 'rgba(107, 143, 113, 0.2)',
                  }}
                >
                  &ldquo;
                </div>

                {/* Quote text */}
                <p
                  className="mb-6"
                  style={{
                    fontFamily: '"Inter", sans-serif',
                    fontSize: '1.0625rem',
                    fontWeight: 500,
                    lineHeight: 1.7,
                    color: '#2A2A28',
                  }}
                >
                  {t.quote}
                </p>

                {/* Divider */}
                <div className="w-10 h-0.5 mb-4" style={{ background: '#E8E2DA' }} />

                {/* Author */}
                <div className="flex items-center gap-3">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-14 h-14 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <div
                      className="font-semibold text-sm"
                      style={{ color: '#2A2A28', fontFamily: '"Inter", sans-serif' }}
                    >
                      {t.name}
                    </div>
                    <div
                      className="text-xs"
                      style={{ color: '#6B6560', fontFamily: '"Inter", sans-serif' }}
                    >
                      {t.location}
                    </div>
                  </div>
                  {/* Stars */}
                  <div className="flex gap-0.5">
                    {Array.from({ length: t.stars }).map((_, si) => (
                      <Star
                        key={si}
                        className="w-4 h-4 fill-[#E8C547] text-[#E8C547]"
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════
   SECTION 6 — AI / GEMINI SHOWCASE
   ═══════════════════════════════════════════════════════════ */
function AIShowcaseSection() {
  const features = [
    'Multilingual — Supports Tamil, Hindi, English, and more',
    'Image Analysis — Advanced crop disease detection from photos',
    'Real-time Data — Live weather, market prices, and forecasts',
    'Personalized — Recommendations tailored to your farm',
  ]

  return (
    <section style={{ background: '#1C2518' }} className="py-20 lg:py-24 relative overflow-hidden">
      {/* Noise texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
        }}
      />

      <div className="max-w-[1280px] mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          {/* Left Column — Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-15%' }}
            transition={{ duration: 0.7, ease: easeOut }}
          >
            <span
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold mb-5"
              style={{
                background: 'rgba(255,255,255,0.08)',
                color: '#fff',
                fontFamily: '"Inter", sans-serif',
              }}
            >
              <Sparkles className="w-4 h-4" />
              POWERED BY GOOGLE GEMINI
            </span>

            <h2
              className="mb-5"
              style={{
                fontFamily: '"Playfair Display", serif',
                fontWeight: 700,
                fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                lineHeight: 1.1,
                letterSpacing: '-0.01em',
                color: '#fff',
              }}
            >
              Artificial Intelligence, Rooted in Agriculture
            </h2>

            <p
              className="mb-8"
              style={{
                fontFamily: '"Inter", sans-serif',
                fontSize: '1.125rem',
                lineHeight: 1.6,
                color: 'rgba(255,255,255,0.8)',
              }}
            >
              KRISHI-AI harnesses the power of Google&apos;s Gemini AI to understand your farming
              challenges in multiple Indian languages, analyze crop images with expert precision,
              and deliver personalized advice that actually works.
            </p>

            {/* Feature list */}
            <motion.ul
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="space-y-3"
            >
              {features.map((feat, i) => (
                <motion.li
                  key={i}
                  variants={{
                    hidden: { opacity: 0, x: -15 },
                    visible: {
                      opacity: 1,
                      x: 0,
                      transition: { duration: 0.4, delay: i * 0.1, ease: easeOut },
                    },
                  }}
                  className="flex items-center gap-3"
                >
                  <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(76, 175, 80, 0.2)' }}>
                    <Check className="w-3 h-3 text-[#4CAF50]" />
                  </div>
                  <span
                    className="text-sm"
                    style={{
                      color: 'rgba(255,255,255,0.85)',
                      fontFamily: '"Inter", sans-serif',
                    }}
                  >
                    {feat}
                  </span>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          {/* Right Column — Phone Mockup */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-15%' }}
            transition={{ duration: 0.7, delay: 0.2, ease: easeOut }}
            className="flex justify-center"
          >
            <div
              className="w-[320px] h-[500px] rounded-[32px] p-4 relative"
              style={{
                border: '2px solid rgba(255,255,255,0.1)',
                background: 'rgba(255,255,255,0.03)',
                backdropFilter: 'blur(8px)',
                boxShadow: '0 0 60px rgba(107, 143, 113, 0.2)',
              }}
            >
              {/* Chat header */}
              <div
                className="flex items-center gap-2 px-3 py-2 rounded-t-2xl mb-3"
                style={{ background: 'rgba(107, 143, 113, 0.2)' }}
              >
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ background: '#6B8F71' }}
                >
                  <Sprout className="w-4 h-4 text-white" />
                </div>
                <div>
                  <div className="text-white text-xs font-semibold" style={{ fontFamily: '"Inter", sans-serif' }}>
                    Krishi Guru
                  </div>
                  <div className="text-[10px]" style={{ color: 'rgba(255,255,255,0.5)' }}>
                    AI Assistant
                  </div>
                </div>
              </div>

              {/* Chat messages */}
              <div className="space-y-3 px-1">
                {/* AI message 1 */}
                <div
                  className="p-3 rounded-2xl rounded-tl-sm text-xs leading-relaxed"
                  style={{
                    background: 'rgba(107, 143, 113, 0.2)',
                    color: 'rgba(255,255,255,0.9)',
                    fontFamily: '"Inter", sans-serif',
                  }}
                >
                  🌾 Welcome! I&apos;m your Krishi Guru. Ask me anything about farming — in Tamil,
                  Hindi, or English!
                </div>

                {/* User message */}
                <div className="flex justify-end">
                  <div
                    className="p-3 rounded-2xl rounded-tr-sm text-xs max-w-[85%]"
                    style={{
                      background: 'rgba(255,255,255,0.12)',
                      color: '#fff',
                      fontFamily: '"Inter", sans-serif',
                    }}
                  >
                    How to prevent root rot in banana plants?
                  </div>
                </div>

                {/* AI message 2 */}
                <div
                  className="p-3 rounded-2xl rounded-tl-sm text-xs leading-relaxed"
                  style={{
                    background: 'rgba(107, 143, 113, 0.2)',
                    color: 'rgba(255,255,255,0.9)',
                    fontFamily: '"Inter", sans-serif',
                  }}
                >
                  Root rot in banana is often caused by overwatering and fungal infection
                  (Fusarium). Here&apos;s what to do:
                  <br />
                  <br />
                  [1] Improve drainage
                  <br />
                  [2] Apply Trichoderma
                  <br />
                  [3] Avoid waterlogging
                </div>
              </div>

              {/* Input placeholder */}
              <div
                className="absolute bottom-4 left-4 right-4 h-10 rounded-full flex items-center px-4"
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.1)',
                }}
              >
                <span className="text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>
                  Ask in any language...
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════
   SECTION 7 — PARALLAX CTA
   ═══════════════════════════════════════════════════════════ */
function CTASection() {
  return (
    <section
      className="relative py-20 lg:py-24"
      style={{
        backgroundImage: 'url(/about-farming-scene.jpg)',
        backgroundAttachment: 'fixed',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Overlay */}
      <div
        className="absolute inset-0"
        style={{ background: 'rgba(26, 37, 24, 0.8)' }}
      />

      <div className="max-w-[700px] mx-auto px-6 relative z-10 text-center">
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-15%' }}
          variants={fadeUp}
          style={{
            fontFamily: '"Playfair Display", serif',
            fontWeight: 700,
            fontSize: 'clamp(2rem, 4vw, 3.5rem)',
            lineHeight: 1.1,
            letterSpacing: '-0.01em',
            color: '#fff',
          }}
        >
          Ready to Transform Your Farm?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1, ease: easeOut }}
          className="mt-4"
          style={{
            fontFamily: '"Inter", sans-serif',
            fontSize: '1.125rem',
            lineHeight: 1.6,
            color: 'rgba(255,255,255,0.85)',
          }}
        >
          Join thousands of farmers across Tamil Nadu who are already using KRISHI-AI to grow
          smarter and earn more.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2, ease: easeOut }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <Link
            to="/crop-doctor"
            className="inline-flex items-center px-8 py-4 rounded-full text-[0.9375rem] font-semibold text-white transition-all duration-250 hover:scale-[1.02]"
            style={{
              background: '#D4953A',
              fontFamily: '"Inter", sans-serif',
              letterSpacing: '0.02em',
            }}
          >
            Try Crop Doctor
          </Link>
          <Link
            to="/krishi-guru"
            className="inline-flex items-center px-8 py-4 rounded-full text-[0.9375rem] font-semibold text-white transition-all duration-250 hover:bg-white/10"
            style={{
              background: 'rgba(255,255,255,0.1)',
              border: '1px solid rgba(255,255,255,0.2)',
              fontFamily: '"Inter", sans-serif',
              letterSpacing: '0.02em',
            }}
          >
            Chat with Krishi Guru
          </Link>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-8 text-sm"
          style={{
            color: 'rgba(255,255,255,0.5)',
            fontFamily: '"Inter", sans-serif',
          }}
        >
          Built with ❤️ at Hack Days Krishnagiri | Powered by Google Gemini
        </motion.p>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════
   MAIN HOME PAGE
   ═══════════════════════════════════════════════════════════ */
export default function Home() {
  return (
    <div>
      <HeroSection />
      <StatsSection />
      <ToolsSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <AIShowcaseSection />
      <CTASection />
    </div>
  )
}
