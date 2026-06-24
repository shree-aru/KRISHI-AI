import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown, Sparkles, Activity } from 'lucide-react'
import { marketPrices } from '@/data/marketData'




export default function SummaryCards() {
  const stats = useMemo(() => {
    // Top gainer - highest price increase
    const topGainer = marketPrices.reduce((max, p) => (p.priceChange > max.priceChange ? p : max), marketPrices[0])

    // Top loser - biggest price drop
    const topLoser = marketPrices.reduce((min, p) => (p.priceChange < min.priceChange ? p : min), marketPrices[0])

    // Highest demand - crop with highest price per quintal (proxy for demand)
    const highestDemand = marketPrices.reduce((max, p) => (p.pricePerQuintal > max.pricePerQuintal ? p : max), marketPrices[0])

    // Market trend - overall direction
    const avgChange = marketPrices.reduce((sum, p) => sum + p.priceChange, 0) / marketPrices.length
    const trendLabel = avgChange > 1 ? 'Bullish' : avgChange < -1 ? 'Bearish' : 'Stable'
    const trendColor = avgChange > 1 ? '#4CAF50' : avgChange < -1 ? '#E53935' : '#FF9800'

    return { topGainer, topLoser, highestDemand, avgChange, trendLabel, trendColor }
  }, [])

  const cards = [
    {
      label: 'Top Gainer',
      icon: TrendingUp,
      iconColor: '#4CAF50',
      value: `${stats.topGainer.priceChange > 0 ? '+' : ''}${stats.topGainer.priceChange}%`,
      sublabel: `${stats.topGainer.crop} \u2014 ${stats.topGainer.market}`,
      badge: `${stats.topGainer.priceChange > 0 ? '+' : ''}${stats.topGainer.priceChange}%`,
      badgeBg: 'rgba(76, 175, 80, 0.15)',
      badgeColor: '#4CAF50',
    },
    {
      label: 'Top Loser',
      icon: TrendingDown,
      iconColor: '#E53935',
      value: `${stats.topLoser.priceChange}%`,
      sublabel: `${stats.topLoser.crop} \u2014 ${stats.topLoser.market}`,
      badge: `${stats.topLoser.priceChange}%`,
      badgeBg: 'rgba(229, 57, 53, 0.15)',
      badgeColor: '#E53935',
    },
    {
      label: 'Highest Demand',
      icon: Activity,
      iconColor: '#42A5F5',
      value: `\u20b9${stats.highestDemand.pricePerQuintal.toLocaleString('en-IN')}/q`,
      sublabel: `${stats.highestDemand.crop} (${stats.highestDemand.variety})`,
      badge: `${stats.highestDemand.market}`,
      badgeBg: 'rgba(66, 165, 245, 0.15)',
      badgeColor: '#42A5F5',
    },
    {
      label: 'Market Trend',
      icon: Sparkles,
      iconColor: stats.trendColor,
      value: stats.trendLabel,
      sublabel: `Avg. change: ${stats.avgChange > 0 ? '+' : ''}${stats.avgChange.toFixed(1)}%`,
      badge: stats.trendLabel,
      badgeBg: stats.avgChange > 1 ? 'rgba(76, 175, 80, 0.15)' : stats.avgChange < -1 ? 'rgba(229, 57, 53, 0.15)' : 'rgba(255, 152, 0, 0.15)',
      badgeColor: stats.trendColor,
    },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
      {cards.map((card, i) => (
        <motion.div
          key={card.label}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{
            duration: 0.5,
            delay: i * 0.1,
            ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
          }}
          className="rounded-2xl p-6 transition-shadow duration-300 hover:shadow-lg"
          style={{
            background: '#FFFCF7',
            boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
          }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: `${card.iconColor}15` }}
            >
              <card.icon className="w-5 h-5" style={{ color: card.iconColor }} />
            </div>
            <span
              className="text-sm font-medium"
              style={{ color: '#6B6560', fontFamily: '"Inter", sans-serif' }}
            >
              {card.label}
            </span>
          </div>
          <div
            className="text-2xl font-bold mb-1"
            style={{
              color: card.label === 'Market Trend' ? card.iconColor : '#2D5A3D',
              fontFamily: '"Playfair Display", serif',
            }}
          >
            {card.value}
          </div>
          <div
            className="text-sm mb-3"
            style={{ color: '#6B6560', fontFamily: '"Inter", sans-serif' }}
          >
            {card.sublabel}
          </div>
          <span
            className="inline-block px-3 py-1 rounded-full text-xs font-semibold"
            style={{
              background: card.badgeBg,
              color: card.badgeColor,
              fontFamily: '"Inter", sans-serif',
            }}
          >
            {card.badge}
          </span>
        </motion.div>
      ))}
    </div>
  )
}
