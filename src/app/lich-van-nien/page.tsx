'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
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

  function nav(delta: number) {
    let m = month + delta
    let y = year
    if (m < 1) { m = 12; y-- }
    if (m > 12) { m = 1; y++ }
    setMonth(m)
    setYear(y)
  }

  const firstDay = new Date(year, month - 1, 1).getDay()
  const blanks = Array(firstDay === 0 ? 6 : firstDay - 1).fill(null)
  const todayStr = `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`

  return (
    <div className="flex flex-col min-h-screen bg-[var(--background)]">
      <header className="sticky top-0 z-10 flex items-center justify-between px-4 py-3 bg-[var(--card-bg)]/90 backdrop-blur-lg border-b border-[var(--card-border)]">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="text-base opacity-80">☯</span>
          <span className="text-[11px] font-semibold tracking-[0.3em] text-[var(--primary)]/80">Lịch Phong thuỷ</span>
        </Link>
        <Link href="/xem-ngay" className="text-xs text-[var(--text-muted)] hover:text-[var(--primary)] transition-colors duration-300">Xem ngày</Link>
      </header>

      <main className="flex-1 px-4 py-6 max-w-lg mx-auto w-full">
        {/* Month selector */}
        <div className="flex items-center justify-between mb-4 rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] px-3 py-3 card-glow">
          <button onClick={() => nav(-1)}
            className="w-9 h-9 rounded-lg bg-[var(--card-sub)] border border-[var(--card-border)] text-[var(--text-muted)] flex items-center justify-center hover:border-[var(--primary)]/30 hover:text-[var(--primary)] transition-all duration-200 active:scale-90 text-sm">
            ←
          </button>
          <div className="text-center">
            <div className="text-sm font-semibold text-[var(--foreground)]">{monthNames[month - 1]} {year}</div>
            <button onClick={() => { setYear(today.getFullYear()); setMonth(today.getMonth() + 1) }}
              className="text-[10px] text-[var(--primary)]/70 hover:text-[var(--primary)] transition-colors duration-300 mt-0.5">
              Hôm nay
            </button>
          </div>
          <button onClick={() => nav(1)}
            className="w-9 h-9 rounded-lg bg-[var(--card-sub)] border border-[var(--card-border)] text-[var(--text-muted)] flex items-center justify-center hover:border-[var(--primary)]/30 hover:text-[var(--primary)] transition-all duration-200 active:scale-90 text-sm">
            →
          </button>
        </div>

        {/* Calendar grid */}
        <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] overflow-hidden card-glow">
          <div className="grid grid-cols-7 border-b border-[var(--card-border)]">
            {['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'].map(d => (
              <div key={d} className="text-center text-[10px] text-[var(--text-muted)] py-2 uppercase tracking-wider">{d}</div>
            ))}
          </div>
          <div className="grid grid-cols-7">
            {blanks.map((_, i) => <div key={`b-${i}`} className="py-3" />)}
            {days.map((d, i) => {
              const isToday = d.solarDate === todayStr
              const isGood = d.fitness.auspicious
              return (
                <div key={i} className={`py-2 text-center relative ${isToday ? 'bg-[var(--primary)]/10' : ''}`}>
                  <div className="text-xs text-[var(--foreground)] font-medium">{d.lunarDay}</div>
                  <div className={`text-[9px] ${isGood ? 'text-[var(--good)]/70' : 'text-[var(--text-muted)]'}`}>{d.canChi.day}</div>
                  {isToday && (
                    <div className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[var(--primary)]" />
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Chú thích */}
        <div className="flex gap-4 justify-center mt-3 text-[10px] text-[var(--text-muted)]">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-sm bg-[var(--good)]/20 border border-[var(--good)]/30" />
            Ngày tốt
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-sm bg-[var(--primary)]/20 border border-[var(--primary)]/40" />
            Hôm nay
          </div>
        </div>
      </main>
    </div>
  )
}
