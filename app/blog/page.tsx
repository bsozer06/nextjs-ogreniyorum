// localhost:3000/blog → Blog listesi sayfası
import Link from "next/link"; // Next.js'in özel Link bileşeni (a tag'i yerine bunu kullan!)

// Örnek blog yazıları verisi (normalde veritabanından gelir)
const blogYazilari = [
  { id: 1, baslik: "Next.js'e Giriş", ozet: "Next.js nedir ve ne işe yarar?", tarih: "2024-01-15" },
  { id: 2, baslik: "Server Components Nedir?", ozet: "Sunucu bileşenleri ile performanslı uygulamalar.", tarih: "2024-01-20" },
  { id: 3, baslik: "App Router Kullanımı", ozet: "File-based routing ile hızlı navigasyon.", tarih: "2024-01-25" },
];

export default function BlogSayfasi() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Blog Yazıları</h1>
      <p className="text-gray-500 mb-8">Toplam {blogYazilari.length} yazı</p>

      <div className="space-y-4">
        {blogYazilari.map((yazi) => (
          <div key={yazi.id} className="bg-white rounded-xl shadow p-6 hover:shadow-md transition-shadow">
            <span className="text-xs text-gray-400">{yazi.tarih}</span>
            <h2 className="text-xl font-semibold text-gray-800 mt-1 mb-2">{yazi.baslik}</h2>
            <p className="text-gray-600 mb-4">{yazi.ozet}</p>

            {/* Link bileşeni: <a> yerine bunu kullan! Sayfa yenilemeden geçiş yapar */}
            <Link
              href={`/blog/${yazi.id}`}
              className="text-blue-600 font-medium hover:underline"
            >
              Devamını Oku →
            </Link>
          </div>
        ))}
      </div>

      <div className="mt-8 p-4 bg-green-50 border border-green-200 rounded-lg">
        <p className="text-green-800 font-medium">
          💡 <strong>Link vs &lt;a&gt;:</strong> Next.js&apos;de navigasyon için her zaman{" "}
          <code className="bg-green-100 px-1 rounded">import Link from &quot;next/link&quot;</code> kullan.
          Normal <code className="bg-green-100 px-1 rounded">&lt;a&gt;</code> tüm sayfayı yeniler,
          Link ise sadece değişen kısmı günceller (çok daha hızlı!).
        </p>
      </div>
    </div>
  );
}
