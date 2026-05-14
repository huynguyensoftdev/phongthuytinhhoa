'use client'

import { useState, useMemo, useCallback } from 'react'
import { evaluateTamThuc } from '@/lib/tamthuc'
import { getDayInfo, getMonthDays } from '@/lib/lich'

const CAN_COLORS: Record<string, string> = {
  'Giáp': 'text-green-400', 'Ất': 'text-green-300',
  'Bính': 'text-red-400', 'Đinh': 'text-red-300',
  'Mậu': 'text-amber-400', 'Kỷ': 'text-amber-300',
  'Canh': 'text-zinc-300', 'Tân': 'text-zinc-200',
  'Nhâm': 'text-blue-400', 'Quý': 'text-blue-300',
}

const HOURS = Array.from({ length: 12 }, (_, i) => {
  const names = ['Tý', 'Sửu', 'Dần', 'Mão', 'Thìn', 'Tỵ', 'Ngọ', 'Mùi', 'Thân', 'Dậu', 'Tuất', 'Hợi']
  const ranges = ['23-1', '1-3', '3-5', '5-7', '7-9', '9-11', '11-13', '13-15', '15-17', '17-19', '19-21', '21-23']
  return { name: names[i], range: ranges[i] }
})

type Tab = 'nhanXet' | 'kyMon' | 'lichThang'

export default function Home() {
  const today = new Date()
  const [baseDate, setBaseDate] = useState(today)
  const [pickerOpen, setPickerOpen] = useState(false)
  const [pickerYear, setPickerYear] = useState(today.getFullYear())
  const [pickerMonth, setPickerMonth] = useState(today.getMonth() + 1)
  const [activeTab, setActiveTab] = useState<Tab | null>(null)
  const [calYear, setCalYear] = useState(today.getFullYear())
  const [calMonth, setCalMonth] = useState(today.getMonth() + 1)

  const date = useMemo(() => baseDate, [baseDate])
  const result = useMemo(() => evaluateTamThuc(date), [date])
  const dayInfo = useMemo(() => getDayInfo(date), [date])
  const monthDays = useMemo(() => getMonthDays(calYear, calMonth), [calYear, calMonth])

  const goDay = useCallback((offset: number) => {
    setBaseDate(d => new Date(d.getFullYear(), d.getMonth(), d.getDate() + offset))
  }, [])

  const goToday = useCallback(() => {
    const t = new Date()
    setBaseDate(t)
    setCalYear(t.getFullYear())
    setCalMonth(t.getMonth() + 1)
  }, [])

  const selectDate = useCallback((d: number) => {
    setBaseDate(new Date(calYear, calMonth - 1, d))
  }, [calYear, calMonth])

  const [py, pm, pd] = [date.getFullYear(), date.getMonth() + 1, date.getDate()]
  const dateStr = `${pd < 10 ? '0' + pd : pd}/${pm < 10 ? '0' + pm : pm}/${py}`
  const weekdays = ['Chủ nhật', 'Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu', 'Thứ bảy']
  const dow = weekdays[date.getDay()]
  const isToday = date.toDateString() === today.toDateString()
  const scoreLabel = result.tongDiem >= 4 ? 'CÁT' : result.tongDiem >= 0 ? 'BÌNH' : 'HUNG'
  const scoreColor = result.tongDiem >= 4 ? 'text-good border-good/40' : result.tongDiem >= 0 ? 'text-neutral border-zinc-600' : 'text-bad border-bad/40'
  const bgScore = result.tongDiem >= 4 ? 'bg-good' : result.tongDiem >= 0 ? 'bg-neutral' : 'bg-bad'
  const firstDay = new Date(calYear, calMonth - 1, 1).getDay()
  const blanks = Array(firstDay === 0 ? 6 : firstDay - 1).fill(null)
  const todayStr = `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`

  const monthNames = ['T1','T2','T3','T4','T5','T6','T7','T8','T9','T10','T11','T12']

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-20 flex items-center justify-between px-4 py-3 bg-zinc-950/90 backdrop-blur border-b border-amber-900/20">
        <div className="flex items-center gap-2">
          <span className="text-lg">☯</span>
          <span className="text-xs font-semibold tracking-widest text-amber-500/70">TINH HOA</span>
        </div>
        <button onClick={goToday} className="text-[10px] px-3 py-1.5 rounded-md border border-amber-900/30 text-amber-500/70 hover:border-amber-600/50 transition-colors">
          Hôm nay
        </button>
      </header>

      <main className="flex-1 max-w-md mx-auto w-full px-3 py-4">

        {/* === DATE NAVIGATION === */}
        <div className="flex items-center gap-2 mb-3">
          <button onClick={() => goDay(-1)} className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:border-amber-700/50 active:scale-90 transition-all text-lg">
            ‹
          </button>
          <button onClick={() => setPickerOpen(!pickerOpen)} className="flex-1 flex flex-col items-center py-2 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-amber-700/30 transition-all">
            <span className="text-base font-bold text-foreground">{dateStr}</span>
            <span className="text-[10px] text-zinc-500">{dow}{isToday ? ' · Hôm nay' : ''}</span>
          </button>
          <button onClick={() => goDay(1)} className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:border-amber-700/50 active:scale-90 transition-all text-lg">
            ›
          </button>
        </div>

        {/* Date picker dropdown */}
        {pickerOpen && (
          <div className="mb-3 p-3 rounded-xl border border-amber-900/30 bg-zinc-900 animate-fadeIn">
            <div className="flex gap-2 mb-2">
              <select value={pickerYear} onChange={e => { setPickerYear(Number(e.target.value)); setCalYear(Number(e.target.value)) }}
                className="flex-1 px-2 py-1.5 rounded-lg bg-black/60 border border-zinc-800 text-xs text-foreground">
                {Array.from({ length: 51 }, (_, i) => 2000 + i).map(y =>
                  <option key={y} value={y}>{y}</option>
                )}
              </select>
              <select value={pickerMonth} onChange={e => { setPickerMonth(Number(e.target.value)); setCalMonth(Number(e.target.value)) }}
                className="flex-1 px-2 py-1.5 rounded-lg bg-black/60 border border-zinc-800 text-xs text-foreground">
                {Array.from({ length: 12 }, (_, i) => i + 1).map(m =>
                  <option key={m} value={m}>Tháng {m}</option>
                )}
              </select>
            </div>
            <div className="grid grid-cols={7} gap-0.5">
              {['T2','T3','T4','T5','T6','T7','CN'].map(d =>
                <div key={d} className="text-center text-[9px] text-zinc-600 py-1">{d}</div>
              )}
              {blanks.map((_, i) => <div key={`b-${i}`} />)}
              {monthDays.map((d, i) => {
                const isSel = d.lunarDay === pd && calMonth === pm && calYear === py
                return (
                  <button key={i} onClick={() => { selectDate(d.lunarDay); setPickerOpen(false) }}
                    className={`text-center py-1.5 text-xs rounded-lg transition-all
                      ${isSel ? 'bg-amber-600/30 text-amber-300 font-bold' : 'text-zinc-400 hover:bg-zinc-800'}
                      ${d.fitness.auspicious ? 'text-good/80' : ''}`}>
                    {d.lunarDay}
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {/* === LÁ SỐ CARD === */}
        <div className="rounded-xl border border-amber-900/30 bg-gradient-to-b from-zinc-900 to-zinc-950 overflow-hidden mb-3 shadow-lg shadow-amber-900/5">
          {/* Tứ trụ */}
          <div className="px-4 pt-4 pb-2">
            <div className="grid grid-cols-4 gap-1 text-center mb-3">
              {[
                { label: 'Năm', value: dayInfo.canChi.year },
                { label: 'Tháng', value: dayInfo.canChi.month },
                { label: 'Ngày', value: dayInfo.canChi.day },
                { label: 'Giờ', value: dayInfo.canChi.hour },
              ].map(p => (
                <div key={p.label} className="bg-black/40 rounded-lg py-1.5">
                  <div className="text-[8px] text-zinc-600 uppercase tracking-wider">{p.label}</div>
                  <div className={`text-sm font-bold tracking-wider ${CAN_COLORS[p.value[0]] || 'text-foreground'}`}>
                    {p.value}
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center">
              <p className="text-xs text-zinc-400">
                {dayInfo.lunarDay}/{dayInfo.lunarMonth}/{dayInfo.lunarYear} âm lịch
                {dayInfo.solarTerm ? ` · ${dayInfo.solarTerm}` : ''}
              </p>
              <p className="text-[9px] text-zinc-600 mt-0.5">{dayInfo.animal}</p>
            </div>
          </div>

          <div className="mx-3 h-px bg-gradient-to-r from-transparent via-amber-900/30 to-transparent" />

          {/* Score + quick info */}
          <div className="px-4 py-3 flex items-center gap-3">
            <div className={`w-12 h-12 rounded-full flex-shrink-0 flex items-center justify-center border-2 ${scoreColor}`}>
              <div className="text-center">
                <div className={`text-sm font-black leading-none tracking-wider ${result.tongDiem >= 4 ? 'text-good' : result.tongDiem >= 0 ? 'text-neutral' : 'text-bad'}`}>
                  {scoreLabel}
                </div>
                <div className={`text-[8px] font-medium ${result.tongDiem >= 4 ? 'text-good' : result.tongDiem >= 0 ? 'text-neutral' : 'text-bad'}`}>
                  {result.tongDiem > 0 ? '+' : ''}{result.tongDiem}
                </div>
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex gap-2 mb-1">
                {(['thienThoi', 'diaLoi', 'nhanHoa'] as const).map((k, i) => {
                  const d = result[k]
                  const l = ['Thiên', 'Địa', 'Nhân'][i]
                  return (
                    <div key={k} className={`flex-1 text-center py-1 rounded ${d.diem >= 2 ? 'bg-good/8' : d.diem >= 0 ? 'bg-zinc-800/50' : 'bg-bad/8'}`}>
                      <div className={`text-xs font-bold ${d.diem >= 2 ? 'text-good' : d.diem >= 0 ? 'text-zinc-400' : 'text-bad'}`}>
                        {d.diem > 0 ? '+' : ''}{d.diem}
                      </div>
                      <div className="text-[7px] text-zinc-600 uppercase">{l}</div>
                    </div>
                  )
                })}
              </div>
              <p className="text-[10px] text-zinc-500 leading-relaxed line-clamp-2">{result.ketLuan}</p>
            </div>
          </div>
        </div>

        {/* === GIỜ HOÀNG ĐẠO === */}
        {dayInfo.hourGood.length > 0 && (
          <div className="rounded-xl border border-amber-900/20 bg-zinc-900/50 px-3 py-2.5 mb-2">
            <div className="flex items-center gap-1.5 mb-1.5">
              <span className="text-amber-500/50 text-[10px]">🕐</span>
              <span className="text-[8px] uppercase tracking-widest text-zinc-600">HOÀNG ĐẠO</span>
            </div>
            <div className="grid grid-cols-6 gap-1">
              {dayInfo.hourGood.map((h: any, i: number) => (
                <div key={i} className="text-center py-1 rounded bg-good/5 border border-good/10">
                  <div className="text-xs font-bold text-good/80">{h.hour}</div>
                  <div className="text-[7px] text-zinc-600">{h.time}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* === TABS === */}
        <div className="flex gap-1 mb-2">
          {([
            { key: 'nhanXet' as Tab, label: '📋 Nhận xét' },
            { key: 'kyMon' as Tab, label: '🚪 Kỳ Môn' },
            { key: 'lichThang' as Tab, label: '🗓 Tháng này' },
          ]).map(t => (
            <button key={t.key} onClick={() => setActiveTab(activeTab === t.key ? null : t.key)}
              className={`flex-1 py-2 text-[10px] rounded-lg font-medium transition-all
                ${activeTab === t.key ? 'bg-amber-600/15 text-amber-400 border border-amber-600/30' : 'bg-zinc-900 text-zinc-500 border border-zinc-800 hover:border-zinc-700'}`}>
              {t.label}
            </button>
          ))}
        </div>

        {/* TAB CONTENT: Nhận xét */}
        {activeTab === 'nhanXet' && (
          <div className="rounded-xl border border-amber-900/20 bg-zinc-900/50 px-3 py-3 mb-2 animate-fadeIn">
            <div className="space-y-2">
              {result.thienThoi.nhanXet.map((nx, i) => (
                <p key={`tt-${i}`} className="text-xs text-zinc-400 leading-relaxed flex gap-1.5">
                  <span className="text-[9px] text-amber-500/50 shrink-0 mt-0.5">🌤</span>
                  <span><span className="text-amber-400/60 text-[10px]">Thiên thời</span> — {nx}</span>
                </p>
              ))}
              {result.diaLoi.nhanXet.map((nx, i) => (
                <p key={`dl-${i}`} className="text-xs text-zinc-400 leading-relaxed flex gap-1.5">
                  <span className="text-[9px] text-amber-500/50 shrink-0 mt-0.5">🌍</span>
                  <span><span className="text-amber-400/60 text-[10px]">Địa lợi</span> — {nx}</span>
                </p>
              ))}
              {result.nhanHoa.nhanXet.map((nx, i) => (
                <p key={`nh-${i}`} className="text-xs text-zinc-400 leading-relaxed flex gap-1.5">
                  <span className="text-[9px] text-amber-500/50 shrink-0 mt-0.5">👥</span>
                  <span><span className="text-amber-400/60 text-[10px]">Nhân hòa</span> — {nx}</span>
                </p>
              ))}
            </div>
          </div>
        )}

        {/* TAB CONTENT: Kỳ Môn */}
        {activeTab === 'kyMon' && (
          <div className="rounded-xl border border-amber-900/20 bg-zinc-900/50 px-3 py-3 mb-2 animate-fadeIn">
            <div className="grid grid-cols-2 gap-3 mb-3">
              <div>
                <div className="text-[8px] uppercase tracking-widest text-zinc-600 mb-1">Độn</div>
                <span className="text-xs font-semibold text-amber-400/80">{result.diaLoi.kyMon.escapeMode}</span>
                <span className="text-xs text-zinc-500 ml-1">Cục {result.diaLoi.kyMon.juShu}</span>
              </div>
              <div>
                <div className="text-[8px] uppercase tracking-widest text-zinc-600 mb-1">Trực sử</div>
                <span className="text-xs font-semibold text-amber-400/80">{result.diaLoi.kyMon.zhiShi?.door} môn</span>
                <span className="text-xs text-zinc-500 ml-1">cung {result.diaLoi.kyMon.zhiShi?.palace}</span>
              </div>
            </div>
            <div className="text-[8px] uppercase tracking-widest text-zinc-600 mb-1.5">Bát môn</div>
            <div className="grid grid-cols-8 gap-1">
              {result.diaLoi.kyMon.doors && Object.entries(result.diaLoi.kyMon.doors as Record<string, string>)
                .sort(([a], [b]) => Number(a) - Number(b))
                .map(([palace, door]) => (
                  <div key={palace} className="text-center py-1 rounded bg-black/40">
                    <div className={`text-xs font-bold ${door === '休' || door === '生' || door === '開' ? 'text-good' : door === '景' ? 'text-neutral' : 'text-bad'}`}>
                      {door}
                    </div>
                    <div className="text-[7px] text-zinc-700">{palace}</div>
                  </div>
                ))}
            </div>
            <div className="mt-3">
              <div className="text-[8px] uppercase tracking-widest text-zinc-600 mb-1">Lục Nhâm — Tam truyền</div>
              <div className="flex gap-2 items-center">
                {(() => {
                  const t = result.thienThoi.lucNham.transmissions as any
                  return t ? [t.initial, t.middle, t.final].map((step, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-amber-400/80 px-2 py-0.5 rounded bg-amber-900/20">{step}</span>
                      {i < 2 && <span className="text-zinc-700 text-[10px]">→</span>}
                    </div>
                  )) : null
                })()}
              </div>
              <div className="text-[10px] text-zinc-500 mt-1">Phép: {result.thienThoi.lucNham.method} · Nguyệt tướng: {result.thienThoi.lucNham.monthlyGeneral}</div>
            </div>
          </div>
        )}

        {/* TAB CONTENT: Lịch tháng */}
        {activeTab === 'lichThang' && (
          <div className="rounded-xl border border-amber-900/20 bg-zinc-900/50 px-3 py-3 mb-2 animate-fadeIn">
            <div className="flex items-center justify-between mb-2">
              <button onClick={() => { let m = calMonth - 1, y = calYear; if (m < 1) { m = 12; y-- } setCalMonth(m); setCalYear(y) }}
                className="w-7 h-7 rounded-lg bg-black/40 border border-zinc-800 text-zinc-500 flex items-center justify-center text-xs hover:border-amber-700/50">
                ‹
              </button>
              <span className="text-xs font-semibold text-foreground">Tháng {calMonth}/{calYear}</span>
              <button onClick={() => { let m = calMonth + 1, y = calYear; if (m > 12) { m = 1; y++ } setCalMonth(m); setCalYear(y) }}
                className="w-7 h-7 rounded-lg bg-black/40 border border-zinc-800 text-zinc-500 flex items-center justify-center text-xs hover:border-amber-700/50">
                ›
              </button>
            </div>
            <div className="grid grid-cols-7 gap-0.5">
              {['T2','T3','T4','T5','T6','T7','CN'].map(d =>
                <div key={d} className="text-center text-[8px] text-zinc-600 py-1">{d}</div>
              )}
              {blanks.map((_, i) => <div key={`b-${i}`} className="py-2" />)}
              {monthDays.map((d, i) => {
                const isSel = calYear === py && calMonth === pm && d.lunarDay === pd
                const isToday2 = d.solarDate === todayStr
                return (
                  <button key={i} onClick={() => selectDate(d.lunarDay)}
                    className={`text-center py-1.5 text-xs rounded-lg transition-all relative
                      ${isSel ? 'bg-amber-600/30 text-amber-300 font-bold ring-1 ring-amber-500/50' : 'hover:bg-zinc-800 text-zinc-400'}
                      ${d.fitness.auspicious && !isSel ? 'text-good/70' : ''}`}>
                    {d.lunarDay}
                    {isToday2 && !isSel && <div className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-0.5 h-0.5 rounded-full bg-amber-500" />}
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {/* === TỔNG QUAN NGÀY === */}
        <details className="rounded-xl border border-amber-900/20 bg-zinc-900/50 px-3 py-2.5 mb-2 group">
          <summary className="text-[10px] uppercase tracking-widest text-zinc-600 cursor-pointer list-none flex items-center justify-between">
            <span>📊 Tổng quan ngày</span>
            <span className="text-zinc-700 group-open:rotate-180 transition-transform">▾</span>
          </summary>
          <div className="mt-2 grid grid-cols-2 gap-2 text-xs pt-2 border-t border-amber-900/20">
            <InfoRow label="Can Chi năm" value={dayInfo.canChi.year} />
            <InfoRow label="Can Chi tháng" value={dayInfo.canChi.month} />
            <InfoRow label="Can Chi ngày" value={dayInfo.canChi.day} />
            <InfoRow label="Can Chi giờ" value={dayInfo.canChi.hour} />
            <InfoRow label="Âm lịch" value={`${dayInfo.lunarDay}/${dayInfo.lunarMonth}/${dayInfo.lunarYear}`} />
            <InfoRow label="Tiết khí" value={dayInfo.solarTerm || '—'} />
            <InfoRow label="Trực tinh" value={dayInfo.fitness.name} />
            <InfoRow label="Con giáp" value={dayInfo.animal} />
            <InfoRow label="Ngũ hành năm" value={`${dayInfo.animal}`} />
            <InfoRow label="Cung hoàng đạo" value={dayInfo.zodiac} />
          </div>
        </details>

        {/* === THÔNG TIN THẦN SỐ === */}
        {dayInfo.flags.length > 0 && (
          <details className="rounded-xl border border-amber-900/20 bg-zinc-900/50 px-3 py-2.5 mb-2 group">
            <summary className="text-[10px] uppercase tracking-widest text-zinc-600 cursor-pointer list-none flex items-center justify-between">
              <span>⭐ Thần sát</span>
              <span className="text-zinc-700 group-open:rotate-180 transition-transform">▾</span>
            </summary>
            <div className="mt-2 pt-2 border-t border-amber-900/20">
              <div className="flex flex-wrap gap-1">
                {dayInfo.flags.map((f: string, i: number) => (
                  <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-zinc-800 text-zinc-400">{f}</span>
                ))}
              </div>
            </div>
          </details>
        )}

      </main>
    </div>
  )
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between py-1 px-2 rounded bg-black/30">
      <span className="text-zinc-500">{label}</span>
      <span className="text-foreground font-medium">{value}</span>
    </div>
  )
}
