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

export default function Home() {
  const today = new Date()
  const [baseDate, setBaseDate] = useState(today)
  const [calMonth, setCalMonth] = useState(today.getMonth() + 1)
  const [calYear, setCalYear] = useState(today.getFullYear())

  const date = baseDate
  const result = useMemo(() => evaluateTamThuc(date), [date])
  const dayInfo = useMemo(() => getDayInfo(date), [date])
  const monthDays = useMemo(() => getMonthDays(calYear, calMonth), [calYear, calMonth])
  const [py, pm, pd] = [date.getFullYear(), date.getMonth() + 1, date.getDate()]

  const goDay = (n: number) => setBaseDate(d => new Date(d.getFullYear(), d.getMonth(), d.getDate() + n))
  const goToday = () => { const t = new Date(); setBaseDate(t); setCalMonth(t.getMonth() + 1); setCalYear(t.getFullYear()) }
  const pickDate = (d: number) => setBaseDate(new Date(calYear, calMonth - 1, d))
  const navCal = (d: number) => {
    let m = calMonth + d, y = calYear
    if (m < 1) { m = 12; y-- }
    if (m > 12) { m = 1; y++ }
    setCalMonth(m); setCalYear(y)
    if (d < 0) setBaseDate(new Date(y, m - 1, 1))
    else setBaseDate(new Date(y, m - 1, 1))
  }

  const weekdays = ['Chủ nhật', 'Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu', 'Thứ bảy']
  const dow = weekdays[date.getDay()]
  const isToday = date.toDateString() === today.toDateString()
  const scoreLabel = result.tongDiem >= 4 ? 'TỐT' : result.tongDiem >= 0 ? 'TRUNG' : 'XẤU'

  const firstDay = new Date(calYear, calMonth - 1, 1).getDay()
  const blanks = Array(firstDay === 0 ? 6 : firstDay - 1).fill(null)
  const todayStr = `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`

  return (
    <div className="min-h-screen bg-zinc-950">
      {/* Header */}
      <header className="sticky top-0 z-20 bg-zinc-950/95 backdrop-blur border-b border-amber-900/20">
        <div className="max-w-md mx-auto flex items-center justify-between px-3 py-2.5">
          <div className="flex items-center gap-1.5">
            <span className="text-base">☯</span>
            <span className="text-[10px] font-semibold tracking-[0.25em] text-amber-500/70">TINH HOA</span>
          </div>
          <button onClick={goToday} className="text-[9px] px-2.5 py-1 rounded-md border border-amber-900/30 text-amber-500/60 hover:border-amber-600/50 transition-colors">
            Hôm nay
          </button>
        </div>
      </header>

      <main className="max-w-md mx-auto px-3 py-3 space-y-3">

        {/* ===== DATE NAV ===== */}
        <div className="flex items-center gap-2">
          <button onClick={() => goDay(-1)} className="w-9 h-9 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-500 hover:border-amber-700/50 active:scale-90 text-base">‹</button>
          <div className="flex-1 flex flex-col items-center py-1.5 rounded-xl bg-zinc-900 border border-zinc-800">
            <span className="text-sm font-bold text-foreground">{pd < 10 ? '0'+pd : pd}/{pm < 10 ? '0'+pm : pm}/{py}</span>
            <span className="text-[9px] text-zinc-500">{dow}{isToday ? ' · Hôm nay' : ''}</span>
          </div>
          <button onClick={() => goDay(1)} className="w-9 h-9 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-500 hover:border-amber-700/50 active:scale-90 text-base">›</button>
        </div>

        {/* ===== LÁ SỐ ===== */}
        <div className="rounded-xl border border-amber-900/30 bg-gradient-to-b from-zinc-900 to-zinc-950 overflow-hidden shadow-lg shadow-amber-900/5">
          <div className="px-3 pt-3 pb-2">
            <div className="grid grid-cols-4 gap-1.5 mb-2.5">
              {[
                { l: 'Năm', v: dayInfo.canChi.year },
                { l: 'Tháng', v: dayInfo.canChi.month },
                { l: 'Ngày', v: dayInfo.canChi.day },
                { l: 'Giờ', v: dayInfo.canChi.hour },
              ].map(p => (
                <div key={p.l} className="bg-black/50 rounded-lg py-1.5 text-center">
                  <div className="text-[7px] text-zinc-600 uppercase tracking-wider">{p.l}</div>
                  <div className={`text-sm font-bold tracking-wider ${CAN_COLORS[p.v[0]] || 'text-foreground'}`}>{p.v}</div>
                </div>
              ))}
            </div>
            <div className="text-center leading-tight">
              <span className="text-xs text-zinc-400">{dayInfo.lunarDay}/{dayInfo.lunarMonth}/{dayInfo.lunarYear} âm lịch</span>
              {dayInfo.solarTerm && <span className="text-[9px] text-zinc-600 ml-2">· {dayInfo.solarTerm}</span>}
            </div>
          </div>

          <div className="mx-3 h-px bg-gradient-to-r from-transparent via-amber-900/30 to-transparent" />

          <div className="px-3 py-2.5 flex items-center gap-3">
            <div className={`w-11 h-11 rounded-full flex-shrink-0 flex items-center justify-center border-2 ${result.tongDiem >= 4 ? 'border-good/40' : result.tongDiem >= 0 ? 'border-zinc-600' : 'border-bad/40'}`}>
              <div className="text-center leading-none">
                <div className={`text-xs font-black tracking-wider ${result.tongDiem >= 4 ? 'text-good' : result.tongDiem >= 0 ? 'text-neutral' : 'text-bad'}`}>{scoreLabel}</div>
                <div className={`text-[7px] font-medium ${result.tongDiem >= 4 ? 'text-good' : result.tongDiem >= 0 ? 'text-neutral' : 'text-bad'}`}>{result.tongDiem > 0 ? '+' : ''}{result.tongDiem}</div>
              </div>
            </div>
            <div className="flex-1 grid grid-cols-3 gap-1.5">
              {(['thienThoi','diaLoi','nhanHoa'] as const).map((k, i) => {
                const d = result[k]; const l = ['Thiên','Địa','Nhân'][i]
                return (
                  <div key={k} className={`text-center py-1 rounded ${d.diem >= 2 ? 'bg-good/8' : d.diem >= 0 ? 'bg-zinc-800/50' : 'bg-bad/8'}`}>
                    <div className={`text-xs font-bold ${d.diem >= 2 ? 'text-good' : d.diem >= 0 ? 'text-zinc-400' : 'text-bad'}`}>{d.diem > 0 ? '+' : ''}{d.diem}</div>
                    <div className="text-[7px] text-zinc-600 uppercase">{l}</div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* ===== GIỜ HOÀNG ĐẠO ===== */}
        {dayInfo.hourGood.length > 0 && (
          <div className="rounded-xl border border-amber-900/20 bg-zinc-900/50 px-3 py-2">
            <div className="flex items-center gap-1.5 mb-1.5">
              <span className="text-amber-500/50 text-[9px]">🕐</span>
              <span className="text-[7px] uppercase tracking-[0.2em] text-zinc-600">Hoàng đạo</span>
              <span className="text-[7px] text-zinc-700">· {dayInfo.hourGood.length} khung giờ</span>
            </div>
            <div className="grid grid-cols-6 gap-1">
              {dayInfo.hourGood.map((h: any, i: number) => (
                <div key={i} className="text-center py-1 rounded bg-good/5 border border-good/10">
                  <div className="text-xs font-bold text-good/80">{h.hour}</div>
                  <div className="text-[6px] text-zinc-600">{h.time}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ===== NHẬN XÉT TAM THỨC (3 cột) ===== */}
        <div className="rounded-xl border border-amber-900/20 bg-zinc-900/50 px-3 py-2.5">
          <div className="flex items-center gap-1.5 mb-2">
            <span className="text-amber-500/50 text-[9px]">📋</span>
            <span className="text-[7px] uppercase tracking-[0.2em] text-zinc-600">Nhận xét Tam Thức</span>
          </div>
          <div className="grid grid-cols-3 gap-1.5">
            {([
              { key: 'thienThoi' as const, label: 'Thiên', icon: '🌤', color: result.thienThoi.diem >= 2 ? 'text-good' : result.thienThoi.diem >= 0 ? 'text-zinc-400' : 'text-bad', nx: result.thienThoi.nhanXet },
              { key: 'diaLoi' as const, label: 'Địa', icon: '🌍', color: result.diaLoi.diem >= 2 ? 'text-good' : result.diaLoi.diem >= 0 ? 'text-zinc-400' : 'text-bad', nx: result.diaLoi.nhanXet },
              { key: 'nhanHoa' as const, label: 'Nhân', icon: '👥', color: result.nhanHoa.diem >= 2 ? 'text-good' : result.nhanHoa.diem >= 0 ? 'text-zinc-400' : 'text-bad', nx: result.nhanHoa.nhanXet },
            ]).map(col => (
              <div key={col.key} className="rounded-lg bg-black/40 px-2 py-1.5">
                <div className="flex items-center gap-1 mb-1">
                  <span className="text-[9px]">{col.icon}</span>
                  <span className={`text-[8px] font-bold uppercase ${col.color}`}>{col.label}</span>
                </div>
                {col.nx.map((n, i) => (
                  <p key={i} className="text-[8px] text-zinc-500 leading-relaxed mb-0.5">{n}</p>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* ===== KỲ MÔN + LỤC NHÂM ===== */}
        <div className="rounded-xl border border-amber-900/20 bg-zinc-900/50 px-3 py-2.5">
          <div className="flex items-center gap-1.5 mb-2">
            <span className="text-amber-500/50 text-[9px]">🚪</span>
            <span className="text-[7px] uppercase tracking-[0.2em] text-zinc-600">Kỳ Môn Độn Giáp</span>
            <span className="text-[7px] text-zinc-700 ml-auto">{result.diaLoi.kyMon.escapeMode as string} · Cục {result.diaLoi.kyMon.juShu as string}</span>
          </div>

          <div className="grid grid-cols-2 gap-2 mb-2">
            {/* Bát môn */}
            <div>
              <div className="text-[7px] text-zinc-600 uppercase tracking-wider mb-1">Bát môn</div>
              <div className="grid grid-cols-4 gap-0.5">
                {result.diaLoi.kyMon.doors && Object.entries(result.diaLoi.kyMon.doors as Record<string, string>)
                  .sort(([a], [b]) => Number(a) - Number(b))
                  .map(([palace, door]) => (
                    <div key={palace} className={`text-center py-1 rounded ${door === '休' || door === '生' || door === '開' ? 'bg-good/8' : door === '景' ? 'bg-zinc-800/50' : 'bg-bad/8'}`}>
                      <div className={`text-xs font-bold ${door === '休' || door === '生' || door === '開' ? 'text-good' : door === '景' ? 'text-zinc-400' : 'text-bad'}`}>{door}</div>
                      <div className="text-[6px] text-zinc-700">{palace}</div>
                    </div>
                  ))}
              </div>
            </div>
            {/* Lục Nhâm */}
            <div>
              <div className="text-[7px] text-zinc-600 uppercase tracking-wider mb-1">Lục Nhâm</div>
              <div className="bg-black/40 rounded-lg px-2 py-1.5">
                <div className="text-[7px] text-zinc-600">Tam truyền</div>
                <div className="flex items-center gap-1 mt-0.5">
                  {(() => {
                    const t = result.thienThoi.lucNham.transmissions as any
                    return t ? [t.initial, t.middle, t.final].map((step, i) => (
                      <div key={i} className="flex items-center gap-1">
                        <span className="text-[10px] font-semibold text-amber-400/80 bg-amber-900/20 px-1.5 py-0.5 rounded">{step}</span>
                        {i < 2 && <span className="text-zinc-700 text-[8px]">→</span>}
                      </div>
                    )) : null
                  })()}
                </div>
                <div className="text-[7px] text-zinc-600 mt-1">Phép: {result.thienThoi.lucNham.method} · Nguyệt: {result.thienThoi.lucNham.monthlyGeneral}</div>
              </div>
            </div>
          </div>

          {/* 12 Thiên tướng */}
          <details className="group">
            <summary className="text-[7px] uppercase tracking-wider text-zinc-600 cursor-pointer list-none flex items-center justify-between">
              <span>12 Thiên tướng</span>
              <span className="text-zinc-700 group-open:rotate-180 transition-transform text-[8px]">▾</span>
            </summary>
            <div className="mt-1.5 grid grid-cols-6 gap-0.5 pt-1.5 border-t border-amber-900/20">
              {result.thienThoi.lucNham.generals && Object.entries(result.thienThoi.lucNham.generals as Record<string, string>).map(([branch, gen]) => (
                <div key={branch} className="text-center py-0.5 rounded bg-black/30">
                  <div className="text-[7px] text-zinc-500">{branch}</div>
                  <div className={`text-[8px] font-medium ${['貴人','青龍','六合','太常','太陰'].includes(gen) ? 'text-good/70' : ['白虎','螣蛇','玄武'].includes(gen) ? 'text-bad/70' : 'text-zinc-400'}`}>
                    {gen}
                  </div>
                </div>
              ))}
            </div>
          </details>
        </div>

        {/* ===== LỊCH THÁNG ===== */}
        <div className="rounded-xl border border-amber-900/20 bg-zinc-900/50 px-3 py-2.5">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5">
              <span className="text-amber-500/50 text-[9px]">🗓</span>
              <span className="text-[7px] uppercase tracking-[0.2em] text-zinc-600">Lịch tháng</span>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => { navCal(-1) }} className="w-6 h-6 rounded bg-black/40 border border-zinc-800 text-zinc-500 flex items-center justify-center text-[10px] hover:border-amber-700/50">‹</button>
              <span className="text-[10px] font-semibold text-foreground w-16 text-center">Tháng {calMonth}</span>
              <button onClick={() => { navCal(1) }} className="w-6 h-6 rounded bg-black/40 border border-zinc-800 text-zinc-500 flex items-center justify-center text-[10px] hover:border-amber-700/50">›</button>
            </div>
          </div>
          <div className="grid grid-cols-7 gap-px">
            {['T2','T3','T4','T5','T6','T7','CN'].map(d => (
              <div key={d} className="text-center text-[7px] text-zinc-600 py-1">{d}</div>
            ))}
            {blanks.map((_, i) => <div key={`b-${i}`} className="py-2" />)}
            {monthDays.map((d, i) => {
              const isSel = calYear === py && calMonth === pm && d.lunarDay === pd
              const isToday2 = d.solarDate === todayStr
              return (
                <button key={i} onClick={() => pickDate(d.lunarDay)}
                  className={`text-center py-1.5 text-[10px] rounded-sm transition-all relative
                    ${isSel ? 'bg-amber-600/30 text-amber-300 font-bold ring-1 ring-amber-500/50' : 'hover:bg-zinc-800 text-zinc-400'}
                    ${d.fitness.auspicious && !isSel ? 'text-good/70' : ''}`}>
                  {d.lunarDay}
                  <div className={`h-0.5 w-0.5 mx-auto rounded-full mt-0.5 ${d.fitness.auspicious ? 'bg-good/50' : 'bg-zinc-700'}`} />
                </button>
              )
            })}
          </div>
          <div className="flex gap-3 justify-center mt-1.5">
            <div className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 rounded-sm bg-good/30" />
              <span className="text-[7px] text-zinc-600">Tốt</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 rounded-sm bg-amber-600/40" />
              <span className="text-[7px] text-zinc-600">Đã chọn</span>
            </div>
          </div>
        </div>

        {/* ===== TỔNG QUAN NGÀY (chi tiết khoa học) ===== */}
        <div className="rounded-xl border border-amber-900/20 bg-zinc-900/50 px-3 py-2.5">
          <div className="flex items-center gap-1.5 mb-2">
            <span className="text-amber-500/50 text-[9px]">📊</span>
            <span className="text-[7px] uppercase tracking-[0.2em] text-zinc-600">Tổng quan ngày · Can Chi & Ngũ Hành</span>
          </div>
          <div className="grid grid-cols-2 gap-1">
            <div className="space-y-0.5">
              <Row label="Năm" value={dayInfo.canChi.year} sub={dayInfo.animal} />
              <Row label="Tháng" value={dayInfo.canChi.month} />
              <Row label="Ngày" value={dayInfo.canChi.day} />
              <Row label="Giờ" value={dayInfo.canChi.hour} />
            </div>
            <div className="space-y-0.5">
              <Row label="Âm lịch" value={`${dayInfo.lunarDay}/${dayInfo.lunarMonth}`} sub={`Năm ${dayInfo.lunarYear}`} />
              <Row label="Tiết khí" value={dayInfo.solarTerm || '—'} />
              <Row label="Trực tinh" value={dayInfo.fitness.name} />
              <Row label="Cung hoàng đạo" value={dayInfo.zodiac} />
            </div>
          </div>

          {/* Flying stars */}
          <div className="mt-2 pt-2 border-t border-amber-900/20">
            <div className="text-[7px] uppercase tracking-wider text-zinc-600 mb-1">Phi tinh (Cửu tinh)</div>
            <div className="grid grid-cols-3 gap-1">
              {['year','month','day','hour'].filter(k => (dayInfo.flyingStars as any)[k]).map(k => {
                const fs = (dayInfo.flyingStars as any)[k]
                return (
                  <div key={k} className="bg-black/40 rounded px-1.5 py-0.5 flex items-center gap-1">
                    <span className="text-[6px] text-zinc-600 uppercase w-5">{k === 'hour' ? 'Giờ' : k === 'day' ? 'Ngày' : k === 'month' ? 'Tháng' : 'Năm'}</span>
                    <span className="text-[9px] font-semibold text-amber-400/80">{fs.number}</span>
                    <span className="text-[7px] text-zinc-500">{fs.name}</span>
                  </div>
                )
              })}
            </div>
          </div>

          {/* PengZu */}
          {dayInfo.pengZu.length > 0 && (
            <div className="mt-2 pt-2 border-t border-amber-900/20">
              <div className="text-[7px] uppercase tracking-wider text-zinc-600 mb-1">Bành Tổ kỵ</div>
              <div className="flex flex-wrap gap-1">
                {dayInfo.pengZu.map((p: string, i: number) => (
                  <span key={i} className="text-[8px] px-1.5 py-0.5 rounded bg-bad/10 text-bad/70 border border-bad/20">{p}</span>
                ))}
              </div>
            </div>
          )}

          {/* Thần sát */}
          {dayInfo.flags.length > 0 && (
            <div className="mt-2 pt-2 border-t border-amber-900/20">
              <div className="text-[7px] uppercase tracking-wider text-zinc-600 mb-1">Thần sát</div>
              <div className="flex flex-wrap gap-1">
                {dayInfo.flags.map((f: any, i: number) => {
                  const isGood = typeof f === 'object' ? (f as any).auspicious : true
                  const name = typeof f === 'object' ? (f as any).name : String(f)
                  return (
                    <span key={i} className={`text-[8px] px-1.5 py-0.5 rounded border ${isGood ? 'bg-good/8 text-good/70 border-good/20' : 'bg-bad/8 text-bad/70 border-bad/20'}`}>
                      {name}
                    </span>
                  )
                })}
              </div>
            </div>
          )}
        </div>

      </main>
    </div>
  )
}

function Row({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="flex items-center justify-between py-0.5 px-2 rounded bg-black/30">
      <span className="text-[8px] text-zinc-600">{label}</span>
      <div className="flex items-center gap-1">
        <span className="text-[10px] font-medium text-foreground">{value}</span>
        {sub && <span className="text-[7px] text-zinc-600">({sub})</span>}
      </div>
    </div>
  )
}
