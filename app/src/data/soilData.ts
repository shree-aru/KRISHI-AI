export interface CropData {
  name: string
  scientificName: string
  icon: string
  idealPH: [number, number]
  idealN: [number, number]
  idealP: [number, number]
  idealK: [number, number]
  idealMoisture: [number, number]
  soilTypes: string[]
  season: string
  waterRequirement: 'Low' | 'Medium' | 'High'
  matchScore?: number
}

export interface FertilizerRecommendation {
  name: string
  amount: string
  application: string
}

export interface FertilizerCategory {
  title: string
  borderColor: string
  icon: string
  items: FertilizerRecommendation[]
  costEstimate?: string
  note?: string
}

export interface SoilHealthTip {
  icon: string
  title: string
  description: string
}

export interface TimelineEntry {
  phase: string
  action: string
}

export const cropsDatabase: CropData[] = [
  {
    name: 'Rice (Paddy)',
    scientificName: 'Oryza sativa',
    icon: 'Wheat',
    idealPH: [5.5, 7.0],
    idealN: [150, 250],
    idealP: [20, 40],
    idealK: [150, 250],
    idealMoisture: [50, 80],
    soilTypes: ['Alluvial Soil', 'Clay Soil', 'Red Soil (Laterite)'],
    season: 'Monsoon Season',
    waterRequirement: 'High',
  },
  {
    name: 'Sugarcane',
    scientificName: 'Saccharum officinarum',
    icon: 'Leaf',
    idealPH: [6.0, 7.5],
    idealN: [180, 250],
    idealP: [25, 50],
    idealK: [180, 280],
    idealMoisture: [40, 70],
    soilTypes: ['Alluvial Soil', 'Black Soil (Regur)', 'Loamy Soil'],
    season: 'Year-round',
    waterRequirement: 'High',
  },
  {
    name: 'Cotton',
    scientificName: 'Gossypium hirsutum',
    icon: 'Flower2',
    idealPH: [5.8, 7.5],
    idealN: [120, 180],
    idealP: [20, 40],
    idealK: [120, 200],
    idealMoisture: [30, 55],
    soilTypes: ['Black Soil (Regur)', 'Sandy Loam', 'Red Soil (Laterite)'],
    season: 'Kharif Season',
    waterRequirement: 'Medium',
  },
  {
    name: 'Tomato',
    scientificName: 'Solanum lycopersicum',
    icon: 'Apple',
    idealPH: [6.0, 6.8],
    idealN: [100, 160],
    idealP: [25, 45],
    idealK: [150, 220],
    idealMoisture: [35, 60],
    soilTypes: ['Loamy Soil', 'Sandy Loam', 'Alluvial Soil'],
    season: 'Year-round',
    waterRequirement: 'Medium',
  },
  {
    name: 'Wheat',
    scientificName: 'Triticum aestivum',
    icon: 'Wheat',
    idealPH: [6.0, 7.5],
    idealN: [120, 180],
    idealP: [20, 35],
    idealK: [100, 180],
    idealMoisture: [30, 55],
    soilTypes: ['Alluvial Soil', 'Loamy Soil', 'Clay Loam'],
    season: 'Rabi Season',
    waterRequirement: 'Medium',
  },
  {
    name: 'Banana',
    scientificName: 'Musa paradisiaca',
    icon: 'Banana',
    idealPH: [6.0, 7.5],
    idealN: [200, 280],
    idealP: [25, 45],
    idealK: [200, 300],
    idealMoisture: [45, 75],
    soilTypes: ['Alluvial Soil', 'Loamy Soil', 'Clay Loam'],
    season: 'Year-round',
    waterRequirement: 'High',
  },
  {
    name: 'Groundnut',
    scientificName: 'Arachis hypogaea',
    icon: 'Nut',
    idealPH: [6.0, 7.0],
    idealN: [20, 60],
    idealP: [30, 55],
    idealK: [30, 60],
    idealMoisture: [25, 50],
    soilTypes: ['Red Soil (Laterite)', 'Sandy Loam', 'Black Soil (Regur)'],
    season: 'Kharif Season',
    waterRequirement: 'Low',
  },
  {
    name: 'Maize',
    scientificName: 'Zea mays',
    icon: 'Wheat',
    idealPH: [5.8, 7.0],
    idealN: [140, 200],
    idealP: [20, 40],
    idealK: [100, 180],
    idealMoisture: [35, 65],
    soilTypes: ['Loamy Soil', 'Alluvial Soil', 'Clay Loam'],
    season: 'Kharif Season',
    waterRequirement: 'Medium',
  },
  {
    name: 'Chili',
    scientificName: 'Capsicum annuum',
    icon: 'Flame',
    idealPH: [6.0, 7.0],
    idealN: [120, 180],
    idealP: [30, 50],
    idealK: [120, 200],
    idealMoisture: [30, 55],
    soilTypes: ['Red Soil (Laterite)', 'Loamy Soil', 'Black Soil (Regur)'],
    season: 'Year-round',
    waterRequirement: 'Medium',
  },
  {
    name: 'Onion',
    scientificName: 'Allium cepa',
    icon: 'Circle',
    idealPH: [6.0, 7.0],
    idealN: [100, 150],
    idealP: [30, 50],
    idealK: [100, 160],
    idealMoisture: [30, 55],
    soilTypes: ['Loamy Soil', 'Sandy Loam', 'Red Soil (Laterite)'],
    season: 'Rabi Season',
    waterRequirement: 'Medium',
  },
]

export const soilTypesList = [
  { name: 'Red Soil (Laterite)', color: '#C8543A', description: 'Reddish, found in Tamil Nadu highlands, good for millets' },
  { name: 'Black Soil (Regur)', color: '#3D3229', description: 'Dark, clay-rich, excellent for cotton and groundnut' },
  { name: 'Alluvial Soil', color: '#8B7355', description: 'Fertile river-deposited soil, great for rice' },
  { name: 'Sandy Soil', color: '#C9B99A', description: 'Light, drains quickly, good for root vegetables' },
  { name: 'Clay Soil', color: '#7A6250', description: 'Heavy, holds water well, ideal for paddy' },
  { name: 'Saline Soil', color: '#D4CFC6', description: 'High salt content, requires treatment before use' },
  { name: 'Peaty Soil', color: '#5C4A3A', description: 'Rich in organic matter, acidic, good for cash crops' },
]

export const organicFertilizers: FertilizerRecommendation[] = [
  { name: 'Vermicompost', amount: '2 tonnes/acre', application: 'Basal application — mix into topsoil 2 weeks before sowing' },
  { name: 'Neem Cake', amount: '200 kg/acre', application: 'Mix with soil at sowing — acts as pest repellent' },
  { name: 'Green Manure', amount: 'Grow dhaincha/sunhemp', application: 'Incorporate into soil 45 days after sowing' },
  { name: 'Biofertilizers', amount: 'Rhizobium + PSB culture, 2 kg/acre', application: 'Seed treatment before sowing' },
  { name: 'Farmyard Manure', amount: '5–8 tonnes/acre', application: 'Apply 3–4 weeks before planting, mix well' },
]

export const chemicalFertilizers: FertilizerRecommendation[] = [
  { name: 'Urea (46% N)', amount: '80 kg/acre', application: 'Split: 1/3 basal, 2/3 top dress at tillering' },
  { name: 'DAP (18-46-0)', amount: '50 kg/acre', application: 'Basal application — place below seed' },
  { name: 'MOP (60% K)', amount: '30 kg/acre', application: 'Basal application — mix with soil' },
  { name: 'SSP (16% P)', amount: '40 kg/acre', application: 'Basal application — alternative to DAP' },
  { name: 'NPK Complex (20-20-0)', amount: '25 kg/acre', application: 'Basal — use when both N and P are needed' },
]

export const micronutrients: FertilizerRecommendation[] = [
  { name: 'Zinc Sulfate', amount: '10 kg/acre', application: 'If zinc deficiency symptoms (white bands) are observed' },
  { name: 'Borax', amount: '5 kg/acre', application: 'For flowering crops — apply at pre-flowering stage' },
  { name: 'Ferrous Sulfate', amount: '10 kg/acre', application: 'If chlorosis (yellowing of leaves) is observed' },
]

export const applicationTimeline: TimelineEntry[] = [
  { phase: 'Before Sowing (2 weeks)', action: 'Apply basal dose — Vermicompost + DAP + MOP, mix into topsoil' },
  { phase: 'At Sowing', action: 'Seed treatment with biofertilizers (Rhizobium/PSB)' },
  { phase: '21 Days After Sowing', action: 'First split of nitrogen (Urea) — side dress along rows' },
  { phase: '45 Days After Sowing', action: 'Second split of nitrogen (Urea) + foliar spray if deficiency observed' },
  { phase: 'Flowering Stage', action: 'Micronutrient foliar spray (Zinc/Boron) if deficiency symptoms appear' },
  { phase: 'Pre-Harvest', action: 'Stop all fertilizer application 2 weeks before expected harvest' },
]

export const soilHealthTips: SoilHealthTip[] = [
  {
    icon: 'Recycle',
    title: 'Compost Everything',
    description: 'Convert all farm waste — crop residues, weeds, animal manure — into compost. Aim for 5 tonnes of compost per acre per year. This builds organic matter and improves water retention.',
  },
  {
    icon: 'Shuffle',
    title: 'Rotate Your Crops',
    description: 'Never grow the same crop in the same field for two consecutive seasons. A rice → legume → vegetable rotation restores nitrogen and breaks pest cycles naturally.',
  },
  {
    icon: 'Droplets',
    title: 'Water Wisely',
    description: 'Overwatering leaches nutrients and creates hardpan. Use drip irrigation where possible. Mulching reduces evaporation by 40–50% and keeps soil temperature stable.',
  },
  {
    icon: 'Leaf',
    title: 'Grow Green Manure',
    description: 'Plant dhaincha (Sesbania) or sunn hemp between main crops. Incorporate into soil 45 days after sowing. This adds 80–100 kg nitrogen per hectare for free.',
  },
  {
    icon: 'TestTube',
    title: 'Test Soil Yearly',
    description: 'Get your soil tested at the start of every cropping season. Track changes in pH and nutrient levels. Most government agricultural offices offer free soil testing.',
  },
  {
    icon: 'Bug',
    title: 'Encourage Earthworms',
    description: 'Earthworms are nature\'s ploughs. Avoid excessive chemical use, add organic matter, and reduce tillage. A healthy soil should have 10–15 earthworms per cubic foot.',
  },
]

export function calculateCropMatch(
  crop: CropData,
  ph: number,
  n: number,
  p: number,
  k: number,
  moisture: number,
  soilType: string
): number {
  let score = 0

  // pH match (25%)
  const phIdeal = (crop.idealPH[0] + crop.idealPH[1]) / 2
  const phRange = crop.idealPH[1] - crop.idealPH[0]
  const phDiff = Math.abs(ph - phIdeal)
  const phScore = Math.max(0, 1 - phDiff / (phRange * 1.5))
  score += phScore * 25

  // N match (20%)
  const nIdeal = (crop.idealN[0] + crop.idealN[1]) / 2
  const nRange = crop.idealN[1] - crop.idealN[0]
  const nDiff = Math.abs(n - nIdeal)
  const nScore = Math.max(0, 1 - nDiff / (nRange * 1.5))
  score += nScore * 20

  // P match (20%)
  const pIdeal = (crop.idealP[0] + crop.idealP[1]) / 2
  const pRange = crop.idealP[1] - crop.idealP[0]
  const pDiff = Math.abs(p - pIdeal)
  const pScore = Math.max(0, 1 - pDiff / (pRange * 1.5))
  score += pScore * 20

  // K match (20%)
  const kIdeal = (crop.idealK[0] + crop.idealK[1]) / 2
  const kRange = crop.idealK[1] - crop.idealK[0]
  const kDiff = Math.abs(k - kIdeal)
  const kScore = Math.max(0, 1 - kDiff / (kRange * 1.5))
  score += kScore * 20

  // Moisture match (10%)
  const mIdeal = (crop.idealMoisture[0] + crop.idealMoisture[1]) / 2
  const mRange = crop.idealMoisture[1] - crop.idealMoisture[0]
  const mDiff = Math.abs(moisture - mIdeal)
  const mScore = Math.max(0, 1 - mDiff / (mRange * 1.5))
  score += mScore * 10

  // Soil type bonus (5%)
  if (crop.soilTypes.includes(soilType)) {
    score += 5
  } else {
    score += 2 // partial credit for any soil
  }

  return Math.round(score)
}

export function getPHStatus(ph: number): { label: string; color: string } {
  if (ph >= 6.0 && ph <= 7.5) return { label: 'Optimal', color: '#4CAF50' }
  if (ph >= 5.5 && ph < 6.0) return { label: 'Slightly Acidic', color: '#FF9800' }
  if (ph > 7.5 && ph <= 8.0) return { label: 'Slightly Alkaline', color: '#FF9800' }
  if (ph < 5.5) return { label: 'Acidic', color: '#E53935' }
  return { label: 'Alkaline', color: '#E53935' }
}

export function getNStatus(n: number): { label: string; color: string } {
  if (n >= 150 && n <= 250) return { label: 'Optimal', color: '#4CAF50' }
  if (n >= 100 && n < 150) return { label: 'Medium', color: '#FF9800' }
  if (n > 250) return { label: 'High', color: '#42A5F5' }
  return { label: 'Low', color: '#E53935' }
}

export function getPStatus(p: number): { label: string; color: string } {
  if (p >= 20 && p <= 40) return { label: 'Optimal', color: '#4CAF50' }
  if (p >= 10 && p < 20) return { label: 'Medium', color: '#FF9800' }
  if (p > 40) return { label: 'High', color: '#42A5F5' }
  return { label: 'Low', color: '#E53935' }
}

export function getKStatus(k: number): { label: string; color: string } {
  if (k >= 150 && k <= 250) return { label: 'Optimal', color: '#4CAF50' }
  if (k >= 100 && k < 150) return { label: 'Medium', color: '#FF9800' }
  if (k > 250) return { label: 'High', color: '#42A5F5' }
  return { label: 'Low', color: '#E53935' }
}

export function getMoistureStatus(moisture: number): { label: string; color: string } {
  if (moisture >= 25 && moisture <= 60) return { label: 'Optimal', color: '#4CAF50' }
  if (moisture >= 15 && moisture < 25) return { label: 'Dry', color: '#FF9800' }
  if (moisture > 60) return { label: 'Wet', color: '#42A5F5' }
  return { label: 'Very Dry', color: '#E53935' }
}

export function getOverallSoilHealth(ph: number, n: number, p: number, k: number, moisture: number): number {
  let score = 0
  score += Math.min(100, Math.max(0, 100 - Math.abs(ph - 6.75) * 30))
  score += Math.min(100, Math.max(0, 100 - Math.abs(n - 175) / 175 * 100))
  score += Math.min(100, Math.max(0, 100 - Math.abs(p - 30) / 30 * 100))
  score += Math.min(100, Math.max(0, 100 - Math.abs(k - 200) / 200 * 100))
  score += Math.min(100, Math.max(0, 100 - Math.abs(moisture - 42.5) / 42.5 * 100))
  return Math.round(score / 5)
}
