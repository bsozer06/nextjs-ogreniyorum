// Her kutu farklı bir cache stratejisi kullanıyor
// Sayfayı defalarca yenile — hangi kutu değişiyor, hangisi değişmiyor?

async function cacheSizVeriGetir() {
  // no-store → cache YOK, her istekte API'ye gider
  const res = await fetch("https://timeapi.io/api/time/current/zone?timeZone=Europe/Istanbul", {
    cache: "no-store",
  });
  const data = await res.json();
  return data.dateTime as string;
}

async function forceCache() {
  // force-cache → sonsuza kadar cache'de kalır (default davranış)
  const res = await fetch("https://timeapi.io/api/time/current/zone?timeZone=Europe/Istanbul", {
    cache: "force-cache",
  });
  const data = await res.json();
  return data.dateTime as string;
}

async function revalidateVeriGetir() {
  // revalidate: 10 → 10 saniyede bir arka planda yeniler (ISR)
  const res = await fetch("https://timeapi.io/api/time/current/zone?timeZone=Europe/Istanbul", {
    next: { revalidate: 10 },
  });
  const data = await res.json();
  return data.dateTime as string;
}

export default async function CachingSayfasi() {
  // Üç fetch paralel çalışır
  const [cacheSizZaman, cachedZaman, revalidateZaman] = await Promise.all([
    cacheSizVeriGetir(),
    forceCache(),
    revalidateVeriGetir(),
  ]);

  return (
    <div className="max-w-2xl">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Caching</h1>
      <p className="text-gray-500 mb-8">
        Sayfayı birkaç kez yenile — hangi saat değişiyor, hangisi değişmiyor?
      </p>

      <div className="space-y-4 mb-8">
        {/* NO-STORE */}
        <div className="bg-red-50 border border-red-200 rounded-xl p-5">
          <div className="flex items-center justify-between mb-2">
            <span className="font-semibold text-red-800">🔄 no-store</span>
            <code className="text-xs bg-red-100 px-2 py-1 rounded">cache: &quot;no-store&quot;</code>
          </div>
          <p className="text-2xl font-mono text-red-700 mb-2">{cacheSizZaman.slice(11, 19)}</p>
          <p className="text-sm text-red-600">
            Her sayfayı yenilediğinde değişir. Cache YOK — her zaman API&apos;ye gider.
            <br />Kullanım: Anlık veri (döviz kuru, canlı skor)
          </p>
        </div>

        {/* FORCE-CACHE */}
        <div className="bg-green-50 border border-green-200 rounded-xl p-5">
          <div className="flex items-center justify-between mb-2">
            <span className="font-semibold text-green-800">💾 force-cache</span>
            <code className="text-xs bg-green-100 px-2 py-1 rounded">cache: &quot;force-cache&quot;</code>
          </div>
          <p className="text-2xl font-mono text-green-700 mb-2">{cachedZaman.slice(11, 19)}</p>
          <p className="text-sm text-green-600">
            Sonsuza kadar aynı kalır. İlk istekte cache&apos;e alındı, bir daha API&apos;ye gitmez.
            <br />Kullanım: Değişmeyen içerik (ürün listesi, blog yazıları)
          </p>
        </div>

        {/* REVALIDATE */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
          <div className="flex items-center justify-between mb-2">
            <span className="font-semibold text-blue-800">⏱ revalidate: 10</span>
            <code className="text-xs bg-blue-100 px-2 py-1 rounded">next: {"{ revalidate: 10 }"}</code>
          </div>
          <p className="text-2xl font-mono text-blue-700 mb-2">{revalidateZaman.slice(11, 19)}</p>
          <p className="text-sm text-blue-600">
            10 saniyede bir arka planda güncellenir (ISR). Arada gelen istekler cache&apos;den beslenir.
            <br />Kullanım: Sık değişen ama anlık olması gerekmeyen veri (haber başlıkları)
          </p>
        </div>
      </div>

      {/* ÖZET */}
      <div className="bg-gray-900 text-gray-100 rounded-xl p-5 text-sm font-mono space-y-3">
        <p className="text-gray-400">// Hangi durumda ne kullanmalı?</p>
        <p><span className="text-yellow-300">no-store</span>     → anlık / gerçek zamanlı veri</p>
        <p><span className="text-yellow-300">force-cache</span>  → hiç değişmeyecek veri (default)</p>
        <p><span className="text-yellow-300">revalidate: N</span>→ N saniyede bir güncellenen veri (ISR)</p>
        <p className="mt-4 text-gray-400">// Manuel cache temizleme</p>
        <p><span className="text-blue-400">revalidatePath</span>(<span className="text-green-400">&quot;/sayfa&quot;</span>)    → o sayfanın cache&apos;ini temizle</p>
        <p><span className="text-blue-400">revalidateTag</span>(<span className="text-green-400">&quot;etiket&quot;</span>)     → etiketli fetch&apos;lerin cache&apos;ini temizle</p>
      </div>
    </div>
  );
}
