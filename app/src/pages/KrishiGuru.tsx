import { useState, useCallback, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { MessageCircle, MapPin, Calendar, Camera, Repeat, Languages, ShieldCheck, Sparkles, Bot } from 'lucide-react'
import ChatWindow from '@/components/krishi-guru/ChatWindow'
import LanguageSelector from '@/components/krishi-guru/LanguageSelector'
import ExampleAccordion from '@/components/krishi-guru/ExampleAccordion'
import TipCard from '@/components/krishi-guru/TipCard'
import { getGuruResponse, getWelcomeMessage, quickQuestions } from '@/data/guruResponses'
import type { Language } from '@/data/guruResponses'
import type { ChatMessage } from '@/components/krishi-guru/MessageBubble'

const easeOutQuad = [0.25, 0.46, 0.45, 0.94] as [number, number, number, number]

const tips = [
  {
    icon: MapPin,
    title: 'Mention Your Location',
    description:
      "Include your district or region for location-specific advice. Tamil Nadu's climate varies significantly between Dharmapuri and Kanyakumari!",
  },
  {
    icon: Calendar,
    title: 'Specify the Season',
    description:
      'Mention whether it\'s monsoon, winter, or summer. The same crop needs different care in different seasons.',
  },
  {
    icon: Camera,
    title: 'Use Clear Language',
    description:
      'Whether in Tamil, Hindi, or English, be specific. Instead of "my plant is sick", describe the symptoms you see.',
  },
  {
    icon: Repeat,
    title: 'Ask Follow-ups',
    description:
      'Krishi Guru remembers your conversation. Ask follow-up questions to dig deeper into any topic.',
  },
  {
    icon: Languages,
    title: 'Switch Languages Anytime',
    description:
      'You can ask in Tamil, then follow up in English. Krishi Guru understands them all.',
  },
  {
    icon: ShieldCheck,
    title: 'Cross-Verify Important Advice',
    description:
      'For critical decisions, especially chemical usage, always verify with your local agricultural officer.',
  },
]

const sectionBadgeClass =
  'inline-block px-4 py-1.5 rounded-full text-sm font-semibold tracking-wide uppercase'

export default function KrishiGuru() {
  const [language, setLanguage] = useState<Language>('en')
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [isTyping, setIsTyping] = useState(false)

  // Get welcome message based on language
  const welcomeMessage = getWelcomeMessage(language)

  // Handle language change
  const handleLanguageChange = useCallback((lang: Language) => {
    setLanguage(lang)
    // Don't clear messages — user can continue in new language
  }, [])

  // Handle sending a message
  const handleSendMessage = useCallback(
    async (userMessage: string) => {
      // Add user message
      const userMsg: ChatMessage = {
        id: `user-${Date.now()}`,
        role: 'user',
        content: userMessage,
        timestamp: getTimestamp(),
      }

      setMessages((prev) => [...prev, userMsg])
      setIsTyping(true)

      // Simulate AI thinking delay
      const delay = 800 + Math.random() * 1200
      await new Promise((resolve) => setTimeout(resolve, delay))

      // Get mock response
      const responseText = getGuruResponse(userMessage, language)

      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        role: 'ai',
        content: responseText,
        timestamp: getTimestamp(),
      }

      setIsTyping(false)
      setMessages((prev) => [...prev, aiMsg])
    },
    [language]
  )

  // Load initial welcome as first message if user has already interacted
  useEffect(() => {
    if (messages.length === 0) {
      // Welcome is shown by the ChatWindow component directly
    }
  }, [messages.length])

  const currentQuestions = quickQuestions[language]
  const heroSubtitle =
    language === 'ta'
      ? 'உங்கள் தனிப்பட்ட AI விவசாய உதவியாளர். பயிர்கள், பூச்சிகள், உரங்கள் அல்லது விவசாய நுட்பங்கள் பற்றி — நீங்கள் வீட்டில் பேசும் மொழியில் கேளுங்கள்.'
      : language === 'hi'
        ? 'आपका व्यक्तिगत AI कृषि सहायक। फसलों, कीटों, उर्वरकों या खेती तकनीकों के बारे में — उसी भाषा में पूछें जो आप घर पर बोलते हैं।'
        : 'Your personal AI farming assistant. Ask anything about crops, pests, fertilizers, or farming techniques — in the language you speak at home.'

  return (
    <div className="w-full">
      {/* ====== SECTION 1: Page Hero ====== */}
      <section
        className="relative w-full flex items-center justify-center text-center overflow-hidden"
        style={{
          background: 'linear-gradient(to bottom, #2D5A3D 60%, #1C2518 100%)',
          minHeight: '45vh',
          paddingTop: '8rem',
          paddingBottom: '3rem',
        }}
      >
        {/* Decorative pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        <div className="relative z-10 max-w-[800px] mx-auto px-6">
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: easeOutQuad }}
            className="mb-6"
          >
            <nav className="flex items-center justify-center gap-2 text-sm" style={{ color: 'rgba(255,255,255,0.5)', fontFamily: '"Inter", sans-serif' }}>
              <Link to="/" className="hover:text-white transition-colors">Home</Link>
              <span>/</span>
              <span>Krishi Guru</span>
            </nav>
          </motion.div>

          {/* Tool Icon */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1, ease: easeOutQuad }}
            className="mb-6"
          >
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center mx-auto"
              style={{ background: '#D4953A' }}
            >
              <MessageCircle className="w-7 h-7 text-white" />
            </div>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: easeOutQuad }}
            className="text-white font-display font-bold mb-4"
            style={{
              fontSize: 'clamp(2rem, 4vw, 3.5rem)',
              lineHeight: 1.1,
              letterSpacing: '-0.01em',
              fontFamily: '"Playfair Display", serif',
            }}
          >
            Krishi Guru
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3, ease: easeOutQuad }}
            className="mx-auto mb-8 max-w-[620px]"
            style={{
              fontSize: '1.125rem',
              lineHeight: 1.6,
              fontWeight: 500,
              color: 'rgba(255,255,255,0.8)',
              fontFamily: language === 'ta' ? '"Baloo Thambi 2", sans-serif' : '"Inter", sans-serif',
              letterSpacing: '0.005em',
            }}
          >
            {heroSubtitle}
          </motion.p>

          {/* Language Pills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4, ease: easeOutQuad }}
          >
            <LanguageSelector activeLanguage={language} onLanguageChange={handleLanguageChange} />
          </motion.div>

          {/* Decorative chat illustration */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6, ease: easeOutQuad }}
            className="mt-8 flex justify-center"
          >
            <div className="flex items-center gap-4 opacity-60">
              {/* Chat bubble decoration */}
              <div className="flex flex-col items-end gap-2">
                <motion.div
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  className="px-4 py-2 rounded-[20px_4px_20px_20px]"
                  style={{ background: 'rgba(255,255,255,0.12)' }}
                >
                  <span className="text-sm text-white/70" style={{ fontFamily: '"Inter", sans-serif' }}>
                    {currentQuestions[0]}
                  </span>
                </motion.div>
              </div>

              <Sparkles className="w-5 h-5 text-[#E8C547]" />

              <div className="flex flex-col items-start gap-2">
                <motion.div
                  animate={{ y: [0, 4, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                  className="px-4 py-2 rounded-[4px_20px_20px_20px] flex items-center gap-2"
                  style={{ background: 'rgba(107,143,113,0.3)' }}
                >
                  <Bot className="w-4 h-4 text-[#6B8F71]" />
                  <span className="text-sm text-white/80" style={{ fontFamily: '"Inter", sans-serif' }}>
                    {language === 'ta' ? 'நான் உதவுகிறேன்!' : language === 'hi' ? 'मैं मदद करूँगा!' : 'Let me help!'}
                  </span>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ====== SECTION 2: Chat Interface ====== */}
      <section
        className="w-full"
        style={{ background: '#FAF6F0', paddingTop: '2.5rem', paddingBottom: '6rem' }}
      >
        <div className="max-w-[1280px] mx-auto px-6">
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: easeOutQuad }}
            className="text-center mb-10"
          >
            <div className="mb-4">
              <span
                className={sectionBadgeClass}
                style={{
                  background: 'rgba(107,143,113,0.12)',
                  color: '#2D5A3D',
                  fontFamily: '"Inter", sans-serif',
                }}
              >
                <Sparkles className="w-3.5 h-3.5 inline-block mr-1.5 -mt-0.5" />
                AI CHAT ASSISTANT
              </span>
            </div>
            <h2
              className="font-display font-bold mb-3"
              style={{
                fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
                lineHeight: 1.1,
                color: '#2D5A3D',
                fontFamily: '"Playfair Display", serif',
              }}
            >
              {language === 'ta'
                ? 'உங்கள் AI விவசாய உதவியாளர்'
                : language === 'hi'
                  ? 'आपका AI कृषि सहायक'
                  : 'Your AI Farming Assistant'}
            </h2>
            <p
              className="max-w-[500px] mx-auto"
              style={{
                fontSize: '1.125rem',
                lineHeight: 1.6,
                color: '#6B6560',
                fontFamily: '"Inter", sans-serif',
              }}
            >
              {language === 'ta'
                ? 'விவசாயம் பற்றிய உங்கள் கேள்விகளுக்கு உடனடி பதில்கள் பெறுங்கள்'
                : language === 'hi'
                  ? 'खेती से जुड़े सवालों के तुरंत जवाब पाएं'
                  : 'Get instant answers to your farming questions'}
            </p>
          </motion.div>

          {/* Chat Window */}
          <ChatWindow
            messages={messages}
            isTyping={isTyping}
            language={language}
            onSendMessage={handleSendMessage}
            welcomeMessage={welcomeMessage}
          />

          {/* Powered by badge */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-center mt-4"
          >
            <span
              className="inline-flex items-center gap-1.5 text-xs"
              style={{ color: '#6B6560', fontFamily: '"Inter", sans-serif' }}
            >
              <Sparkles className="w-3 h-3" />
              Powered by Google Gemini AI
            </span>
          </motion.div>
        </div>
      </section>

      {/* ====== SECTION 3: Example Conversations ====== */}
      <section
        className="w-full"
        style={{ background: '#F5F0E8', paddingTop: '6rem', paddingBottom: '6rem' }}
      >
        <div className="max-w-[1280px] mx-auto px-6">
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: easeOutQuad }}
            className="text-center mb-12"
          >
            <div className="mb-4">
              <span
                className={sectionBadgeClass}
                style={{
                  background: 'rgba(107,143,113,0.12)',
                  color: '#2D5A3D',
                  fontFamily: '"Inter", sans-serif',
                }}
              >
                EXAMPLE CONVERSATIONS
              </span>
            </div>
            <h2
              className="font-display font-bold mb-3"
              style={{
                fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
                lineHeight: 1.1,
                color: '#2D5A3D',
                fontFamily: '"Playfair Display", serif',
              }}
            >
              See Krishi Guru in Action
            </h2>
            <p
              className="max-w-[500px] mx-auto"
              style={{
                fontSize: '1.125rem',
                lineHeight: 1.6,
                color: '#6B6560',
                fontFamily: '"Inter", sans-serif',
              }}
            >
              Preview the kinds of answers you&apos;ll get from your AI farming assistant.
            </p>
          </motion.div>

          {/* Example Accordion */}
          <ExampleAccordion />
        </div>
      </section>

      {/* ====== SECTION 4: Tips & Best Practices ====== */}
      <section
        className="w-full"
        style={{ background: '#FAF6F0', paddingTop: '6rem', paddingBottom: '6rem' }}
      >
        <div className="max-w-[1280px] mx-auto px-6">
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: easeOutQuad }}
            className="text-center mb-12"
          >
            <div className="mb-4">
              <span
                className={sectionBadgeClass}
                style={{
                  background: 'rgba(107,143,113,0.12)',
                  color: '#2D5A3D',
                  fontFamily: '"Inter", sans-serif',
                }}
              >
                TIPS & TRICKS
              </span>
            </div>
            <h2
              className="font-display font-bold mb-3"
              style={{
                fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
                lineHeight: 1.1,
                color: '#2D5A3D',
                fontFamily: '"Playfair Display", serif',
              }}
            >
              Get the Best from Krishi Guru
            </h2>
            <p
              className="max-w-[500px] mx-auto"
              style={{
                fontSize: '1.125rem',
                lineHeight: 1.6,
                color: '#6B6560',
                fontFamily: '"Inter", sans-serif',
              }}
            >
              Follow these tips for more accurate and helpful answers.
            </p>
          </motion.div>

          {/* Tips Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {tips.map((tip, index) => (
              <TipCard
                key={tip.title}
                icon={tip.icon}
                title={tip.title}
                description={tip.description}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

function getTimestamp(): string {
  const now = new Date()
  return now.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  })
}
