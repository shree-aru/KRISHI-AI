export interface Tool {
  id: string
  title: string
  description: string
  image: string
  icon: string
  link: string
}

export const tools: Tool[] = [
  {
    id: 'crop-doctor',
    title: 'Crop Doctor',
    description:
      'Snap a photo of your crop disease and get instant AI diagnosis with organic and chemical treatment recommendations.',
    image: '/feature-crop-doctor.jpg',
    icon: 'Scan',
    link: '/crop-doctor',
  },
  {
    id: 'krishi-guru',
    title: 'Krishi Guru',
    description:
      'Your personal AI farming assistant. Ask questions in Tamil, Hindi, or English about any farming challenge.',
    image: '/feature-krishi-guru.jpg',
    icon: 'MessageCircle',
    link: '/krishi-guru',
  },
  {
    id: 'market-intelligence',
    title: 'Market Intelligence',
    description:
      'Real-time crop prices, demand forecasts, and AI-powered recommendations on what to sell and when.',
    image: '/feature-market.jpg',
    icon: 'TrendingUp',
    link: '/market-intelligence',
  },
  {
    id: 'soil-analyzer',
    title: 'Soil Analyzer',
    description:
      'Enter your soil parameters and get personalized crop recommendations and fertilizer advice from AI.',
    image: '/feature-soil.jpg',
    icon: 'FlaskConical',
    link: '/soil-analyzer',
  },
  {
    id: 'weather-advisory',
    title: 'Weather Advisory',
    description:
      '5-day weather forecast combined with AI-generated farming advice tailored to current conditions.',
    image: '/feature-weather.jpg',
    icon: 'CloudSun',
    link: '/weather-advisory',
  },
]
