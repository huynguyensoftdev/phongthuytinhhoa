import * as vn from '@min98/vnlunar'
import {
  dailyAlmanac,
  getAlmanacFlags,
  getFlyingStars,
  getDayFitnessForDate,
  getPengZuTabooForDate,
  getLunarMansionForDate,
} from '@4n6h4x0r/stem-branch'

export interface DayInfo {
  solarDate: string
  lunarDate: string
  lunarDay: number
  lunarMonth: number
  lunarYear: number
  isLeapMonth: boolean
  canChi: {
    day: string
    month: string
    year: string
    hour: string
  }
  dayOfWeek: string
  animal: string
  zodiac: string
  solarTerm: string | null
  fitness: {
    name: string
    auspicious: boolean
  }
  flyingStars: {
    year: any
    month: any
    day: any
    hour: any
  }
  flags: string[]
  goodFor: string[]
  badFor: string[]
  hourGood: { hour: string; time: string; name: string }[]
  hourBad: { hour: string; time: string }[]
  mansions: any
  pengZu: string[]
}

function getHourName(chiIndex: number): string {
  const names = ['Tý', 'Sửu', 'Dần', 'Mão', 'Thìn', 'Tỵ', 'Ngọ', 'Mùi', 'Thân', 'Dậu', 'Tuất', 'Hợi']
  return names[chiIndex] || ''
}

function getHourRange(chiIndex: number): string {
  const ranges = [
    '23:00-01:00', '01:00-03:00', '03:00-05:00', '05:00-07:00',
    '07:00-09:00', '09:00-11:00', '11:00-13:00', '13:00-15:00',
    '15:00-17:00', '17:00-19:00', '19:00-21:00', '21:00-23:00',
  ]
  return ranges[chiIndex] || ''
}

export function getDayInfo(date: Date): DayInfo {
  const almanac = dailyAlmanac(date)
  const flags = getAlmanacFlags(date)
  const fitness = getDayFitnessForDate(date)
  const pengZu = getPengZuTabooForDate(date)
  const mansion = getLunarMansionForDate(date)
  const flying = getFlyingStars(date)

  const goodHours: DayInfo['hourGood'] = []
  const badHours: DayInfo['hourBad'] = []

  const vnInfo = vn.getFullInfo(date.getDate(), date.getMonth() + 1, date.getFullYear()) as Record<string, any> | undefined

  if (vnInfo) {
    const jd = vn.jdn(date.getDate(), date.getMonth() + 1, date.getFullYear())
    const goodHoursRaw: string | undefined = vn.get_auspicious_hours?.(jd)
    if (goodHoursRaw) {
      const parts = goodHoursRaw.split('\n').join(',').split(',').map(s => s.trim()).filter(Boolean)
      for (const p of parts) {
        const match = p.match(/^([^\s(]+)\s*\(([^)]+)\)/)
        if (match) {
          goodHours.push({ hour: match[1], time: match[2], name: match[1] })
        }
      }
    }
    const allHours = (vnInfo as any).auspicious_hours
    if (typeof allHours === 'string') {
      const parts = allHours.split('\n').join(',').split(',').map(s => s.trim()).filter(Boolean)
      for (const p of parts) {
        const match = p.match(/^([^\s(]+)\s*\(([^)]+)\)/)
        if (match) {
          badHours.push({ hour: match[1], time: match[2] })
        }
      }
    }
  }

  const weekdays = ['Chủ nhật', 'Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu', 'Thứ bảy']

  const lunar = almanac.lunar

  return {
    solarDate: `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`,
    lunarDate: `${lunar.day}/${lunar.month}/${lunar.year}`,
    lunarDay: lunar.day,
    lunarMonth: lunar.month,
    lunarYear: lunar.year,
    isLeapMonth: lunar.isLeapMonth,
    canChi: {
      day: `${almanac.pillars.day.stem}${almanac.pillars.day.branch}`,
      month: `${almanac.pillars.month.stem}${almanac.pillars.month.branch}`,
      year: `${almanac.pillars.year.stem}${almanac.pillars.year.branch}`,
      hour: `${almanac.pillars.hour.stem}${almanac.pillars.hour.branch}`,
    },
    dayOfWeek: weekdays[date.getDay()],
    animal: almanac.chineseZodiac.animal,
    zodiac: almanac.westernZodiac.sign,
    solarTerm: almanac.solarTerm.current?.name || null,
    fitness: {
      name: (fitness as any).starName || (almanac as any).dayFitness.fitness || '',
      auspicious: (fitness as any).isAuspicious ?? (almanac as any).dayFitness.auspicious,
    },
    flyingStars: flying,
    flags: Array.isArray(flags) ? flags.map(f => String(f)) : [],
    goodFor: (fitness as any).suitableFor || [],
    badFor: (fitness as any).unsuitableFor || [],
    hourGood: goodHours,
    hourBad: badHours,
    mansions: mansion,
    pengZu: pengZu ? (typeof pengZu === 'object' ? Object.values(pengZu as any) : [String(pengZu)]) : [],
  }
}

export function getMonthDays(year: number, month: number): DayInfo[] {
  const days: DayInfo[] = []
  const totalDays = new Date(year, month, 0).getDate()
  for (let d = 1; d <= totalDays; d++) {
    days.push(getDayInfo(new Date(year, month - 1, d)))
  }
  return days
}

export function findGoodDays(year: number, month: number): { date: number; info: DayInfo; score: number }[] {
  const days = getMonthDays(year, month)
  return days
    .map((info, idx) => ({
      date: idx + 1,
      info,
      score: info.fitness.auspicious ? 1 : 0,
    }))
    .filter(d => d.score > 0)
}
