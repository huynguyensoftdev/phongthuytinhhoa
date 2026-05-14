import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 min-h-screen">
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

      {/* Hero */}
      <section className="flex flex-col items-center justify-center flex-1 px-6 py-24 text-center">
        <div className="max-w-2xl animate-fadeIn">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            <span className="text-primary">Tam Thức</span>
            <br />
            <span className="text-foreground">Xem Ngày Tốt</span>
          </h1>
          <p className="text-lg text-zinc-400 mb-8 leading-relaxed">
            Ứng dụng <strong className="text-foreground">Kỳ Môn Độn Giáp</strong> •{' '}
            <strong className="text-foreground">Lục Nhâm Thần Khóa</strong> •{' '}
            <strong className="text-foreground">Thái Ất Thần Kinh</strong>
            <br />
            để chọn ngày lành tháng tốt theo triết lý
          </p>
          <div className="flex gap-6 justify-center mb-12 text-sm">
            <div className="flex flex-col items-center px-6 py-3 rounded-lg card-glow">
              <span className="text-3xl mb-1">🌤</span>
              <span className="text-primary font-medium">Thiên thời</span>
            </div>
            <div className="flex flex-col items-center px-6 py-3 rounded-lg card-glow">
              <span className="text-3xl mb-1">🌍</span>
              <span className="text-primary font-medium">Địa lợi</span>
            </div>
            <div className="flex flex-col items-center px-6 py-3 rounded-lg card-glow">
              <span className="text-3xl mb-1">👥</span>
              <span className="text-primary font-medium">Nhân hòa</span>
            </div>
          </div>
          <Link
            href="/xem-ngay"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-primary text-black font-semibold text-lg hover:bg-primary-dark transition-all animate-glow"
          >
            Xem ngay
            <span>→</span>
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="px-6 py-16 border-t border-white/5">
        <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-6">
          <div className="p-6 rounded-lg card-glow">
            <h3 className="text-primary font-semibold mb-2">Lịch Vạn Niên</h3>
            <p className="text-sm text-zinc-400">Chuyển đổi âm dương lịch, Can Chi, Ngũ hành, 12 Sao, 28 Tú chính xác.</p>
          </div>
          <div className="p-6 rounded-lg card-glow">
            <h3 className="text-primary font-semibold mb-2">Xem Ngày Tốt</h3>
            <p className="text-sm text-zinc-400">Phân tích ngày theo Tam Thức, tổng hợp điểm Thiên thời - Địa lợi - Nhân hòa.</p>
          </div>
          <div className="p-6 rounded-lg card-glow">
            <h3 className="text-primary font-semibold mb-2">Giờ Hoàng Đạo</h3>
            <p className="text-sm text-zinc-400">Tra cứu giờ tốt xấu, hướng xuất hành, giờ Lý Thuần Phong mỗi ngày.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-6 text-center text-xs text-zinc-600 border-t border-white/5">
        Tinh Hoa Phong Thủy — Ứng dụng tri thức cổ học cho người Việt
      </footer>
    </div>
  );
}
