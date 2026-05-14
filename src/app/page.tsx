'use client'

import { useState, useMemo } from 'react'
import { evaluateTamThuc } from '@/lib/tamthuc'
import { getDayInfo, getMonthDays } from '@/lib/lich'
import {
  STEM_VN, BRANCH_VN, vnCanChi, vnText, GENERAL_VN,
  DOOR_VN, FLYING_STAR_VN, PALACE_VN,
  ANIMAL_VN, ZODIAC_VN, LIUREN_METHOD_VN, getDayElement,
} from '@/lib/vn'

const CAN_COLORS: Record<string, string> = {
  '甲': 'text-green-700', '乙': 'text-green-600',
  '丙': 'text-red-600', '丁': 'text-red-500',
  '戊': 'text-amber-700', '己': 'text-amber-600',
  '庚': 'text-zinc-500', '辛': 'text-zinc-400',
  '壬': 'text-blue-700', '癸': 'text-blue-600',
}

const SCORE_GOOD = 4
const SCORE_BAD = 0

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
    setBaseDate(new Date(y, m - 1, 1))
  }

  const weekdays = ['Chủ nhật', 'Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu', 'Thứ bảy']
  const dow = weekdays[date.getDay()]
  const isToday = date.toDateString() === today.toDateString()
  const scoreLabel = result.tongDiem >= SCORE_GOOD ? 'TỐT' : result.tongDiem >= SCORE_BAD ? 'TRUNG' : 'XẤU'
  const isGood = result.tongDiem >= SCORE_GOOD
  const isBad = result.tongDiem < SCORE_BAD

  const firstDay = new Date(calYear, calMonth - 1, 1).getDay()
  const blanks = Array(firstDay === 0 ? 6 : firstDay - 1).fill(null)
  const todayStr = `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Header */}
      <header className="sticky top-0 z-20 bg-[var(--card-bg)]/95 backdrop-blur border-b border-[var(--card-border)]">
        <div className="max-w-md mx-auto flex items-center justify-between px-3 py-3">
          <div className="flex items-center gap-2">
            <span className="text-lg">☯</span>
            <span className="text-xs font-semibold tracking-[0.25em] text-[var(--primary)]">TINH HOA</span>
          </div>
          <button onClick={goToday} className="text-xs px-3 py-1.5 rounded-md border border-[var(--card-border)] text-[var(--primary)] hover:border-[var(--primary-dark)]/50 transition-colors">
            Hôm nay
          </button>
        </div>
      </header>

      <main className="max-w-md mx-auto px-3 py-3 space-y-3">

        {/* ===== CHUYỂN NGÀY ===== */}
        <div className="flex items-center gap-2">
          <button onClick={() => goDay(-1)} className="w-10 h-10 rounded-xl bg-[var(--card-bg)] border border-[var(--card-border)] flex items-center justify-center text-zinc-500 hover:border-[var(--primary-dark)]/50 active:scale-90 text-lg">‹</button>
          <div className="flex-1 flex flex-col items-center py-2 rounded-xl bg-[var(--card-bg)] border border-[var(--card-border)]">
            <span className="text-base font-bold text-[var(--foreground)]">{pd < 10 ? '0'+pd : pd}/{pm < 10 ? '0'+pm : pm}/{py}</span>
            <span className="text-xs text-zinc-500">{dow}{isToday ? ' · Hôm nay' : ''}</span>
            <span className="text-[10px] text-zinc-400 mt-0.5">{dayInfo.lunarDay}/{dayInfo.lunarMonth}/{dayInfo.lunarYear} âm lịch</span>
          </div>
          <button onClick={() => goDay(1)} className="w-10 h-10 rounded-xl bg-[var(--card-bg)] border border-[var(--card-border)] flex items-center justify-center text-zinc-500 hover:border-[var(--primary-dark)]/50 active:scale-90 text-lg">›</button>
        </div>

        {/* ===== LÁ SỐ ===== */}
        <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] overflow-hidden shadow-sm">
          <div className="px-3 pt-3 pb-2">
            <div className="grid grid-cols-4 gap-1.5 mb-3">
              {[
                { l: 'Năm', v: dayInfo.canChi.year },
                { l: 'Tháng', v: dayInfo.canChi.month },
                { l: 'Ngày', v: dayInfo.canChi.day },
                { l: 'Giờ', v: dayInfo.canChi.hour },
              ].map(p => (
                <div key={p.l} className="bg-[var(--card-sub)] rounded-lg py-2 text-center">
                  <div className="text-[10px] text-zinc-500 mb-0.5">{p.l}</div>
                  <div className={`text-base font-bold tracking-wider ${CAN_COLORS[p.v[0]] || CAN_COLORS[STEM_VN[p.v[0]]] || ''} text-[var(--foreground)]`}>{vnCanChi(p.v)}</div>
                </div>
              ))}
            </div>
            <div className="text-center text-xs text-zinc-500">
              {dayInfo.solarTerm && <span>Tiết {vnText(dayInfo.solarTerm)} · </span>}
              Trực {vnText(dayInfo.fitness.name)} · Ngũ hành {getDayElement(dayInfo.canChi.day)}
            </div>
          </div>

          <div className="mx-3 h-px bg-gradient-to-r from-transparent via-[var(--card-border)] to-transparent" />

          <div className="px-3 py-3 flex items-center gap-3">
            <div className={`w-12 h-12 rounded-full flex-shrink-0 flex items-center justify-center border-2 ${isGood ? 'border-good/40' : isBad ? 'border-bad/40' : 'border-zinc-400'}`}>
              <div className="text-center leading-tight">
                <div className={`text-sm font-black tracking-wider ${isGood ? 'text-good' : isBad ? 'text-bad' : 'text-neutral'}`}>{scoreLabel}</div>
                <div className={`text-[9px] font-medium ${isGood ? 'text-good' : isBad ? 'text-bad' : 'text-neutral'}`}>{result.tongDiem > 0 ? '+' : ''}{result.tongDiem}</div>
              </div>
            </div>
            <div className="flex-1 grid grid-cols-3 gap-1.5">
              {(['thienThoi','diaLoi','nhanHoa'] as const).map((k, i) => {
                const d = result[k]; const l = ['Thiên','Địa','Nhân'][i]
                return (
                  <div key={k} className={`text-center py-1.5 rounded ${d.diem >= 2 ? 'bg-good/8' : d.diem >= 0 ? 'bg-[var(--card-sub)]' : 'bg-bad/8'}`}>
                    <div className={`text-sm font-bold ${d.diem >= 2 ? 'text-good' : d.diem >= 0 ? 'text-zinc-500' : 'text-bad'}`}>{d.diem > 0 ? '+' : ''}{d.diem}</div>
                    <div className="text-[9px] text-zinc-500">{l}</div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* ===== GIỜ HOÀNG ĐẠO ===== */}
        {dayInfo.hourGood.length > 0 && (
          <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] px-3 py-2.5">
            <div className="flex items-center gap-1.5 mb-2">
              <span className="text-[var(--primary)]/60 text-xs">🕐</span>
              <span className="text-xs uppercase tracking-[0.15em] text-zinc-500">Hoàng đạo</span>
              <span className="text-[10px] text-zinc-400">· {dayInfo.hourGood.length} khung giờ</span>
            </div>
            <div className="grid grid-cols-6 gap-1">
              {dayInfo.hourGood.map((h: any, i: number) => (
                <div key={i} className="text-center py-1.5 rounded bg-good/5 border border-good/10">
                  <div className="text-sm font-bold text-good/80">{h.hour}</div>
                  <div className="text-[8px] text-zinc-500">{h.time}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ===== NHẬN XÉT TAM THỨC ===== */}
        <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] px-3 py-2.5">
          <div className="flex items-center gap-1.5 mb-2.5">
            <span className="text-[var(--primary)]/60 text-xs">📋</span>
            <span className="text-xs uppercase tracking-[0.15em] text-zinc-500">Nhận xét Tam Thức</span>
          </div>
          <div className="space-y-2">
            {([
              { key: 'thienThoi' as const, label: 'Thiên thời', icon: '🌤', color: result.thienThoi.diem >= 2 ? 'text-good' : result.thienThoi.diem >= 0 ? 'text-zinc-500' : 'text-bad', nx: result.thienThoi.nhanXet, diem: result.thienThoi.diem },
              { key: 'diaLoi' as const, label: 'Địa lợi', icon: '🌍', color: result.diaLoi.diem >= 2 ? 'text-good' : result.diaLoi.diem >= 0 ? 'text-zinc-500' : 'text-bad', nx: result.diaLoi.nhanXet, diem: result.diaLoi.diem },
              { key: 'nhanHoa' as const, label: 'Nhân hòa', icon: '👥', color: result.nhanHoa.diem >= 2 ? 'text-good' : result.nhanHoa.diem >= 0 ? 'text-zinc-500' : 'text-bad', nx: result.nhanHoa.nhanXet, diem: result.nhanHoa.diem },
            ]).map(col => (
              <div key={col.key} className="flex items-start gap-2.5 rounded-lg bg-[var(--card-sub)] px-3 py-2">
                <span className="text-sm shrink-0 mt-0.5">{col.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className={`text-xs font-bold ${col.color}`}>{col.label}</span>
                    <span className={`text-xs font-bold ${col.color}`}>({col.diem > 0 ? '+' : ''}{col.diem})</span>
                  </div>
                  {col.nx.map((n, i) => (
                    <p key={i} className="text-[10px] text-zinc-600 leading-relaxed">{n}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ===== KỲ MÔN + LỤC NHÂM ===== */}
        <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] px-3 py-2.5">
          <div className="flex items-center gap-1.5 mb-2.5">
            <span className="text-[var(--primary)]/60 text-xs">🚪</span>
            <span className="text-xs uppercase tracking-[0.15em] text-zinc-500">Kỳ Môn Độn Giáp</span>
            <span className="text-[10px] text-zinc-400 ml-auto">{vnText(result.diaLoi.kyMon.escapeMode as string)} · Cục {result.diaLoi.kyMon.juShu as string}</span>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-3">
            <div>
              <div className="text-[10px] text-zinc-500 mb-1.5 font-medium">Bát môn — Cửu cung</div>
              <div className="grid grid-cols-3 gap-0.5 max-w-[180px]">
                {[4, 9, 2, 3, 5, 7, 8, 1, 6].map(palace => {
                  const doors = result.diaLoi.kyMon.doors as Record<string, string> | undefined
                  const door = doors?.[String(palace)] || ''
                  const dVn = DOOR_VN[door] || door
                  const isDoorGood = door === '休' || door === '生' || door === '開'
                  const isDoorBad = door === '杜' || door === '傷' || door === '死' || door === '驚'
                  const isEmpty = !door
                  return (
                    <div key={palace} className={`text-center py-2 rounded ${isEmpty ? 'bg-[var(--card-sub)]' : isDoorGood ? 'bg-good/8' : isDoorBad ? 'bg-bad/8' : 'bg-[var(--card-sub)]'}`}>
                      <div className={`text-sm font-bold ${isEmpty ? 'text-zinc-400' : isDoorGood ? 'text-good' : isDoorBad ? 'text-bad' : 'text-zinc-500'}`}>
                        {isEmpty ? '—' : dVn}
                      </div>
                      <div className="text-[8px] text-zinc-400">{PALACE_VN[String(palace)] || palace}</div>
                    </div>
                  )
                })}
              </div>
            </div>
            <div>
              <div className="text-[10px] text-zinc-500 mb-1.5 font-medium">Lục Nhâm</div>
              <div className="bg-[var(--card-sub)] rounded-lg px-2.5 py-2">
                <div className="text-[10px] text-zinc-500">Tam truyền</div>
                <div className="flex items-center gap-1.5 mt-1">
                  {(() => {
                    const t = result.thienThoi.lucNham.transmissions as any
                    return t ? [t.initial, t.middle, t.final].map((step: string, i: number) => (
                      <div key={i} className="flex items-center gap-1.5">
                        <span className="text-xs font-semibold text-[var(--primary)] bg-[var(--primary)]/10 px-2 py-0.5 rounded">{BRANCH_VN[step] || step}</span>
                        {i < 2 && <span className="text-zinc-400 text-[10px]">→</span>}
                      </div>
                    )) : null
                  })()}
                </div>
                <div className="text-[10px] text-zinc-500 mt-1.5">
                  Phép: {LIUREN_METHOD_VN[result.thienThoi.lucNham.method as string] || result.thienThoi.lucNham.method} ·
                  Nguyệt: {BRANCH_VN[result.thienThoi.lucNham.monthlyGeneral as string] || result.thienThoi.lucNham.monthlyGeneral}
                </div>
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-[var(--card-border)]">
            <div className="text-[10px] text-zinc-500 mb-2 font-medium">12 Thiên tướng</div>
            <div className="grid grid-cols-6 gap-0.5">
              {result.thienThoi.lucNham.generals && Object.entries(result.thienThoi.lucNham.generals as Record<string, string>).map(([branch, gen]) => {
                const gVn = GENERAL_VN[gen] || gen
                const isGoodGen = ['貴人','青龍','六合','太常','太陰'].includes(gen)
                const isBadGen = ['白虎','螣蛇','玄武'].includes(gen)
                return (
                  <div key={branch} className="text-center py-1 rounded bg-[var(--card-sub)]">
                    <div className="text-[9px] text-zinc-500">{BRANCH_VN[branch] || branch}</div>
                    <div className={`text-[10px] font-medium ${isGoodGen ? 'text-good/70' : isBadGen ? 'text-bad/70' : 'text-zinc-500'}`}>{gVn}</div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* ===== TỔNG QUAN NGÀY ===== */}
        <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] px-3 py-2.5">
          <div className="flex items-center gap-1.5 mb-2.5">
            <span className="text-[var(--primary)]/60 text-xs">📊</span>
            <span className="text-xs uppercase tracking-[0.15em] text-zinc-500">Tổng quan ngày · Can Chi & Ngũ Hành</span>
          </div>
          <div className="grid grid-cols-2 gap-1">
            <div className="space-y-1">
              <Row label="Năm" value={vnCanChi(dayInfo.canChi.year)} sub={ANIMAL_VN[dayInfo.animal] || dayInfo.animal} />
              <Row label="Tháng" value={vnCanChi(dayInfo.canChi.month)} />
              <Row label="Ngày" value={vnCanChi(dayInfo.canChi.day)} />
              <Row label="Giờ" value={vnCanChi(dayInfo.canChi.hour)} />
            </div>
            <div className="space-y-1">
              <Row label="Âm lịch" value={`${dayInfo.lunarDay}/${dayInfo.lunarMonth}`} sub={`Năm ${dayInfo.lunarYear}`} />
              <Row label="Tiết khí" value={dayInfo.solarTerm ? vnText(dayInfo.solarTerm) : '—'} />
              <Row label="Trực tinh" value={vnText(dayInfo.fitness.name)} />
              <Row label="Cung hoàng đạo" value={ZODIAC_VN[dayInfo.zodiac] || dayInfo.zodiac} />
            </div>
          </div>

          <div className="mt-3 pt-3 border-t border-[var(--card-border)]">
            <div className="text-[10px] text-zinc-500 mb-1.5 font-medium">Phi tinh (Cửu tinh)</div>
            <div className="grid grid-cols-2 gap-1">
              {['year','month','day','hour'].filter(k => (dayInfo.flyingStars as any)[k]).map(k => {
                const fs = (dayInfo.flyingStars as any)[k]
                return (
                  <div key={k} className="bg-[var(--card-sub)] rounded px-2 py-1.5 flex items-center gap-2">
                    <span className="text-[8px] text-zinc-500 uppercase w-7">{k === 'hour' ? 'Giờ' : k === 'day' ? 'Ngày' : k === 'month' ? 'Tháng' : 'Năm'}</span>
                    <span className="text-xs font-semibold text-[var(--primary)]">{fs.number}</span>
                    <span className="text-[10px] text-zinc-500">{FLYING_STAR_VN[fs.name] || fs.name}</span>
                  </div>
                )
              })}
            </div>
          </div>

          {dayInfo.pengZu.length > 0 && (
            <div className="mt-3 pt-3 border-t border-[var(--card-border)]">
              <div className="text-[10px] text-zinc-500 mb-1.5 font-medium">Bành Tổ kỵ</div>
              <div className="flex flex-wrap gap-1.5">
                {dayInfo.pengZu.map((p: string, i: number) => (
                  <span key={i} className="text-xs px-2 py-0.5 rounded bg-bad/10 text-bad/70 border border-bad/20">{vnText(p)}</span>
                ))}
              </div>
            </div>
          )}

          {dayInfo.flags.length > 0 && (
            <div className="mt-3 pt-3 border-t border-[var(--card-border)]">
              <div className="text-[10px] text-zinc-500 mb-1.5 font-medium">Thần sát</div>
              <div className="flex flex-wrap gap-1.5">
                {dayInfo.flags.map((f: any, i: number) => {
                  const rawName = typeof f === 'object' ? (f as any).name : String(f)
                  const isGood = typeof f === 'object' ? (f as any).auspicious : true
                  const name = vnText(rawName) || rawName
                  return (
                    <span key={i} className={`text-xs px-2 py-0.5 rounded border ${isGood ? 'bg-good/8 text-good/70 border-good/20' : 'bg-bad/8 text-bad/70 border-bad/20'}`}>
                      {name}
                    </span>
                  )
                })}
              </div>
            </div>
          )}
        </div>

        {/* ===== LỊCH THÁNG ===== */}
        <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] px-3 py-2.5">
          <div className="flex items-center justify-between mb-2.5">
            <div className="flex items-center gap-1.5">
              <span className="text-[var(--primary)]/60 text-xs">🗓</span>
              <span className="text-xs uppercase tracking-[0.15em] text-zinc-500">Lịch tháng</span>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => navCal(-1)} className="w-7 h-7 rounded bg-[var(--card-sub)] border border-[var(--card-border)] text-zinc-500 flex items-center justify-center text-xs hover:border-[var(--primary-dark)]/50">‹</button>
              <span className="text-xs font-semibold text-[var(--foreground)] w-16 text-center">Tháng {calMonth}</span>
              <button onClick={() => navCal(1)} className="w-7 h-7 rounded bg-[var(--card-sub)] border border-[var(--card-border)] text-zinc-500 flex items-center justify-center text-xs hover:border-[var(--primary-dark)]/50">›</button>
            </div>
          </div>
          <div className="grid grid-cols-7 gap-px">
            {['T2','T3','T4','T5','T6','T7','CN'].map(d => (
              <div key={d} className="text-center text-[9px] text-zinc-500 py-1.5">{d}</div>
            ))}
            {blanks.map((_, i) => <div key={`b-${i}`} className="py-2" />)}
            {monthDays.map((d, i) => {
              const isSel = calYear === py && calMonth === pm && d.lunarDay === pd
              const isToday2 = d.solarDate === todayStr
              return (
                <button key={i} onClick={() => pickDate(d.lunarDay)}
                  className={`text-center py-2 text-xs rounded-sm transition-all relative
                    ${isSel ? 'bg-[var(--primary)]/20 text-[var(--primary)] font-bold ring-1 ring-[var(--primary)]/40' : 'hover:bg-[var(--card-sub)] text-zinc-500'}
                    ${d.fitness.auspicious && !isSel ? 'text-good' : ''}`}>
                  {d.lunarDay}
                  <div className={`h-0.5 w-0.5 mx-auto rounded-full mt-0.5 ${d.fitness.auspicious ? 'bg-good/50' : 'bg-zinc-400'}`} />
                </button>
              )
            })}
          </div>
          <div className="flex gap-4 justify-center mt-2">
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-sm bg-good/30" />
              <span className="text-[9px] text-zinc-500">Tốt</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-sm bg-[var(--primary)]/30" />
              <span className="text-[9px] text-zinc-500">Đã chọn</span>
            </div>
          </div>
        </div>

      </main>
    </div>
  )
}

function Row({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="flex items-center justify-between py-1 px-2 rounded bg-[var(--card-sub)]">
      <span className="text-[10px] text-zinc-500">{label}</span>
      <div className="flex items-center gap-1.5">
        <span className="text-xs font-medium text-[var(--foreground)]">{value}</span>
        {sub && <span className="text-[9px] text-zinc-400">({sub})</span>}
      </div>
    </div>
  )
}
