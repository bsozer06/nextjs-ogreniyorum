// Bu dosya → localhost:3000/ adresinin sayfasıdır
// NOT: "use client" YOK → Bu bir Server Component (varsayılan olarak)

import SayacBileseni from "./components/SayacBileseni";

export default function AnaSayfa() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-blue-700 mb-4">
        🚀 Next.js Öğreniyorum
      </h1>

      <p className="text-gray-600 text-lg mb-8">
        Bu proje, Next.js temellerini öğrenmek için oluşturuldu.
      </p>

      {/* Konu Kartları */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl shadow p-6 border-l-4 border-blue-500">
          <h2 className="font-bold text-xl mb-2">📁 File-based Routing</h2>
          <p className="text-gray-500">
            Klasör ve dosya adları = URL.{" "}
            <code className="bg-gray-100 px-1 rounded">app/hakkinda/page.tsx</code> → /hakkinda
          </p>
        </div>

        <div className="bg-white rounded-xl shadow p-6 border-l-4 border-green-500">
          <h2 className="font-bold text-xl mb-2">🖥️ Server Components</h2>
          <p className="text-gray-500">
            Varsayılan olarak tüm bileşenler sunucuda çalışır. SEO ve performans için idealdir.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow p-6 border-l-4 border-purple-500">
          <h2 className="font-bold text-xl mb-2">📦 layout.tsx</h2>
          <p className="text-gray-500">
            Tüm sayfaları saran şablon. Navbar ve footer buraya yazılır.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow p-6 border-l-4 border-orange-500">
          <h2 className="font-bold text-xl mb-2">🔗 API Routes</h2>
          <p className="text-gray-500">
            <code className="bg-gray-100 px-1 rounded">app/api/route.ts</code> ile aynı projede backend yazılır.
          </p>
        </div>
      </div>

      <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <p className="text-yellow-800 font-medium">
          💡 Navbar&apos;dan &quot;Hakkında&quot; ve &quot;Blog&quot; sayfalarına git — sonraki adımda onları oluşturacağız!
        </p>
      </div>

      {/* Server Component içinde Client Component kullanımı */}
      <div className="mt-8">
        <h2 className="text-xl font-bold text-gray-700 mb-4">
          Server Component içinde Client Component
        </h2>
        <SayacBileseni />
        <p className="text-gray-500 text-sm mt-3">
          ↑ Bu sayaç bileşeni <strong>"use client"</strong> ile başlar.
          Ana sayfa (page.tsx) Server Component olmasına rağmen,
          içine Client Component ekleyebiliriz!
        </p>
      </div>
    </div>
  );
}
