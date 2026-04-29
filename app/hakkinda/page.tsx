// Bu dosya → localhost:3000/hakkinda sayfasıdır
// Sadece bu page.tsx dosyasını oluşturmak yeterliydi — routing otomatik!

// Her sayfanın kendi metadata'sı olabilir (SEO için)
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hakkında | Next.js Öğreniyorum",
  description: "Bu proje hakkında bilgiler",
};

export default function HakkindaSayfasi() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Hakkında</h1>

      <div className="bg-white rounded-xl shadow p-6 mb-6">
        <h2 className="text-xl font-semibold mb-3">Bu Proje Nedir?</h2>
        <p className="text-gray-600 leading-relaxed">
          Bu proje, Next.js'i sıfırdan öğrenmek için oluşturulmuş bir örnek uygulamadır.
          Her sayfada farklı bir Next.js özelliği gösterilmektedir.
        </p>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
        <h2 className="text-xl font-semibold text-blue-800 mb-3">🎯 Routing Nasıl Çalıştı?</h2>
        <ul className="space-y-2 text-blue-700">
          <li>✅ <code className="bg-blue-100 px-1 rounded">app/hakkinda/</code> klasörü oluşturuldu</li>
          <li>✅ İçine <code className="bg-blue-100 px-1 rounded">page.tsx</code> dosyası eklendi</li>
          <li>✅ Next.js otomatik olarak <strong>/hakkinda</strong> route'unu oluşturdu</li>
          <li>✅ Başka hiçbir konfigürasyon gerekmedi!</li>
        </ul>
      </div>
    </div>
  );
}
