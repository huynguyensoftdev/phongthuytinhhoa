// ===== THIÊN CAN (Stems) =====
export const STEM_VN: Record<string, string> = {
  '甲': 'Giáp', '乙': 'Ất', '丙': 'Bính', '丁': 'Đinh',
  '戊': 'Mậu', '己': 'Kỷ', '庚': 'Canh', '辛': 'Tân',
  '壬': 'Nhâm', '癸': 'Quý',
}

// ===== ĐỊA CHI (Branches) =====
export const BRANCH_VN: Record<string, string> = {
  '子': 'Tý', '丑': 'Sửu', '寅': 'Dần', '卯': 'Mão',
  '辰': 'Thìn', '巳': 'Tỵ', '午': 'Ngọ', '未': 'Mùi',
  '申': 'Thân', '酉': 'Dậu', '戌': 'Tuất', '亥': 'Hợi',
}

// ===== THIÊN TƯỚNG LỤC NHÂM =====
export const GENERAL_VN: Record<string, string> = {
  '貴人': 'Quý nhân', '青龍': 'Thanh Long', '六合': 'Lục Hợp',
  '太常': 'Thái Thường', '太陰': 'Thái Âm', '天空': 'Thiên Không',
  '朱雀': 'Chu Tước', '勾陳': 'Câu Trần', '白虎': 'Bạch Hổ',
  '螣蛇': 'Đằng Xà', '玄武': 'Huyền Vũ', '天后': 'Thiên Hậu',
}

// ===== BÁT MÔN =====
export const DOOR_VN: Record<string, string> = {
  '休': 'Hưu', '生': 'Sinh', '開': 'Khai', '景': 'Cảnh',
  '杜': 'Đỗ', '傷': 'Thương', '死': 'Tử', '驚': 'Kinh',
}

// ===== CỬU TINH (Phi tinh) =====
export const FLYING_STAR_VN: Record<string, string> = {
  '一白': 'Nhất Bạch', '二黑': 'Nhị Hắc', '三碧': 'Tam Bích',
  '四綠': 'Tứ Lục', '五黃': 'Ngũ Hoàng', '六白': 'Lục Bạch',
  '七赤': 'Thất Xích', '八白': 'Bát Bạch', '九紫': 'Cửu Tử',
}

// ===== TRỰC TINH (12 sao Kiến Trừ) =====
export const FITNESS_VN: Record<string, string> = {
  '建': 'Kiến', '除': 'Trừ', '滿': 'Mãn', '平': 'Bình',
  '定': 'Định', '執': 'Chấp', '破': 'Phá', '危': 'Nguy',
  '成': 'Thành', '收': 'Thu', '開': 'Khai', '閉': 'Bế',
}

// ===== KỲ MÔN TINH =====
export const QIMEN_STAR_VN: Record<string, string> = {
  '天蓬': 'Thiên Bồng', '天芮': 'Thiên Nhuế', '天衝': 'Thiên Xung',
  '天輔': 'Thiên Phụ', '天禽': 'Thiên Cầm', '天心': 'Thiên Tâm',
  '天柱': 'Thiên Trụ', '天任': 'Thiên Nhậm', '天英': 'Thiên Anh',
}

// ===== KỲ MÔN THẦN =====
export const DEITY_VN: Record<string, string> = {
  '值符': 'Trực Phù', '螣蛇': 'Đằng Xà', '太陰': 'Thái Âm',
  '六合': 'Lục Hợp', '白虎': 'Bạch Hổ', '玄武': 'Huyền Vũ',
  '九地': 'Cửu Địa', '九天': 'Cửu Thiên',
}

// ===== TIẾT KHÍ =====
export const SOLAR_TERM_VN: Record<string, string> = {
  '立春': 'Lập Xuân', '雨水': 'Vũ Thủy', '驚蟄': 'Kinh Trập',
  '春分': 'Xuân Phân', '清明': 'Thanh Minh', '穀雨': 'Cốc Vũ',
  '立夏': 'Lập Hạ', '小滿': 'Tiểu Mãn', '芒種': 'Mang Chủng',
  '夏至': 'Hạ Chí', '小暑': 'Tiểu Thử', '大暑': 'Đại Thử',
  '立秋': 'Lập Thu', '處暑': 'Xử Thử', '白露': 'Bạch Lộ',
  '秋分': 'Thu Phân', '寒露': 'Hàn Lộ', '霜降': 'Sương Giáng',
  '立冬': 'Lập Đông', '小雪': 'Tiểu Tuyết', '大雪': 'Đại Tuyết',
  '冬至': 'Đông Chí', '小寒': 'Tiểu Hàn', '大寒': 'Đại Hàn',
}

// ===== 12 CON GIÁP =====
export const ANIMAL_VN: Record<string, string> = {
  '鼠': 'Chuột', '牛': 'Trâu', '虎': 'Hổ', '兔': 'Mão',
  '龍': 'Rồng', '蛇': 'Rắn', '馬': 'Ngựa', '羊': 'Dê',
  '猴': 'Khỉ', '雞': 'Gà', '狗': 'Chó', '豬': 'Lợn',
}

// ===== CUNG HOÀNG ĐẠO (Tây) =====
export const ZODIAC_VN: Record<string, string> = {
  'Aries': 'Bạch Dương', 'Taurus': 'Kim Ngưu', 'Gemini': 'Song Tử',
  'Cancer': 'Cự Giải', 'Leo': 'Sư Tử', 'Virgo': 'Xử Nữ',
  'Libra': 'Thiên Bình', 'Scorpio': 'Thiên Yết', 'Sagittarius': 'Nhân Mã',
  'Capricorn': 'Ma Kết', 'Aquarius': 'Bảo Bình', 'Pisces': 'Song Ngư',
}

// ===== ÂM DƯƠNG ĐỘN =====
export const ESCAPE_MODE_VN: Record<string, string> = {
  '陽遁': 'Dương độn', '陰遁': 'Âm độn',
}

// ===== LỤC NHÂM PHÉP =====
export const LIUREN_METHOD_VN: Record<string, string> = {
  '比用': 'Tỷ dụng', '涉害': 'Xạ hại', '遙克': 'Dao khắc',
  '昴星': 'Mão tinh', '別責': 'Biệt trách', '八專': 'Bát chuyên',
  '伏吟': 'Phục ngâm', '返吟': 'Phản ngâm',
}

// ===== NGŨ HÀNH THEO THIÊN CAN =====
export const STEM_ELEMENT: Record<string, string> = {
  '甲': 'Mộc', '乙': 'Mộc',
  '丙': 'Hỏa', '丁': 'Hỏa',
  '戊': 'Thổ', '己': 'Thổ',
  '庚': 'Kim', '辛': 'Kim',
  '壬': 'Thủy', '癸': 'Thủy',
}

export function getDayElement(canChiDay: string): string {
  const stem = canChiDay[0]
  return STEM_ELEMENT[stem] || ''
}

// ===== NGŨ HÀNH =====
export const ELEMENT_VN: Record<string, string> = {
  'Wood': 'Mộc', 'Fire': 'Hỏa', 'Earth': 'Thổ',
  'Metal': 'Kim', 'Water': 'Thủy',
}

// ===== BÁT QUÁI =====
export const PALACE_VN: Record<string, string> = {
  '1': 'Khảm', '2': 'Khôn', '3': 'Chấn', '4': 'Tốn',
  '5': 'Trung', '6': 'Càn', '7': 'Đoài', '8': 'Cấn', '9': 'Ly',
}

export function vnCanChi(text: string): string {
  const stem = text[0]
  const branch = text[1]
  return (STEM_VN[stem] || stem) + ' ' + (BRANCH_VN[branch] || branch)
}

export function vnText(text: string): string {
  return SOLAR_TERM_VN[text]
    || ANIMAL_VN[text]
    || GENERAL_VN[text]
    || DOOR_VN[text]
    || FLYING_STAR_VN[text]
    || FITNESS_VN[text]
    || QIMEN_STAR_VN[text]
    || DEITY_VN[text]
    || ZODIAC_VN[text]
    || ESCAPE_MODE_VN[text]
    || LIUREN_METHOD_VN[text]
    || ELEMENT_VN[text]
    || text
}
