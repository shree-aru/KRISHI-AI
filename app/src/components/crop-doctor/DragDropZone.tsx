import { useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Upload, X } from 'lucide-react'

export interface DragDropZoneProps {
  onImageSelect: (imageBase64: string) => void
  selectedImage: string | null
  onClearImage: () => void
  isAnalyzing: boolean
}

const SAMPLE_IMAGES = [
  { src: '/sample-crop-healthy.jpg', label: 'Healthy Rice' },
  { src: '/sample-crop-disease.jpg', label: 'Rice Blight' },
  { src: '/sample-crop-pest.jpg', label: 'Cotton Pest' },
]

export default function DragDropZone({
  onImageSelect,
  selectedImage,
  onClearImage,
  isAnalyzing,
}: DragDropZoneProps) {
  const [isDragOver, setIsDragOver] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }, [])

  const processFile = useCallback(
    (file: File) => {
      if (!file.type.startsWith('image/')) return
      const reader = new FileReader()
      reader.onloadend = () => {
        const base64 = reader.result as string
        // Remove data:image/... prefix
        const base64Data = base64.split(',')[1]
        if (base64Data) {
          onImageSelect(base64Data)
        }
      }
      reader.readAsDataURL(file)
    },
    [onImageSelect]
  )

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragOver(false)
      const file = e.dataTransfer.files[0]
      if (file) processFile(file)
    },
    [processFile]
  )

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (file) processFile(file)
      e.target.value = ''
    },
    [processFile]
  )

  const handleSampleClick = useCallback(
    async (src: string) => {
      try {
        const response = await fetch(src)
        const blob = await response.blob()
        const reader = new FileReader()
        reader.onloadend = () => {
          const base64 = reader.result as string
          const base64Data = base64.split(',')[1]
          if (base64Data) {
            onImageSelect(base64Data)
          }
        }
        reader.readAsDataURL(blob)
      } catch (err) {
        console.error('Failed to load sample image:', err)
      }
    },
    [onImageSelect]
  )

  return (
    <div className="w-full">
      {/* Upload Zone */}
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
        className="w-full"
      >
        <AnimatePresence mode="wait">
          {!selectedImage ? (
            <motion.div
              key="dropzone"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => !isAnalyzing && fileInputRef.current?.click()}
              className="relative w-full min-h-[360px] rounded-3xl flex flex-col items-center justify-center cursor-pointer transition-all duration-200 overflow-hidden"
              style={{
                border: isDragOver
                  ? '3px solid #6B8F71'
                  : '3px dashed rgba(107, 143, 113, 0.5)',
                background: isDragOver
                  ? 'rgba(107, 143, 113, 0.05)'
                  : '#FFFCF7',
              }}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/jpg"
                onChange={handleFileInput}
                className="hidden"
              />

              <div className="flex flex-col items-center gap-4 px-6">
                {/* Upload Icon with Pulse Animation */}
                <motion.div
                  animate={isDragOver ? { rotate: 5, scale: 1.1 } : { scale: [1, 1.05, 1] }}
                  transition={
                    isDragOver
                      ? { duration: 0.2 }
                      : { duration: 3, repeat: Infinity, ease: 'easeInOut' }
                  }
                >
                  <Upload
                    className="w-16 h-16"
                    style={{ color: isDragOver ? '#6B8F71' : 'rgba(107, 143, 113, 0.5)' }}
                  />
                </motion.div>

                {/* Title */}
                <h3
                  className="text-xl font-semibold"
                  style={{
                    color: '#2A2A28',
                    fontFamily: '"Inter", sans-serif',
                  }}
                >
                  {isDragOver ? 'Drop your photo here' : 'Drag & drop your crop photo here'}
                </h3>

                {/* Subtitle */}
                <p
                  className="text-sm"
                  style={{
                    color: '#6B6560',
                    fontFamily: '"Inter", sans-serif',
                  }}
                >
                  or click to browse — supports JPG, PNG (max 10MB)
                </p>

                {/* Choose File Button */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    fileInputRef.current?.click()
                  }}
                  className="mt-2 px-8 py-3 rounded-xl text-[0.9375rem] font-semibold text-white transition-all duration-250 hover:scale-[1.02]"
                  style={{
                    background: '#6B8F71',
                    fontFamily: '"Inter", sans-serif',
                    letterSpacing: '0.02em',
                  }}
                >
                  Choose File
                </button>

                {/* Security Note */}
                <p
                  className="text-xs mt-2"
                  style={{
                    color: 'rgba(107, 101, 96, 0.6)',
                    fontFamily: '"Inter", sans-serif',
                  }}
                >
                  Your photos are processed securely and not stored
                </p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="preview"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
              className="relative w-full min-h-[360px] rounded-3xl overflow-hidden flex flex-col items-center justify-center"
              style={{ background: '#FFFCF7' }}
            >
              {/* Image Preview */}
              <div className="relative w-full h-[360px] flex items-center justify-center p-6">
                <img
                  src={`data:image/jpeg;base64,${selectedImage}`}
                  alt="Uploaded crop"
                  className="max-w-full max-h-full object-contain rounded-2xl"
                  style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.1)' }}
                />

                {/* Retake Button */}
                {!isAnalyzing && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    onClick={(e) => {
                      e.stopPropagation()
                      onClearImage()
                    }}
                    className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center text-white transition-all duration-200 hover:scale-110"
                    style={{ background: 'rgba(229, 57, 53, 0.9)' }}
                  >
                    <X className="w-5 h-5" />
                  </motion.button>
                )}
              </div>

              {/* Analyzing Overlay */}
              {isAnalyzing && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center gap-3 py-6"
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                    className="w-10 h-10 rounded-full border-4 border-[#E8E2DA] border-t-[#6B8F71]"
                  />
                  <p
                    className="text-base font-medium"
                    style={{
                      color: '#2D5A3D',
                      fontFamily: '"Inter", sans-serif',
                    }}
                  >
                    Analyzing with Gemini AI...
                  </p>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Sample Images Row */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="mt-8 flex flex-col items-center gap-4"
      >
        <p
          className="text-sm"
          style={{
            color: '#6B6560',
            fontFamily: '"Inter", sans-serif',
          }}
        >
          Or try with a sample image:
        </p>
        <div className="flex flex-wrap items-center justify-center gap-6">
          {SAMPLE_IMAGES.map((sample, index) => (
            <motion.button
              key={sample.src}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.4 + index * 0.1,
                duration: 0.4,
                ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
              }}
              onClick={() => handleSampleClick(sample.src)}
              className="flex flex-col items-center gap-2 group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div
                className="w-[120px] h-[120px] rounded-2xl overflow-hidden transition-all duration-200"
                style={{
                  border: '2px solid transparent',
                }}
              >
                <img
                  src={sample.src}
                  alt={sample.label}
                  className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-110"
                  style={{
                    borderRadius: '14px',
                  }}
                />
              </div>
              <span
                className="text-sm font-medium"
                style={{
                  color: '#2A2A28',
                  fontFamily: '"Inter", sans-serif',
                }}
              >
                {sample.label}
              </span>
            </motion.button>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
