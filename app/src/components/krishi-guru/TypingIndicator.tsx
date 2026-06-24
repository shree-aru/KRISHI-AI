import { motion } from 'framer-motion'

export default function TypingIndicator() {
  return (
    <div className="flex items-end gap-2">
      {/* Avatar placeholder for typing */}
      <div
        className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
        style={{ background: '#E8F5E9' }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="4" y="10" width="16" height="10" rx="3" fill="#6B8F71" />
          <circle cx="12" cy="7" r="3" fill="#6B8F71" />
          <circle cx="9" cy="14" r="1" fill="#fff" />
          <circle cx="15" cy="14" r="1" fill="#fff" />
          <path d="M10 17.5C10 17.5 11 18.5 12 18.5C13 18.5 14 17.5 14 17.5" stroke="#fff" strokeWidth="1" strokeLinecap="round" />
        </svg>
      </div>

      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.2 }}
        className="px-4 py-3 rounded-[4px_20px_20px_20px]"
        style={{ background: '#E8F5E9', maxWidth: '120px' }}
      >
        <div className="flex items-center gap-1.5">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: '#6B8F71' }}
              animate={{
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                delay: i * 0.15,
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  )
}
