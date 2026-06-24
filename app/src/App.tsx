import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import CropDoctor from './pages/CropDoctor'
import KrishiGuru from './pages/KrishiGuru'
import MarketIntelligence from './pages/MarketIntelligence'
import SoilAnalyzer from './pages/SoilAnalyzer'
import WeatherAdvisory from './pages/WeatherAdvisory'

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/crop-doctor" element={<CropDoctor />} />
        <Route path="/krishi-guru" element={<KrishiGuru />} />
        <Route path="/market-intelligence" element={<MarketIntelligence />} />
        <Route path="/soil-analyzer" element={<SoilAnalyzer />} />
        <Route path="/weather-advisory" element={<WeatherAdvisory />} />
      </Routes>
    </Layout>
  )
}
