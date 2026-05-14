'use client'

import { useMemo } from 'react'
import Link from 'next/link'
import { evaluateTamThuc } from '@/lib/tamthuc'
import { getDayInfo } from '@/lib/lich'

const CAN_COLORS: Record<string, string> = {
  'Giáp': 'text-green-400', 'Ất': 'text-green-300',
  'Bính': 'text-red-400', 'Đinh': 'text-red-300',
  'Mậu': 'text-amber-400', 'Kỷ': 'text-amber-300',
  'Canh': 'text-zinc-300', 'Tân': 'text-zinc-200',
  'Nhâm': 'text-blue-400', 'Quý': 'text-blue-300',
}

export default function Home() {
  const today = useMemo(() => new Date(), [])
  const result = useMemo(() => evaluateTamThuc(today), [today])
  const dayInfo = useMemo(() => getDayInfo(today), [today])

  const scoreColor = result.tongDiem >= 4 ? 'text-good' : result.tongDiem >= 0 ? 'text-neutral' : 'text-bad'
  const bgScore = result.tongDiem >= 4 ? 'bg-good' : result.tongDiem >= 0 ? 'bg-neutral' : 'bg-bad'
  const scoreLabel = result.tongDiem >= 4 ? 'CÁT' : result.tongDiem >= 0 ? 'BÌNH' : 'HUNG'

  return (
    <div className="flex flex-col min-h-screen bg-zinc-950">
      {/* Header */}
      <header className="sticky top-0 z-10 flex items-center justify-between px-4 py-3 bg-zinc-950/90 backdrop-blur border-b border-amber-900/20">
        <div className="flex items-center gap-2">
          <span className="text-xl">☯</span>
          <span className="text-sm font-semibold tracking-wide text-amber-500/80">TINH HOA</span>
        </div>
        <div className="flex gap-4 text-xs text-zinc-500">
          <Link href="/xem-ngay" className="hover:text-amber-400 transition-colors">Chọn ngày</Link>
          <Link href="/lich-van-nien" className="hover:text-amber-400 transition-colors">Lịch</Link>
        </div>
      </header>

      <main className="flex-1 px-4 py-6 max-w-lg mx-auto w-full">
        {/* LÁ SỐ */}
        <div className="rounded-xl border border-amber-900/30 bg-gradient-to-b from-zinc-900 to-zinc-950 overflow-hidden mb-4 shadow-lg shadow-amber-900/5">

          {/* Title */}
          <div className="text-center py-3 border-b border-amber-900/20 bg-zinc-900/50">
            <span className="text-[10px] uppercase tracking-[0.2em] text-amber-600/60">Lá số hôm nay</span>
            <p className="text-[11px] text-zinc-500 mt-0.5">{dayInfo.dayOfWeek} · {dayInfo.solarDate}</p>
          </div>

          {/* Four Pillars — core of lá số */}
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

            {/* Lunar date + animal */}
            <div className="text-center py-2">
              <p className="text-sm text-zinc-400">
                Ngày <span className="text-amber-400/80 font-medium">{dayInfo.lunarDay}</span> tháng <span className="text-amber-400/80 font-medium">{dayInfo.lunarMonth}</span> năm <span className="text-amber-400/80 font-medium">{dayInfo.lunarYear}</span> âm lịch
              </p>
              {dayInfo.solarTerm && (
                <p className="text-[11px] text-zinc-600 mt-0.5">Tiết {dayInfo.solarTerm}</p>
              )}
            </div>
          </div>

          {/* Separator */}
          <div className="mx-4 h-px bg-gradient-to-r from-transparent via-amber-900/30 to-transparent" />

          {/* Tam Thức Score — like a seal/stamp */}
          <div className="px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-14 h-14 rounded-full flex items-center justify-center border-2 ${result.tongDiem >= 4 ? 'border-good/40' : result.tongDiem >= 0 ? 'border-zinc-600' : 'border-bad/40'}`}>
                <div className="text-center">
                  <div className={`text-lg font-black leading-none tracking-wider ${scoreColor}`}>
                    {scoreLabel}
                  </div>
                  <div className={`text-[10px] font-medium ${scoreColor}`}>
                    {result.tongDiem > 0 ? '+' : ''}{result.tongDiem}
                  </div>
                </div>
              </div>
              <div>
                <div className="text-xs text-zinc-400">{result.tongXepLoai}</div>
                <p className="text-[11px] text-zinc-600 leading-relaxed max-w-[200px]">{result.ketLuan}</p>
              </div>
            </div>
          </div>

          {/* 3 trụ cột mini */}
          <div className="grid grid-cols-3 border-t border-amber-900/20">
            <div className="py-3 text-center border-r border-amber-900/20">
              <div className={`text-sm font-bold ${result.thienThoi.diem >= 2 ? 'text-good' : result.thienThoi.diem >= 0 ? 'text-neutral' : 'text-bad'}`}>
                {result.thienThoi.diem > 0 ? '+' : ''}{result.thienThoi.diem}
              </div>
              <div className="text-[9px] text-zinc-600 uppercase tracking-wider">Thiên</div>
            </div>
            <div className="py-3 text-center border-r border-amber-900/20">
              <div className={`text-sm font-bold ${result.diaLoi.diem >= 2 ? 'text-good' : result.diaLoi.diem >= 0 ? 'text-neutral' : 'text-bad'}`}>
                {result.diaLoi.diem > 0 ? '+' : ''}{result.diaLoi.diem}
              </div>
              <div className="text-[9px] text-zinc-600 uppercase tracking-wider">Địa</div>
            </div>
            <div className="py-3 text-center">
              <div className={`text-sm font-bold ${result.nhanHoa.diem >= 2 ? 'text-good' : result.nhanHoa.diem >= 0 ? 'text-neutral' : 'text-bad'}`}>
                {result.nhanHoa.diem > 0 ? '+' : ''}{result.nhanHoa.diem}
              </div>
              <div className="text-[9px] text-zinc-600 uppercase tracking-wider">Nhân</div>
            </div>
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
                  {h.hour}
                  <span className="text-[9px] text-zinc-500 ml-1">{h.time}</span>
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

        {/* Kỳ Môn bát môn */}
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

        {/* Actions */}
        <div className="flex gap-3">
          <Link
            href="/xem-ngay"
            className="flex-1 py-3 rounded-xl bg-amber-600/90 text-black text-sm font-semibold text-center hover:bg-amber-500 transition-all active:scale-[0.98]"
          >
            Chọn ngày khác
          </Link>
          <Link
            href="/lich-van-nien"
            className="flex-1 py-3 rounded-xl border border-amber-900/30 text-zinc-300 text-sm font-medium text-center hover:border-amber-700/50 transition-all active:scale-[0.98]"
          >
            Lịch vạn niên
          </Link>
        </div>
      </main>
    </div>
  )
}
