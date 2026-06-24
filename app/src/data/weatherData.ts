export interface WeatherDay {
  day: string
  date: string
  tempHigh: number
  tempLow: number
  condition: string
  humidity: number
  windSpeed: number
  rainfall: number
  icon: string
}

export interface FarmingAdvice {
  category: string
  advice: string
  priority: 'high' | 'medium' | 'low'
}

export interface SeasonalActivity {
  name: string
  priority: 'Urgent' | 'Recommended' | 'Optional'
  icon: string
  iconColor: string
  description: string
  weatherCondition: string
  crops: string[]
}

export interface SafetyGuideline {
  icon: string
  iconColor: string
  title: string
  tips: string[]
}

export interface AIAdvisory {
  summary: string
  actions: { text: string; type: 'good' | 'warning' | 'info' }[]
}

export const weeklyForecast: WeatherDay[] = [
  { day: 'Today', date: '25 Jun', tempHigh: 32, tempLow: 24, condition: 'Partly Cloudy', humidity: 68, windSpeed: 12, rainfall: 0, icon: 'cloud-sun' },
  { day: 'Thu', date: '26 Jun', tempHigh: 30, tempLow: 23, condition: 'Thunderstorms', humidity: 78, windSpeed: 18, rainfall: 25, icon: 'cloud-lightning' },
  { day: 'Fri', date: '27 Jun', tempHigh: 29, tempLow: 22, condition: 'Heavy Rain', humidity: 85, windSpeed: 22, rainfall: 45, icon: 'cloud-rain' },
  { day: 'Sat', date: '28 Jun', tempHigh: 31, tempLow: 23, condition: 'Scattered Showers', humidity: 72, windSpeed: 14, rainfall: 10, icon: 'cloud-drizzle' },
  { day: 'Sun', date: '29 Jun', tempHigh: 33, tempLow: 24, condition: 'Mostly Sunny', humidity: 60, windSpeed: 10, rainfall: 0, icon: 'sun' },
]

export const farmingAdvice: FarmingAdvice[] = [
  { category: 'Irrigation', advice: 'Hold off on irrigation for the next 2 days — significant rainfall expected Thursday-Friday.', priority: 'high' },
  { category: 'Pest Control', advice: 'High humidity may increase fungal disease risk. Inspect rice fields for blast symptoms.', priority: 'high' },
  { category: 'Harvesting', advice: 'Delay harvesting mature crops until after Friday to avoid rain damage.', priority: 'medium' },
  { category: 'Planting', advice: 'Good sowing conditions expected Saturday-Sunday after the rains subside.', priority: 'medium' },
  { category: 'Soil', advice: 'Post-rain period ideal for applying organic manure and preparing fields.', priority: 'low' },
]

export const currentWeather = {
  temp: 32,
  feelsLike: 35,
  condition: 'Partly Cloudy',
  description: 'Warm afternoon with scattered clouds. Light breeze from the southwest.',
  humidity: 68,
  windSpeed: 12,
  windDirection: 'SW',
  uvIndex: 7,
  uvLabel: 'High',
  rainfall: 0,
  rainChance: 0,
  location: 'Krishnagiri, Tamil Nadu',
  updatedAt: '5 minutes ago',
}

export const aiAdvisory: AIAdvisory = {
  summary: 'Current conditions (32°C, partly cloudy) are favorable for light fieldwork such as weeding and fertilizing. Avoid spraying pesticides during peak heat hours (11 AM–3 PM) as high temperatures can cause phytotoxicity. Consider irrigating in the early morning or late evening to minimize evaporation. The UV index is high — wear protective clothing if working outdoors.',
  actions: [
    { text: 'Irrigate early morning or evening', type: 'good' },
    { text: 'Avoid pesticide spray 11 AM–3 PM', type: 'warning' },
    { text: 'Good time for weeding & fertilizing', type: 'good' },
    { text: 'Wear protective clothing — UV is high', type: 'info' },
  ],
}

export const seasonalActivities: SeasonalActivity[] = [
  {
    name: 'Prepare Nursery Beds',
    priority: 'Urgent',
    icon: 'Grid3x3',
    iconColor: '#E53935',
    description: 'Prepare raised nursery beds for rice and vegetable transplants. Use well-decomposed farmyard manure.',
    weatherCondition: 'Clear days preferred',
    crops: ['Rice', 'Tomato'],
  },
  {
    name: 'Sow Rabi Pulses',
    priority: 'Urgent',
    icon: 'Seedling',
    iconColor: '#E53935',
    description: 'Sow Bengal gram and black gram now. Ensure adequate soil moisture at sowing depth.',
    weatherCondition: 'Moderate soil moisture needed',
    crops: ['Black Gram'],
  },
  {
    name: 'Apply Winter Fertilizer',
    priority: 'Recommended',
    icon: 'SprayCan',
    iconColor: '#FF9800',
    description: 'Top-dress standing crops with nitrogen fertilizer. Apply early morning for better absorption.',
    weatherCondition: 'Cloudy morning ideal',
    crops: ['Rice', 'Groundnut'],
  },
  {
    name: 'Pest Monitoring',
    priority: 'Recommended',
    icon: 'Bug',
    iconColor: '#FF9800',
    description: 'Monitor for aphids and whiteflies in vegetable crops. Check 10 plants per acre.',
    weatherCondition: 'Dry weather increases pest activity',
    crops: ['Tomato', 'Chili'],
  },
  {
    name: 'Irrigation Management',
    priority: 'Recommended',
    icon: 'Droplets',
    iconColor: '#FF9800',
    description: 'Reduce irrigation frequency — winter crops need less water. Check soil moisture before irrigating.',
    weatherCondition: 'Cool weather = less evaporation',
    crops: ['All'],
  },
  {
    name: 'Compost Preparation',
    priority: 'Optional',
    icon: 'Recycle',
    iconColor: '#4CAF50',
    description: 'Start composting farm waste for the coming summer season. Turn compost piles every 15 days.',
    weatherCondition: 'Dry weather helps decomposition',
    crops: ['All'],
  },
]

export const safetyGuidelines: SafetyGuideline[] = [
  {
    icon: 'ThermometerSun',
    iconColor: '#E53935',
    title: 'Heat Wave Precautions',
    tips: [
      'Avoid fieldwork between 11 AM and 3 PM',
      'Drink ORS or buttermilk every hour',
      'Wear light cotton clothing and a wide-brimmed hat',
      'Watch for heat exhaustion symptoms: dizziness, nausea, cramps',
      'Keep livestock in shade with plenty of water',
    ],
  },
  {
    icon: 'CloudLightning',
    iconColor: '#42A5F5',
    title: 'Monsoon Precautions',
    tips: [
      'Ensure field drainage before heavy rains',
      'Store seeds and fertilizers in waterproof containers',
      'Do not work in fields during thunderstorms',
      'Secure loose structures, shade nets, and equipment',
      'Check for waterlogging in standing crops daily',
    ],
  },
  {
    icon: 'Snowflake',
    iconColor: '#E8C547',
    title: 'Cold Wave Precautions',
    tips: [
      'Cover sensitive vegetable crops with mulch or shade nets',
      'Water plants in the morning (not evening) to prevent frost damage',
      'Move small livestock indoors at night',
      'Delay transplanting until temperatures stabilize',
      'Harvest mature crops before a predicted cold snap',
    ],
  },
]

export function getWeatherGradient(condition: string): string {
  const c = condition.toLowerCase()
  if (c.includes('sun') || c.includes('clear')) {
    return 'linear-gradient(135deg, #D4953A 0%, #6B8F71 100%)'
  }
  if (c.includes('rain') || c.includes('drizzle')) {
    return 'linear-gradient(135deg, #2A5B6C 0%, #1C2518 100%)'
  }
  if (c.includes('thunder') || c.includes('storm')) {
    return 'linear-gradient(135deg, #1C2518 0%, #3D2B1F 100%)'
  }
  if (c.includes('cloud')) {
    return 'linear-gradient(135deg, #6B6560 0%, #2D5A3D 100%)'
  }
  return 'linear-gradient(135deg, #D4953A 0%, #6B8F71 100%)'
}

export function getWeatherCardGradient(condition: string): string {
  const c = condition.toLowerCase()
  if (c.includes('sun') || c.includes('clear')) {
    return 'linear-gradient(135deg, #42A5F5 0%, #6B8F71 100%)'
  }
  if (c.includes('rain') || c.includes('drizzle')) {
    return 'linear-gradient(135deg, #2A5B6C 0%, #42A5F5 100%)'
  }
  if (c.includes('thunder') || c.includes('storm')) {
    return 'linear-gradient(135deg, #1C2518 0%, #4A3728 100%)'
  }
  if (c.includes('cloud')) {
    return 'linear-gradient(135deg, #6B6560 0%, #2D5A3D 100%)'
  }
  return 'linear-gradient(135deg, #42A5F5 0%, #6B8F71 100%)'
}
