import { GoogleGenerativeAI } from '@google/generative-ai'

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || ''

let genAI: GoogleGenerativeAI | null = null

if (API_KEY) {
  genAI = new GoogleGenerativeAI(API_KEY)
}

const DEFAULT_MODEL = 'gemini-1.5-flash'

export interface GeminiMessage {
  role: 'user' | 'model'
  text: string
}

// ---- Crop Diagnosis Types ----

export type SeverityLevel = 'Low' | 'Medium' | 'High'

export interface OrganicTreatment {
  name: string
  description: string
  applicationMethod: string
  frequency: string
  expectedResults: string
  costEstimate: string
}

export interface ChemicalTreatment {
  name: string
  activeIngredient: string
  dosage: string
  applicationMethod: string
  safetyPrecautions: string
  costEstimate: string
}

export interface DiagnosisResult {
  diseaseName: string
  scientificName: string
  affectedCrop: string
  severity: SeverityLevel
  confidence: number
  description: string
  symptoms: string[]
  spreadInfo: string
  organicTreatments: OrganicTreatment[]
  chemicalTreatments: ChemicalTreatment[]
  preventionTips: string[]
  relatedDiseases: { name: string; matchPercent: number }[]
  isHealthy: boolean
}

// ---- Mock Diagnosis Database ----

const MOCK_DIAGNOSES: Record<string, DiagnosisResult> = {
  'rice-blast': {
    diseaseName: 'Rice Blast',
    scientificName: 'Magnaporthe oryzae',
    affectedCrop: 'Rice',
    severity: 'High',
    confidence: 89,
    description:
      'Rice blast is one of the most destructive fungal diseases affecting rice crops worldwide. It causes lesions on leaves, stems, and panicles, significantly reducing yield if left untreated. The disease spreads rapidly in warm, humid conditions and can destroy entire fields within weeks.',
    symptoms: [
      'Diamond-shaped lesions on leaves with gray centers and brown margins',
      'Spindly, white-to-grayish spots on the leaf surface',
      'Neck rot causing panicles to break off from the stem',
      'Node infection causing blackened, rotten stem joints',
      'White panicle blast where grains fail to develop',
    ],
    spreadInfo:
      'Spreads through wind-borne spores. Favors temperatures of 24-28°C with high humidity (>90%). Heavy nitrogen fertilization and dense planting increase susceptibility.',
    organicTreatments: [
      {
        name: 'Neem Oil Spray',
        description: 'Natural antifungal extract from neem seeds that inhibits spore germination.',
        applicationMethod: 'Mix 30ml neem oil with 1 liter of water. Add a few drops of soap as emulsifier. Spray evenly on both sides of leaves.',
        frequency: 'Every 7-10 days until symptoms subside',
        expectedResults: 'Reduction in new lesions within 2 weeks',
        costEstimate: '₹150-200 per application per acre',
      },
      {
        name: 'Trichoderma Biofungicide',
        description: 'Beneficial fungus that parasitizes and suppresses Magnaporthe oryzae.',
        applicationMethod: 'Mix 10g Trichoderma viride powder in 1 liter of water. Spray on affected plants in early morning or late evening.',
        frequency: 'Every 10-14 days',
        expectedResults: 'Visible control within 3 weeks with reduced lesion spread',
        costEstimate: '₹200-300 per acre',
      },
      {
        name: 'Cow Urine + Garlic Extract',
        description: 'Traditional remedy with antifungal properties from garlic allicin compounds.',
        applicationMethod: 'Crush 250g garlic, soak in 1 liter cow urine for 24 hours. Strain and dilute with 10 liters of water before spraying.',
        frequency: 'Twice a week for 3 weeks',
        expectedResults: 'Gradual reduction in lesion size and new growth protection',
        costEstimate: '₹50-80 per application',
      },
    ],
    chemicalTreatments: [
      {
        name: 'Tricyclazole 75% WP',
        activeIngredient: 'Tricyclazole',
        dosage: '1g per liter of water',
        applicationMethod: 'Dissolve measured quantity in water and spray uniformly covering leaf surface. Apply preventive spray before expected outbreak.',
        safetyPrecautions: 'Wear gloves and mask during application. Avoid spraying near water bodies. Keep livestock away for 48 hours.',
        costEstimate: '₹400-500 per acre',
      },
      {
        name: 'Carbendazim 50% WP',
        activeIngredient: 'Carbendazim',
        dosage: '1g per liter of water',
        applicationMethod: 'Mix thoroughly and spray during early morning or evening. Ensure complete coverage of foliage.',
        safetyPrecautions: 'Do not inhale spray mist. Wash hands and face after application. Do not eat or drink while spraying.',
        costEstimate: '₹350-450 per acre',
      },
    ],
    preventionTips: [
      'Use blast-resistant rice varieties like CO 47 or White Ponni',
      'Avoid excessive nitrogen fertilizer application',
      'Maintain proper spacing (20×15 cm) for good air circulation',
      'Practice crop rotation with non-host crops like pulses',
      'Remove and burn infected plant debris after harvest',
    ],
    relatedDiseases: [
      { name: 'Brown Spot', matchPercent: 23 },
      { name: 'Stem Rot', matchPercent: 12 },
    ],
    isHealthy: false,
  },

  'bacterial-blight': {
    diseaseName: 'Bacterial Blight',
    scientificName: 'Xanthomonas oryzae pv. oryzae',
    affectedCrop: 'Rice',
    severity: 'High',
    confidence: 94,
    description:
      'Bacterial blight is a devastating disease of rice caused by a bacterium that enters through natural openings or wounds. It causes wilting of seedlings and yellow-to-white streaks on leaves of older plants, potentially causing yield losses of up to 50% in severe cases.',
    symptoms: [
      'Yellow to white streaks along leaf veins starting from leaf tip',
      'Water-soaked lesions at leaf margins that turn yellow then white',
      'Wilting and drying of entire leaf blade (kresek symptom)',
      'Grayish-white bacterial ooze on lesions in humid conditions',
      'Stunted growth and reduced tillering in infected plants',
    ],
    spreadInfo:
      'Spreads through contaminated water, seeds, and farming tools. Bacteria survive in crop residue and soil. Heavy rain and wind splashes spread the bacteria to nearby plants.',
    organicTreatments: [
      {
        name: 'Neem Oil + Copper Spray',
        description: 'Combined antifungal and antibacterial treatment to suppress bacterial growth.',
        applicationMethod: 'Mix 20ml neem oil + 2g copper sulfate in 1 liter of water. Spray on affected areas focusing on leaf undersides.',
        frequency: 'Every 5-7 days',
        expectedResults: 'Halt in lesion spread within 10 days',
        costEstimate: '₹200-250 per acre',
      },
      {
        name: 'Pseudomonas fluorescens',
        description: 'Plant growth-promoting bacterium that acts as a biocontrol agent against Xanthomonas.',
        applicationMethod: 'Mix 5g formulation in 1 liter of water. Spray in evening hours for best colonization.',
        frequency: 'Every 10 days, 3 applications',
        expectedResults: 'Significant reduction in bacterial spread after 2nd application',
        costEstimate: '₹250-350 per acre',
      },
    ],
    chemicalTreatments: [
      {
        name: 'Streptomycin Sulfate 0.01%',
        activeIngredient: 'Streptomycin sulfate',
        dosage: '1g per 10 liters of water',
        applicationMethod: 'Dissolve in water and spray thoroughly. Best applied at first sign of disease. Repeat as needed.',
        safetyPrecautions: 'Antibiotic — use sparingly. Wear full protective gear. Do not mix with other chemicals. Maximum 2 applications per season.',
        costEstimate: '₹500-650 per acre',
      },
      {
        name: 'Copper Oxychloride 50% WP',
        activeIngredient: 'Copper oxychloride',
        dosage: '2.5g per liter of water',
        applicationMethod: 'Prepare fresh suspension and spray immediately. Apply during dry weather for best adhesion.',
        safetyPrecautions: 'Copper can be phytotoxic at high temperatures. Do not exceed recommended dose. Avoid tank mixing.',
        costEstimate: '₹300-400 per acre',
      },
    ],
    preventionTips: [
      'Use certified, disease-free seeds only',
      'Soak seeds in hot water (52-54°C) for 30 minutes before sowing',
      'Avoid water stagnation — maintain intermittent irrigation',
      'Remove and destroy infected plants immediately upon detection',
      'Keep field bunds clean to prevent water flow between fields',
    ],
    relatedDiseases: [
      { name: 'Bacterial Leaf Streak', matchPercent: 31 },
      { name: 'Sheath Rot', matchPercent: 15 },
    ],
    isHealthy: false,
  },

  'aphid-infestation': {
    diseaseName: 'Aphid Infestation',
    scientificName: 'Aphis gossypii / Myzus persicae',
    affectedCrop: 'Cotton',
    severity: 'Medium',
    confidence: 87,
    description:
      'Aphids are small sap-sucking insects that cluster on the undersides of leaves and tender shoots. They cause leaf curling, stunted growth, and transmit viral diseases. Heavy infestations can reduce cotton yield by 30-40% due to honeydew secretion that promotes sooty mold growth.',
    symptoms: [
      'Clusters of tiny green, black, or yellow insects on leaf undersides',
      'Curling and yellowing of leaves, especially new growth',
      'Sticky honeydew coating on leaves and stems',
      'Sooty black mold growing on honeydew deposits',
      'Stunted growth and deformed bolls in severe cases',
    ],
    spreadInfo:
      'Aphids reproduce rapidly through parthenogenesis (asexual reproduction). Spread via wind, ants that farm them for honeydew, and infested plant material. Warm dry weather favors population buildup.',
    organicTreatments: [
      {
        name: 'Soap Water Spray',
        description: 'Simple and effective mechanical control that dissolves aphid protective coating.',
        applicationMethod: 'Mix 20g mild soap or detergent in 1 liter of water. Spray directly on aphid clusters, especially on leaf undersides.',
        frequency: 'Every 3-4 days until population controlled',
        expectedResults: 'Visible reduction in aphid numbers within 1 week',
        costEstimate: '₹30-50 per application',
      },
      {
        name: 'Tobacco Decoction Spray',
        description: 'Natural insecticide from tobacco leaves containing nicotine compounds.',
        applicationMethod: 'Boil 250g tobacco leaves in 2 liters water for 30 minutes. Strain, cool, dilute to 10 liters. Add 10g soap.',
        frequency: 'Every 5-7 days (use sparingly, toxic)',
        expectedResults: 'Rapid knockdown of aphid populations',
        costEstimate: '₹80-120 per application',
      },
      {
        name: 'Release Ladybugs (Cryptolaemus)',
        description: 'Biological control using natural aphid predators.',
        applicationMethod: 'Release 50-100 ladybugs per acre in evening hours near aphid colonies.',
        frequency: 'Single release, monitor population',
        expectedResults: 'Natural aphid control within 2 weeks',
        costEstimate: '₹400-600 per acre',
      },
    ],
    chemicalTreatments: [
      {
        name: 'Imidacloprid 17.8% SL',
        activeIngredient: 'Imidacloprid (neonicotinoid)',
        dosage: '0.5ml per liter of water',
        applicationMethod: 'Systemic insecticide — spray on foliage. Absorbed by plant and kills aphids when they feed.',
        safetyPrecautions: 'Highly toxic to bees. Do not spray during flowering. Keep away from water bodies. PHI: 30 days.',
        costEstimate: '₹350-450 per acre',
      },
      {
        name: 'Dimethoate 30% EC',
        activeIngredient: 'Dimethoate (organophosphate)',
        dosage: '2ml per liter of water',
        applicationMethod: 'Contact and systemic action. Spray thoroughly covering leaf undersides where aphids hide.',
        safetyPrecautions: 'Toxic to humans and fish. Use full protective clothing. Do not enter treated area for 48 hours.',
        costEstimate: '₹250-350 per acre',
      },
    ],
    preventionTips: [
      'Monitor fields weekly for early aphid detection',
      'Encourage natural predators like ladybugs and lacewings',
      'Avoid excessive nitrogen which promotes succulent growth',
      'Plant barrier crops like maize or sorghum around cotton fields',
      'Remove weeds that serve as alternate aphid hosts',
    ],
    relatedDiseases: [
      { name: 'Whitefly Infestation', matchPercent: 28 },
      { name: 'Jassid Attack', matchPercent: 19 },
    ],
    isHealthy: false,
  },

  'leaf-spot': {
    diseaseName: 'Leaf Spot',
    scientificName: 'Cercospora spp. / Alternaria spp.',
    affectedCrop: 'Groundnut',
    severity: 'Medium',
    confidence: 82,
    description:
      'Leaf spot disease is characterized by circular to irregular brown spots on leaves caused by various fungal pathogens. It reduces photosynthetic area and can cause premature defoliation, significantly impacting pod development and yield in groundnut crops.',
    symptoms: [
      'Small circular brown spots with yellow halos on older leaves',
      'Spots enlarge and develop dark concentric rings (target pattern)',
      'Severely infected leaves turn yellow and drop prematurely',
      'Dark brown to black spots on stems and pegs in advanced stages',
      'Reduced pod filling due to defoliation',
    ],
    spreadInfo:
      'Fungal spores spread through wind, rain splash, and contaminated soil. Warm temperatures (25-30°C) with intermittent rainfall create ideal conditions. The fungus overwinters in crop debris.',
    organicTreatments: [
      {
        name: 'Baking Soda Spray',
        description: 'Mild alkaline solution that alters leaf pH and inhibits fungal spore germination.',
        applicationMethod: 'Mix 10g baking soda + 5ml liquid soap in 1 liter of water. Spray on affected leaves thoroughly.',
        frequency: 'Every 7 days for 4 weeks',
        expectedResults: 'Halts spread of existing spots within 2 weeks',
        costEstimate: '₹40-60 per application',
      },
      {
        name: 'Neem Cake Soil Application',
        description: 'Systemic antifungal treatment absorbed through roots from enriched soil.',
        applicationMethod: 'Apply 100kg neem cake per acre, mix into topsoil around plant base. Irrigate lightly.',
        frequency: 'Single application at first sign of disease',
        expectedResults: 'Improved plant vigor and reduced new spot formation within 3 weeks',
        costEstimate: '₹800-1000 per acre',
      },
    ],
    chemicalTreatments: [
      {
        name: 'Mancozeb 75% WP',
        activeIngredient: 'Mancozeb (dithiocarbamate)',
        dosage: '2g per liter of water',
        applicationMethod: 'Broad-spectrum protective fungicide. Spray to thoroughly wet foliage. Repeat at 10-14 day intervals.',
        safetyPrecautions: 'May cause skin irritation. Wear protective clothing. Do not mix with alkaline materials. PHI: 15 days.',
        costEstimate: '₹300-400 per acre',
      },
      {
        name: 'Hexaconazole 5% EC',
        activeIngredient: 'Hexaconazole (triazole)',
        dosage: '1ml per liter of water',
        applicationMethod: 'Systemic fungicide with curative and protective action. Spray at first disease appearance.',
        safetyPrecautions: 'Do not exceed 3 sprays per season. Avoid drift to nearby water bodies. Not for use on waterlogged fields.',
        costEstimate: '₹450-550 per acre',
      },
    ],
    preventionTips: [
      'Practice crop rotation with cereals or pulses for 2-3 years',
      'Remove and destroy infected plant debris after harvest',
      'Avoid overhead irrigation which spreads spores',
      'Maintain proper plant spacing for air circulation',
      'Use resistant varieties like TG-37A or JL-24',
    ],
    relatedDiseases: [
      { name: 'Rust', matchPercent: 25 },
      { name: 'Early Leaf Spot', matchPercent: 34 },
    ],
    isHealthy: false,
  },

  'healthy': {
    diseaseName: 'Healthy Plant',
    scientificName: 'No pathogen detected',
    affectedCrop: 'Rice',
    severity: 'Low',
    confidence: 96,
    description:
      'Great news! Your crop appears healthy with no visible signs of disease, pest damage, or nutrient deficiency. The leaves show normal coloration and texture. Continue with good agricultural practices to maintain plant health throughout the growing season.',
    symptoms: [
      'Uniform green coloration throughout the plant',
      'No visible spots, lesions, or discoloration',
      'Normal leaf shape without curling or wilting',
      'Healthy root development (if visible)',
      'No signs of pest damage or honeydew deposits',
    ],
    spreadInfo: 'Not applicable — plant is healthy.',
    organicTreatments: [
      {
        name: 'Continue Regular Care',
        description: 'Maintain current farming practices to keep plants healthy.',
        applicationMethod: 'Follow recommended irrigation, fertilization, and pest monitoring schedules.',
        frequency: 'As per standard crop calendar',
        expectedResults: 'Continued healthy growth throughout the season',
        costEstimate: 'No additional cost',
      },
      {
        name: 'Vermicompost Top Dressing',
        description: 'Nutrient-rich organic supplement for sustained plant vigor.',
        applicationMethod: 'Apply 200kg vermicompost per acre, spread evenly between plant rows and lightly incorporate.',
        frequency: 'Once during active tillering stage',
        expectedResults: 'Enhanced growth and natural disease resistance',
        costEstimate: '₹1500-2000 per acre',
      },
    ],
    chemicalTreatments: [
      {
        name: 'Preventive Foliar Spray',
        activeIngredient: 'Not required',
        dosage: 'Not applicable',
        applicationMethod: 'No chemical treatment needed at this time. Monitor regularly and act at first sign of disease.',
        safetyPrecautions: 'Avoid unnecessary chemical use on healthy plants to preserve beneficial insects.',
        costEstimate: '₹0',
      },
    ],
    preventionTips: [
      'Monitor fields every 7-10 days for early signs of disease',
      'Maintain balanced fertilization — avoid excess nitrogen',
      'Ensure proper drainage to prevent waterlogging',
      'Keep field bunds and surroundings weed-free',
      'Use disease-resistant varieties for future plantings',
    ],
    relatedDiseases: [
      { name: 'Nutrient Deficiency', matchPercent: 4 },
      { name: 'Water Stress', matchPercent: 2 },
    ],
    isHealthy: true,
  },
}

export async function getGeminiResponse(
  prompt: string,
  history: GeminiMessage[] = [],
  model: string = DEFAULT_MODEL
): Promise<string> {
  if (!genAI) {
    console.warn('Gemini API key not configured. Returning mock response.')
    return getMockTextResponse(prompt)
  }

  try {
    const geminiModel = genAI.getGenerativeModel({ model })

    const chat = geminiModel.startChat({
      history: history.map((msg) => ({
        role: msg.role,
        parts: [{ text: msg.text }],
      })),
    })

    const result = await chat.sendMessage(prompt)
    const response = result.response
    return response.text()
  } catch (error) {
    console.error('Gemini API error:', error)
    return getMockTextResponse(prompt)
  }
}

function getMockTextResponse(prompt: string): string {
  const lower = prompt.toLowerCase()

  if (lower.includes('disease') || lower.includes('blight') || lower.includes('leaf')) {
    return 'Based on the symptoms described, this appears to be **Bacterial Leaf Blight** (Xanthomonas oryzae).\n\n**Recommended actions:**\n1. Remove and destroy infected plant debris\n2. Avoid waterlogging - ensure proper drainage\n3. Apply copper-based bactericide or neem oil spray\n4. For severe cases, use Streptomycin sulfate (0.01%)\n5. Plant resistant varieties in the next season'
  }

  if (lower.includes('price') || lower.includes('market') || lower.includes('sell')) {
    return 'Based on current market trends in Tamil Nadu:\n\n**Tomato prices** are expected to rise by 15-20% over the next 2 weeks due to lower supply from recent rains.\n\n**Recommendation:** Hold your harvest for 5-7 days if storage is possible. Current price: ₹25/kg, projected: ₹30-32/kg.\n\nMonitor Hosur and Krishnagiri mandi rates daily for best timing.'
  }

  if (lower.includes('soil') || lower.includes('fertilizer') || lower.includes('nutrient')) {
    return '**Soil Analysis Results:**\n\nBased on your input parameters:\n- pH: 6.5 (Optimal)\n- N: Medium (requires supplementation)\n- P: Adequate\n- K: Low (needs attention)\n\n**Recommendations:**\n1. Apply 50kg/acre of Vermicompost before sowing\n2. Use NPK 20:10:10 at 25kg/acre as basal dose\n3. Add 10kg/acre of Muriate of Potash to address K deficiency\n4. Consider crop rotation with legumes next season'
  }

  if (lower.includes('weather') || lower.includes('rain') || lower.includes('monsoon')) {
    return '**Weather Advisory for Krishnagiri:**\n\nNext 5 days forecast shows moderate rainfall (25-40mm) expected from Thursday.\n\n**Farming recommendations:**\n1. Delay any spraying operations until after Friday\n2. Ensure field drainage is clear to prevent waterlogging\n3. Good conditions for direct sowing of short-duration pulses after the rain\n4. Cover any exposed compost/fertilizer to prevent leaching'
  }

  return "Thank you for your question! I'm your Krishi Guru, here to help with farming advice.\n\nCould you provide more details about your query? I can assist with:\n- Crop disease identification and treatment\n- Soil analysis and fertilizer recommendations\n- Market price trends and selling advice\n- Weather-based farming recommendations\n- General agricultural guidance in Tamil, Hindi, or English"
}

/**
 * Analyze a crop image and return structured diagnosis.
 * Returns mock diagnosis data for demo (cycles through 5 conditions).
 */
export async function analyzeCropImage(
  imageBase64: string,
  mimeType: string = 'image/jpeg'
): Promise<DiagnosisResult> {
  // Simulate network delay for realistic UX
  await new Promise((resolve) => setTimeout(resolve, 2500))

  if (!genAI) {
    // Return mock diagnosis based on image content hash for variety
    const hash = hashBase64(imageBase64)
    const keys = Object.keys(MOCK_DIAGNOSES)
    const selectedKey = keys[hash % keys.length]
    return { ...MOCK_DIAGNOSES[selectedKey]! }
  }

  try {
    const geminiModel = genAI.getGenerativeModel({ model: DEFAULT_MODEL })
    const result = await geminiModel.generateContent([
      {
        inlineData: {
          data: imageBase64,
          mimeType,
        },
      },
      {
        text: 'Analyze this crop image. Identify any diseases, pests, or nutrient deficiencies. Provide the disease name, symptoms observed, severity level, confidence score, and treatment recommendations including both organic and chemical options, plus prevention tips. Respond in a structured JSON format with fields: diseaseName, scientificName, affectedCrop, severity (Low/Medium/High), confidence (0-100), description, symptoms (array), spreadInfo, organicTreatments (array of objects with name, description, applicationMethod, frequency, expectedResults, costEstimate), chemicalTreatments (array of objects with name, activeIngredient, dosage, applicationMethod, safetyPrecautions, costEstimate), preventionTips (array), relatedDiseases (array of objects with name and matchPercent), and isHealthy (boolean).',
      },
    ])

    const text = result.response.text()
    // Try to parse JSON from the response, fallback to mock
    try {
      const jsonMatch = text.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]) as DiagnosisResult
        return parsed
      }
    } catch {
      // Fallback to mock
    }

    // Fallback: return mock based on hash
    const hash = hashBase64(imageBase64)
    const keys = Object.keys(MOCK_DIAGNOSES)
    const selectedKey = keys[hash % keys.length]
    return { ...MOCK_DIAGNOSES[selectedKey]! }
  } catch (error) {
    console.error('Gemini image analysis error:', error)
    // Return mock on error
    const hash = hashBase64(imageBase64)
    const keys = Object.keys(MOCK_DIAGNOSES)
    const selectedKey = keys[hash % keys.length]
    return { ...MOCK_DIAGNOSES[selectedKey]! }
  }
}

// Simple hash function to deterministically select a mock diagnosis
function hashBase64(str: string): number {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = (hash << 5) - hash + char
    hash = hash & hash // Convert to 32bit integer
  }
  return Math.abs(hash)
}
