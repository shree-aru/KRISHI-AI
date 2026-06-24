export interface Testimonial {
  id: number
  name: string
  location: string
  avatar: string
  quote: string
  stars: number
  crop: string
}

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Ramesh Kumar',
    location: 'Dharmapuri, Tamil Nadu',
    avatar: '/farmer-portrait-1.jpg',
    quote:
      'The Crop Doctor identified the bacterial blight in my rice field instantly. The organic remedy saved my crop and I didn\'t need expensive chemicals. This is truly a blessing for small farmers like me.',
    stars: 5,
    crop: 'Rice',
  },
  {
    id: 2,
    name: 'Lakshmi Amma',
    location: 'Krishnagiri, Tamil Nadu',
    avatar: '/farmer-portrait-2.jpg',
    quote:
      'I asked Krishi Guru about groundnut farming in Tamil — the advice was so clear! My yield increased by 30% this season. My entire village now uses KRISHI-AI.',
    stars: 5,
    crop: 'Groundnut',
  },
  {
    id: 3,
    name: 'Govindasamy',
    location: 'Hosur, Tamil Nadu',
    avatar: '/farmer-portrait-3.jpg',
    quote:
      'The market prices section helped me decide the right time to sell my tomatoes. I earned \u20b94,000 more than usual! The weather alerts have also saved my crops twice this year.',
    stars: 5,
    crop: 'Tomato',
  },
]
