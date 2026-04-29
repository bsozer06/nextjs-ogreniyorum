// SERVER COMPONENT — async/await ile doğrudan fetch
// ✅ Bu yöntemin avantajları:
//   - Veri sunucuda çekilir, HTML hazır gelir (SEO mükemmel)
//   - useState/useEffect gerekmez — sadece async/await
//   - API key'ler tarayıcıya hiç gönderilmez (güvenli)

import ClientFetch from "../components/ClientFetch";

type Gonderi = {
  id: number;
  title: string;
  body: string;
  userId: number;
};

// async Server Component — await doğrudan kullanılabilir!
export default async function VeriCekmeSayfasi() {
  // fetch → sunucuda çalışır, tarayıcı görmez
  const res = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=4");
  const gonderiler: Gonderi[] = await res.json();

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Veri Çekme (Fetching)</h1>
      <p className="text-gray-500 mb-8">
        Server Component vs Client Component karşılaştırması
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">

        {/* SERVER FETCH */}
        <div className="bg-white rounded-xl shadow p-6">
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-green-500" />
            <p className="text-sm font-semibold text-green-700">Server Component fetch</p>
          </div>
          <p className="text-xs text-gray-400 mb-4">
            async/await — sunucuda çalışır, SEO dostu
          </p>

          <div className="space-y-3">
            {gonderiler.map((gonderi) => (
              <div key={gonderi.id} className="p-3 bg-gray-50 rounded-lg border">
                <p className="font-medium text-gray-800 text-sm line-clamp-1">
                  {gonderi.title}
                </p>
                <p className="text-xs text-gray-500 mt-1 line-clamp-2">{gonderi.body}</p>
              </div>
            ))}
          </div>

          {/* Kaynak kodu */}
          <div className="mt-4 bg-gray-900 rounded-lg p-3 text-xs font-mono overflow-x-auto">
            <p className="text-gray-500 mb-1">// page.tsx</p>
            <p className="text-purple-400">export default <span className="text-blue-400">async function</span> <span className="text-yellow-300">Sayfa</span>() {"{"}</p>
            <p className="text-white pl-4"><span className="text-blue-400">const</span> res = <span className="text-blue-400">await</span> <span className="text-yellow-300">fetch</span>(<span className="text-green-300">&quot;/api/...&quot;</span>);</p>
            <p className="text-white pl-4"><span className="text-blue-400">const</span> data = <span className="text-blue-400">await</span> res.<span className="text-yellow-300">json</span>();</p>
            <p className="text-white pl-4"><span className="text-blue-400">return</span> <span className="text-gray-400">&lt;</span><span className="text-red-400">div</span><span className="text-gray-400">&gt;</span>{"{"}data{"}"}
            <span className="text-gray-400">&lt;/</span><span className="text-red-400">div</span><span className="text-gray-400">&gt;</span>;</p>
            <p className="text-purple-400">{"}"}</p>
          </div>
        </div>

        {/* CLIENT FETCH */}
        <div className="bg-white rounded-xl shadow p-6">
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-blue-500" />
            <p className="text-sm font-semibold text-blue-700">Client Component fetch</p>
          </div>
          <p className="text-xs text-gray-400 mb-4">
            useEffect + useState — tarayıcıda çalışır
          </p>

          <ClientFetch />

          {/* Kaynak kodu */}
          <div className="mt-4 bg-gray-900 rounded-lg p-3 text-xs font-mono overflow-x-auto">
            <p className="text-gray-500 mb-1">// &quot;use client&quot; gerekir</p>
            <p className="text-yellow-300">useEffect<span className="text-white">(() =&gt; {"{"}</span></p>
            <p className="text-white pl-4"><span className="text-yellow-300">fetch</span>(<span className="text-green-300">&quot;/api/...&quot;</span>)</p>
            <p className="text-white pl-6">.<span className="text-yellow-300">then</span>(res =&gt; res.<span className="text-yellow-300">json</span>())</p>
            <p className="text-white pl-6">.<span className="text-yellow-300">then</span>(data =&gt; <span className="text-yellow-300">setVeri</span>(data));</p>
            <p className="text-white">{"}"}, []);</p>
          </div>
        </div>
      </div>

      {/* KARŞILAŞTIRMA */}
      <div className="bg-white rounded-xl shadow overflow-hidden mb-8">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50">
              <th className="text-left p-4 border-b font-semibold text-gray-700">Konu</th>
              <th className="text-left p-4 border-b font-semibold text-green-700">Server fetch</th>
              <th className="text-left p-4 border-b font-semibold text-blue-700">Client fetch</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["Kod sadeliği", "✅ Sadece async/await", "❌ useState + useEffect + error state"],
              ["SEO", "✅ HTML hazır gelir", "❌ Önce boş, sonra dolu"],
              ["API key güvenliği", "✅ Tarayıcı görmez", "❌ Network sekmesinde görünür"],
              ["İlk yükleme hızı", "✅ Hızlı", "❌ İki aşamalı yükleme"],
              ["Kullanım zamanı", "Statik/listeleyici sayfalar", "Gerçek zamanlı, interaktif"],
            ].map(([konu, server, client]) => (
              <tr key={konu} className="border-b last:border-0">
                <td className="p-4 font-medium text-gray-700">{konu}</td>
                <td className="p-4 text-gray-600 text-xs">{server}</td>
                <td className="p-4 text-gray-600 text-xs">{client}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* CACHE NOTU */}
      <div className="p-5 bg-blue-50 border border-blue-200 rounded-xl">
        <h2 className="font-bold text-blue-900 text-base mb-2">🗄️ Next.js Fetch Cache</h2>
        <p className="text-blue-800 text-sm mb-3">
          Next.js, Server Component&apos;teki fetch sonuçlarını otomatik cache&apos;ler.
          İsteğe bağlı olarak cache davranışını ayarlayabilirsin:
        </p>
        <div className="bg-gray-900 rounded-lg p-3 text-xs font-mono space-y-2">
          <p className="text-gray-500">// Her zaman taze veri çek (cache'leme)</p>
          <p className="text-white"><span className="text-yellow-300">fetch</span>(<span className="text-green-300">&quot;/api&quot;</span>, {"{ "}<span className="text-blue-300">cache</span>: <span className="text-green-300">&quot;no-store&quot;</span>{" }"})</p>
          <p className="text-gray-500 mt-2">// 60 saniyede bir yenile (ISR)</p>
          <p className="text-white"><span className="text-yellow-300">fetch</span>(<span className="text-green-300">&quot;/api&quot;</span>, {"{ "}<span className="text-blue-300">next</span>: {"{ "}<span className="text-blue-300">revalidate</span>: <span className="text-orange-300">60</span>{" }"}{" }"})</p>
          <p className="text-gray-500 mt-2">// Sonsuza dek cache&apos;le (default)</p>
          <p className="text-white"><span className="text-yellow-300">fetch</span>(<span className="text-green-300">&quot;/api&quot;</span>, {"{ "}<span className="text-blue-300">cache</span>: <span className="text-green-300">&quot;force-cache&quot;</span>{" }"})</p>
        </div>
      </div>
    </div>
  );
}
