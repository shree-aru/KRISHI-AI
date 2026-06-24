import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Send } from 'lucide-react'
import { inputPlaceholders, getLanguageIndicator } from '@/data/guruResponses'
import type { Language } from '@/data/guruResponses'

interface ChatInputProps {
  language: Language
  onSend: (message: string) => void
  disabled?: boolean
}

export default function ChatInput({ language, onSend, disabled = false }: ChatInputProps) {
  const [input, setInput] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (inputRef.current && !disabled) {
      inputRef.current.focus()
    }
  }, [disabled, language])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || disabled) return
    onSend(input.trim())
    setInput('')
  }

  const placeholder = inputPlaceholders[language]
  const langIndicator = getLanguageIndicator(language)

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-3 w-full"
    >
      {/* Language Indicator */}
      <span
        className="hidden sm:block text-xs flex-shrink-0"
        style={{ color: '#6B6560', fontFamily: '"Inter", sans-serif' }}
      >
        {langIndicator}
      </span>

      {/* Input Field */}
      <div className="flex-1 relative">
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          className="w-full px-5 py-3.5 text-[0.9375rem] rounded-2xl border outline-none transition-all duration-200 disabled:opacity-50"
          style={{
            fontFamily: language === 'ta' ? '"Baloo Thambi 2", sans-serif' : '"Inter", sans-serif',
            background: '#FAF6F0',
            borderColor: '#E8E2DA',
            color: '#2A2A28',
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = '#6B8F71'
            e.currentTarget.style.boxShadow = '0 0 0 3px rgba(107, 143, 113, 0.15)'
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = '#E8E2DA'
            e.currentTarget.style.boxShadow = 'none'
          }}
        />
      </div>

      {/* Send Button */}
      <motion.button
        type="submit"
        disabled={!input.trim() || disabled}
        className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-200 disabled:opacity-40 disabled:pointer-events-none cursor-pointer"
        style={{ background: '#D4953A' }}
        whileHover={{ scale: 1.05, filter: 'brightness(0.9)' }}
        whileTap={{ scale: 0.95 }}
        aria-label="Send message"
      >
        <Send className="w-5 h-5 text-white" />
      </motion.button>
    </form>
  )
}
