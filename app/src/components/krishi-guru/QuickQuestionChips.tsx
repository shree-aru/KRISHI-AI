import { motion } from 'framer-motion'
import { quickQuestions } from '@/data/guruResponses'
import type { Language } from '@/data/guruResponses'

interface QuickQuestionChipsProps {
  language: Language
  onQuestionClick: (question: string) => void
}

export default function QuickQuestionChips({ language, onQuestionClick }: QuickQuestionChipsProps) {
  const questions = quickQuestions[language]

  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-[#E8E2DA] scrollbar-track-transparent">
      {questions.map((question, index) => (
        <motion.button
          key={`${language}-${index}`}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
          onClick={() => onQuestionClick(question)}
          className="flex-shrink-0 px-4 py-2.5 rounded-full text-sm border transition-all duration-200 cursor-pointer whitespace-nowrap"
          style={{
            fontFamily: language === 'ta' ? '"Baloo Thambi 2", sans-serif' : '"Inter", sans-serif',
            background: '#FFFCF7',
            borderColor: '#E8E2DA',
            color: '#2A2A28',
          }}
          whileHover={{
            backgroundColor: 'rgba(107, 143, 113, 0.1)',
            borderColor: '#6B8F71',
          }}
          whileTap={{ scale: 0.95 }}
        >
          {question}
        </motion.button>
      ))}
    </div>
  )
}
