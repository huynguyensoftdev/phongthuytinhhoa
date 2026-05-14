'use client'

import { useMemo } from 'react'
import Link from 'next/link'
import { evaluateTamThuc } from '@/lib/tamthuc'
import { getDayInfo } from '@/lib/lich'

export default function Home() {
  const today = useMemo(() => new Date(), [])
  const result = useMemo(() => evaluateTamThuc(today), [today])
  const dayInfo = useMemo(() => getDayInfo(today), [today])

  const scoreColor = result.tongDiem >= 4 ? 'text-good' : result.tongDiem >= 0 ? 'text-neutral' : 'text-bad'
  const bgScore = result.tongDiem >= 4 ? 'bg-good' : result.tongDiem >= 0 ? 'bg-neutral' : 'bg-bad'

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-white/5">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl">☯</span>
          <span className="text-lg font-semibold text-primary">Tinh Hoa Phong Thủy</span>
        </Link>
        <nav className="flex gap-6 text-sm text-zinc-400">
          <Link href="/xem-ngay" className="hover:text-primary transition-colors">Xem ngày tốt</Link>
          <Link href="/lich-van-nien" className="hover:text-primary transition-colors">Lịch vạn niên</Link>
        </nav>
      </header>

      {/* Hôm nay */}
      <section className="px-6 py-8 md:py-12 text-center bg-tam-thuc border-b border-white/5">
        <div className="max-w-lg mx-auto animate-fadeIn">
          <p className="text-sm text-zinc-500 mb-1">Hôm nay, {dayInfo.dayOfWeek}</p>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-2">
            <span className="text-primary">{dayInfo.canChi.day}</span>
            <span className="text-foreground"> — {dayInfo.lunarDate} âm lịch</span>
          </h1>
          <p className="text-zinc-400 text-sm mb-6">
            Năm {dayInfo.canChi.year} · Tháng {dayInfo.canChi.month} · {dayInfo.animal}
            {dayInfo.solarTerm ? ` · ${dayInfo.solarTerm}` : ''}
          </p>

          {/* Điểm Tam Thức */}
          <div className="flex items-center justify-center gap-3 mb-2">
            <span className={`text-5xl font-bold ${scoreColor}`}>
              {result.tongDiem > 0 ? '+' : ''}{result.tongDiem}
            </span>
            <div className="text-left">
              <div className={`text-sm font-semibold ${scoreColor}`}>{result.tongXepLoai}</div>
              <div className="text-xs text-zinc-500">Tam Thức tổng điểm</div>
            </div>
          </div>

          <div className="h-2 bg-zinc-800 rounded-full max-w-xs mx-auto mb-6 overflow-hidden">
            <div className={`h-full ${bgScore} rounded-full transition-all`}
              style={{ width: `${Math.max(0, Math.min(100, ((result.tongDiem + 10) / 25) * 100))}%` }}
            />
          </div>

          <p className="text-sm text-zinc-400 mb-6 max-w-md mx-auto">{result.ketLuan}</p>

          <div className="flex gap-3 justify-center flex-wrap">
            <Link
              href="/xem-ngay"
              className="px-6 py-3 rounded-lg bg-primary text-black font-semibold hover:bg-primary-dark transition-all"
            >
              Xem ngày khác →
            </Link>
            <Link
              href="/lich-van-nien"
              className="px-6 py-3 rounded-lg border border-white/10 text-foreground hover:border-primary/50 transition-all"
            >
              Lịch vạn niên
            </Link>
          </div>
        </div>
      </section>

      {/* Tam Thức chi tiết */}
      <section className="px-6 py-8 max-w-3xl mx-auto w-full">
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <div className="rounded-xl p-4 card-glow text-center">
            <span className="text-2xl">🌤</span>
            <div className={`text-lg font-bold mt-1 ${result.thienThoi.diem >= 2 ? 'text-good' : result.thienThoi.diem >= 0 ? 'text-neutral' : 'text-bad'}`}>
              {result.thienThoi.diem > 0 ? '+' : ''}{result.thienThoi.diem}
            </div>
            <div className="text-xs text-zinc-500">Thiên thời</div>
          </div>
          <div className="rounded-xl p-4 card-glow text-center">
            <span className="text-2xl">🌍</span>
            <div className={`text-lg font-bold mt-1 ${result.diaLoi.diem >= 2 ? 'text-good' : result.diaLoi.diem >= 0 ? 'text-neutral' : 'text-bad'}`}>
              {result.diaLoi.diem > 0 ? '+' : ''}{result.diaLoi.diem}
            </div>
            <div className="text-xs text-zinc-500">Địa lợi</div>
          </div>
          <div className="rounded-xl p-4 card-glow text-center">
            <span className="text-2xl">👥</span>
            <div className={`text-lg font-bold mt-1 ${result.nhanHoa.diem >= 2 ? 'text-good' : result.nhanHoa.diem >= 0 ? 'text-neutral' : 'text-bad'}`}>
              {result.nhanHoa.diem > 0 ? '+' : ''}{result.nhanHoa.diem}
            </div>
            <div className="text-xs text-zinc-500">Nhân hòa</div>
          </div>
        </div>

        {/* Giờ hoàng đạo */}
        {dayInfo.hourGood.length > 0 && (
          <div className="rounded-xl p-5 card-glow mb-6">
            <h3 className="text-good font-semibold mb-3 text-sm">🕐 Giờ hoàng đạo</h3>
            <div className="flex flex-wrap gap-2">
              {dayInfo.hourGood.map((h: any, i: number) => (
                <span key={i} className="px-3 py-1 rounded-full bg-good/10 text-good text-xs border border-good/20">
                  {h.hour} ({h.time})
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Nhận xét */}
        <div className="rounded-xl p-5 card-glow mb-6">
          <h3 className="text-primary font-semibold mb-3 text-sm">📋 Nhận xét Tam Thức</h3>
          <div className="space-y-2">
            {result.thienThoi.nhanXet.slice(0, 2).map((nx, i) => (
              <p key={`tt-${i}`} className="text-xs text-zinc-400">🌤 {nx}</p>
            ))}
            {result.diaLoi.nhanXet.slice(0, 2).map((nx, i) => (
              <p key={`dl-${i}`} className="text-xs text-zinc-400">🌍 {nx}</p>
            ))}
            {result.nhanHoa.nhanXet.slice(0, 2).map((nx, i) => (
              <p key={`nh-${i}`} className="text-xs text-zinc-400">👥 {nx}</p>
            ))}
          </div>
        </div>

        {/* Kỳ Môn bát môn */}
        <div className="rounded-xl p-5 card-glow mb-6">
          <h3 className="text-primary font-semibold mb-3 text-sm">🚪 Kỳ Môn — Bát môn</h3>
          <div className="grid grid-cols-4 md:grid-cols-8 gap-2">
            {result.diaLoi.kyMon.doors && Object.entries(result.diaLoi.kyMon.doors as Record<string, string>)
              .sort(([a], [b]) => Number(a) - Number(b))
              .map(([palace, door]) => (
                <div key={palace} className="text-center p-2 rounded bg-black/40">
                  <div className={`text-xs font-semibold ${door === '休' || door === '生' || door === '開' ? 'text-good' : door === '景' ? 'text-neutral' : 'text-bad'}`}>
                    {door}
                  </div>
                  <div className="text-[10px] text-zinc-600">{palace}</div>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-6 text-center text-xs text-zinc-600 border-t border-white/5">
        Tinh Hoa Phong Thủy — Ứng dụng tri thức cổ học cho người Việt
      </footer>
    </div>
  )
}
