import { useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Bot } from 'lucide-react'
import MessageBubble from './MessageBubble'
import TypingIndicator from './TypingIndicator'
import QuickQuestionChips from './QuickQuestionChips'
import ChatInput from './ChatInput'
import type { ChatMessage } from './MessageBubble'
import type { Language } from '@/data/guruResponses'

interface ChatWindowProps {
  messages: ChatMessage[]
  isTyping: boolean
  language: Language
  onSendMessage: (message: string) => void
  welcomeMessage: string
}

export default function ChatWindow({
  messages,
  isTyping,
  language,
  onSendMessage,
  welcomeMessage,
}: ChatWindowProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = useCallback(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages, isTyping, scrollToBottom])

  const handleQuestionClick = useCallback(
    (question: string) => {
      onSendMessage(question)
    },
    [onSendMessage]
  )

  // Show welcome message if no messages yet
  const showWelcome = messages.length === 0

  return (
    <div className="w-full max-w-[800px] mx-auto">
      {/* Chat Container */}
      <div
        className="rounded-3xl overflow-hidden"
        style={{
          background: '#FFFCF7',
          border: '1px solid #E8E2DA',
          boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
        }}
      >
        {/* Chat Messages Area */}
        <div
          ref={scrollRef}
          className="overflow-y-auto p-6 space-y-5"
          style={{ minHeight: '500px', maxHeight: '70vh' }}
        >
          <AnimatePresence mode="popLayout">
            {showWelcome ? (
              <motion.div
                key="welcome"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
              >
                {/* Welcome Message */}
                <div className="flex items-start gap-3 mb-6">
                  {/* AI Avatar */}
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: '#E8F5E9' }}
                  >
                    <Bot className="w-5 h-5" style={{ color: '#6B8F71' }} />
                  </div>
                  <div
                    className="px-5 py-4 rounded-[4px_20px_20px_20px] max-w-[85%]"
                    style={{
                      background: '#E8F5E9',
                      fontFamily:
                        language === 'ta'
                          ? '"Baloo Thambi 2", sans-serif'
                          : '"Inter", sans-serif',
                    }}
                  >
                    <WelcomeContent content={welcomeMessage} language={language} />
                  </div>
                </div>

                {/* Quick start hint */}
                <div
                  className="flex items-center gap-2 ml-12 mb-4 px-3 py-2 rounded-xl"
                  style={{ background: 'rgba(232, 197, 71, 0.1)' }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="#E8C547" />
                  </svg>
                  <span
                    className="text-sm"
                    style={{
                      color: '#5C3D2E',
                      fontFamily: '"Inter", sans-serif',
                    }}
                  >
                    {language === 'ta'
                      ? 'கீழே உள்ள கேள்விகளில் ஒன்றைத் தேர்ந்தெடுக்கவும் அல்லது உங்கள் சொந்த கேள்வியைத் தட்டச்சு செய்யவும்!'
                      : language === 'hi'
                        ? 'नीचे दिए सवालों में से एक चुनें या अपना सवाल टाइप करें!'
                        : 'Pick a question below or type your own!'}
                  </span>
                </div>
              </motion.div>
            ) : (
              messages.map((msg, index) => (
                <MessageBubble
                  key={msg.id}
                  message={msg}
                  language={language}
                  isFirst={index === 0}
                />
              ))
            )}
          </AnimatePresence>

          {/* Typing Indicator */}
          <AnimatePresence>
            {isTyping && (
              <motion.div
                key="typing"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <TypingIndicator />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Quick Question Chips */}
        <div className="px-6 pt-3 pb-1">
          <QuickQuestionChips language={language} onQuestionClick={handleQuestionClick} />
        </div>

        {/* Input Bar */}
        <div
          className="p-4 px-6"
          style={{
            borderTop: '1px solid #E8E2DA',
            background: '#FFFCF7',
          }}
        >
          <ChatInput
            language={language}
            onSend={onSendMessage}
            disabled={isTyping}
          />
        </div>
      </div>
    </div>
  )
}

function WelcomeContent({
  content,
  language,
}: {
  content: string
  language: Language
}) {
  const lines = content.split('\n')

  return (
    <div
      className="text-[0.9375rem] leading-[1.7] space-y-1"
      style={{
        color: '#2A2A28',
        fontFamily: language === 'ta' ? '"Baloo Thambi 2", sans-serif' : '"Inter", sans-serif',
      }}
    >
      {lines.map((line, i) => {
        const trimmed = line.trim()
        if (!trimmed) return null

        // Bold text
        if (trimmed.startsWith('**') && trimmed.endsWith('**') && !trimmed.includes('  ')) {
          const text = trimmed.replace(/\*\*/g, '')
          return (
            <p key={i} className="font-semibold mt-2 first:mt-0" style={{ color: '#2D5A3D' }}>
              {text}
            </p>
          )
        }

        // Bullet with emoji
        if (/^[🌾🐛💊💰🌦️]/.test(trimmed)) {
          return (
            <p key={i} className="ml-1">
              {trimmed}
            </p>
          )
        }

        // Regular line with inline bold
        if (trimmed.includes('**')) {
          return (
            <p
              key={i}
              dangerouslySetInnerHTML={{
                __html: trimmed.replace(
                  /\*\*(.*?)\*\*/g,
                  '<strong style="font-weight:600;color:#2D5A3D;">$1</strong>'
                ),
              }}
            />
          )
        }

        return <p key={i}>{trimmed}</p>
      })}
    </div>
  )
}
