export interface MarketPrice {
  crop: string
  variety: string
  market: string
  pricePerQuintal: number
  priceChange: number
  trend: 'up' | 'down' | 'stable'
  lastUpdated: string
}

export interface CropInfo {
  name: string
  category: string
  season: string
  waterRequirement: string
  soilType: string
  avgYield: string
}

export interface PriceHistoryPoint {
  date: string
  price: number
}

export interface CropPriceHistory {
  crop: string
  data: PriceHistoryPoint[]
}

export interface DemandForecast {
  crop: string
  icon: string
  demandPercent: number
  currentPrice: string
  predictionRange: string
  predictionDirection: 'up' | 'down' | 'stable'
  reason: string
  action: 'Sell Now' | 'Can Sell' | 'Wait' | 'Hold'
  actionColor: 'success' | 'warning' | 'neutral'
  barColor: string
}

export interface AIInsight {
  id: number
  text: string
}

export interface MarketGuideCard {
  icon: string
  title: string
  tips: string[]
  color: string
}

export const marketPrices: MarketPrice[] = [
  { crop: 'Tomato', variety: 'Hybrid', market: 'Hosur', pricePerQuintal: 4200, priceChange: 12.5, trend: 'up', lastUpdated: '2025-06-25' },
  { crop: 'Tomato', variety: 'Local', market: 'Krishnagiri', pricePerQuintal: 3800, priceChange: 8.2, trend: 'up', lastUpdated: '2025-06-25' },
  { crop: 'Onion', variety: 'Small', market: 'Krishnagiri', pricePerQuintal: 1800, priceChange: -8.3, trend: 'down', lastUpdated: '2025-06-25' },
  { crop: 'Onion', variety: 'Bellary', market: 'Hosur', pricePerQuintal: 2200, priceChange: -4.5, trend: 'down', lastUpdated: '2025-06-25' },
  { crop: 'Rice', variety: 'Sona Masuri', market: 'Dharmapuri', pricePerQuintal: 2800, priceChange: 3.2, trend: 'up', lastUpdated: '2025-06-25' },
  { crop: 'Rice', variety: 'Ponni', market: 'Salem', pricePerQuintal: 3200, priceChange: 1.8, trend: 'up', lastUpdated: '2025-06-25' },
  { crop: 'Groundnut', variety: 'TMV-7', market: 'Krishnagiri', pricePerQuintal: 8500, priceChange: 6.8, trend: 'up', lastUpdated: '2025-06-25' },
  { crop: 'Groundnut', variety: 'Kadiri-6', market: 'Dharmapuri', pricePerQuintal: 8200, priceChange: 5.5, trend: 'up', lastUpdated: '2025-06-25' },
  { crop: 'Chili', variety: 'Guntur S-4', market: 'Hosur', pricePerQuintal: 7200, priceChange: 7.1, trend: 'up', lastUpdated: '2025-06-25' },
  { crop: 'Chili', variety: 'Byadagi', market: 'Krishnagiri', pricePerQuintal: 6500, priceChange: 4.2, trend: 'up', lastUpdated: '2025-06-25' },
  { crop: 'Cotton', variety: 'MCU-5', market: 'Coimbatore', pricePerQuintal: 7200, priceChange: 5.1, trend: 'up', lastUpdated: '2025-06-25' },
  { crop: 'Cotton', variety: 'Surabhi', market: 'Salem', pricePerQuintal: 6800, priceChange: -2.3, trend: 'down', lastUpdated: '2025-06-25' },
  { crop: 'Banana', variety: 'Cavendish', market: 'Hosur', pricePerQuintal: 3200, priceChange: -2.8, trend: 'down', lastUpdated: '2025-06-25' },
  { crop: 'Banana', variety: 'Red Banana', market: 'Dharmapuri', pricePerQuintal: 3800, priceChange: 1.2, trend: 'up', lastUpdated: '2025-06-25' },
  { crop: 'Brinjal', variety: 'Long Purple', market: 'Krishnagiri', pricePerQuintal: 2400, priceChange: 4.5, trend: 'up', lastUpdated: '2025-06-25' },
  { crop: 'Potato', variety: 'Kufri Jyoti', market: 'Hosur', pricePerQuintal: 2600, priceChange: -1.5, trend: 'down', lastUpdated: '2025-06-25' },
  { crop: 'Black Gram', variety: 'VBN-4', market: 'Krishnagiri', pricePerQuintal: 9500, priceChange: -3.1, trend: 'down', lastUpdated: '2025-06-25' },
  { crop: 'Sugarcane', variety: 'Co-86032', market: 'Salem', pricePerQuintal: 3500, priceChange: 0.5, trend: 'stable', lastUpdated: '2025-06-25' },
]

export const cropInfo: CropInfo[] = [
  { name: 'Rice', category: 'Cereal', season: 'Kharif / Rabi', waterRequirement: 'High', soilType: 'Clay loam', avgYield: '25-30 quintals/acre' },
  { name: 'Groundnut', category: 'Oilseed', season: 'Kharif / Rabi', waterRequirement: 'Medium', soilType: 'Sandy loam', avgYield: '10-15 quintals/acre' },
  { name: 'Tomato', category: 'Vegetable', season: 'Year-round', waterRequirement: 'Medium', soilType: 'Well-drained loam', avgYield: '150-200 quintals/acre' },
  { name: 'Brinjal', category: 'Vegetable', season: 'Year-round', waterRequirement: 'Medium', soilType: 'Loamy soil', avgYield: '200-250 quintals/acre' },
  { name: 'Chili', category: 'Spice', season: 'Kharif', waterRequirement: 'Medium', soilType: 'Well-drained loam', avgYield: '50-60 quintals/acre' },
  { name: 'Banana', category: 'Fruit', season: 'Year-round', waterRequirement: 'High', soilType: 'Rich loam', avgYield: '300-400 quintals/acre' },
]

export const priceTrends = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    { label: 'Tomato', data: [15, 18, 22, 20, 25, 28], borderColor: '#E53935' },
    { label: 'Onion', data: [40, 38, 42, 45, 38, 35], borderColor: '#7E57C2' },
    { label: 'Potato', data: [20, 22, 20, 18, 20, 22], borderColor: '#8D6E63' },
    { label: 'Rice', data: [38, 38, 40, 40, 41, 42], borderColor: '#2D5A3D' },
  ],
}

// 7-day price history for the line chart (₹/quintal)
export const last7DaysLabels = ['Jun 19', 'Jun 20', 'Jun 21', 'Jun 22', 'Jun 23', 'Jun 24', 'Jun 25']

export const cropPriceHistory7Days: CropPriceHistory[] = [
  {
    crop: 'Tomato',
    data: [
      { date: 'Jun 19', price: 3250 },
      { date: 'Jun 20', price: 3400 },
      { date: 'Jun 21', price: 3550 },
      { date: 'Jun 22', price: 3700 },
      { date: 'Jun 23', price: 3900 },
      { date: 'Jun 24', price: 4050 },
      { date: 'Jun 25', price: 4200 },
    ],
  },
  {
    crop: 'Onion',
    data: [
      { date: 'Jun 19', price: 2400 },
      { date: 'Jun 20', price: 2250 },
      { date: 'Jun 21', price: 2100 },
      { date: 'Jun 22', price: 2050 },
      { date: 'Jun 23', price: 1950 },
      { date: 'Jun 24', price: 1850 },
      { date: 'Jun 25', price: 1800 },
    ],
  },
  {
    crop: 'Rice',
    data: [
      { date: 'Jun 19', price: 2600 },
      { date: 'Jun 20', price: 2620 },
      { date: 'Jun 21', price: 2650 },
      { date: 'Jun 22', price: 2680 },
      { date: 'Jun 23', price: 2720 },
      { date: 'Jun 24', price: 2750 },
      { date: 'Jun 25', price: 2800 },
    ],
  },
  {
    crop: 'Chili',
    data: [
      { date: 'Jun 19', price: 6200 },
      { date: 'Jun 20', price: 6350 },
      { date: 'Jun 21', price: 6500 },
      { date: 'Jun 22', price: 6650 },
      { date: 'Jun 23', price: 6850 },
      { date: 'Jun 24', price: 7000 },
      { date: 'Jun 25', price: 7200 },
    ],
  },
  {
    crop: 'Cotton',
    data: [
      { date: 'Jun 19', price: 7100 },
      { date: 'Jun 20', price: 7200 },
      { date: 'Jun 21', price: 7350 },
      { date: 'Jun 22', price: 7400 },
      { date: 'Jun 23', price: 7300 },
      { date: 'Jun 24', price: 7250 },
      { date: 'Jun 25', price: 7200 },
    ],
  },
]

// Chart colors for each crop
export const cropChartColors: Record<string, string> = {
  Tomato: '#E53935',
  Onion: '#7E57C2',
  Rice: '#2D5A3D',
  Chili: '#FF6F00',
  Cotton: '#42A5F5',
}

// Demand forecast data
export const demandForecasts: DemandForecast[] = [
  {
    crop: 'Tomato',
    icon: 'Tomato',
    demandPercent: 85,
    currentPrice: '\u20b94,200/q',
    predictionRange: '\u20b94,500 \u2013 \u20b95,000',
    predictionDirection: 'up',
    reason: 'Lower supply from neighboring districts + festive demand',
    action: 'Sell Now',
    actionColor: 'success',
    barColor: '#4CAF50',
  },
  {
    crop: 'Rice',
    icon: 'Rice',
    demandPercent: 62,
    currentPrice: '\u20b92,800/q',
    predictionRange: '\u20b92,600 \u2013 \u20b92,800',
    predictionDirection: 'stable',
    reason: 'New harvest arrivals keeping prices stable',
    action: 'Can Sell',
    actionColor: 'warning',
    barColor: '#FF9800',
  },
  {
    crop: 'Groundnut',
    icon: 'Groundnut',
    demandPercent: 78,
    currentPrice: '\u20b98,500/q',
    predictionRange: '\u20b99,000 \u2013 \u20b99,500',
    predictionDirection: 'up',
    reason: 'Export demand increasing, limited stock',
    action: 'Sell Now',
    actionColor: 'success',
    barColor: '#4CAF50',
  },
  {
    crop: 'Cotton',
    icon: 'Cotton',
    demandPercent: 55,
    currentPrice: '\u20b97,200/q',
    predictionRange: '\u20b97,000 \u2013 \u20b97,500',
    predictionDirection: 'down',
    reason: 'New season cotton arriving in markets soon',
    action: 'Wait',
    actionColor: 'warning',
    barColor: '#FF9800',
  },
  {
    crop: 'Chili',
    icon: 'Chili',
    demandPercent: 80,
    currentPrice: '\u20b97,200/q',
    predictionRange: '\u20b97,800 \u2013 \u20b98,200',
    predictionDirection: 'up',
    reason: 'Processing industry demand peak season',
    action: 'Sell Now',
    actionColor: 'success',
    barColor: '#4CAF50',
  },
  {
    crop: 'Banana',
    icon: 'Banana',
    demandPercent: 45,
    currentPrice: '\u20b93,200/q',
    predictionRange: '\u20b93,000 \u2013 \u20b93,400',
    predictionDirection: 'stable',
    reason: 'Steady demand, no major changes expected',
    action: 'Hold',
    actionColor: 'neutral',
    barColor: '#6B6560',
  },
]

// AI insights
export const aiInsights: AIInsight[] = [
  { id: 1, text: 'Tomato prices at Hosur market are expected to remain elevated for the next 3-4 days due to lower supply from recent rains in neighboring districts. Consider selling within this window.' },
  { id: 2, text: 'Onion prices are declining as fresh harvests from Karnataka enter the market. Hold your stock if possible, or sell in smaller batches to avoid losses.' },
  { id: 3, text: 'Groundnut export demand from oil mills is surging. Prices may rise 8-12% over the next week. Best time to sell for maximum profit.' },
  { id: 4, text: 'Rice prices remain stable with steady demand from institutional buyers. Sona Masuri variety at Dharmapuri is performing well.' },
]

// Market guide cards
export const marketGuideCards: MarketGuideCard[] = [
  {
    icon: 'Clock',
    title: 'Timing is Everything',
    tips: [
      'Sell early morning for fresh produce (better quality = better price)',
      'Check prices Tuesday-Thursday (typically higher than weekends)',
      'Sell before your crop\'s main harvest season floods the market',
      'Consider festival demand \u2014 prices rise 10-20% before major festivals',
    ],
    color: '#D4953A',
  },
  {
    icon: 'Award',
    title: 'Grade Your Produce',
    tips: [
      'Grade A produce fetches 30-40% more than Grade C',
      'Clean, sort, and grade before taking to market',
      'Proper packaging protects quality and commands premium',
      'Consistent quality builds trust with buyers',
    ],
    color: '#4CAF50',
  },
  {
    icon: 'Radio',
    title: 'Know Your Market',
    tips: [
      'Visit your APMC market regularly to build relationships',
      'Compare prices across 2-3 nearby markets',
      'Join farmer WhatsApp groups for real-time price updates',
      'Use KRISHI-AI\'s daily price summary every morning',
    ],
    color: '#42A5F5',
  },
]
