'use client'

import { useState } from 'react'
import Link from 'next/link'
import { evaluateTamThuc, type TamThucResult } from '@/lib/tamthuc'
import { getDayInfo } from '@/lib/lich'

const CAN_COLORS: Record<string, string> = {
  'Giáp': 'text-green-400', 'Ất': 'text-green-300',
  'Bính': 'text-red-400', 'Đinh': 'text-red-300',
  'Mậu': 'text-amber-400', 'Kỷ': 'text-amber-300',
  'Canh': 'text-zinc-300', 'Tân': 'text-zinc-200',
  'Nhâm': 'text-blue-400', 'Quý': 'text-blue-300',
}

export default function XemNgayPage() {
  const today = new Date()
  const [year, setYear] = useState(today.getFullYear())
  const [month, setMonth] = useState(today.getMonth() + 1)
  const [day, setDay] = useState(today.getDate())
  const [result, setResult] = useState<TamThucResult | null>(null)
  const [dayInfo, setDayInfo] = useState<any>(null)
  const [submitted, setSubmitted] = useState(false)

  function analyze() {
    const date = new Date(year, month - 1, day)
    const r = evaluateTamThuc(date)
    const di = getDayInfo(date)
    setResult(r)
    setDayInfo(di)
    setSubmitted(true)
  }

  const display = result && dayInfo

  const scoreLabel = display
    ? (result.tongDiem >= 4 ? 'CÁT' : result.tongDiem >= 0 ? 'BÌNH' : 'HUNG')
    : ''

  return (
    <div className="flex flex-col min-h-screen bg-zinc-950">
      <header className="sticky top-0 z-10 flex items-center justify-between px-4 py-3 bg-zinc-950/90 backdrop-blur border-b border-amber-900/20">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl">☯</span>
          <span className="text-sm font-semibold tracking-wide text-amber-500/80">TINH HOA</span>
        </Link>
        <Link href="/lich-van-nien" className="text-xs text-zinc-500 hover:text-amber-400 transition-colors">Lịch</Link>
      </header>

      <main className="flex-1 px-4 py-6 max-w-lg mx-auto w-full">
        {/* Input */}
        <div className="rounded-xl border border-amber-900/30 bg-zinc-900/50 px-4 py-4 mb-4">
          <div className="text-[10px] uppercase tracking-[0.2em] text-amber-600/60 mb-3 text-center">Chọn ngày xem</div>
          <div className="flex gap-2">
            <div className="flex-1">
              <label className="text-[10px] text-zinc-600 mb-1 block">Ngày</label>
              <input
                type="number" min={1} max={31} value={day}
                onChange={e => setDay(Number(e.target.value))}
                className="w-full px-3 py-2.5 rounded-lg bg-black/60 border border-zinc-800 text-foreground text-center text-sm"
              />
            </div>
            <div className="flex-1">
              <label className="text-[10px] text-zinc-600 mb-1 block">Tháng</label>
              <input
                type="number" min={1} max={12} value={month}
                onChange={e => setMonth(Number(e.target.value))}
                className="w-full px-3 py-2.5 rounded-lg bg-black/60 border border-zinc-800 text-foreground text-center text-sm"
              />
            </div>
            <div className="flex-1">
              <label className="text-[10px] text-zinc-600 mb-1 block">Năm</label>
              <input
                type="number" min={1900} max={2200} value={year}
                onChange={e => setYear(Number(e.target.value))}
                className="w-full px-3 py-2.5 rounded-lg bg-black/60 border border-zinc-800 text-foreground text-center text-sm"
              />
            </div>
            <div className="flex items-end">
              <button
                onClick={analyze}
                className="px-5 py-2.5 rounded-lg bg-amber-600/90 text-black text-sm font-semibold hover:bg-amber-500 transition-all active:scale-[0.98]"
              >
                Xem
              </button>
            </div>
          </div>
        </div>

        {/* LÁ SỐ Result */}
        {display && (
          <div className="animate-fadeIn">
            <div className="rounded-xl border border-amber-900/30 bg-gradient-to-b from-zinc-900 to-zinc-950 overflow-hidden mb-3 shadow-lg shadow-amber-900/5">
              <div className="text-center py-3 border-b border-amber-900/20 bg-zinc-900/50">
                <span className="text-[10px] uppercase tracking-[0.2em] text-amber-600/60">Lá số</span>
                <p className="text-[11px] text-zinc-500 mt-0.5">{dayInfo.dayOfWeek} · {dayInfo.solarDate}</p>
              </div>

              <div className="px-4 pt-5 pb-3">
                <div className="grid grid-cols-4 gap-2 text-center mb-4">
                  <div>
                    <div className="text-[10px] text-zinc-600 uppercase tracking-wider mb-1">Năm</div>
                    <div className={`text-lg font-bold tracking-wider ${CAN_COLORS[dayInfo.canChi.year[0]] || 'text-foreground'}`}>
                      {dayInfo.canChi.year}
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] text-zinc-600 uppercase tracking-wider mb-1">Tháng</div>
                    <div className={`text-lg font-bold tracking-wider ${CAN_COLORS[dayInfo.canChi.month[0]] || 'text-foreground'}`}>
                      {dayInfo.canChi.month}
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] text-zinc-600 uppercase tracking-wider mb-1">Ngày</div>
                    <div className={`text-lg font-bold tracking-wider ${CAN_COLORS[dayInfo.canChi.day[0]] || 'text-foreground'}`}>
                      {dayInfo.canChi.day}
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] text-zinc-600 uppercase tracking-wider mb-1">Giờ</div>
                    <div className={`text-lg font-bold tracking-wider ${CAN_COLORS[dayInfo.canChi.hour[0]] || 'text-foreground'}`}>
                      {dayInfo.canChi.hour}
                    </div>
                  </div>
                </div>

                <div className="text-center py-2">
                  <p className="text-sm text-zinc-400">
                    Ngày <span className="text-amber-400/80 font-medium">{dayInfo.lunarDay}</span> tháng <span className="text-amber-400/80 font-medium">{dayInfo.lunarMonth}</span> năm <span className="text-amber-400/80 font-medium">{dayInfo.lunarYear}</span> âm lịch
                  </p>
                </div>
              </div>

              <div className="mx-4 h-px bg-gradient-to-r from-transparent via-amber-900/30 to-transparent" />

              <div className="px-4 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-14 h-14 rounded-full flex items-center justify-center border-2 ${result.tongDiem >= 4 ? 'border-good/40' : result.tongDiem >= 0 ? 'border-zinc-600' : 'border-bad/40'}`}>
                    <div className="text-center">
                      <div className={`text-lg font-black leading-none tracking-wider ${result.tongDiem >= 4 ? 'text-good' : result.tongDiem >= 0 ? 'text-neutral' : 'text-bad'}`}>
                        {scoreLabel}
                      </div>
                      <div className={`text-[10px] font-medium ${result.tongDiem >= 4 ? 'text-good' : result.tongDiem >= 0 ? 'text-neutral' : 'text-bad'}`}>
                        {result.tongDiem > 0 ? '+' : ''}{result.tongDiem}
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className={`text-sm font-semibold ${result.tongDiem >= 4 ? 'text-good' : result.tongDiem >= 0 ? 'text-neutral' : 'text-bad'}`}>
                      {result.tongXepLoai}
                    </div>
                    <p className="text-[11px] text-zinc-600 leading-relaxed">{result.ketLuan}</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 border-t border-amber-900/20">
                {(['thienThoi', 'diaLoi', 'nhanHoa'] as const).map((key, idx) => {
                  const data = result[key]
                  const label = ['Thiên', 'Địa', 'Nhân'][idx]
                  return (
                    <div key={key} className={`py-3 text-center ${idx < 2 ? 'border-r border-amber-900/20' : ''}`}>
                      <div className={`text-sm font-bold ${data.diem >= 2 ? 'text-good' : data.diem >= 0 ? 'text-neutral' : 'text-bad'}`}>
                        {data.diem > 0 ? '+' : ''}{data.diem}
                      </div>
                      <div className="text-[9px] text-zinc-600 uppercase tracking-wider">{label}</div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Giờ hoàng đạo */}
            {dayInfo.hourGood.length > 0 && (
              <div className="rounded-xl border border-amber-900/20 bg-zinc-900/50 px-4 py-3 mb-3">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-amber-500/60 text-xs">🕐</span>
                  <span className="text-[10px] uppercase tracking-wider text-zinc-500">Giờ hoàng đạo</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {dayInfo.hourGood.map((h: any, i: number) => (
                    <span key={i} className="px-2.5 py-1 rounded-md bg-good/8 text-good/80 text-[11px] border border-good/15 font-medium">
                      {h.hour} <span className="text-[9px] text-zinc-500">{h.time}</span>
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Nhận xét */}
            <div className="rounded-xl border border-amber-900/20 bg-zinc-900/50 px-4 py-3 mb-3">
              <div className="flex items-center gap-2 mb-2.5">
                <span className="text-amber-500/60 text-xs">📋</span>
                <span className="text-[10px] uppercase tracking-wider text-zinc-500">Nhận xét</span>
              </div>
              <div className="space-y-1.5">
                {result.thienThoi.nhanXet.slice(0, 1).map((nx, i) => (
                  <p key={`tt-${i}`} className="text-xs text-zinc-400 leading-relaxed">
                    <span className="text-amber-500/50">Thiên thời</span> — {nx}
                  </p>
                ))}
                {result.diaLoi.nhanXet.slice(0, 1).map((nx, i) => (
                  <p key={`dl-${i}`} className="text-xs text-zinc-400 leading-relaxed">
                    <span className="text-amber-500/50">Địa lợi</span> — {nx}
                  </p>
                ))}
                {result.nhanHoa.nhanXet.slice(0, 1).map((nx, i) => (
                  <p key={`nh-${i}`} className="text-xs text-zinc-400 leading-relaxed">
                    <span className="text-amber-500/50">Nhân hòa</span> — {nx}
                  </p>
                ))}
              </div>
            </div>

            {/* Kỳ Môn */}
            <div className="rounded-xl border border-amber-900/20 bg-zinc-900/50 px-4 py-3 mb-4">
              <div className="flex items-center gap-2 mb-2.5">
                <span className="text-amber-500/60 text-xs">🚪</span>
                <span className="text-[10px] uppercase tracking-wider text-zinc-500">Kỳ Môn — Bát Môn</span>
              </div>
              <div className="grid grid-cols-8 gap-1">
                {result.diaLoi.kyMon.doors && Object.entries(result.diaLoi.kyMon.doors as Record<string, string>)
                  .sort(([a], [b]) => Number(a) - Number(b))
                  .map(([palace, door]) => (
                    <div key={palace} className="text-center py-1.5 rounded bg-black/40">
                      <div className={`text-xs font-bold ${door === '休' || door === '生' || door === '開' ? 'text-good' : door === '景' ? 'text-neutral' : 'text-bad'}`}>
                        {door}
                      </div>
                      <div className="text-[8px] text-zinc-700">{palace}</div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
