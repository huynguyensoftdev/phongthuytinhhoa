'use client'

import { useState, useMemo } from 'react'
import { evaluateTamThuc } from '@/lib/tamthuc'
import { getDayInfo, getMonthDays } from '@/lib/lich'
import {
  STEM_VN, BRANCH_VN, vnCanChi, vnText, GENERAL_VN,
  DOOR_VN, FLYING_STAR_VN, PALACE_VN,
  ANIMAL_VN, ZODIAC_VN, LIUREN_METHOD_VN, getDayElement,
  computeBatMonDaiDon, PALACE_DOOR_HOME,
} from '@/lib/vn'
import { ThemeSwitcher } from '@/components/ThemeProvider'
import { SunMoon, ChevronLeft, ChevronRight, Clock, ClipboardList, Sun, Globe, Users, BarChart3, Calendar } from 'lucide-react'

const CAN_COLORS: Record<string, string> = {
  '甲': 'text-emerald-600', '乙': 'text-emerald-600',
  '丙': 'text-red-600', '丁': 'text-red-600',
  '戊': 'text-amber-600', '己': 'text-amber-600',
  '庚': 'text-stone-600', '辛': 'text-stone-600',
  '壬': 'text-blue-600', '癸': 'text-blue-600',
}

const ELEMENT_COLOR: Record<string, string> = {
  'Mộc': 'text-emerald-600', 'Hỏa': 'text-red-600',
  'Thổ': 'text-amber-600', 'Kim': 'text-zinc-500',
  'Thủy': 'text-blue-600',
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
  const batMon = useMemo(() => {
    const hourBranch = dayInfo.canChi.hour[1] || '子'
    return computeBatMonDaiDon(dayInfo.lunarMonth, dayInfo.lunarDay, hourBranch)
  }, [dayInfo])
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
      <header className="sticky top-0 z-20 bg-[var(--card-bg)]/90 backdrop-blur-lg border-b border-[var(--card-border)]">
        <div className="max-w-md mx-auto flex items-center justify-between px-3 py-3">
          <div className="flex items-center gap-2.5">
            <SunMoon className="w-4 h-4 opacity-80" />
            <span className="text-[11px] font-semibold tracking-[0.3em] text-[var(--primary)]/80">LỊCH PHONG THUỶ</span>
          </div>
          <div className="flex items-center gap-2">
            <ThemeSwitcher />
            <button onClick={goToday} className="text-xs px-3 py-1.5 rounded-lg border border-[var(--card-border)] text-[var(--primary)]/70 hover:text-[var(--primary)] hover:border-[var(--primary)]/30 transition-all duration-300">
              Hôm nay
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-md mx-auto px-3 py-3 space-y-3">

        {/* ===== CHUYỂN NGÀY ===== */}
        <div className="flex items-center gap-2">
          <button onClick={() => goDay(-1)} className="w-10 h-10 rounded-xl bg-[var(--card-bg)] border border-[var(--card-border)] flex items-center justify-center text-[var(--text-muted)] hover:border-[var(--primary)]/30 hover:text-[var(--primary)] active:scale-90 transition-all duration-200"><ChevronLeft className="w-5 h-5" /></button>
          <div className="flex-1 flex flex-col items-center py-2.5 rounded-xl bg-[var(--card-bg)] border border-[var(--card-border)]">
            <span className="text-base font-bold text-[var(--foreground)]">{pd < 10 ? '0'+pd : pd}/{pm < 10 ? '0'+pm : pm}/{py}</span>
            <span className="text-xs text-[var(--text-muted)]">{dow}{isToday ? ' · Hôm nay' : ''}</span>
            <span className="text-[10px] text-[var(--text-subtle)] mt-0.5">{dayInfo.lunarDay}/{dayInfo.lunarMonth}/{dayInfo.lunarYear} âm lịch</span>
          </div>
          <button onClick={() => goDay(1)} className="w-10 h-10 rounded-xl bg-[var(--card-bg)] border border-[var(--card-border)] flex items-center justify-center text-[var(--text-muted)] hover:border-[var(--primary)]/30 hover:text-[var(--primary)] active:scale-90 transition-all duration-200"><ChevronRight className="w-5 h-5" /></button>
        </div>

        {/* ===== LÁ SỐ ===== */}
        <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] overflow-hidden card-glow">
          <div className="px-3 pt-3 pb-2">
            <div className="grid grid-cols-4 gap-1.5 mb-3">
              {[
                { l: 'Năm', v: dayInfo.canChi.year },
                { l: 'Tháng', v: dayInfo.canChi.month },
                { l: 'Ngày', v: dayInfo.canChi.day },
                { l: 'Giờ', v: dayInfo.canChi.hour },
              ].map(p => (
                <div key={p.l} className="bg-[var(--card-sub)] rounded-lg py-2 text-center border border-transparent hover:border-[var(--primary)]/10 transition-colors">
                  <div className="text-[10px] text-[var(--text-muted)] mb-0.5">{p.l}</div>
                  <div className={`text-base font-bold tracking-wider ${CAN_COLORS[p.v[0]] || CAN_COLORS[STEM_VN[p.v[0]]] || ''}`}>{vnCanChi(p.v)}</div>
                </div>
              ))}
            </div>
            <div className="text-center text-xs text-[var(--text-muted)]">
              {dayInfo.solarTerm && <span>Tiết {vnText(dayInfo.solarTerm)} ({vnText(result.diaLoi.kyMon.escapeMode as string)} {result.diaLoi.kyMon.juShu as string}) · </span>}
              Trực {vnText(dayInfo.fitness.name)} · <span className={ELEMENT_COLOR[getDayElement(dayInfo.canChi.day)]}>Ngũ hành {getDayElement(dayInfo.canChi.day)}</span>
            </div>
          </div>

          <div className="mx-3 divider-gold" />

          <div className="px-3 py-3 flex items-center gap-3">
            <div className={`w-12 h-12 rounded-full flex-shrink-0 flex items-center justify-center border-2 ${isGood ? 'border-[var(--good)]/40 animate-glow' : isBad ? 'border-[var(--bad)]/40' : 'border-[var(--neutral)]/40'}`}>
              <div className="text-center leading-tight">
                <div className={`text-sm font-black tracking-wider ${isGood ? 'text-[var(--good)]' : isBad ? 'text-[var(--bad)]' : 'text-[var(--neutral)]'}`}>{scoreLabel}</div>
                <div className={`text-[9px] font-medium ${isGood ? 'text-[var(--good)]' : isBad ? 'text-[var(--bad)]' : 'text-[var(--neutral)]'}`}>{result.tongDiem > 0 ? '+' : ''}{result.tongDiem}</div>
              </div>
            </div>
            <div className="flex-1 grid grid-cols-3 gap-1.5">
              {(['thienThoi','diaLoi','nhanHoa'] as const).map((k, i) => {
                const d = result[k]; const l = ['Thiên','Địa','Nhân'][i]
                return (
                  <div key={k} className={`text-center py-1.5 rounded ${d.diem >= 2 ? 'bg-[var(--good-bg)]' : d.diem >= 0 ? 'bg-[var(--card-sub)]' : 'bg-[var(--bad-bg)]'}`}>
                    <div className={`text-sm font-bold ${d.diem >= 2 ? 'text-[var(--good)]' : d.diem >= 0 ? 'text-[var(--text-muted)]' : 'text-[var(--bad)]'}`}>{d.diem > 0 ? '+' : ''}{d.diem}</div>
                    <div className="text-[9px] text-[var(--text-muted)]">{l}</div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* ===== GIỜ HOÀNG ĐẠO ===== */}
        {dayInfo.hourGood.length > 0 && (
          <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] px-3 py-2.5 card-glow">
            <div className="flex items-center gap-1.5 mb-2">
              <Clock className="w-3.5 h-3.5 text-[var(--primary)]/60" />
              <span className="text-xs uppercase tracking-[0.15em] text-[var(--text-muted)]">Hoàng đạo</span>
              <span className="text-[10px] text-[var(--text-subtle)]">· {dayInfo.hourGood.length} khung giờ</span>
            </div>
            <div className="grid grid-cols-6 gap-1">
              {dayInfo.hourGood.map((h: any, i: number) => (
                <div key={i} className="text-center py-1.5 rounded bg-[var(--good-bg)] border border-[var(--good)]/10">
                  <div className="text-sm font-bold text-[var(--good)]/80">{h.hour}</div>
                  <div className="text-[8px] text-[var(--text-muted)]">{h.time}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ===== NHẬN XÉT TAM THỨC ===== */}
        <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] px-3 py-2.5 card-glow">
          <div className="flex items-center gap-1.5 mb-2.5">
            <ClipboardList className="w-3.5 h-3.5 text-[var(--primary)]/60" />
            <span className="text-xs uppercase tracking-[0.15em] text-[var(--text-muted)]">Nhận xét Tam Thức</span>
          </div>
          <div className="space-y-2">
            {([
              { key: 'thienThoi' as const, label: 'Thiên thời', icon: Sun, color: result.thienThoi.diem >= 2 ? 'text-[var(--good)]' : result.thienThoi.diem >= 0 ? 'text-[var(--text-muted)]' : 'text-[var(--bad)]', nx: result.thienThoi.nhanXet, diem: result.thienThoi.diem },
              { key: 'diaLoi' as const, label: 'Địa lợi', icon: Globe, color: result.diaLoi.diem >= 2 ? 'text-[var(--good)]' : result.diaLoi.diem >= 0 ? 'text-[var(--text-muted)]' : 'text-[var(--bad)]', nx: result.diaLoi.nhanXet, diem: result.diaLoi.diem },
              { key: 'nhanHoa' as const, label: 'Nhân hòa', icon: Users, color: result.nhanHoa.diem >= 2 ? 'text-[var(--good)]' : result.nhanHoa.diem >= 0 ? 'text-[var(--text-muted)]' : 'text-[var(--bad)]', nx: result.nhanHoa.nhanXet, diem: result.nhanHoa.diem },
            ]).map(col => {
              const IconComp = col.icon
              return (
              <div key={col.key} className="flex items-start gap-2.5 rounded-lg bg-[var(--card-sub)] px-3 py-2 border border-transparent hover:border-[var(--primary)]/10 transition-colors">
                <IconComp className="w-4 h-4 shrink-0 mt-0.5 text-[var(--text-muted)]" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className={`text-xs font-bold ${col.color}`}>{col.label}</span>
                    <span className={`text-xs font-bold ${col.color}`}>({col.diem > 0 ? '+' : ''}{col.diem})</span>
                  </div>
                  {col.nx.map((n, i) => (
                    <p key={i} className="text-[10px] text-[var(--text-muted)] leading-relaxed">{n}</p>
                  ))}
                </div>
              </div>
              )
            })}
          </div>
        </div>

        {/* ===== BÁT MÔN ĐẠI ĐỘN + LỤC NHÂM ===== */}
        <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] px-3 py-2.5 card-glow">
          <div className="flex items-center gap-1.5 mb-2.5">
            <span className="text-xs uppercase tracking-[0.15em] text-[var(--text-muted)]">Bát Môn Đại Độn</span>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-3">
            <div>
              <div className="text-[10px] text-[var(--text-muted)] mb-1.5 font-medium">Bát môn — Cửu cung</div>
              <div className="grid grid-cols-3 gap-0.5 max-w-[180px]">
                {[4, 9, 2, 3, 5, 7, 8, 1, 6].map(palace => {
                  const doorCn = PALACE_DOOR_HOME[palace] || ''
                  const dVn = DOOR_VN[doorCn] || doorCn
                  const isActive = batMon.activePalace === palace
                  const isDoorGood = doorCn === '休' || doorCn === '生' || doorCn === '開'
                  const isDoorBad = doorCn === '杜' || doorCn === '傷' || doorCn === '死' || doorCn === '驚'
                  const isEmpty = !doorCn
                  return (
                    <div key={palace} className={`text-center py-2 rounded transition-colors relative ${isEmpty ? 'bg-[var(--card-sub)]' : isActive ? 'bg-[var(--primary)]/15 ring-2 ring-[var(--primary)]/40' : isDoorGood ? 'bg-[var(--good-bg)]' : isDoorBad ? 'bg-[var(--bad-bg)]' : 'bg-[var(--card-sub)]'}`}>
                      <div className={`text-sm font-bold ${isEmpty ? 'text-[var(--text-subtle)]' : isActive ? 'text-[var(--primary)]' : isDoorGood ? 'text-[var(--good)]' : isDoorBad ? 'text-[var(--bad)]' : 'text-[var(--text-muted)]'}`}>
                        {isEmpty ? '—' : isActive ? `✦${dVn}` : dVn}
                      </div>
                      <div className="text-[8px] text-[var(--text-subtle)]">{PALACE_VN[String(palace)] || palace}</div>
                    </div>
                  )
                })}
              </div>
              <div className="mt-1 text-[9px] text-[var(--text-subtle)] text-center">
                Cửa chủ: {DOOR_VN[batMon.activeDoorCn] || batMon.activeDoorVn} ({PALACE_VN[String(batMon.activePalace)]})
              </div>
            </div>
            <div>
              <div className="text-[10px] text-[var(--text-muted)] mb-1.5 font-medium">Lục Nhâm</div>
              <div className="bg-[var(--card-sub)] rounded-lg px-2.5 py-2">
                <div className="text-[10px] text-[var(--text-muted)]">Tam truyền</div>
                <div className="flex items-center gap-1.5 mt-1">
                  {(() => {
                    const t = result.thienThoi.lucNham.transmissions as any
                    return t ? [t.initial, t.middle, t.final].map((step: string, i: number) => (
                      <div key={i} className="flex items-center gap-1.5">
                        <span className="text-xs font-semibold text-[var(--primary)] bg-[var(--primary)]/12 px-2 py-0.5 rounded">{BRANCH_VN[step] || step}</span>
                        {i < 2 && <span className="text-[var(--text-subtle)] text-[10px]">→</span>}
                      </div>
                    )) : null
                  })()}
                </div>
                <div className="text-[10px] text-[var(--text-muted)] mt-1.5">
                  Phép: {LIUREN_METHOD_VN[result.thienThoi.lucNham.method as string] || result.thienThoi.lucNham.method} ·
                  Nguyệt: {BRANCH_VN[result.thienThoi.lucNham.monthlyGeneral as string] || result.thienThoi.lucNham.monthlyGeneral}
                </div>
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-[var(--card-border)]">
            <div className="text-[10px] text-[var(--text-muted)] mb-2 font-medium">12 Thiên tướng</div>
            <div className="grid grid-cols-6 gap-0.5">
              {result.thienThoi.lucNham.generals && Object.entries(result.thienThoi.lucNham.generals as Record<string, string>).map(([branch, gen]) => {
                const gVn = GENERAL_VN[gen] || gen
                const isGoodGen = ['貴人','青龍','六合','太常','太陰'].includes(gen)
                const isBadGen = ['白虎','螣蛇','玄武'].includes(gen)
                return (
                  <div key={branch} className="text-center py-1 rounded bg-[var(--card-sub)]">
                    <div className="text-[9px] text-[var(--text-muted)]">{BRANCH_VN[branch] || branch}</div>
                    <div className={`text-[10px] font-medium ${isGoodGen ? 'text-[var(--good)]/70' : isBadGen ? 'text-[var(--bad)]/70' : 'text-[var(--text-muted)]'}`}>{gVn}</div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* ===== TỔNG QUAN NGÀY ===== */}
        <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] px-3 py-2.5 card-glow">
          <div className="flex items-center gap-1.5 mb-2.5">
            <BarChart3 className="w-3.5 h-3.5 text-[var(--primary)]/60" />
            <span className="text-xs uppercase tracking-[0.15em] text-[var(--text-muted)]">Tổng quan ngày · Can Chi & Ngũ Hành</span>
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
              <Row label="Ngũ hành" value={getDayElement(dayInfo.canChi.day)} />
              <Row label="Cung hoàng đạo" value={ZODIAC_VN[dayInfo.zodiac] || dayInfo.zodiac} />
            </div>
          </div>

          <div className="mt-3 pt-3 border-t border-[var(--card-border)]">
            <div className="text-[10px] text-[var(--text-muted)] mb-1.5 font-medium">Phi tinh (Cửu tinh)</div>
            <div className="grid grid-cols-2 gap-1">
              {['year','month','day','hour'].filter(k => (dayInfo.flyingStars as any)[k]?.number).map(k => {
                const fs = (dayInfo.flyingStars as any)[k]
                return (
                  <div key={k} className="bg-[var(--card-sub)] rounded px-2 py-1.5 flex items-center gap-2">
                    <span className="text-[8px] text-[var(--text-muted)] uppercase w-7">{k === 'hour' ? 'Giờ' : k === 'day' ? 'Ngày' : k === 'month' ? 'Tháng' : 'Năm'}</span>
                    <span className="text-xs font-semibold text-[var(--primary)]">{fs.number}</span>
                    <span className="text-[10px] text-[var(--text-muted)]">{FLYING_STAR_VN[fs.name] || fs.name}</span>
                  </div>
                )
              })}
            </div>
          </div>

          {dayInfo.pengZu.length > 0 && (
            <div className="mt-3 pt-3 border-t border-[var(--card-border)]">
              <div className="text-[10px] text-[var(--text-muted)] mb-1.5 font-medium">Bành Tổ kỵ</div>
              <div className="flex flex-wrap gap-1.5">
                {dayInfo.pengZu.map((p: string, i: number) => (
                  <span key={i} className="text-xs px-2 py-0.5 rounded bg-[var(--bad-bg)] text-[var(--bad)]/70 border border-[var(--bad)]/20">{vnText(p)}</span>
                ))}
              </div>
            </div>
          )}

          {dayInfo.flags.length > 0 && (
            <div className="mt-3 pt-3 border-t border-[var(--card-border)]">
              <div className="text-[10px] text-[var(--text-muted)] mb-1.5 font-medium">Thần sát</div>
              <div className="flex flex-wrap gap-1.5">
                {dayInfo.flags.map((f: any, i: number) => {
                  const rawName = typeof f === 'object' ? (f as any).name : String(f)
                  const isGood = typeof f === 'object' ? (f as any).auspicious : true
                  const name = vnText(rawName) || rawName
                  return (
                    <span key={i} className={`text-xs px-2 py-0.5 rounded border ${isGood ? 'bg-[var(--good-bg)] text-[var(--good)]/70 border-[var(--good)]/20' : 'bg-[var(--bad-bg)] text-[var(--bad)]/70 border-[var(--bad)]/20'}`}>
                      {name}
                    </span>
                  )
                })}
              </div>
            </div>
          )}
        </div>

        {/* ===== LỊCH THÁNG ===== */}
        <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] px-3 py-2.5 card-glow">
          <div className="flex items-center justify-between mb-2.5">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[var(--primary)]/60" />
              <span className="text-xs uppercase tracking-[0.15em] text-[var(--text-muted)]">Lịch tháng</span>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => navCal(-1)} className="w-7 h-7 rounded bg-[var(--card-sub)] border border-[var(--card-border)] text-[var(--text-muted)] flex items-center justify-center hover:border-[var(--primary)]/30 hover:text-[var(--primary)] transition-all duration-200"><ChevronLeft className="w-4 h-4" /></button>
              <span className="text-xs font-semibold text-[var(--foreground)] w-16 text-center">Tháng {calMonth}</span>
              <button onClick={() => navCal(1)} className="w-7 h-7 rounded bg-[var(--card-sub)] border border-[var(--card-border)] text-[var(--text-muted)] flex items-center justify-center hover:border-[var(--primary)]/30 hover:text-[var(--primary)] transition-all duration-200"><ChevronRight className="w-4 h-4" /></button>
            </div>
          </div>
          <div className="grid grid-cols-7 gap-px">
            {['T2','T3','T4','T5','T6','T7','CN'].map(d => (
              <div key={d} className="text-center text-[9px] text-[var(--text-muted)] py-1.5">{d}</div>
            ))}
            {blanks.map((_, i) => <div key={`b-${i}`} className="py-2" />)}
            {monthDays.map((d, i) => {
              const isSel = calYear === py && calMonth === pm && d.lunarDay === pd
              const isToday2 = d.solarDate === todayStr
              return (
                <button key={i} onClick={() => pickDate(d.lunarDay)}
                  className={`text-center py-2 text-xs rounded-sm transition-all relative
                    ${isSel ? 'bg-[var(--primary)]/20 text-[var(--primary)] font-bold ring-1 ring-[var(--primary)]/40' : 'hover:bg-[var(--card-sub)] text-[var(--text-muted)]'}
                    ${d.fitness.auspicious && !isSel ? 'text-[var(--good)]' : ''}`}>
                  {d.lunarDay}
                  <div className={`h-0.5 w-0.5 mx-auto rounded-full mt-0.5 ${d.fitness.auspicious ? 'bg-[var(--good)]/50' : 'bg-[var(--text-subtle)]'}`} />
                </button>
              )
            })}
          </div>
          <div className="flex gap-4 justify-center mt-2">
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-sm bg-[var(--good)]/30" />
              <span className="text-[9px] text-[var(--text-muted)]">Tốt</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-sm bg-[var(--primary)]/30" />
              <span className="text-[9px] text-[var(--text-muted)]">Đã chọn</span>
            </div>
          </div>
        </div>

      </main>
    </div>
  )
}

function Row({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="flex items-center justify-between py-1 px-2 rounded bg-[var(--card-sub)] border border-transparent hover:border-[var(--primary)]/10 transition-colors">
      <span className="text-[10px] text-[var(--text-muted)]">{label}</span>
      <div className="flex items-center gap-1.5">
        <span className="text-xs font-medium text-[var(--foreground)]">{value}</span>
        {sub && <span className="text-[9px] text-[var(--text-subtle)]">({sub})</span>}
      </div>
    </div>
  )
}
