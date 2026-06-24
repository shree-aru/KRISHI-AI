import { useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Scan } from 'lucide-react'
import { DragDropZone, AnalysisResults, HowItWorks, SupportedCrops } from '@/components/crop-doctor'
import { analyzeCropImage } from '@/lib/gemini'
import type { DiagnosisResult } from '@/lib/gemini'

// ---- Animation Variants ----

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  }),
}

export default function CropDoctor() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [diagnosis, setDiagnosis] = useState<DiagnosisResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleImageSelect = useCallback(async (imageBase64: string) => {
    setSelectedImage(imageBase64)
    setDiagnosis(null)
    setError(null)
    setIsAnalyzing(true)

    try {
      const result = await analyzeCropImage(imageBase64)
      setDiagnosis(result)
    } catch (err) {
      console.error('Analysis failed:', err)
      setError('Analysis failed. Please try again with a different image.')
    } finally {
      setIsAnalyzing(false)
    }
  }, [])

  const handleClearImage = useCallback(() => {
    setSelectedImage(null)
    setDiagnosis(null)
    setError(null)
    setIsAnalyzing(false)
  }, [])

  return (
    <div className="w-full">
      {/* ============================================ */}
      {/* SECTION 1: Page Hero                        */}
      {/* ============================================ */}
      <section
        className="relative w-full flex items-center justify-center"
        style={{
          background: 'linear-gradient(180deg, #2D5A3D 0%, #1C2518 100%)',
          minHeight: '50vh',
          paddingTop: '8rem',
          paddingBottom: '4rem',
        }}
      >
        <div className="max-w-[1280px] mx-auto px-6 sm:px-8 lg:px-12 text-center">
          {/* Breadcrumb */}
          <motion.nav
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mb-6"
          >
            <ol className="flex items-center justify-center gap-2 text-sm">
              <li>
                <Link
                  to="/"
                  className="transition-colors duration-200 hover:text-white"
                  style={{
                    color: 'rgba(255,255,255,0.5)',
                    fontFamily: '"Inter", sans-serif',
                  }}
                >
                  Home
                </Link>
              </li>
              <li style={{ color: 'rgba(255,255,255,0.3)' }}>/</li>
              <li
                style={{
                  color: 'rgba(255,255,255,0.5)',
                  fontFamily: '"Inter", sans-serif',
                }}
              >
                Crop Doctor
              </li>
            </ol>
          </motion.nav>

          {/* Tool Icon Badge */}
          <motion.div
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mx-auto mb-6 w-14 h-14 rounded-full flex items-center justify-center"
            style={{ background: '#D4953A' }}
          >
            <Scan className="w-6 h-6 text-white" />
          </motion.div>

          {/* Title */}
          <motion.h1
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="text-white mb-4"
            style={{
              fontFamily: '"Playfair Display", serif',
              fontWeight: 700,
              fontSize: 'clamp(2rem, 4vw, 3.5rem)',
              lineHeight: 1.1,
              letterSpacing: '-0.01em',
            }}
          >
            Crop Doctor
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            custom={3}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="max-w-[600px] mx-auto"
            style={{
              color: 'rgba(255,255,255,0.8)',
              fontFamily: '"Inter", sans-serif',
              fontSize: '1.125rem',
              lineHeight: 1.6,
            }}
          >
            Snap a photo of your crop and let Google Gemini identify diseases, pests, and nutrient deficiencies — with organic and chemical treatment options.
          </motion.p>

          {/* Trust Badge */}
          <motion.div
            custom={4}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-full"
            style={{
              background: 'rgba(107, 143, 113, 0.15)',
            }}
          >
            <span className="text-sm" role="img" aria-label="plant">
              🌱
            </span>
            <span
              className="text-sm font-medium"
              style={{
                color: '#6B8F71',
                fontFamily: '"Inter", sans-serif',
              }}
            >
              Supports Rice, Cotton, Tomato, Banana, Groundnut &amp; more
            </span>
          </motion.div>
        </div>
      </section>

      {/* ============================================ */}
      {/* SECTION 2: Upload Interface                 */}
      {/* ============================================ */}
      <section
        className="w-full"
        style={{ background: '#FAF6F0' }}
      >
        <div className="max-w-[900px] mx-auto px-6 sm:px-8 py-24">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7 }}
            className="text-center mb-12"
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
              AI-Powered Diagnosis
            </span>

            <h2
              className="mb-3"
              style={{
                fontFamily: '"Playfair Display", serif',
                fontWeight: 700,
                fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
                lineHeight: 1.1,
                letterSpacing: '-0.01em',
                color: '#2D5A3D',
              }}
            >
              Upload Your Crop Photo
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
              Our AI will analyze your image and provide detailed diagnosis within seconds.
            </p>
          </motion.div>

          {/* Drag & Drop Upload */}
          <DragDropZone
            onImageSelect={handleImageSelect}
            selectedImage={selectedImage}
            onClearImage={handleClearImage}
            isAnalyzing={isAnalyzing}
          />

          {/* Error Message */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mt-6 rounded-xl p-4 text-center text-sm"
                style={{
                  background: 'rgba(229, 57, 53, 0.08)',
                  color: '#E53935',
                  fontFamily: '"Inter", sans-serif',
                }}
              >
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Analysis Results */}
          <AnimatePresence>
            {diagnosis && selectedImage && !isAnalyzing && (
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mt-16 pt-16"
                style={{ borderTop: '1px solid #E8E2DA' }}
              >
                <AnalysisResults diagnosis={diagnosis} imageBase64={selectedImage} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ============================================ */}
      {/* SECTION 3: Analysis Results Area            */}
      {/* (Rendered conditionally inside Section 2)   */}
      {/* ============================================ */}

      {/* ============================================ */}
      {/* SECTION 4: How It Works                     */}
      {/* ============================================ */}
      <HowItWorks />

      {/* ============================================ */}
      {/* SECTION 5: Supported Crops                  */}
      {/* ============================================ */}
      <SupportedCrops />

      {/* Bottom CTA */}
      <section
        className="w-full"
        style={{ background: '#FAF6F0' }}
      >
        <div className="max-w-[1280px] mx-auto px-6 sm:px-8 lg:px-12 py-20">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7 }}
            className="text-center"
          >
            <h2
              className="mb-4"
              style={{
                fontFamily: '"Playfair Display", serif',
                fontWeight: 700,
                fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
                lineHeight: 1.1,
                letterSpacing: '-0.01em',
                color: '#2D5A3D',
              }}
            >
              Ready to Diagnose Your Crop?
            </h2>
            <p
              className="max-w-lg mx-auto mb-8"
              style={{
                color: '#6B6560',
                fontFamily: '"Inter", sans-serif',
                fontSize: '1.125rem',
                lineHeight: 1.6,
              }}
            >
              Upload a photo now and get AI-powered diagnosis with treatment recommendations in seconds.
            </p>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }}
              className="inline-flex items-center px-8 py-3.5 rounded-full text-[0.9375rem] font-semibold text-white transition-all duration-250"
              style={{
                background: '#D4953A',
                fontFamily: '"Inter", sans-serif',
                letterSpacing: '0.02em',
              }}
            >
              Start Diagnosis
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
