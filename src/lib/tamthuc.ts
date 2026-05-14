import {
  computeSixRenForDate,
  computeQiMenForDate,
  dailyAlmanac,
  getAlmanacFlags,
  getDayFitnessForDate,
  EIGHT_DOORS,
  HEAVENLY_GENERALS,
} from '@4n6h4x0r/stem-branch'

export interface TamThucResult {
  date: string
  thienThoi: ThienThoiEval
  diaLoi: DiaLoiEval
  nhanHoa: NhanHoaEval
  tongDiem: number
  tongXepLoai: string
  ketLuan: string
}

export interface ThienThoiEval {
  lucNham: any
  diem: number
  xepLoai: string
  nhanXet: string[]
}

export interface DiaLoiEval {
  kyMon: any
  diem: number
  xepLoai: string
  nhanXet: string[]
}

export interface NhanHoaEval {
  lucNhamNhan: any
  diem: number
  xepLoai: string
  nhanXet: string[]
}

const DOOR_SCORE: Record<string, number> = {
  '休': 2, '生': 2, '開': 2,
  '景': 0,
  '杜': -1, '傷': -2, '死': -2, '驚': -1,
}

const GENERAL_SCORE: Record<string, number> = {
  '貴人': 2, '青龍': 2, '六合': 2, '太常': 1, '太陰': 1,
  '天空': 0, '朱雀': 0,
  '勾陳': -1, '白虎': -2, '螣蛇': -2, '玄武': -2, '天后': 0,
}

const LIUREN_METHOD_SCORE: Record<string, number> = {
  '比用': 2, '涉害': 0, '遙克': 1, '昴星': -1,
  '別責': 0, '八專': -1, '伏吟': -1, '返吟': -1,
}

function xepLoai(diem: number): string {
  if (diem >= 5) return 'Tốt'
  if (diem >= 2) return 'Khá'
  if (diem >= -1) return 'Bình thường'
  if (diem >= -3) return 'Xấu'
  return 'Rất xấu'
}

function canhBao(diem: number): 'good' | 'neutral' | 'bad' {
  if (diem >= 2) return 'good'
  if (diem >= -1) return 'neutral'
  return 'bad'
}

export function evaluateTamThuc(date: Date): TamThucResult {
  const almanac = dailyAlmanac(date)
  const lucNham = computeSixRenForDate(date)
  const kyMon = computeQiMenForDate(date)
  const flags = getAlmanacFlags(date)
  const fitness = getDayFitnessForDate(date)
  const dateStr = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`

  // ========== THIÊN THỜI (Lục Nhâm — thời vận) ==========
  let thienThoiDiem = 0
  const thienThoiNx: string[] = []

  // Lục Nhâm method
  const method = lucNham.method || ''
  const methodScore = LIUREN_METHOD_SCORE[method] ?? 0
  thienThoiDiem += methodScore
  if (methodScore > 0) {
    thienThoiNx.push(`Phép Lục Nhâm "${method}" — tốt cho khởi sự`)
  } else if (methodScore < 0) {
    thienThoiNx.push(`Phép Lục Nhâm "${method}" — thời vận trì trệ`)
  } else {
    thienThoiNx.push(`Phép Lục Nhâm "${method}" — trung bình`)
  }

  // 12 generals - check day general position
  const dayBranch = lucNham.dayBranch
  const generals = lucNham.generals as Record<string, string>
  if (generals) {
    const dayGeneral = generals[dayBranch] || ''
    const genScore = GENERAL_SCORE[dayGeneral] ?? 0
    thienThoiDiem += genScore
    if (genScore > 0) {
      thienThoiNx.push(`Gặp ${dayGeneral} — Thiên thời thuận lợi`)
    } else if (genScore < 0) {
      thienThoiNx.push(`Gặp ${dayGeneral} — Thiên thời bất lợi`)
    } else {
      thienThoiNx.push(`Gặp ${dayGeneral} — Thiên thời bình thường`)
    }
  }

  // Three transmissions
  const trans = lucNham.transmissions as { initial: string; middle: string; final: string } | undefined
  if (trans) {
    const branches = ['Tý','Sửu','Dần','Mão','Thìn','Tỵ','Ngọ','Mùi','Thân','Dậu','Tuất','Hợi']
    const idxI = branches.indexOf(trans.initial)
    const idxM = branches.indexOf(trans.middle)
    const idxF = branches.indexOf(trans.final)
    if (idxI >= 0 && idxM >= 0 && idxF >= 0) {
      const forward = (idxM > idxI || (idxM < idxI && idxM + 12 > idxI)) &&
                      (idxF > idxM || (idxF < idxM && idxF + 12 > idxM))
      if (forward) {
        thienThoiDiem += 2
        thienThoiNx.push('Tam truyền thuận — thời thế đi lên')
      } else {
        thienThoiDiem -= 1
        thienThoiNx.push('Tam truyền nghịch — thời thế đi xuống')
      }
    }
  }

  // Monthly general
  if (lucNham.monthlyGeneral) {
    const mgScore = GENERAL_SCORE[lucNham.monthlyGeneral as string] ?? 0
    thienThoiDiem += mgScore * 0.5
    if (mgScore > 0) {
      thienThoiNx.push(`Nguyệt tướng ${lucNham.monthlyGeneral} — trợ lực thời vận`)
    }
  }

  // ========== ĐỊA LỢI (Kỳ Môn — địa lý) ==========
  let diaLoiDiem = 0
  const diaLoiNx: string[] = []

  // Eight doors
  const doors = kyMon.doors as Record<string, string> | undefined
  if (doors) {
    const doorNames = Object.values(doors)
    for (const door of doorNames) {
      diaLoiDiem += DOOR_SCORE[door] ?? 0
    }
    const goodDoors = doorNames.filter(d => (DOOR_SCORE[d] ?? 0) > 0)
    const badDoors = doorNames.filter(d => (DOOR_SCORE[d] ?? 0) < 0)
    if (goodDoors.length >= 3) {
      diaLoiNx.push(`${goodDoors.join(', ')} mở — địa lợi, nhiều hướng tốt`)
    }
    if (badDoors.length > 0) {
      diaLoiNx.push(`${badDoors.join(', ')} gặp — cẩn trọng phương hướng`)
    }
  }

  // Escape mode
  const escapeMode = kyMon.escapeMode as string || ''
  if (escapeMode === '陽遁') {
    diaLoiDiem += 1
    diaLoiNx.push('Dương độn — dương khí thịnh, hợp hành động')
  } else if (escapeMode === '陰遁') {
    diaLoiDiem -= 0
    diaLoiNx.push('Âm độn — âm khí chủ, hợp tĩnh dưỡng')
  }

  // ZhiShi door (值班 door)
  const zhiShi = kyMon.zhiShi as { door: string; palace: number } | undefined
  if (zhiShi) {
    const zsDoor = zhiShi.door
    const zsScore = DOOR_SCORE[zsDoor] ?? 0
    diaLoiDiem += zsScore
    if (zsScore > 0) {
      diaLoiNx.push(`Trực sử ${zsDoor} — chủ sự hanh thông`)
    } else if (zsScore < 0) {
      diaLoiNx.push(`Trực sử ${zsDoor} — chủ sự trắc trở`)
    }
  }

  // Stars
  const stars = kyMon.stars as Record<string, string> | undefined
  if (stars) {
    const starNames = Object.values(stars)
    const goodStars = starNames.filter(s =>
      ['天任', '天輔', '天心', '天禽'].includes(s)
    )
    const badStars = starNames.filter(s =>
      ['天蓬', '天芮', '天柱', '天英', '天衝'].includes(s)
    )
    for (const _gs of goodStars) {
      diaLoiDiem += 0.5
    }
    for (const _bs of badStars) {
      diaLoiDiem -= 0.5
    }
  }

  // ========== NHÂN HÒA (Lục Nhâm — nhân sự) ==========
  let nhanHoaDiem = 0
  const nhanHoaNx: string[] = []

  // Four lessons
  const lessons = lucNham.lessons as { upper: string; lower: string }[] | undefined
  if (lessons) {
    let harmonious = 0
    let conflict = 0
    for (const l of lessons) {
      if (l.upper === l.lower) {
        harmonious++
      }
    }
    if (harmonious >= 2) {
      nhanHoaDiem += 2
      nhanHoaNx.push('Tứ khóa hài hòa — nhân tâm thuận')
    } else {
      nhanHoaDiem -= 0
      nhanHoaNx.push('Tứ khóa bình thường — nhân sự ổn')
    }
  }

  // Noble person direction (Thiên Ất quý nhân)
  const nobles = ['貴人', '青龍', '六合']
  if (generals) {
    let hasNoble = false
    for (const [branch, gen] of Object.entries(generals)) {
      if (nobles.includes(gen)) {
        hasNoble = true
        nhanHoaNx.push(`Quý nhân ${gen} tại ${branch} — được người giúp đỡ`)
        break
      }
    }
    if (hasNoble) nhanHoaDiem += 2
  }

  // Day stem relationship with generals
  const dayStem = lucNham.dayStem as string || ''
  if (dayStem && generals) {
    const gen = generals[lucNham.dayBranch as string] || ''
    if (gen === '貴人' || gen === '青龍') {
      nhanHoaDiem += 1
      nhanHoaNx.push(`Thiên Ất ${gen} hộ thân — nhân duyên tốt`)
    }
  }

  // ========== ALMANAC FLAGS BOOST ==========
  if (Array.isArray(flags)) {
    const auspiciousFlags = flags.filter(f => (f as any).auspicious === true)
    const inauspiciousFlags = flags.filter(f => (f as any).auspicious === false)
    thienThoiDiem += auspiciousFlags.length * 0.5
    thienThoiDiem -= inauspiciousFlags.length * 0.5
    if (auspiciousFlags.length > 2) {
      thienThoiNx.push(`${auspiciousFlags.length} sao tốt chiếu — ngày nhiều phúc`)
    }
    if (inauspiciousFlags.length > 2) {
      thienThoiNx.push(`Có sao xấu — cần thận trọng`)
    }
  }

  // Day fitness boost
  if ((fitness as any).isAuspicious || (fitness as any).auspicious) {
    thienThoiDiem += 1
  }

  // ========== TỔNG HỢP ==========
  const tongDiem = thienThoiDiem + diaLoiDiem + nhanHoaDiem

  let ketLuan = ''
  if (tongDiem >= 8) {
    ketLuan = 'Ngày tốt, đủ Thiên thời — Địa lợi — Nhân hòa. Thích hợp cho mọi việc quan trọng.'
  } else if (tongDiem >= 4) {
    ketLuan = 'Ngày khá, có thể tiến hành việc lớn nhưng cần chọn giờ và hướng tốt.'
  } else if (tongDiem >= 0) {
    ketLuan = 'Ngày trung bình, hợp với việc nhỏ hoặc công việc thường ngày.'
  } else if (tongDiem >= -4) {
    ketLuan = 'Ngày xấu, không nên làm việc lớn. Nên chọn ngày khác.'
  } else {
    ketLuan = 'Ngày rất xấu, tránh mọi việc quan trọng. Đề phòng thị phi, tổn thất.'
  }

  return {
    date: dateStr,
    thienThoi: {
      lucNham,
      diem: Math.round(thienThoiDiem * 10) / 10,
      xepLoai: xepLoai(thienThoiDiem),
      nhanXet: thienThoiNx,
    },
    diaLoi: {
      kyMon,
      diem: Math.round(diaLoiDiem * 10) / 10,
      xepLoai: xepLoai(diaLoiDiem),
      nhanXet: diaLoiNx,
    },
    nhanHoa: {
      lucNhamNhan: lucNham,
      diem: Math.round(nhanHoaDiem * 10) / 10,
      xepLoai: xepLoai(nhanHoaDiem),
      nhanXet: nhanHoaNx,
    },
    tongDiem: Math.round(tongDiem * 10) / 10,
    tongXepLoai: xepLoai(tongDiem),
    ketLuan,
  }
}

export function findGoodDaysWithTamThuc(year: number, month: number):
  { date: number; result: TamThucResult }[] {
  const days: { date: number; result: TamThucResult }[] = []
  const totalDays = new Date(year, month, 0).getDate()
  for (let d = 1; d <= totalDays; d++) {
    const date = new Date(year, month - 1, d)
    const result = evaluateTamThuc(date)
    days.push({ date: d, result })
  }
  return days.sort((a, b) => b.result.tongDiem - a.result.tongDiem)
}

export function getMauThoiGian(): string[] {
  return [
    'Thiên thời — thuận theo thời vận, chọn ngày giờ hợp với vận khí của trời đất.',
    'Địa lợi — tận dụng địa thế, chọn phương hướng tốt theo Kỳ Môn Độn Giáp.',
    'Nhân hòa — hài hòa nhân tâm, chọn thời điểm được quý nhân phù trợ.',
  ]
}
