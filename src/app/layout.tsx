import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tinh Hoa Phong Thủy — Xem Ngày Tốt | Lịch Vạn Niên | Tam Thức",
  description: "Xem ngày tốt xấu theo Kỳ Môn - Lục Nhâm - Thái Ất. Tra cứu lịch vạn niên, giờ hoàng đạo, hướng xuất hành chính xác.",
  keywords: ["xem ngày tốt", "lịch vạn niên", "phong thủy", "kỳ môn", "lục nhâm", "tam thức", "xem hướng nhà"],
  openGraph: {
    title: "Tinh Hoa Phong Thủy",
    description: "Xem ngày tốt theo Tam Thức — Thiên thời, Địa lợi, Nhân hòa",
    locale: "vi_VN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="vi"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{
          __html: `(function(){try{var t=localStorage.getItem('tinhhoa-theme')||'cream';document.documentElement.setAttribute('data-theme',t)}catch(e){}})()`
        }} />
      </head>
      <body className="min-h-full flex flex-col">
        <ThemeProvider initialTheme="cream">{children}</ThemeProvider>
      </body>
    </html>
  );
}
