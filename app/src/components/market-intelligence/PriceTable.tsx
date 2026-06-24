import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { ArrowUp, ArrowDown, Minus, ArrowUpDown } from 'lucide-react'
import { marketPrices } from '@/data/marketData'

type SortKey = 'crop' | 'variety' | 'market' | 'pricePerQuintal' | 'priceChange'
type SortDir = 'asc' | 'desc'

const cropEmoji: Record<string, string> = {
  Tomato: '\ud83c\udf45',
  Onion: '\ud83e\uddc5',
  Rice: '\ud83c\udf3e',
  Groundnut: '\ud83e\udd5c',
  Chili: '\ud83c\udf36\ufe0f',
  Cotton: '\ud83e\uddf5',
  Banana: '\ud83c\udf4c',
  Brinjal: '\ud83c\udf46',
  Potato: '\ud83e\udd54',
  'Black Gram': '\ud83e\uded8',
  Sugarcane: '\ud83c\udf6f',
}

export default function PriceTable() {
  const [sortKey, setSortKey] = useState<SortKey>('priceChange')
  const [sortDir, setSortDir] = useState<SortDir>('desc')

  const sortedPrices = useMemo(() => {
    const sorted = [...marketPrices].sort((a, b) => {
      const aVal = a[sortKey]
      const bVal = b[sortKey]
      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return sortDir === 'asc' ? aVal - bVal : bVal - aVal
      }
      return sortDir === 'asc'
        ? String(aVal).localeCompare(String(bVal))
        : String(bVal).localeCompare(String(aVal))
    })
    return sorted
  }, [sortKey, sortDir])

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortKey(key)
      setSortDir('desc')
    }
  }

  const SortIcon = ({ col }: { col: SortKey }) => (
    <ArrowUpDown
      className="w-3 h-3 inline ml-1 transition-colors"
      style={{ color: sortKey === col ? '#6B8F71' : '#E8E2DA' }}
    />
  )

  const TrendIcon = ({ trend, change }: { trend: string; change: number }) => {
    if (trend === 'up' || change > 0) return <ArrowUp className="w-3.5 h-3.5" />
    if (trend === 'down' || change < 0) return <ArrowDown className="w-3.5 h-3.5" />
    return <Minus className="w-3.5 h-3.5" />
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.6,
        delay: 0.15,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      }}
      className="rounded-[20px] p-6"
      style={{
        background: '#FFFCF7',
        boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
      }}
    >
      <div className="flex items-center justify-between mb-5">
        <h3
          className="text-lg font-semibold"
          style={{ color: '#2D5A3D', fontFamily: '"Inter", sans-serif' }}
        >
          Today&apos;s Prices
        </h3>
        <span
          className="text-xs"
          style={{ color: '#6B6560', fontFamily: '"Inter", sans-serif' }}
        >
          Last updated: 10 mins ago
        </span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr style={{ borderBottom: '2px solid #E8E2DA' }}>
              {(
                [
                  ['Crop', 'crop'],
                  ['Variety', 'variety'],
                  ['Market', 'market'],
                  ['Price (\u20b9/q)', 'pricePerQuintal'],
                  ['Change', 'priceChange'],
                  ['Trend', 'priceChange'],
                ] as [string, SortKey][]
              ).map(([label, col]) => (
                <th
                  key={label}
                  onClick={() => handleSort(col)}
                  className="text-left py-3 px-2 text-xs font-semibold uppercase tracking-wider cursor-pointer select-none transition-colors hover:text-[#6B8F71]"
                  style={{
                    color: '#6B6560',
                    fontFamily: '"Inter", sans-serif',
                  }}
                >
                  {label}
                  <SortIcon col={col} />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedPrices.map((price, i) => (
              <motion.tr
                key={`${price.crop}-${price.variety}-${price.market}`}
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.4,
                  delay: i * 0.04,
                  ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
                }}
                className="transition-colors duration-200 hover:bg-[#FAF6F0]"
                style={{ borderBottom: '1px solid #E8E2DA' }}
              >
                <td className="py-3 px-2">
                  <span
                    className="text-sm font-medium"
                    style={{ color: '#2A2A28', fontFamily: '"Inter", sans-serif' }}
                  >
                    {cropEmoji[price.crop] || '\ud83c\udf3e'} {price.crop}
                  </span>
                </td>
                <td className="py-3 px-2">
                  <span
                    className="text-sm"
                    style={{ color: '#6B6560', fontFamily: '"Inter", sans-serif' }}
                  >
                    {price.variety}
                  </span>
                </td>
                <td className="py-3 px-2">
                  <span
                    className="text-sm"
                    style={{ color: '#6B6560', fontFamily: '"Inter", sans-serif' }}
                  >
                    {price.market}
                  </span>
                </td>
                <td className="py-3 px-2">
                  <span
                    className="text-sm font-semibold"
                    style={{ color: '#2D5A3D', fontFamily: '"Inter", sans-serif' }}
                  >
                    ₹{price.pricePerQuintal.toLocaleString('en-IN')}
                  </span>
                </td>
                <td className="py-3 px-2">
                  <span
                    className="text-sm font-medium"
                    style={{
                      color: price.priceChange > 0 ? '#4CAF50' : price.priceChange < 0 ? '#E53935' : '#6B6560',
                      fontFamily: '"Inter", sans-serif',
                    }}
                  >
                    {price.priceChange > 0 ? '+' : ''}
                    {price.priceChange}%
                  </span>
                </td>
                <td className="py-3 px-2">
                  <div className="flex items-center gap-1">
                    <TrendIcon trend={price.trend} change={price.priceChange} />
                    <span
                      className="text-xs font-medium capitalize"
                      style={{
                        color:
                          price.trend === 'up'
                            ? '#4CAF50'
                            : price.trend === 'down'
                              ? '#E53935'
                              : '#6B6560',
                        fontFamily: '"Inter", sans-serif',
                      }}
                    >
                      {price.trend}
                    </span>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  )
}
