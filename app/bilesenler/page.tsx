// Bu sayfanın kendisi bir SERVER COMPONENT (varsayılan)
// Ama içine Client Component'ler ekleyebiliriz!

import SayacBileseni from "../components/SayacBileseni";
import SaatBileseni from "../components/SaatBileseni";

// Sunucuda çalışan bir fonksiyon — gerçekte DB sorgusu olabilir
function sunucudanVeriGetir() {
  return {
    mesaj: "Bu veri sunucuda hazırlandı",
    zaman: new Date().toLocaleString("tr-TR"), // sunucu saati, değişmez
    ortam: process.env.NODE_ENV,              // sadece sunucuda erişilebilir
  };
}

export default function BilesenlerSayfasi() {
  // Bu kod sunucuda çalışır — tarayıcıya hiç gönderilmez
  const veri = sunucudanVeriGetir();

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-2">
        Server vs Client Component
      </h1>
      <p className="text-gray-500 mb-8">
        İkisi arasındaki farkı canlı örneklerle gör
      </p>

      {/* KARŞILAŞTIRMA TABLOSU */}
      <div className="overflow-x-auto mb-10">
        <table className="w-full text-sm border-collapse bg-white rounded-xl shadow overflow-hidden">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th className="text-left p-4 border-b">Özellik</th>
              <th className="text-left p-4 border-b text-green-700">Server Component</th>
              <th className="text-left p-4 border-b text-blue-700">Client Component</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["Varsayılan mı?", "✅ Evet", "❌ Hayır — \"use client\" gerekir"],
              ["Nerede çalışır?", "Sunucuda", "Tarayıcıda"],
              ["useState / useEffect", "❌ Kullanamaz", "✅ Kullanabilir"],
              ["onClick, onChange", "❌ Kullanamaz", "✅ Kullanabilir"],
              ["DB / dosya sistemi erişimi", "✅ Doğrudan erişebilir", "❌ Erişemez"],
              ["SEO", "✅ Mükemmel", "Zayıf"],
              ["JS bundle boyutu", "✅ Sıfır (tarayıcıya gitmez)", "Bundle'a eklenir"],
            ].map(([ozellik, server, client]) => (
              <tr key={ozellik} className="border-b last:border-0">
                <td className="p-4 font-medium text-gray-700">{ozellik}</td>
                <td className="p-4 text-gray-600">{server}</td>
                <td className="p-4 text-gray-600">{client}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">

        {/* SERVER COMPONENT ÖRNEĞİ */}
        <div className="bg-white rounded-xl shadow p-6 border-l-4 border-green-500">
          <p className="text-sm text-gray-500 mb-1">
            Server Component — <code className="bg-gray-100 px-1 rounded">"use client"</code> yok
          </p>
          <h3 className="font-bold text-lg mb-3">🖥️ Sunucu Verisi</h3>
          <div className="space-y-2 text-sm">
            <p>
              <span className="text-gray-500">Mesaj:</span>{" "}
              <span className="font-medium">{veri.mesaj}</span>
            </p>
            <p>
              <span className="text-gray-500">Sunucu saati:</span>{" "}
              <span className="font-medium">{veri.zaman}</span>
            </p>
            <p>
              <span className="text-gray-500">Ortam:</span>{" "}
              <span className="font-medium">{veri.ortam}</span>
            </p>
          </div>
          <p className="text-xs text-gray-400 mt-4">
            ↑ Sayfa yenilenene kadar değişmez. Sunucuda bir kez hesaplandı.
          </p>
        </div>

        {/* CLIENT COMPONENT — canlı saat */}
        <SaatBileseni />
      </div>

      {/* CLIENT COMPONENT — sayaç */}
      <SayacBileseni />

      {/* KURAL ÖZET KUTUSU */}
      <div className="mt-8 p-5 bg-amber-50 border border-amber-200 rounded-xl space-y-3">
        <h2 className="font-bold text-amber-900 text-lg">💡 Ne Zaman Hangisini Kullan?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <p className="font-semibold text-green-700 mb-1">Server Component kullan:</p>
            <ul className="text-gray-700 space-y-1">
              <li>• Veritabanından veri çekerken</li>
              <li>• API key gibi gizli değerlere erişirken</li>
              <li>• Statik içerik gösterirken (SEO önemli)</li>
              <li>• Büyük kütüphaneler kullanırken</li>
            </ul>
          </div>
          <div>
            <p className="font-semibold text-blue-700 mb-1">Client Component kullan:</p>
            <ul className="text-gray-700 space-y-1">
              <li>• useState / useEffect gerektiğinde</li>
              <li>• onClick, onChange gibi eventlerde</li>
              <li>• Tarayıcı API'leri (localStorage, window...)</li>
              <li>• Animasyon, gerçek zamanlı güncellemeler</li>
            </ul>
          </div>
        </div>
        <p className="text-amber-800 text-sm font-medium pt-1 border-t border-amber-200">
          🎯 Kural: Varsayılan olarak Server Component kullan.
          Sadece ihtiyaç duyduğunda <code className="bg-amber-100 px-1 rounded">&quot;use client&quot;</code> ekle.
        </p>
      </div>
    </div>
  );
}
