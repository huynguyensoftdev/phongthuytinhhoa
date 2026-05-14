'use client'

import { useState, useMemo } from 'react'
import { getMonthDays } from '@/lib/lich'

export default function LichVanNienPage() {
  const today = new Date()
  const [year, setYear] = useState(today.getFullYear())
  const [month, setMonth] = useState(today.getMonth() + 1)

  const days = useMemo(() => getMonthDays(year, month), [year, month])

  const monthNames = [
    'Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6',
    'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12',
  ]

  function prev() {
    if (month === 1) { setYear(y => y - 1); setMonth(12) }
    else setMonth(m => m - 1)
  }

  function next() {
    if (month === 12) { setYear(y => y + 1); setMonth(1) }
    else setMonth(m => m + 1)
  }

  function goToday() {
    setYear(today.getFullYear())
    setMonth(today.getMonth() + 1)
  }

  const firstDay = new Date(year, month - 1, 1).getDay()
  const blanks = Array(firstDay === 0 ? 6 : firstDay - 1).fill(null)

  return (
    <div className="flex flex-col min-h-screen">
      <header className="flex items-center justify-between px-6 py-4 border-b border-white/5">
        <a href="/" className="flex items-center gap-2">
          <span className="text-2xl">☯</span>
          <span className="text-sm font-semibold text-primary">Tinh Hoa Phong Thủy</span>
        </a>
        <h1 className="text-sm text-zinc-400">Lịch vạn niên</h1>
      </header>

      <main className="flex-1 px-4 py-8 max-w-4xl mx-auto w-full">
        {/* Controls */}
        <div className="flex items-center justify-between mb-6 card-glow rounded-xl p-4">
          <button onClick={prev} className="px-4 py-2 rounded-lg bg-black/40 border border-white/10 text-foreground hover:border-primary/50 transition-colors">
            ←
          </button>
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-semibold text-foreground">{monthNames[month - 1]} {year}</h2>
            <button onClick={goToday} className="text-xs px-3 py-1 rounded bg-primary/20 text-primary hover:bg-primary/30 transition-colors">
              Hôm nay
            </button>
          </div>
          <button onClick={next} className="px-4 py-2 rounded-lg bg-black/40 border border-white/10 text-foreground hover:border-primary/50 transition-colors">
            →
          </button>
        </div>

        {/* Calendar grid */}
        <div className="grid grid-cols-7 gap-1">
          {['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'].map(d => (
            <div key={d} className="text-center text-xs text-zinc-500 py-2">{d}</div>
          ))}
          {blanks.map((_, i) => (
            <div key={`b-${i}`} className="aspect-square" />
          ))}
          {days.map((d, i) => {
            const isToday = d.solarDate === `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`
            return (
              <div
                key={i}
                className={`aspect-square rounded-lg p-1.5 flex flex-col text-xs cursor-pointer transition-colors hover:border-primary/30
                  ${isToday ? 'border border-primary bg-primary/10' : 'border border-transparent'}
                  ${d.fitness.auspicious ? 'bg-good/5' : ''} card-glow`}
              >
                <span className={`font-medium ${d.fitness.auspicious ? 'text-good' : 'text-foreground'}`}>
                  {d.lunarDay}
                </span>
                <span className="text-[10px] text-zinc-500 mt-auto">
                  {d.lunarMonth}/{d.lunarDay}
                </span>
                <span className={`text-[10px] ${d.fitness.auspicious ? 'text-good/70' : 'text-zinc-600'}`}>
                  {d.canChi.day}
                </span>
              </div>
            )
          })}
        </div>
      </main>

      <footer className="px-6 py-4 text-center text-xs text-zinc-600 border-t border-white/5">
        Tinh Hoa Phong Thủy
      </footer>
    </div>
  )
}
