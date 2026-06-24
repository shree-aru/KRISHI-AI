export type Language = 'en' | 'ta' | 'hi'

export interface ResponseEntry {
  en: string
  ta: string
  hi: string
}

export const quickQuestions: Record<Language, string[]> = {
  en: [
    'Best crops for sandy soil?',
    'How to control aphids organically?',
    'When to irrigate tomatoes?',
    'Fertilizer schedule for rice',
    'Signs of nutrient deficiency',
    'Ask in Tamil',
    'Market price for tomatoes',
    'Organic pest control for cotton',
    'Monsoon farming tips',
    'Groundnut water requirements',
  ],
  ta: [
    'மணல் மண்ணுக்கு சிறந்த பயிர்கள்?',
    'சிறுமணி பூச்சிகளை இயற்கையாக கட்டுப்படுத்த?',
    'தக்காளிக்கு நீர் பாசனம் எப்போது?',
    'நெல்லுக்கு உர அட்டவணை',
    'ஊட்டச்சத்து குறைபாட்டின் அறிகுறிகள்',
    'Ask in English',
    'தக்காளி சந்தை விலை',
    'பருத்திக்கு இயற்கை பூச்சி கட்டுப்பாடு',
    'பருவமழை பயிரிடும் குறிப்புகள்',
    'கடலைக்கு நீர் தேவைகள்',
  ],
  hi: [
    'रेतली मिट्टी के लिए सबसे अच्छी फसलें?',
    'एफिड्स को जैविक रूप से कैसे नियंत्रित करें?',
    'टमाटर की सिंचाई कब करें?',
    'धान के लिए उर्वरक कार्यक्रम',
    'पोषक तत्व की कमी के संकेत',
    'Ask in English',
    'टमाटर का बाजार भाव',
    'कपास के लिए जैविक कीट नियंत्रण',
    'मानसून खेती के टिप्स',
    'मूंगफली की पानी की आवश्यकताएं',
  ],
}

export const inputPlaceholders: Record<Language, string> = {
  en: 'Ask about farming, crops, pests...',
  ta: 'விவசாயம், பயிர்கள், பூச்சிகள் பற்றி கேளுங்கள்...',
  hi: 'खेती, फसलों, कीटों के बारे में पूछें...',
}

export const welcomeMessages: Record<Language, ResponseEntry> = {
  en: {
    en: "Vanakkam! 🙏 I'm **Krishi Guru**, your AI farming assistant.\n\nI can help you with:\n\n🌾 Crop selection and planning\n🐛 Pest and disease management\n💊 Fertilizer recommendations\n💰 Market price insights\n🌦️ Weather-based farming tips\n\nAsk me anything in **Tamil, Hindi, or English**!",
    ta: "வணக்கம்! 🙏 நான் **கிரிஷி குரு**, உங்கள் AI விவசாய உதவியாளர்.\n\nநான் உங்களுக்கு உதவ முடியும்:\n\n🌾 பயிர் தேர்வு மற்றும் திட்டமிடல்\n🐛 பூச்சி மற்றும் நோய் மேலாண்மை\n💊 உர பரிந்துரைகள்\n💰 சந்தை விலை நுண்ணறிவுகள்\n🌦️ வானிலை அடிப்படையிலான விவசாய குறிப்புகள்\n\n**தமிழ், இந்தி, அல்லது ஆங்கிலத்தில்** எதுவும் கேளுங்கள்!",
    hi: "नमस्ते! 🙏 मैं **कृषि गुरु** हूँ, आपका AI कृषि सहायक।\n\nमैं आपकी मदद कर सकता हूँ:\n\n🌾 फसल चयन और योजना\n🐛 कीट और रोग प्रबंधन\n💊 उर्वरक सिफारिशें\n💰 बाजार मूल्य जानकारी\n🌦️ मौसम-आधारित खेती के टिप्स\n\n**तमिल, हिंदी, या अंग्रेजी में** कुछ भी पूछें!",
  },
  ta: {
    en: "Vanakkam! 🙏 I'm **Krishi Guru**, your AI farming assistant.\n\nI can help you with:\n\n🌾 Crop selection and planning\n🐛 Pest and disease management\n💊 Fertilizer recommendations\n💰 Market price insights\n🌦️ Weather-based farming tips\n\nAsk me anything in **Tamil, Hindi, or English**!",
    ta: "வணக்கம்! 🙏 நான் **கிரிஷி குரு**, உங்கள் AI விவசாய உதவியாளர்.\n\nநான் உங்களுக்கு உதவ முடியும்:\n\n🌾 பயிர் தேர்வு மற்றும் திட்டமிடல்\n🐛 பூச்சி மற்றும் நோய் மேலாண்மை\n💊 உர பரிந்துரைகள்\n💰 சந்தை விலை நுண்ணறிவுகள்\n🌦️ வானிலை அடிப்படையிலான விவசாய குறிப்புகள்\n\n**தமிழ், இந்தி, அல்லது ஆங்கிலத்தில்** எதுவும் கேளுங்கள்!",
    hi: "नमस्ते! 🙏 मैं **कृषि गुरु** हूँ, आपका AI कृषि सहायक।\n\nमैं आपकी मदद कर सकता हूँ:\n\n🌾 फसल चयन और योजना\n🐛 कीट और रोग प्रबंधन\n💊 उर्वरक सिफारिशें\n💰 बाजार मूल्य जानकारी\n🌦️ मौसम-आधारित खेती के टिप्स\n\n**तमिल, हिंदी, या अंग्रेजी में** कुछ भी पूछें!",
  },
  hi: {
    en: "Vanakkam! 🙏 I'm **Krishi Guru**, your AI farming assistant.\n\nI can help you with:\n\n🌾 Crop selection and planning\n🐛 Pest and disease management\n💊 Fertilizer recommendations\n💰 Market price insights\n🌦️ Weather-based farming tips\n\nAsk me anything in **Tamil, Hindi, or English**!",
    ta: "வணக்கம்! 🙏 நான் **கிரிஷி குரு**, உங்கள் AI விவசாய உதவியாளர்.\n\nநான் உங்களுக்கு உதவ முடியும்:\n\n🌾 பயிர் தேர்வு மற்றும் திட்டமிடல்\n🐛 பூச்சி மற்றும் நோய் மேலாண்மை\n💊 உர பரிந்துரைகள்\n💰 சந்தை விலை நுண்ணறிவுகள்\n🌦️ வானிலை அடிப்படையிலான விவசாய குறிப்புகள்\n\n**தமிழ், இந்தி, அல்லது ஆங்கிலத்தில்** எதுவும் கேளுங்கள்!",
    hi: "नमस्ते! 🙏 मैं **कृषि गुरु** हूँ, आपका AI कृषि सहायक।\n\nमैं आपकी मदद कर सकता हूँ:\n\n🌾 फसल चयन और योजना\n🐛 कीट और रोग प्रबंधन\n💊 उर्वरक सिफारिशें\n💰 बाजार मूल्य जानकारी\n🌦️ मौसम-आधारित खेती के टिप्स\n\n**तमिल, हिंदी, या अंग्रेजी में** कुछ भी पूछें!",
  },
}

const soilResponses: Record<Language, string> = {
  en: `**Best Crops for Sandy Soil** 🌱\n\nSandy soil drains quickly and needs organic matter. Here are the best crops:\n\n1. **Groundnut** — Ideal for sandy loam, improves soil nitrogen\n2. **Watermelon** — Loves well-drained soil, high returns\n3. **Carrot** — Root develops well in loose sand\n4. **Cucumber** — Grows fast with proper irrigation\n5. **Coconut** — Deep roots access underground water\n\n💡 **Tip:** Add compost or farmyard manure (5 tons/acre) to improve water retention. Mulching helps reduce evaporation.`,
  ta: `**மணல் மண்ணுக்கு சிறந்த பயிர்கள்** 🌱\n\nமணல் மண் விரைவாக வடிந்துவிடும் மற்றும் இயற்கை மாசு தேவைப்படும். சிறந்த பயிர்கள்:\n\n1. **கடலை** — மணல் மண்ணுக்கு ஏற்றது, நைட்ரஜனை மேம்படுத்தும்\n2. **தர்பூசணி** — நன்கு வடியும் மண்ணை விரும்பும்\n3. **காரட்** — தளர்ந்த மணலில் வேர் நன்கு வளரும்\n4. **வெள்ளரி** — சரியான பாசனத்தில் விரைவாக வளரும்\n5. **தென்னை** — ஆழமான வேர்கள் நீரை அடையும்\n\n💡 **குறிப்பு:** நீர் தக்கவைப்பை மேம்படுத்த 5 டன் தொழு உரம் சேர்க்கவும்.`,
  hi: `**रेतली मिट्टी के लिए सबसे अच्छी फसलें** 🌱\n\nरेतली मिट्टी जल्दी सूख जाती है और इसमें कार्बनिक पदार्थ की जरूरत होती है:\n\n1. **मूंगफली** — रेतली मिट्टी के लिए आदर्श, नाइट्रोजन बढ़ाती है\n2. **तरबूज** — अच्छी निकास वाली मिट्टी पसंद करता है\n3. **गाजर** — ढीली रेत में जड़ अच्छी बनती है\n4. **खीरा** — सिंचाई से तेजी से उगता है\n5. **नारियल** — गहरी जड़ें पानी तक पहुंचती हैं\n\n💡 **टिप:** जल धारण क्षमता बढ़ाने के लिए 5 टन गोबर की खाद डालें।`,
}

const pestResponses: Record<Language, string> = {
  en: `**Organic Aphid Control** 🐛\n\nAphids suck sap and weaken plants. Here's how to control them naturally:\n\n1. **Neem Oil Spray** — Mix 5ml neem oil + 2ml soap per liter, spray every 7 days\n2. **Ladybugs** — Release beneficial insects (10 per plant)\n3. **Garlic-Chili Spray** — Blend 10 garlic + 10 red chilies in 1L water, strain and spray\n4. **Yellow Sticky Traps** — Place 10-15 traps per acre\n5. **Strong Water Jet** — Blast aphids off with water pressure\n\n🌿 **Bonus:** Plant marigold as a trap crop — aphids love it!`,
  ta: `**சிறுமணி பூச்சி இயற்கை கட்டுப்பாடு** 🐛\n\nசிறுமணி பூச்சிகள் சாறை உறிஞ்சி செடிகளை பலவீனப்படுத்தும். இயற்கை கட்டுப்பாடு:\n\n1. **வேப்ப எண்ணெய் தெளிப்பு** — 5மிலி வேப்ப எண்ணெய் + 2மிலி சோப், 7 நாட்களுக்கு ஒருமுறை\n2. **பெண் சாத-lasting வண்டுகள்** — ஒரு செடிக்கு 10 வண்டுகள்\n3. **பூண்டு-மிளகாய் தெளிப்பு** — 10 பூண்டு + 10 மிளகாயை 1L தண்ணீரில் அரைக்கவும்\n4. **மஞ்சள் ஒட்டும் பொறிகள்** — ஒரு ஏக்கருக்கு 10-15\n5. **வலுவான தண்ணீர் தாக்கம்** — அழுத்தத்தால் பூச்சிகளை அகற்றவும்\n\n🌿 **கூடுதல்:** சாமந்தி பூவை பொறி பயிராக நடவுசெய்யவும்!`,
  hi: `**एफिड्स का जैविक नियंत्रण** 🐛\n\nएफिड्स पौधों का रस चूसकर उन्हें कमजोर करते हैं। जैविक तरीके:\n\n1. **नीम तेल स्प्रे** — 5ml नीम तेल + 2ml साबुन प्रति लीटर, हर 7 दिन\n2. **लेडीबग्स** — 10 लाभदायक कीड़े प्रति पौधा\n3. **लहसुन-मिर्च स्प्रे** — 10 लहसुन + 10 लाल मिर्च 1L पानी में\n4. **पीला स्टिकी ट्रैप** — प्रति एकड़ 10-15 ट्रैप\n5. **पानी का जेट** — दबाव से एफिड्स हटाएं\n\n🌿 **बोनस:** गेंदे का फूल ट्रैप फसल के रूप में लगाएं!`,
}

const irrigationResponses: Record<Language, string> = {
  en: `**Tomato Irrigation Guide** 💧\n\nProper watering is key to juicy, healthy tomatoes:\n\n1. **Seedling Stage** — Light watering daily, keep soil moist\n2. **Vegetative Stage** — Every 3-4 days, 25-30L per plant\n3. **Flowering Stage** — Increase to every 2-3 days\n4. **Fruiting Stage** — Regular watering for even fruit development\n\n⏰ **Best Time:** Early morning (6-8 AM) or late evening (5-7 PM)\n\n💡 **Pro Tip:** Avoid wetting leaves — water at the base to prevent fungal diseases. Drip irrigation saves 40% water!`,
  ta: `**தக்காளி பாசன வழிகாட்டி** 💧\n\nசரியான நீர்ப்பாசனம் ஆரோக்கியமான தக்காளிக்கு முக்கியம்:\n\n1. **ாற்று காலம்** — தினமும் மெல்லிய பாசனம், மண்ணை ஈரமாக வைக்கவும்\n2. **வளர்ச்சி காலம்** — 3-4 நாட்களுக்கு ஒருமுறை, ஒரு செடிக்கு 25-30L\n3. **பூக்கும் கட்டம்** — 2-3 நாட்களுக்கு ஒருமுறை அதிகரிக்கவும்\n4. **காய் கட்டம்** — சீரான காய் வளர்ச்சிக்கு தொடர்ச்சியாக\n\n⏰ **சிறந்த நேரம்:** காலை (6-8 மணி) அல்லது மாலை (5-7 மணி)\n\n💡 **குறிப்பு:** இலைகளை ஈரமாக்காதீர்கள் — வடிகால் பாசனம் 40% தண்ணீர் மிச்சப்படுத்தும்!`,
  hi: `**टमाटर की सिंचाई गाइड** 💧\n\nसही सिंचाई रसदार, स्वस्थ टमाटर के लिए जरूरी है:\n\n1. **नर्सरी अवस्था** — रोज हल्की सिंचाई, मिट्टी नम रखें\n2. **वेजिटेटिव स्टेज** — 3-4 दिन में, प्रति पौधा 25-30L\n3. **फूल अवस्था** — 2-3 दिन में बढ़ाएं\n4. **फल अवस्था** — नियमित सिंचाई\n\n⏰ **सबसे अच्छा समय:** सुबह (6-8 AM) या शाम (5-7 PM)\n\n💡 **प्रो टिप:** पत्ते न गीले करें — ड्रिप सिंचाई से 40% पानी बचत होती है!`,
}

const fertilizerResponses: Record<Language, string> = {
  en: `**Rice Fertilizer Schedule** 🌾\n\nFor high-yield paddy cultivation in Tamil Nadu:\n\n**Basal Dose (Before Sowing):**\n- FYM/Compost: 5 tons/acre\n- DAP: 50 kg/acre\n- MOP: 25 kg/acre\n\n**Top Dressing Schedule:**\n1. **21 days** — Urea: 35 kg/acre (tillering stage)\n2. **45 days** — Urea: 35 kg/acre (panicle initiation)\n3. **60 days** — Urea: 30 kg/acre (flowering stage)\n\n💡 **Organic Option:** Use Panchagavya (3%) spray at 30 and 50 days for better yield.\n\n⚠️ **Note:** Adjust based on soil test. Don't apply urea before heavy rain.`,
  ta: `**நெல் உர அட்டவணை** 🌾\n\nதமிழ்நாட்டில் அதிக விளைச்சலுக்கு:\n\n**அடிஉரம் (நடவு முன்):**\n- தொழு/கம்போஸ்ட்: 5 டன்/ஏக்கர்\n- DAP: 50 கிலோ/ஏக்கர்\n- MOP: 25 கிலோ/ஏக்கர்\n\n**மேல் உர இடும் அட்டவணை:**\n1. **21 நாட்கள்** — யூரியா: 35 கிலோ/ஏக்கர் (கிளைத்தல்)\n2. **45 நாட்கள்** — யூரியா: 35 கிலோ/ஏக்கர் (கதிர் உருவாக்கம்)\n3. **60 நாட்கள்** — யூரியா: 30 கிலோ/ஏக்கர் (பூ கட்டம்)\n\n💡 **இயற்கை மாற்று:** 30 மற்றும் 50வது நாளில் பஞ்சகவ்யா (3%) தெளிக்கவும்.\n\n⚠️ **குறிப்பு:** மண் பரிசோதனை அடிப்படையில் சரிசெய்யவும்.`,
  hi: `**धान उर्वरक कार्यक्रम** 🌾\n\nतमिलनाडु में उच्च उपज के लिए:\n\n**बेसल खाद (बोने से पहले):**\n- FYM/कम्पोस्ट: 5 टन/एकड़\n- DAP: 50 किलो/एकड़\n- MOP: 25 किलो/एकड़\n\n**टॉप ड्रेसिंग शेड्यूल:**\n1. **21 दिन** — यूरिया: 35 किलो/एकड़ (टिलरिंग)\n2. **45 दिन** — यूरिया: 35 किलो/एकड़ (पैनिकल)\n3. **60 दिन** — यूरिया: 30 किलो/एकड़ (फूल अवस्था)\n\n💡 **जैविक विकल्प:** 30 और 50वें दिन पंचगव्य (3%) स्प्रे करें।\n\n⚠️ **नोट:** मिट्टी जांच के आधार पर समायोजित करें।`,
}

const nutrientResponses: Record<Language, string> = {
  en: `**Nutrient Deficiency Signs** 🍂\n\nLearn to read your plants' signals:\n\n**Nitrogen (N) Deficiency:**\n- Old leaves turn pale yellow\n- Stunted growth, weak stems\n- **Fix:** Apply urea (46kg/acre) or compost\n\n**Phosphorus (P) Deficiency:**\n- Dark green/purplish leaf colour\n- Poor root development\n- **Fix:** Apply DAP (50kg/acre)\n\n**Potassium (K) Deficiency:**\n- Brown scorching at leaf edges\n- Weak stalks, lodging in cereals\n- **Fix:** Apply MOP (25kg/acre)\n\n**Iron Deficiency:**\n- Yellowing between leaf veins\n- **Fix:** Ferrous sulfate foliar spray (0.5%)`,
  ta: `**ஊட்டச்சத்து குறைபாட்டின் அறிகுறிகள்** 🍂\n\nஉங்கள் செடிகளின் சமிக்ஞைகளை படிக்க கற்றுக்கொள்ளுங்கள்:\n\n**நைட்ரஜன் (N) குறைபாடு:**\n- பழைய இலைகள் வெளிர் மஞ்சளாக மாறும்\n- வளர்ச்சி தாமதம்\n- **தீர்வு:** யூரியா (46கிலோ/ஏக்கர்) அல்லது கம்போஸ்ட்\n\n**பாஸ்பரஸ் (P) குறைபாடு:**\n- இலைகள் கரும்பச்சை/ ஊதா நிறம்\n- வேர் வளர்ச்சி குறைவு\n- **தீர்வு:** DAP (50கிலோ/ஏக்கர்)\n\n**பொட்டாசியம் (K) குறைபாடு:**\n- இலை ஓரங்களில் பழுப்பு தீக்காயம்\n- **தீர்வு:** MOP (25கிலோ/ஏக்கர்)\n\n**இரும்பு குறைபாடு:**\n- இலை நரம்புகளுக்கு இடையில் மஞ்சள்\n- **தீர்வு:** பெர்ரஸ் சல்பேட் தெளிப்பு (0.5%)`,
  hi: `**पोषक तत्व की कमी के संकेत** 🍂\n\nअपने पौधों के संकेतों को पढ़ना सीखें:\n\n**नाइट्रोजन (N) की कमी:**\n- पुरानी पत्तियां पीली पड़ जाती हैं\n- विकास रुकता है\n- **सुधार:** यूरिया (46किलो/एकड़)\n\n**फॉस्फोरस (P) की कमी:**\n- पत्तियां गहरी हरी/बैंगनी\n- जड़ विकास कमजोर\n- **सुधार:** DAP (50किलो/एकड़)\n\n**पोटैशियम (K) की कमी:**\n- पत्ती के किनारे भूरे\n- **सुधार:** MOP (25किलो/एकड़)\n\n**आयरन की कमी:**\n- पत्ती नसों के बीच पीलापन\n- **सुधार:** फेरस सल्फेट स्प्रे (0.5%)`,
}

const generalResponses: Record<Language, string> = {
  en: `Thank you for your question! I'm your **Krishi Guru**, powered by Google Gemini. 🌾\n\nI can help you with:\n\n🌾 **Crop Selection** — Best crops for your soil and climate\n🐛 **Pest Control** — Organic and chemical solutions\n💊 **Fertilizers** — NPK schedules and organic alternatives\n💰 **Market Prices** — When to sell for maximum profit\n🌦️ **Weather Tips** — Farming advice based on forecasts\n\nTry asking about **soil**, **pests**, **fertilizer**, **irrigation**, or **nutrient deficiency** for detailed advice!`,
  ta: `உங்கள் கேள்விக்கு நன்றி! நான் **கிரிஷி குரு**, Google Gemini மூலம் இயக்கப்படுகிறேன். 🌾\n\nநான் உங்களுக்கு உதவ முடியும்:\n\n🌾 **பயிர் தேர்வு** — உங்கள் மண் மற்றும் காலநிலைக்கு சிறந்த பயிர்கள்\n🐛 **பூச்சி கட்டுப்பாடு** — இயற்கை மற்றும் இரசாயன தீர்வுகள்\n💊 **உரங்கள்** — NPK அட்டவணை மற்றும் இயற்கை மாற்றுகள்\n💰 **சந்தை விலைகள்** — அதிக லாபத்திற்கு எப்போது விற்க வேண்டும்\n🌦️ **வானிலை குறிப்புகள்** — முன்கணிப்புகள் அடிப்படையிலான விவசாய ஆலோசனை\n\n**மண், பூச்சிகள், உரம், பாசனம், அல்லது ஊட்டச்சத்து குறைபாடு** பற்றி விரிவாக கேட்க முயற்சிக்கவும்!`,
  hi: `आपके सवाल के लिए धन्यवाद! मैं **कृषि गुरु** हूँ, Google Gemini द्वारा संचालित। 🌾\n\nमैं आपकी मदद कर सकता हूँ:\n\n🌾 **फसल चयन** — आपकी मिट्टी और जलवायु के लिए सबसे अच्छी फसलें\n🐛 **कीट नियंत्रण** — जैविक और रासायनिक समाधान\n💊 **उर्वरक** — NPK शेड्यूल और जैविक विकल्प\n💰 **बाजार भाव** — अधिकतम लाभ के लिए बेचने का समय\n🌦️ **मौसम टिप्स** — पूर्वानुमान पर आधारित खेती सलाह\n\n**मिट्टी, कीट, उर्वरक, सिंचाई, या पोषक तत्व की कमी** के बारे में विस्तार से पूछें!`,
}

const marketResponses: Record<Language, string> = {
  en: `**Tomato Market Prices** 💰\n\nCurrent trends in Tamil Nadu mandis:\n\n📍 **Hosur:** ₹28-32/kg\n📍 **Krishnagiri:** ₹26-30/kg\n📍 **Dharmapuri:** ₹24-28/kg\n📍 **Salem:** ₹25-29/kg\n\n📈 **Trend:** Prices expected to rise 15-20% over next 2 weeks due to lower supply from recent rains.\n\n💡 **Selling Tip:** Hold for 5-7 days if you have storage. Current: ₹25/kg → Projected: ₹30-32/kg.\n\n⚠️ **Quality matters:** Grade A tomatoes fetch ₹5-8/kg premium over Grade B.`,
  ta: `**தக்காளி சந்தை விலைகள்** 💰\n\nதமிழ்நாட்டு மண்டிகளில் தற்போதைய நிலை:\n\n📍 **ஒசூர்:** ₹28-32/கிலோ\n📍 **கிருஷ்ணகிரி:** ₹26-30/கிலோ\n📍 **தருமபுரி:** ₹24-28/கிலோ\n📍 **சேலம்:** ₹25-29/கிலோ\n\n📈 **போக்கு:** அடுத்த 2 வாரங்களில் விலை 15-20% உயரும் என எதிர்பார்க்கப்படுகிறது.\n\n💡 **விற்பனை குறிப்பு:** சேமிப்பு இருந்தால் 5-7 நாட்கள் பிடிக்கவும்.\n\n⚠️ **தரம் முக்கியம்:** A கிரேடு ₹5-8/கிலோ கூடுதல் விலை பெறும்.`,
  hi: `**टमाटर के बाजार भाव** 💰\n\nतमिलनाडु मंडियों में वर्तमान रुझान:\n\n📍 **होसुर:** ₹28-32/किलो\n📍 **कृष्णगिरि:** ₹26-30/किलो\n📍 **धर्मपुरी:** ₹24-28/किलो\n📍 **सalem:** ₹25-29/किलो\n\n📈 **ट्रेंड:** अगले 2 हफ्तों में 15-20% वृद्धि की उम्मीद।\n\n💡 **बिक्री टिप:** स्टोरेज हो तो 5-7 दिन रुकें।\n\n⚠️ **गुणवत्ता मायने रखती है:** A ग्रेड ₹5-8/किलो अधिक मिलता है।`,
}

const cottonPestResponses: Record<Language, string> = {
  en: `**Organic Pest Control for Cotton** 🌿\n\nCotton faces many pests. Here's an integrated organic approach:\n\n1. **Neem Seed Kernel Extract (NSKE 5%)** — Spray every 10 days\n2. **Bt Spray** — For bollworm control, apply when larvae are small\n3. **Trichogramma Parasitoids** — Release 1.5 lakh/acre at flowering\n4. **Pheromone Traps** — 10 per acre for monitoring\n5. **Intercropping** — Grow marigold (1:1 ratio) to repel pests\n\n🌾 **Preventive:** Use certified BT cotton seeds. Maintain field sanitation.\n\n⚠️ **Critical:** Monitor for American bollworm — it causes 40-50% yield loss if not caught early!`,
  ta: `**பருத்திக்கு இயற்கை பூச்சி கட்டுப்பாடு** 🌿\n\nபருத்தி பல பூச்சிகளை எதிர்கொள்கிறது. ஒருங்கிணைந்த இயற்கை அணுகுமுறை:\n\n1. **வேப்ப விதை கரு பிரித்தெடுப்பு (5%)** — 10 நாட்களுக்கு ஒருமுறை தெளிக்கவும்\n2. **Bt தெளிப்பு** — பழு புழு கட்டுப்பாட்டுக்கு\n3. **ட்ரைகோகிராமா பாராசிட்டாய்டுகள்** — 1.5 லட்சம்/ஏக்கர் பூக்கும் காலத்தில்\n4. **ஃபெரோமோன் பொறிகள்** — கண்காணிப்புக்கு ஒரு ஏக்கருக்கு 10\n5. **கலப்பு பயிரிடல்** — சாமந்தி (1:1 விகிதம்) பூச்சிகளை விரட்டும்\n\n🌾 **தடுப்பு:** சான்றளிக்கப்பட்ட BT பருத்தி விதைகளை பயன்படுத்தவும்.\n\n⚠️ **முக்கியம்:** அமெரிக்க பழு புழுவை கண்காணிக்கவும் — 40-50% விளைச்சல் இழப்பு!`,
  hi: `**कपास के लिए जैविक कीट नियंत्रण** 🌿\n\nकपास कई कीटों का शिकार होती है। एकीकृत जैविक दृष्टिकोण:\n\n1. **नीम बीज अर्क (NSKE 5%)** — हर 10 दिन स्प्रे\n2. **Bt स्प्रे** — बोलवॉर्म नियंत्रण के लिए\n3. **ट्राइकोग्रामा परजीवी** — 1.5 लाख/एकड़ फूल अवस्था में\n4. **फेरोमोन ट्रैप** — 10 प्रति एकड़\n5. **मिली खेती** — गेंदा (1:1 अनुपात) कीट भगाए\n\n🌾 **रोकथाम:** प्रमाणित BT कपास बीज का प्रयोग करें।\n\n⚠️ **अहम:** अमेरिकी बोलवॉर्म की निगरानी करें — 40-50% उपज हानि!`,
}

const monsoonResponses: Record<Language, string> = {
  en: `**Monsoon Farming Tips** 🌧️\n\nMake the most of the rainy season:\n\n1. **Drainage First** — Clear all field drains before rains start\n2. **Quick-Growing Crops** — Sow short-duration pulses (green gram, black gram) immediately after first good rain\n3. **Nursery Management** — Raise paddy and vegetable nurseries in raised beds\n4. **Pest Alert** — Monitor for stem borer and leaf folder in rice after heavy rains\n5. **Fertilizer Timing** — Apply basal dose just before rain, avoid top-dressing during continuous rain\n\n⚠️ **Warning:** Don't spray pesticides before expected rain — it washes away!\n\n💡 **Opportunity:** Monsoon is the best time for composting — moisture helps decomposition.`,
  ta: `**பருவமழை விவசாய குறிப்புகள்** 🌧️\n\nமழைக்காலத்தை பயன்படுத்திக் கொள்ளுங்கள்:\n\n1. **வடிகால் முக்கியம்** — மழைக்கு முன் அனைத்து வடிகால்களையும் சுத்தம் செய்யவும்\n2. **விரைவு வளரும் பயிர்கள்** — முதல் நல்ல மழைக்குப் பிறகு பச்சை பயறு, உளுந்து விதைக்கவும்\n3. **நாற்றங்கால் மேலாண்மை** — நெல் மற்றும் காய்கறி நாற்றுகளை உயர்ந்த படுகைகளில்\n4. **பூச்சி எச்சரிக்கை** — கனமழைக்குப் பிறகு நெல்லில் தண்டு புழு கண்காணிக்கவும்\n5. **உர நேரம்** — மழைக்கு முன் அடிஉரம் இடவும்\n\n⚠️ **எச்சரிக்கை:** எதிர்பார்க்கப்படும் மழைக்கு முன் பூச்சிக்கொல்லி தெளிக்க வேண்டாம்!\n\n💡 **வாய்ப்பு:** பருவமழை கம்போஸ்ட் செய்ய சிறந்த நேரம்.`,
  hi: `**मानसून खेती के टिप्स** 🌧️\n\nबारिश के मौसम का फायदा उठाएं:\n\n1. **निकासी पहले** — बारिश से पहले सभी नाले साफ करें\n2. **जल्दी उगने वाली फसलें** — पहली अच्छी बारिश के बाद मूंग, उड़द बोएं\n3. **नर्सरी प्रबंधन** — धान और सब्जी नर्सरी ऊंची बेड में\n4. **कीट सतर्कता** — भारी बारिश के बाद धान में स्टेम बोरer देखें\n5. **खाद समय** — बारिश से पहले बेसल खाद, लगातार बारिश में टॉप-ड्रेसिंग न करें\n\n⚠️ **चेतावनी:** बारिश से पहले कीटनाशक न छिड़कें — धुल जाएगा!\n\n💡 **अवसर:** मानसून कम्पोस्टिंग का सबसे अच्छा समय है।`,
}

const groundnutResponses: Record<Language, string> = {
  en: `**Groundnut Water Requirements** 💧\n\nGroundnut needs careful water management:\n\n**Total Water Need:** 500-700mm per season\n\n**Critical Stages:**\n1. **Germination (1-20 days):** Keep soil moist — light irrigation every 3-4 days\n2. **Vegetative (21-40 days):** Reduce to once a week\n3. **Flowering & Pegging (41-80 days):** **MOST CRITICAL** — irrigate every 5-7 days\n4. **Pod Development (81-110 days):** Continue regular watering\n5. **Maturity (last 15 days):** Stop irrigation for easy harvesting\n\n⚠️ **Warning:** Waterlogging causes root rot and aflatoxin — ensure good drainage!\n\n💡 **Drip irrigation** improves yield by 25-30% and saves water.`,
  ta: `**கடலைக்கு நீர் தேவைகள்** 💧\n\nகடலைக்கு கவனமான நீர் மேலாண்மை தேவை:\n\n**மொத்த நீர் தேவை:** ஒரு சீசனுக்கு 500-700மிமீ\n\n**முக்கிய கட்டங்கள்:**\n1. **முளைப்பு (1-20 நாட்கள்):** மண்ணை ஈரமாக வைக்கவும் — 3-4 நாட்களுக்கு ஒருமுறை\n2. **வளர்ச்சி (21-40 நாட்கள்):** வாரத்திற்கு ஒருமுறை குறைக்கவும்\n3. **பூக்கும் & காம்பிடல் (41-80 நாட்கள்):** **மிகவும் முக்கியம்** — 5-7 நாட்களுக்கு ஒருமுறை\n4. **காய் வளர்ச்சி (81-110 நாட்கள்):** தொடர்ந்து பாசனம்\n5. **பருவம் (கடைசி 15 நாட்கள்):** அறுவடைக்காக நீர்ப்பாசனம் நிறுத்தவும்\n\n⚠️ **எச்சரிக்கை:** நீர்ப்பெருக்கு வேர் அழுகலை ஏற்படுத்தும் — நல்ல வடிகால் அவசியம்!\n\n💡 **சொட்டு நீர்ப்பாசனம்** 25-30% விளைச்சலை மேம்படுத்தும்.`,
  hi: `**मूंगफली की पानी की आवश्यकताएं** 💧\n\nमूंगफली को सावधानीपूर्वक जल प्रबंधन की जरूरत है:\n\n**कुल पानी आवश्यकता:** 500-700मिमी प्रति सीजन\n\n**महत्वपूर्ण चरण:**\n1. **अंकुरण (1-20 दिन):** मिट्टी नम रखें — 3-4 दिन में हल्की सिंचाई\n2. **वेजिटेटिव (21-40 दिन):** सप्ताह में एक बार\n3. **फूल & पैगिंग (41-80 दिन):** **सबसे महत्वपूर्ण** — 5-7 दिन में\n4. **फली विकास (81-110 दिन):** नियमित सिंचाई जारी\n5. **पकाव (आखिरी 15 दिन):** अंतिम 15 दिन पानी बंद\n\n⚠️ **चेतावनी:** जलजमाव से जड़ सड़न — अच्छी निकासी जरूरी!\n\n💡 **ड्रिप सिंचाई** से 25-30% उपज बढ़ती है।`,
}

export function getGuruResponse(prompt: string, lang: Language = 'en'): string {
  const lower = prompt.toLowerCase()

  // Soil-related
  if (lower.includes('soil') || lower.includes('sandy') || lower.includes('clay') || lower.includes('red soil') || lower.includes('மண்') || lower.includes('मिट्टी')) {
    return soilResponses[lang]
  }

  // Pest-related
  if (lower.includes('aphid') || lower.includes('pest') || lower.includes('insect') || lower.includes('bug') || lower.includes('worm') || lower.includes('borer') || lower.includes('பூச்சி') || lower.includes('कीट')) {
    // Cotton-specific
    if (lower.includes('cotton') || lower.includes('பருத்தி') || lower.includes('कपास')) {
      return cottonPestResponses[lang]
    }
    return pestResponses[lang]
  }

  // Irrigation-related
  if (lower.includes('irrigate') || lower.includes('water') || lower.includes(' irrig') || lower.includes('பாசனம்') || lower.includes('நீர்') || lower.includes('सिंचाई') || lower.includes('पानी')) {
    if (lower.includes('groundnut') || lower.includes('கடலை') || lower.includes('मूंगफली')) {
      return groundnutResponses[lang]
    }
    return irrigationResponses[lang]
  }

  // Fertilizer-related
  if (lower.includes('fertilizer') || lower.includes('npk') || lower.includes('urea') || lower.includes('dung') || lower.includes('manure') || lower.includes('compost') || lower.includes('உர') || lower.includes('உரம்') || lower.includes('उर्वरक')) {
    return fertilizerResponses[lang]
  }

  // Nutrient deficiency
  if (lower.includes('nutrient') || lower.includes('deficiency') || lower.includes('yellow') || lower.includes('stunted') || lower.includes('ஊட்டச்சத்து') || lower.includes('पोषक') || lower.includes('कमी')) {
    return nutrientResponses[lang]
  }

  // Market/price
  if (lower.includes('price') || lower.includes('market') || lower.includes('sell') || lower.includes('rate') || lower.includes('mandi') || lower.includes('விலை') || lower.includes('சந்தை') || lower.includes('भाव') || lower.includes('बाजार')) {
    return marketResponses[lang]
  }

  // Monsoon/weather
  if (lower.includes('monsoon') || lower.includes('rain') || lower.includes('weather') || lower.includes('மழை') || lower.includes('மான்சூன்') || lower.includes('வானிலை') || lower.includes('मानसून') || lower.includes('बारिश')) {
    return monsoonResponses[lang]
  }

  // Groundnut
  if (lower.includes('groundnut') || lower.includes('கடலை') || lower.includes('மணிலா') || lower.includes('मूंगफली')) {
    return groundnutResponses[lang]
  }

  // Tomato
  if (lower.includes('tomato') || lower.includes('தக்காளி') || lower.includes('टमाटर')) {
    if (lower.includes('price') || lower.includes('market') || lower.includes('விலை') || lower.includes('भाव')) {
      return marketResponses[lang]
    }
    return irrigationResponses[lang]
  }

  // Cotton
  if (lower.includes('cotton') || lower.includes('பருத்தி') || lower.includes('कपास')) {
    return cottonPestResponses[lang]
  }

  return generalResponses[lang]
}

export function getWelcomeMessage(lang: Language): string {
  return welcomeMessages[lang][lang]
}

export function getLanguageLabel(lang: Language): string {
  switch (lang) {
    case 'ta': return 'தமிழ்'
    case 'hi': return 'हिन्दी'
    case 'en': return 'English'
  }
}

export function getLanguageIndicator(lang: Language): string {
  switch (lang) {
    case 'ta': return '🇮🇳 Tamil'
    case 'hi': return '🇮🇳 Hindi'
    case 'en': return '🇬🇧 English'
  }
}
