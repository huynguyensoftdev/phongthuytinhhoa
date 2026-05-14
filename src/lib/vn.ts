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

// ===== BÁT MÔN ĐẠI ĐỘN (Gia Cát Lượng) =====
const BATMON_CYCLE = ['Hưu', 'Sinh', 'Thương', 'Đỗ', 'Cảnh', 'Tử', 'Kinh', 'Khai']
const REVERSE_DOOR: Record<string, string> = {
  '休': 'Hưu', '生': 'Sinh', '傷': 'Thương', '杜': 'Đỗ',
  '景': 'Cảnh', '死': 'Tử', '驚': 'Kinh', '開': 'Khai',
}
const MONTH_DOOR_IDX: Record<number, number> = {
  1: 1, 2: 2, 3: 2, 4: 3, 5: 4, 6: 4,
  7: 5, 8: 6, 9: 6, 10: 7, 11: 0, 12: 0,
}
const BRANCH_INDEX: Record<string, number> = {
  '子': 0, '丑': 1, '寅': 2, '卯': 3, '辰': 4, '巳': 5,
  '午': 6, '未': 7, '申': 8, '酉': 9, '戌': 10, '亥': 11,
}
/** Fixed home positions of 8 doors on 九宫 grid */
export const DOOR_HOME_PALACE: Record<string, number> = {
  '休': 1, '生': 8, '傷': 3, '杜': 4,
  '景': 9, '死': 2, '驚': 7, '開': 6,
}
export const PALACE_DOOR_HOME: Record<number, string> = {
  1: '休', 8: '生', 3: '傷', 4: '杜',
  9: '景', 2: '死', 7: '驚', 6: '開',
}

export function computeBatMonDaiDon(
  lunarMonth: number,
  lunarDay: number,
  hourBranch: string
): { activeDoorCn: string; activeDoorVn: string; activePalace: number } {
  const mIdx = MONTH_DOOR_IDX[lunarMonth] ?? 1
  const hIdx = BRANCH_INDEX[hourBranch] ?? 0
  const totalSteps = mIdx + (lunarDay - 1) + hIdx
  const activeIdx = ((totalSteps % 8) + 8) % 8
  const activeVn = BATMON_CYCLE[activeIdx]
  // Find the Chinese door name that maps to this VN name
  const activeCn = Object.entries(REVERSE_DOOR).find(([, v]) => v === activeVn)?.[0] || activeVn
  const activePalace = DOOR_HOME_PALACE[activeCn] || 1
  return { activeDoorCn: activeCn, activeDoorVn: activeVn, activePalace }
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

// ===== THẦN SÁT =====
export const SHEN_SAT_VN: Record<string, string> = {
  '天德': 'Thiên Đức', '月德': 'Nguyệt Đức', '天赦': 'Thiên Xá',
  '天喜': 'Thiên Hỷ', '紅鸞': 'Hồng Loan', '祿神': 'Lộc Thần',
  '驛馬': 'Trạch Mã', '文昌': 'Văn Xương',
  '三合': 'Tam Hợp', '將星': 'Tướng Tinh',
  '亡神': 'Vong Thần', '劫煞': 'Kiếp Sát', '災煞': 'Tai Sát',
  '歲煞': 'Tuế Sát', '羊刃': 'Dương Nhẫn', '大耗': 'Đại Hao',
  '小耗': 'Tiểu Hao', '歲破': 'Tuế Phá',
  '喪門': 'Tang Môn', '弔客': 'Điếu Khách', '官符': 'Quan Phù',
  '五鬼': 'Ngũ Quỷ', '飛廉': 'Phi Liêm',
  '龍德': 'Long Đức', '福德': 'Phúc Đức', '福星': 'Phúc Tinh',
  '解神': 'Giải Thần', '天醫': 'Thiên Y', '地醫': 'Địa Y',
  '生氣': 'Sinh Khí', '死氣': 'Tử Khí',
  '天乙貴人': 'Thiên Ất Quý Nhân', '太極貴人': 'Thái Cực Quý Nhân',
  '文昌貴人': 'Văn Xương Quý Nhân', '學堂': 'Học Đường', '十靈日': 'Thập Linh Nhật',
}

// ===== BÀNH TỔ KỴ =====
export const PENGZU_VN: Record<string, string> = {
  '甲不開倉財物耗散': 'Giáp bất khai thương, tài vật hao tán',
  '乙不栽植千長不發': 'Ất bất tài thực, thiên trưởng bất phát',
  '丙不修灶必見災殃': 'Bính bất tu táo, tất kiến tai ương',
  '丁不剃頭頭必生瘡': 'Đinh bất thế đầu, đầu tất sinh sang',
  '戊不受田田主不祥': 'Mậu bất thụ điền, điền chủ bất tường',
  '己不破券二比並亡': 'Kỷ bất phá khoán, nhị tỷ tịnh vong',
  '庚不經絡綸機虛張': 'Canh bất kinh lạc, luân cơ hư trương',
  '辛不合醬主人不嘗': 'Tân bất hợp tương, chủ nhân bất thường',
  '壬不汲水更難提防': 'Nhâm bất cấp thủy, cánh nan đề phòng',
  '癸不詞訟理弱敵強': 'Quý bất từ tụng, lý nhược địch cường',
  '子不問卜自惹禍殃': 'Tý bất vấn bốc, tự nhạ họa ương',
  '丑不冠帶主不還鄉': 'Sửu bất quan đái, chủ bất hoàn hương',
  '寅不祭祀神鬼不嘗': 'Dần bất tế tự, thần quỷ bất thường',
  '卯不穿井水泉不香': 'Mão bất xuyên tỉnh, thủy tuyền bất hương',
  '辰不哭泣必主重喪': 'Thìn bất khấp khấp, tất chủ trọng tang',
  '巳不移徙路虎啣刀': 'Tỵ bất di tỉ, lộ hổ hàm đao',
  '午不苫蓋屋主更張': 'Ngọ bất thiêm cái, ốc chủ canh trương',
  '未不服藥毒氣入腸': 'Mùi bất phục dược, độc khí nhập tràng',
  '申不安床鬼祟入房': 'Thân bất an sàng, quỷ túy nhập phòng',
  '酉不宴客醉坐顛狂': 'Dậu bất yến khách, túy tọa điên cuồng',
  '戌不吃犬作怪上床': 'Tuất bất cật khuyển, tác quái thượng sàng',
  '亥不嫁娶必主分張': 'Hợi bất giá thú, tất chủ phân trương',
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
    || SHEN_SAT_VN[text]
    || PENGZU_VN[text]
    || text
}
