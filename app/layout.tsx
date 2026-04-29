import type { Metadata } from "next";
import Navbar from "./components/Navbar";
import "./globals.css";

// metadata → sayfanın <title> ve <meta description> etiketlerini ayarlar (SEO)
export const metadata: Metadata = {
  title: "Next.js Öğreniyorum",
  description: "Next.js temel konularını öğrendiğim proje",
};

// RootLayout → TÜM sayfaları saran şablon.
// children = aktif sayfanın içeriği (page.tsx)
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body className="min-h-screen bg-gray-50">
        {/* Navbar - her sayfada görünür, aktif link kalın/altı çizili */}
        <Navbar />

        {/* Sayfa içeriği buraya gelir */}
        <main className="max-w-4xl mx-auto px-6 py-10">
          {children}
        </main>

        {/* Footer - her sayfada görünür */}
        <footer className="text-center text-gray-500 py-6 border-t mt-10">
          Next.js Öğreniyorum © 2024
        </footer>
      </body>
    </html>
  );
}
