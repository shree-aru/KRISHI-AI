import { motion } from 'framer-motion'
import type { Language } from '@/data/guruResponses'

export type MessageRole = 'user' | 'ai'

export interface ChatMessage {
  id: string
  role: MessageRole
  content: string
  timestamp: string
}

interface MessageBubbleProps {
  message: ChatMessage
  language: Language
  isFirst?: boolean
}

function formatContent(text: string): string {
  return text
}

export default function MessageBubble({ message, language, isFirst = false }: MessageBubbleProps) {
  const isUser = message.role === 'user'

  if (isUser) {
    return (
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="flex justify-end"
      >
        <div className="flex flex-col items-end gap-1 max-w-[75%]">
          <div
            className="px-5 py-3 rounded-[20px_4px_20px_20px]"
            style={{
              background: '#FFF3E0',
              fontFamily: language === 'ta' ? '"Baloo Thambi 2", sans-serif' : '"Inter", sans-serif',
            }}
          >
            <div
              className="text-[0.9375rem] leading-relaxed whitespace-pre-wrap"
              style={{ color: '#2A2A28' }}
              dangerouslySetInnerHTML={{ __html: formatContent(message.content) }}
            />
          </div>
          <span className="text-xs px-1" style={{ color: '#6B6560', fontFamily: '"Inter", sans-serif' }}>
            {message.timestamp}
          </span>
        </div>
      </motion.div>
    )
  }

  // AI message
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="flex items-start gap-2.5"
    >
      {/* Avatar */}
      <div
        className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
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

      <div className="flex flex-col gap-1 max-w-[80%]">
        <div
          className="px-5 py-3 rounded-[4px_20px_20px_20px]"
          style={{
            background: isFirst ? '#E8F5E9' : '#E8F5E9',
            fontFamily: language === 'ta' ? '"Baloo Thambi 2", sans-serif' : language === 'hi' ? '"Inter", sans-serif' : '"Inter", sans-serif',
          }}
        >
          <AIMessageContent content={message.content} language={language} />
        </div>
        <span className="text-xs px-1" style={{ color: '#6B6560', fontFamily: '"Inter", sans-serif' }}>
          {message.timestamp}
        </span>
      </div>
    </motion.div>
  )
}

function AIMessageContent({ content, language }: { content: string; language: Language }) {
  const lines = content.split('\n')

  return (
    <div
      className="text-[0.9375rem] leading-[1.7] space-y-1"
      style={{ color: '#2A2A28', fontFamily: language === 'ta' ? '"Baloo Thambi 2", sans-serif' : '"Inter", sans-serif' }}
    >
      {lines.map((line, i) => {
        const trimmed = line.trim()

        // Empty line
        if (!trimmed) return null

        // Bold headers (starts with **)
        if (trimmed.startsWith('**') && trimmed.endsWith('**') && !trimmed.includes('  ')) {
          const text = trimmed.replace(/\*\*/g, '')
          return (
            <p key={i} className="font-semibold mt-2 first:mt-0" style={{ color: '#2D5A3D' }}>
              {text}
            </p>
          )
        }

        // Numbered list items
        const numberedMatch = trimmed.match(/^(\d+)\.\s+(.+)$/)
        if (numberedMatch) {
          const [, num, text] = numberedMatch
          return (
            <div key={i} className="flex gap-2 ml-1">
              <span className="font-semibold flex-shrink-0" style={{ color: '#D4953A' }}>
                {num}.
              </span>
              <span dangerouslySetInnerHTML={{ __html: formatInlineBold(text) }} />
            </div>
          )
        }

        // Bullet with emoji
        if (/^[🌾🐛💊💰🌦️📍📈💡⚠️⏰🌿📅✅🔹🌱💧🍂]/.test(trimmed)) {
          return (
            <p key={i} className="ml-1">
              {trimmed}
            </p>
          )
        }

        // Regular line - check for inline bold
        if (trimmed.includes('**')) {
          return (
            <p key={i} className="ml-1" dangerouslySetInnerHTML={{ __html: formatInlineBold(trimmed) }} />
          )
        }

        return <p key={i}>{trimmed}</p>
      })}
    </div>
  )
}

function formatInlineBold(text: string): string {
  return text.replace(/\*\*(.*?)\*\*/g, '<strong style="font-weight:600;color:#2D5A3D;">$1</strong>')
}
