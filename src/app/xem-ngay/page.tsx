'use client'

import { useState, useMemo } from 'react'
import { evaluateTamThuc, type TamThucResult } from '@/lib/tamthuc'
import { getDayInfo } from '@/lib/lich'

export default function XemNgayPage() {
  const today = new Date()
  const [year, setYear] = useState(today.getFullYear())
  const [month, setMonth] = useState(today.getMonth() + 1)
  const [day, setDay] = useState(today.getDate())
  const [selectedDate, setSelectedDate] = useState<Date>(today)
  const [result, setResult] = useState<TamThucResult | null>(null)
  const [dayInfo, setDayInfo] = useState<any>(null)

  function analyze() {
    const date = new Date(year, month - 1, day)
    setSelectedDate(date)
    const r = evaluateTamThuc(date)
    const di = getDayInfo(date)
    setResult(r)
    setDayInfo(di)
  }

  const scoreBar = useMemo(() => {
    if (!result) return null
    const maxScore = 15
    const pct = Math.max(0, Math.min(100, ((result.tongDiem + 10) / (maxScore + 10)) * 100))
    return pct
  }, [result])

  const tongDiem = result?.tongDiem ?? 0
  const colorClass = tongDiem >= 4 ? 'text-good' : tongDiem >= 0 ? 'text-neutral' : 'text-bad'
  const bgColor = tongDiem >= 4 ? 'bg-good' : tongDiem >= 0 ? 'bg-neutral' : 'bg-bad'

  return (
    <div className="flex flex-col min-h-screen">
      <header className="flex items-center justify-between px-6 py-4 border-b border-white/5">
        <a href="/" className="flex items-center gap-2">
          <span className="text-2xl">☯</span>
          <span className="text-sm font-semibold text-primary">Tinh Hoa Phong Thủy</span>
        </a>
        <h1 className="text-sm text-zinc-400">Xem ngày tốt — Tam Thức</h1>
      </header>

      <main className="flex-1 px-4 py-8 max-w-3xl mx-auto w-full">
        {/* Input */}
        <div className="card-glow rounded-xl p-6 mb-8">
          <h2 className="text-lg font-semibold text-primary mb-4">Chọn ngày xem</h2>
          <div className="flex gap-3 items-end flex-wrap">
            <div>
              <label className="text-xs text-zinc-500 mb-1 block">Ngày</label>
              <input
                type="number"
                min={1}
                max={31}
                value={day}
                onChange={e => setDay(Number(e.target.value))}
                className="w-20 px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-foreground text-center"
              />
            </div>
            <div>
              <label className="text-xs text-zinc-500 mb-1 block">Tháng</label>
              <input
                type="number"
                min={1}
                max={12}
                value={month}
                onChange={e => setMonth(Number(e.target.value))}
                className="w-20 px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-foreground text-center"
              />
            </div>
            <div>
              <label className="text-xs text-zinc-500 mb-1 block">Năm</label>
              <input
                type="number"
                min={1900}
                max={2200}
                value={year}
                onChange={e => setYear(Number(e.target.value))}
                className="w-24 px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-foreground text-center"
              />
            </div>
            <button
              onClick={analyze}
              className="px-6 py-2 rounded-lg bg-primary text-black font-semibold hover:bg-primary-dark transition-colors"
            >
              Xem ngay
            </button>
          </div>
        </div>

        {/* Result */}
        {result && dayInfo && (
          <div className="animate-fadeIn space-y-6">
            {/* Score */}
            <div className="card-glow rounded-xl p-6 text-center">
              <div className="flex items-center justify-center gap-3 mb-2">
                <span className={`text-4xl font-bold ${colorClass}`}>{result.tongDiem}</span>
                <span className="text-lg text-zinc-400">/ 10</span>
              </div>
              <p className={`text-lg font-semibold ${colorClass} mb-2`}>
                {result.tongXepLoai}
              </p>
              <p className="text-sm text-zinc-400">{dayInfo.lunarDate} âm lịch · {dayInfo.canChi.day} · {dayInfo.animal}</p>
              <p className="text-sm text-zinc-500 mt-2">{result.ketLuan}</p>
              {scoreBar !== null && (
                <div className="mt-4 h-2 bg-zinc-800 rounded-full overflow-hidden max-w-xs mx-auto">
                  <div className={`h-full ${bgColor} rounded-full transition-all duration-500`} style={{ width: `${scoreBar}%` }} />
                </div>
              )}
            </div>

            {/* Thiên thời - Địa lợi - Nhân hòa */}
            <div className="grid md:grid-cols-3 gap-4">
              <TamThucCard
                icon="🌤"
                title="Thiên thời"
                sub="Lục Nhâm"
                result={result.thienThoi}
              />
              <TamThucCard
                icon="🌍"
                title="Địa lợi"
                sub="Kỳ Môn"
                result={result.diaLoi}
              />
              <TamThucCard
                icon="👥"
                title="Nhân hòa"
                sub="Lục Nhâm"
                result={result.nhanHoa}
              />
            </div>

            {/* Chi tiết ngày */}
            <div className="card-glow rounded-xl p-6">
              <h3 className="text-primary font-semibold mb-4">Chi tiết ngày</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="text-zinc-500">Can Chi năm</span>
                  <p className="text-foreground">{dayInfo.canChi.year}</p>
                </div>
                <div>
                  <span className="text-zinc-500">Can Chi tháng</span>
                  <p className="text-foreground">{dayInfo.canChi.month}</p>
                </div>
                <div>
                  <span className="text-zinc-500">Can Chi ngày</span>
                  <p className="text-foreground">{dayInfo.canChi.day}</p>
                </div>
                <div>
                  <span className="text-zinc-500">Can Chi giờ</span>
                  <p className="text-foreground">{dayInfo.canChi.hour}</p>
                </div>
                <div>
                  <span className="text-zinc-500">Tiết khí</span>
                  <p className="text-foreground">{dayInfo.solarTerm || '—'}</p>
                </div>
                <div>
                  <span className="text-zinc-500">Trực tinh</span>
                  <p className="text-foreground">{dayInfo.fitness.name}</p>
                </div>
                <div>
                  <span className="text-zinc-500">Ngũ hành năm</span>
                  <p className="text-foreground">{dayInfo.animal}</p>
                </div>
                <div>
                  <span className="text-zinc-500">Cung hoàng đạo</span>
                  <p className="text-foreground">{dayInfo.zodiac}</p>
                </div>
              </div>
            </div>

            {/* Giờ tốt */}
            {dayInfo.hourGood.length > 0 && (
              <div className="card-glow rounded-xl p-6">
                <h3 className="text-good font-semibold mb-3">Giờ hoàng đạo</h3>
                <div className="flex flex-wrap gap-2">
                  {dayInfo.hourGood.map((h: any, i: number) => (
                    <span key={i} className="px-3 py-1 rounded-full bg-good/10 text-good text-sm border border-good/20">
                      {h.hour} ({h.time})
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Kỳ Môn details */}
            <div className="card-glow rounded-xl p-6">
              <h3 className="text-primary font-semibold mb-3">Kỳ Môn Độn Giáp</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                {result.diaLoi.kyMon.doors && Object.entries(result.diaLoi.kyMon.doors as Record<string, string>)
                  .sort(([a], [b]) => Number(a) - Number(b))
                  .map(([palace, door]) => (
                    <div key={palace} className="text-center p-2 rounded bg-black/30">
                      <div className="text-zinc-500">Cung {palace}</div>
                      <div className={`font-semibold ${door === '休' || door === '生' || door === '開' ? 'text-good' : door === '景' ? 'text-neutral' : 'text-bad'}`}>
                        {door} môn
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* Lục Nhâm details */}
            <div className="card-glow rounded-xl p-6">
              <h3 className="text-primary font-semibold mb-3">Lục Nhâm Thần Khóa</h3>
              <div className="text-sm space-y-2">
                <p><span className="text-zinc-500">Phép:</span> {result.thienThoi.lucNham.method}</p>
                <p><span className="text-zinc-500">Nguyệt tướng:</span> {result.thienThoi.lucNham.monthlyGeneral}</p>
                <p><span className="text-zinc-500">Tam truyền:</span> {
                  result.thienThoi.lucNham.transmissions
                    ? `${result.thienThoi.lucNham.transmissions.initial} → ${result.thienThoi.lucNham.transmissions.middle} → ${result.thienThoi.lucNham.transmissions.final}`
                    : '—'
                }</p>
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="px-6 py-4 text-center text-xs text-zinc-600 border-t border-white/5">
        Tri thức cổ học — Công nghệ hiện đại
      </footer>
    </div>
  )
}

function TamThucCard({
  icon,
  title,
  sub,
  result,
}: {
  icon: string
  title: string
  sub: string
  result: { diem: number; xepLoai: string; nhanXet: string[] }
}) {
  const isGood = result.diem >= 2
  const isBad = result.diem < -1
  const scoreColor = isGood ? 'text-good' : isBad ? 'text-bad' : 'text-neutral'
  const borderColor = isGood ? 'border-good/30' : isBad ? 'border-bad/30' : 'border-zinc-700'

  return (
    <div className={`card-glow rounded-xl p-5 border ${borderColor}`}>
      <div className="flex items-center gap-2 mb-3">
        <span className="text-2xl">{icon}</span>
        <div>
          <h3 className="font-semibold text-foreground">{title}</h3>
          <span className="text-xs text-zinc-500">{sub}</span>
        </div>
      </div>
      <div className={`text-2xl font-bold ${scoreColor} mb-2`}>
        {result.diem > 0 ? '+' : ''}{result.diem}
      </div>
      <p className="text-xs text-zinc-500 mb-2">{result.xepLoai}</p>
      <ul className="space-y-1">
        {result.nhanXet.map((nx, i) => (
          <li key={i} className="text-xs text-zinc-400 flex gap-1">
            <span className="text-primary mt-0.5">•</span>
            {nx}
          </li>
        ))}
      </ul>
    </div>
  )
}
