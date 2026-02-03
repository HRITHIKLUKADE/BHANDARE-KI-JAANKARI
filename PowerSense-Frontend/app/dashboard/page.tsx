"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import Chart from "chart.js/auto"

export default function DashboardPage() {
  const router = useRouter()
  const [showUserMenu, setShowUserMenu] = useState(false)
  const chartRef = useRef<HTMLCanvasElement>(null)
  const chartInstanceRef = useRef<Chart | null>(null)
  const chart2Ref = useRef<HTMLCanvasElement>(null)
  const chart2InstanceRef = useRef<Chart | null>(null)
  const chart3Ref = useRef<HTMLCanvasElement>(null)
  const chart3InstanceRef = useRef<Chart | null>(null)
  const chart4Ref = useRef<HTMLCanvasElement>(null)
  const chart4InstanceRef = useRef<Chart | null>(null)
  const chart5Ref = useRef<HTMLCanvasElement>(null)
  const chart5InstanceRef = useRef<Chart | null>(null)
  const chart6Ref = useRef<HTMLCanvasElement>(null)
  const chart6InstanceRef = useRef<Chart | null>(null)

  useEffect(() => {
    // Consumption Forecast Chart
    if (chartRef.current && !chartInstanceRef.current) {
      const ctx = chartRef.current.getContext("2d")
      if (!ctx) return

      // Sample data for the forecast chart
      const labels = Array.from({ length: 30 }, (_, i) => {
        const date = new Date()
        date.setDate(date.getDate() + i)
        return date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
      })

      // Generate realistic demo data
      const baseData = Array.from({ length: 30 }, (_, i) => {
        const dayOfWeek = (i % 7)
        const base = 35 + Math.sin(i * 0.2) * 10
        const weekend = dayOfWeek >= 5 ? -5 : 0
        return Math.max(20, base + weekend + (Math.random() * 8 - 4))
      })
      
      const predictedData = baseData.map(val => val + (Math.random() * 6 - 3))
      const upperBound = baseData.map(val => val + 15 + Math.random() * 5)
      const lowerBound = baseData.map(val => Math.max(10, val - 15 - Math.random() * 5))

      chartInstanceRef.current = new Chart(ctx, {
        type: "line",
        data: {
          labels: labels,
          datasets: [
            {
              label: "Actual",
              data: baseData,
              borderColor: "#5dadec",
              backgroundColor: "rgba(93, 173, 236, 0.1)",
              borderWidth: 2,
              fill: false,
              tension: 0.4,
            },
            {
              label: "Predicted",
              data: predictedData,
              borderColor: "#22c55e",
              backgroundColor: "rgba(34, 197, 94, 0.1)",
              borderWidth: 2,
              borderDash: [5, 5],
              fill: false,
              tension: 0.4,
            },
            {
              label: "Upper Bound",
              data: upperBound,
              borderColor: "#22c55e",
              backgroundColor: "rgba(34, 197, 94, 0.05)",
              borderWidth: 1,
              borderDash: [3, 3],
              fill: "+1",
              tension: 0.4,
            },
            {
              label: "Lower Bound",
              data: lowerBound,
              borderColor: "#16a34a",
              backgroundColor: "rgba(22, 163, 74, 0.05)",
              borderWidth: 1,
              borderDash: [3, 3],
              fill: "-1",
              tension: 0.4,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: true,
              position: "bottom",
              labels: {
                color: "#a0a0a0",
                padding: 15,
                usePointStyle: true,
                pointStyle: "rect",
              },
            },
            tooltip: {
              backgroundColor: "#1a1a1f",
              titleColor: "#e8e8ec",
              bodyColor: "#a0a0a0",
              borderColor: "#2a2a35",
              borderWidth: 1,
            },
          },
          scales: {
            x: {
              grid: {
                color: "rgba(255, 255, 255, 0.05)",
              },
              ticks: {
                color: "#6a6a70",
              },
            },
            y: {
              grid: {
                color: "rgba(255, 255, 255, 0.05)",
              },
              ticks: {
                color: "#6a6a70",
              },
            },
          },
        },
      })
    }

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy()
        chartInstanceRef.current = null
      }
    }
  }, [])

  // Chart 2: Energy Usage Pattern Analysis
  useEffect(() => {
    if (chart2Ref.current && !chart2InstanceRef.current) {
      const ctx = chart2Ref.current.getContext("2d")
      if (!ctx) return

      chart2InstanceRef.current = new Chart(ctx, {
        type: "bar",
        data: {
          labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          datasets: [
            {
              label: "Peak Hours",
              data: [45, 52, 48, 61, 55, 38, 42],
              backgroundColor: "rgba(93, 173, 236, 0.6)",
              borderColor: "#5dadec",
              borderWidth: 2,
            },
            {
              label: "Off-Peak Hours",
              data: [28, 32, 30, 35, 33, 25, 28],
              backgroundColor: "rgba(34, 197, 94, 0.6)",
              borderColor: "#22c55e",
              borderWidth: 2,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: true,
              position: "bottom",
              labels: { color: "#a0a0a0", padding: 15 },
            },
            tooltip: {
              backgroundColor: "#1a1a1f",
              titleColor: "#e8e8ec",
              bodyColor: "#a0a0a0",
              borderColor: "#2a2a35",
              borderWidth: 1,
            },
          },
          scales: {
            x: { grid: { color: "rgba(255, 255, 255, 0.05)" }, ticks: { color: "#6a6a70" } },
            y: { grid: { color: "rgba(255, 255, 255, 0.05)" }, ticks: { color: "#6a6a70" } },
          },
        },
      })
    }
    return () => {
      if (chart2InstanceRef.current) {
        chart2InstanceRef.current.destroy()
        chart2InstanceRef.current = null
      }
    }
  }, [])

  // Chart 3: Anomaly Detection Timeline
  useEffect(() => {
    if (chart3Ref.current && !chart3InstanceRef.current) {
      const ctx = chart3Ref.current.getContext("2d")
      if (!ctx) return

      // Generate realistic hourly usage pattern with anomalies
      const hourlyData = Array.from({ length: 24 }, (_, i) => {
        let base = 25
        if (i >= 6 && i <= 9) base = 40 // Morning peak
        else if (i >= 18 && i <= 21) base = 45 // Evening peak
        else if (i >= 22 || i <= 5) base = 20 // Night low
        return base + (Math.random() * 8 - 4)
      })
      
      const anomalyData = Array(24).fill(null)
      anomalyData[10] = 68 // Anomaly at 10 AM
      anomalyData[15] = 72 // Anomaly at 3 PM
      anomalyData[20] = 75 // Anomaly at 8 PM

      chart3InstanceRef.current = new Chart(ctx, {
        type: "line",
        data: {
          labels: Array.from({ length: 24 }, (_, i) => `${i}:00`),
          datasets: [
            {
              label: "Normal Usage",
              data: hourlyData,
              borderColor: "#5dadec",
              backgroundColor: "rgba(93, 173, 236, 0.1)",
              borderWidth: 2,
              fill: true,
              tension: 0.4,
            },
            {
              label: "Anomalies",
              data: anomalyData,
              borderColor: "#ef4444",
              backgroundColor: "rgba(239, 68, 68, 0.2)",
              borderWidth: 3,
              pointRadius: 6,
              pointBackgroundColor: "#ef4444",
              pointBorderColor: "#fff",
              pointBorderWidth: 2,
              tension: 0.4,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: true,
              position: "bottom",
              labels: { color: "#a0a0a0", padding: 15 },
            },
            tooltip: {
              backgroundColor: "#1a1a1f",
              titleColor: "#e8e8ec",
              bodyColor: "#a0a0a0",
              borderColor: "#2a2a35",
              borderWidth: 1,
            },
          },
          scales: {
            x: { grid: { color: "rgba(255, 255, 255, 0.05)" }, ticks: { color: "#6a6a70" } },
            y: { grid: { color: "rgba(255, 255, 255, 0.05)" }, ticks: { color: "#6a6a70" } },
          },
        },
      })
    }
    return () => {
      if (chart3InstanceRef.current) {
        chart3InstanceRef.current.destroy()
        chart3InstanceRef.current = null
      }
    }
  }, [])

  // Chart 4: Device Consumption Breakdown
  useEffect(() => {
    if (chart4Ref.current && !chart4InstanceRef.current) {
      const ctx = chart4Ref.current.getContext("2d")
      if (!ctx) return

      chart4InstanceRef.current = new Chart(ctx, {
        type: "doughnut",
        data: {
          labels: ["HVAC", "Lighting", "Appliances", "Electronics", "Other"],
          datasets: [
            {
              data: [35, 20, 25, 12, 8],
              backgroundColor: [
                "rgba(93, 173, 236, 1)",
                "rgba(34, 197, 94, 1)",
                "rgba(251, 191, 36, 1)",
                "rgba(239, 68, 68, 1)",
                "rgba(168, 85, 247, 1)",
              ],
              borderColor: "#1a1a1f",
              borderWidth: 2,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: true,
              position: "right",
              labels: { color: "#a0a0a0", padding: 15 },
            },
            tooltip: {
              backgroundColor: "#1a1a1f",
              titleColor: "#e8e8ec",
              bodyColor: "#a0a0a0",
              borderColor: "#2a2a35",
              borderWidth: 1,
            },
          },
        },
      })
    }
    return () => {
      if (chart4InstanceRef.current) {
        chart4InstanceRef.current.destroy()
        chart4InstanceRef.current = null
      }
    }
  }, [])

  // Chart 5: Prediction Accuracy Over Time
  useEffect(() => {
    if (chart5Ref.current && !chart5InstanceRef.current) {
      const ctx = chart5Ref.current.getContext("2d")
      if (!ctx) return

      chart5InstanceRef.current = new Chart(ctx, {
        type: "line",
        data: {
          labels: ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5", "Week 6", "Week 7", "Week 8"],
          datasets: [
            {
              label: "Accuracy %",
              data: [88.5, 90.2, 91.8, 92.5, 93.1, 93.8, 94.2, 94.2],
              borderColor: "#22c55e",
              backgroundColor: "rgba(34, 197, 94, 0.1)",
              borderWidth: 3,
              fill: true,
              tension: 0.4,
              pointBackgroundColor: "#22c55e",
              pointBorderColor: "#fff",
              pointBorderWidth: 2,
              pointRadius: 5,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: true,
              position: "bottom",
              labels: { color: "#a0a0a0", padding: 15 },
            },
            tooltip: {
              backgroundColor: "#1a1a1f",
              titleColor: "#e8e8ec",
              bodyColor: "#a0a0a0",
              borderColor: "#2a2a35",
              borderWidth: 1,
            },
          },
          scales: {
            x: { grid: { color: "rgba(255, 255, 255, 0.05)" }, ticks: { color: "#6a6a70" } },
            y: {
              grid: { color: "rgba(255, 255, 255, 0.05)" },
              ticks: { color: "#6a6a70" },
              min: 85,
              max: 100,
            },
          },
        },
      })
    }
    return () => {
      if (chart5InstanceRef.current) {
        chart5InstanceRef.current.destroy()
        chart5InstanceRef.current = null
      }
    }
  }, [])

  // Chart 6: Cost Optimization Forecast
  useEffect(() => {
    if (chart6Ref.current && !chart6InstanceRef.current) {
      const ctx = chart6Ref.current.getContext("2d")
      if (!ctx) return

      // Generate realistic cost data with seasonal variations
      const currentCostData = Array.from({ length: 12 }, (_, i) => {
        const seasonal = i >= 5 && i <= 8 ? 30 : 0 // Summer premium
        const base = 160 + seasonal
        return base + (Math.random() * 20 - 10)
      })
      
      const optimizedCostData = currentCostData.map(val => val * 0.65 + (Math.random() * 10 - 5))

      chart6InstanceRef.current = new Chart(ctx, {
        type: "line",
        data: {
          labels: Array.from({ length: 12 }, (_, i) => {
            const date = new Date()
            date.setMonth(date.getMonth() + i)
            return date.toLocaleDateString("en-US", { month: "short" })
          }),
          datasets: [
            {
              label: "Current Cost",
              data: currentCostData,
              borderColor: "#ef4444",
              backgroundColor: "rgba(239, 68, 68, 0.1)",
              borderWidth: 2,
              fill: true,
              tension: 0.4,
            },
            {
              label: "Optimized Cost",
              data: optimizedCostData,
              borderColor: "#22c55e",
              backgroundColor: "rgba(34, 197, 94, 0.1)",
              borderWidth: 2,
              fill: true,
              tension: 0.4,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: true,
              position: "bottom",
              labels: { color: "#a0a0a0", padding: 15 },
            },
            tooltip: {
              backgroundColor: "#1a1a1f",
              titleColor: "#e8e8ec",
              bodyColor: "#a0a0a0",
              borderColor: "#2a2a35",
              borderWidth: 1,
            },
          },
          scales: {
            x: { grid: { color: "rgba(255, 255, 255, 0.05)" }, ticks: { color: "#6a6a70" } },
            y: {
              grid: { color: "rgba(255, 255, 255, 0.05)" },
              ticks: { color: "#6a6a70", callback: (value) => `$${value}` },
            },
          },
        },
      })
    }
    return () => {
      if (chart6InstanceRef.current) {
        chart6InstanceRef.current.destroy()
        chart6InstanceRef.current = null
      }
    }
  }, [])

  const handleSignOut = () => {
    router.push("/")
  }

  return (
    <div className="min-h-screen bg-[#0d0d12] text-[#e8e8ec]">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#5dadec]/20 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(93,173,236,0.03),transparent_50%)]" />
      </div>

      {/* Header */}
      <header className="relative z-50 bg-[#0d0d12]/80 backdrop-blur-md border-b border-[#2a2a35]">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link href="/dashboard" className="flex items-center gap-2">
            <svg className="w-8 h-8 text-[#5dadec]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
            </svg>
            <span className="text-xl font-bold">PowerSense</span>
          </Link>

          {/* User Avatar & Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="w-10 h-10 rounded-full bg-[#5dadec] flex items-center justify-center text-[#0d0d12] font-semibold hover:bg-[#4a9bd9] transition-colors"
            >
              JD
            </button>

            {/* Dropdown Menu */}
            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-72 bg-[#1a1a1f] border border-[#2a2a35] rounded-xl shadow-2xl overflow-hidden z-50">
                <div className="p-6">
                  {/* Profile Photo */}
                  <div className="flex justify-center mb-4">
                    <div className="w-20 h-20 rounded-full bg-[#5dadec] flex items-center justify-center text-[#0d0d12] font-semibold text-2xl">
                      JD
                    </div>
                  </div>
                  
                  {/* User Name */}
                  <div className="text-center mb-1">
                    <div className="font-semibold text-[#e8e8ec] text-lg">John Doe</div>
                  </div>
                  
                  {/* Email */}
                  <div className="text-center mb-6">
                    <div className="text-sm text-[#a0a0a0] flex items-center justify-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      john@example.com
                    </div>
                  </div>
                  
                  {/* Location */}
                  <div className="mb-3 pb-3 border-b border-[#2a2a35]">
                    <div className="flex items-center gap-3 text-sm text-[#a0a0a0]">
                      <svg className="w-5 h-5 text-[#5dadec]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span>Location: <span className="text-[#e8e8ec]">India</span></span>
                    </div>
                  </div>
                  
                  {/* Time Zone */}
                  <div className="mb-4">
                    <div className="flex items-center gap-3 text-sm text-[#a0a0a0]">
                      <svg className="w-5 h-5 text-[#5dadec]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>Time zone: <span className="text-[#e8e8ec]">GMT +5:30</span></span>
                    </div>
                  </div>
                  
                  {/* Sign Out Button */}
                  <button
                    onClick={handleSignOut}
                    className="w-full flex items-center justify-center gap-3 px-4 py-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors rounded-lg"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 py-8">
        {/* Title Section */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">ML Analytics Dashboard</h1>
          <p className="text-[#a0a0a0] text-lg">
            Real-time insights and predictions for your energy consumption
          </p>
        </div>

        {/* Consumption Forecast Section */}
        <div className="bg-[#1a1a1f] border border-[#2a2a35] rounded-xl p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold mb-1">Consumption Forecast</h2>
              <p className="text-[#a0a0a0]">LSTM neural network prediction</p>
            </div>
            <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-green-500/20 text-green-400 text-sm font-medium border border-green-500/30">
              ML Model
            </span>
          </div>
          <div className="h-96">
            <canvas ref={chartRef} />
          </div>
        </div>

        {/* Grid Layout for Additional Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Chart 2: Energy Usage Pattern Analysis */}
          <div className="bg-[#1a1a1f] border border-[#2a2a35] rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold mb-1">Energy Usage Pattern</h2>
                <p className="text-[#a0a0a0]">Weekly consumption analysis</p>
              </div>
              <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-blue-500/20 text-blue-400 text-sm font-medium border border-blue-500/30">
                Pattern ML
              </span>
            </div>
            <div className="h-80">
              <canvas ref={chart2Ref} />
            </div>
          </div>

          {/* Chart 3: Anomaly Detection Timeline */}
          <div className="bg-[#1a1a1f] border border-[#2a2a35] rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold mb-1">Anomaly Detection</h2>
                <p className="text-[#a0a0a0]">24-hour anomaly timeline</p>
              </div>
              <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-red-500/20 text-red-400 text-sm font-medium border border-red-500/30">
                Anomaly ML
              </span>
            </div>
            <div className="h-80">
              <canvas ref={chart3Ref} />
            </div>
          </div>
        </div>

        {/* Chart 4: Device Consumption Breakdown */}
        <div className="bg-[#1a1a1f] border border-[#2a2a35] rounded-xl p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold mb-1">Device Consumption Breakdown</h2>
              <p className="text-[#a0a0a0]">ML-based device classification</p>
            </div>
            <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-purple-500/20 text-purple-400 text-sm font-medium border border-purple-500/30">
              Classification ML
            </span>
          </div>
          <div className="h-96">
            <canvas ref={chart4Ref} />
          </div>
        </div>

        {/* Grid Layout for Last Two Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Chart 5: Prediction Accuracy Over Time */}
          <div className="bg-[#1a1a1f] border border-[#2a2a35] rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold mb-1">Model Accuracy Trend</h2>
                <p className="text-[#a0a0a0]">8-week accuracy progression</p>
              </div>
              <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-green-500/20 text-green-400 text-sm font-medium border border-green-500/30">
                Accuracy ML
              </span>
            </div>
            <div className="h-80">
              <canvas ref={chart5Ref} />
            </div>
          </div>

          {/* Chart 6: Cost Optimization Forecast */}
          <div className="bg-[#1a1a1f] border border-[#2a2a35] rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold mb-1">Cost Optimization Forecast</h2>
                <p className="text-[#a0a0a0]">12-month savings prediction</p>
              </div>
              <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-yellow-500/20 text-yellow-400 text-sm font-medium border border-yellow-500/30">
                Optimization ML
              </span>
            </div>
            <div className="h-80">
              <canvas ref={chart6Ref} />
            </div>
          </div>
        </div>
      </main>

      {/* Click outside to close dropdown */}
      {showUserMenu && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowUserMenu(false)}
        />
      )}
    </div>
  )
}
