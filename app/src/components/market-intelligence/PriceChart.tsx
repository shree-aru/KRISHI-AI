import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import { cropPriceHistory7Days, last7DaysLabels, cropChartColors } from '@/data/marketData'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

export default function PriceChart() {
  const [visibleCrops, setVisibleCrops] = useState<Record<string, boolean>>({
    Tomato: true,
    Onion: true,
    Rice: true,
    Chili: true,
    Cotton: false,
  })

  const chartData = useMemo(() => {
    const datasets = cropPriceHistory7Days
      .filter((c) => visibleCrops[c.crop])
      .map((crop) => ({
        label: crop.crop,
        data: crop.data.map((d) => d.price),
        borderColor: cropChartColors[crop.crop] || '#6B8F71',
        backgroundColor: (cropChartColors[crop.crop] || '#6B8F71') + '20',
        borderWidth: 2.5,
        pointRadius: 4,
        pointHoverRadius: 6,
        pointBackgroundColor: '#FFFCF7',
        pointBorderColor: cropChartColors[crop.crop] || '#6B8F71',
        pointBorderWidth: 2,
        tension: 0.4,
        fill: true,
      }))

    return {
      labels: last7DaysLabels,
      datasets,
    }
  }, [visibleCrops])

  const chartOptions = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      animation: {
        duration: 1500,
        easing: 'easeOutQuart' as const,
      },
      interaction: {
        mode: 'index' as const,
        intersect: false,
      },
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          backgroundColor: '#FFFCF7',
          titleColor: '#2A2A28',
          bodyColor: '#2A2A28',
          borderColor: '#E8E2DA',
          borderWidth: 1,
          cornerRadius: 12,
          padding: 12,
          titleFont: { family: '"Inter", sans-serif', size: 13, weight: 'bold' as const },
          bodyFont: { family: '"Inter", sans-serif', size: 12 },
          boxPadding: 4,
          callbacks: {
            label: (context: { dataset: { label?: string }; parsed: { y: number | null } }) => {
              if (context.parsed.y !== null) {
                return `${context.dataset.label}: \u20b9${context.parsed.y.toLocaleString('en-IN')}/q`
              }
              return ''
            },
          },
        },
      },
      scales: {
        x: {
          grid: {
            color: '#E8E2DA',
            lineWidth: 1,
            tickLength: 0,
          },
          ticks: {
            color: '#6B6560',
            font: { family: '"Inter", sans-serif', size: 11 },
          },
          border: { display: false },
        },
        y: {
          grid: {
            color: '#E8E2DA',
            lineWidth: 1,
            tickLength: 0,
          },
          ticks: {
            color: '#6B6560',
            font: { family: '"Inter", sans-serif', size: 11 },
            callback: (value: string | number) => `\u20b9${Number(value).toLocaleString('en-IN')}`,
          },
          border: { display: false },
        },
      },
    }),
    []
  )

  const toggleCrop = (crop: string) => {
    setVisibleCrops((prev) => ({ ...prev, [crop]: !prev[crop] }))
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      }}
      className="rounded-[20px] p-6"
      style={{
        background: '#FFFCF7',
        boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
      }}
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h3
          className="text-lg font-semibold"
          style={{ color: '#2D5A3D', fontFamily: '"Inter", sans-serif' }}
        >
          7-Day Price Trends (₹/quintal)
        </h3>
        <div className="flex flex-wrap gap-2">
          {cropPriceHistory7Days.map((crop) => (
            <button
              key={crop.crop}
              onClick={() => toggleCrop(crop.crop)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200"
              style={{
                background: visibleCrops[crop.crop]
                  ? `${cropChartColors[crop.crop]}15`
                  : '#E8E2DA',
                color: visibleCrops[crop.crop]
                  ? cropChartColors[crop.crop]
                  : '#6B6560',
                border: `1.5px solid ${visibleCrops[crop.crop] ? cropChartColors[crop.crop] : 'transparent'}`,
                fontFamily: '"Inter", sans-serif',
              }}
            >
              <span
                className="w-2 h-2 rounded-full"
                style={{
                  background: cropChartColors[crop.crop],
                  opacity: visibleCrops[crop.crop] ? 1 : 0.3,
                }}
              />
              {crop.crop}
            </button>
          ))}
        </div>
      </div>
      <div style={{ height: '340px' }}>
        <Line data={chartData} options={chartOptions} />
      </div>
    </motion.div>
  )
}
