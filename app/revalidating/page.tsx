import { revalidatePath, revalidateTag } from "next/cache";

// fetch'e tag ekliyoruz — revalidateTag("gonderiler") bu fetch'i hedef alır
async function gonderiGetir() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=4", {
    next: { tags: ["gonderiler"] }, // ← etiketi buraya veriyoruz
  });
  const data = await res.json();
  return data as { id: number; title: string }[];
}

export default async function RevalidatingSayfasi() {
  const gonderiler = await gonderiGetir();
  const cacheZamani = new Date().toLocaleTimeString("tr-TR");

  return (
    <div className="max-w-2xl">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Revalidating</h1>
      <p className="text-gray-500 mb-8">
        Cache&apos;i elle temizlemek — buton veya webhook ile &quot;şimdi yenile&quot; demek
      </p>

      {/* CACHE ZAMANI */}
      <div className="bg-gray-100 rounded-xl px-5 py-3 mb-6 text-sm text-gray-600 flex items-center justify-between">
        <span>⏰ Bu veri cache&apos;e alındı: <strong className="text-gray-900">{cacheZamani}</strong></span>
        <span className="text-xs text-gray-400">Yenilersen değişir mi?</span>
      </div>

      {/* BUTONLAR */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">

        {/* revalidatePath */}
        <div className="border rounded-xl p-5 bg-orange-50 border-orange-200">
          <p className="font-semibold text-orange-800 mb-1">revalidatePath</p>
          <p className="text-xs text-orange-600 mb-4">
            Bu sayfanın (<code className="bg-orange-100 px-1 rounded">/revalidating</code>) tüm cache&apos;ini temizler.
            Sayfadaki her fetch yeniden çalışır.
          </p>
          <form action={async () => {
            "use server";
            revalidatePath("/revalidating");
          }}>
            <button
              type="submit"
              className="bg-orange-500 text-white text-sm px-4 py-2 rounded-lg hover:bg-orange-600"
            >
              Sayfayı Yenile
            </button>
          </form>
        </div>

        {/* revalidateTag */}
        <div className="border rounded-xl p-5 bg-blue-50 border-blue-200">
          <p className="font-semibold text-blue-800 mb-1">revalidateTag</p>
          <p className="text-xs text-blue-600 mb-4">
            Sadece <code className="bg-blue-100 px-1 rounded">tags: [&quot;gonderiler&quot;]</code> etiketli
            fetch&apos;i temizler. Diğer fetch&apos;ler etkilenmez.
          </p>
          <form action={async () => {
            "use server";
            revalidateTag("gonderiler");
          }}>
            <button
              type="submit"
              className="bg-blue-500 text-white text-sm px-4 py-2 rounded-lg hover:bg-blue-600"
            >
              Etiketi Yenile
            </button>
          </form>
        </div>
      </div>

      {/* VERİ */}
      <div className="space-y-2 mb-8">
        {gonderiler.map((g) => (
          <div key={g.id} className="bg-white border rounded-xl px-4 py-3 text-sm text-gray-700">
            <span className="text-gray-400 font-mono text-xs mr-2">#{g.id}</span>
            {g.title}
          </div>
        ))}
      </div>

      {/* NE ZAMAN HANGİSİ */}
      <div className="bg-gray-900 text-gray-100 rounded-xl p-5 text-sm space-y-4">
        <p className="text-gray-400">// Ne zaman hangisini kullanmalı?</p>

        <div>
          <p className="text-yellow-300 mb-1">revalidatePath(&quot;/urunler&quot;)</p>
          <p className="text-gray-400 text-xs">
            → Admin panelinden ürün güncellendiğinde /urunler sayfasını yenile
          </p>
        </div>

        <div>
          <p className="text-yellow-300 mb-1">revalidateTag(&quot;urun-listesi&quot;)</p>
          <p className="text-gray-400 text-xs">
            → Aynı ürün verisi /urunler, /anasayfa, /kampanya sayfalarında var.
            <br />
            Hepsini tek seferde temizlemek için tag kullan — path tek tek yazmana gerek yok.
          </p>
        </div>

        <div className="border-t border-gray-700 pt-4">
          <p className="text-green-400 mb-1">fetch(url, {"{ next: { tags: [\"etiket\"] } }"} )</p>
          <p className="text-gray-400 text-xs">
            → revalidateTag ile hedeflenebilmek için fetch&apos;e tag vermek yeterli
          </p>
        </div>
      </div>
    </div>
  );
}
