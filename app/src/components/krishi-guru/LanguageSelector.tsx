import type { Language } from '@/data/guruResponses'
import { getLanguageLabel } from '@/data/guruResponses'
import { motion } from 'framer-motion'

interface LanguageSelectorProps {
  activeLanguage: Language
  onLanguageChange: (lang: Language) => void
}

const languages: { code: Language; color: string }[] = [
  { code: 'ta', color: '#7E57C2' },
  { code: 'hi', color: '#26A69A' },
  { code: 'en', color: '#D4953A' },
]

export default function LanguageSelector({ activeLanguage, onLanguageChange }: LanguageSelectorProps) {
  return (
    <div className="flex items-center gap-2 justify-center flex-wrap">
      {languages.map((lang, index) => {
        const isActive = activeLanguage === lang.code
        return (
          <motion.button
            key={lang.code}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.5 + index * 0.08 }}
            onClick={() => onLanguageChange(lang.code)}
            className={
              'px-5 py-2 rounded-full text-sm font-medium transition-all duration-250 border cursor-pointer'
            }
            style={{
              fontFamily: lang.code === 'ta' ? '"Baloo Thambi 2", sans-serif' : '"Inter", sans-serif',
              background: isActive ? '#D4953A' : 'transparent',
              borderColor: isActive ? '#D4953A' : 'rgba(255,255,255,0.3)',
              color: isActive ? '#fff' : 'rgba(255,255,255,0.7)',
              borderLeftWidth: isActive ? '3px' : '1px',
              borderLeftColor: isActive ? lang.color : (isActive ? undefined : 'rgba(255,255,255,0.3)'),
            }}
            whileHover={{
              background: isActive ? '#D4953A' : 'rgba(255,255,255,0.1)',
            }}
            whileTap={{ scale: 0.95 }}
          >
            {getLanguageLabel(lang.code)}
          </motion.button>
        )
      })}
    </div>
  )
}
