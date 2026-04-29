// Server Actions — "use server" ile işaretlenmiş sunucu fonksiyonları
// Form'un action prop'una doğrudan verilebilir
// fetch, useState, preventDefault YOK — Next.js halleder

import { revalidatePath } from "next/cache";

// Mesajları tutan basit in-memory store
const mesajlar: { id: number; metin: string; tarih: string }[] = [
  { id: 1, metin: "Server Actions çok pratik!", tarih: "09:00" },
];
let sonId = 1;

// SERVER ACTION — bu fonksiyon sunucuda çalışır
async function mesajEkle(formData: FormData) {
  "use server"; // ← bu direktif fonksiyonu Server Action yapar

  const metin = formData.get("metin") as string;

  if (!metin?.trim()) return;

  sonId += 1;
  mesajlar.push({
    id: sonId,
    metin: metin.trim(),
    tarih: new Date().toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" }),
  });

  revalidatePath("/server-actions"); // sayfayı yeniden render et
}

async function mesajSil(formData: FormData) {
  "use server";

  const id = Number(formData.get("id"));
  const index = mesajlar.findIndex((m) => m.id === id);
  if (index !== -1) mesajlar.splice(index, 1);

  revalidatePath("/server-actions");
}

export default function ServerActionsSayfasi() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Server Actions</h1>
      <p className="text-gray-500 mb-8">
        Form submit işlemi — API route yazmadan, fetch yazmadan
      </p>

      {/* KARŞILAŞTIRMA */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 text-sm">
        <div className="bg-red-50 border border-red-200 rounded-xl p-4">
          <p className="font-semibold text-red-700 mb-2">❌ Route Handler yolu (uzun)</p>
          <ol className="text-red-700 space-y-1 list-decimal list-inside">
            <li>app/api/mesaj/route.ts oluştur</li>
            <li>POST fonksiyonu yaz</li>
            <li>Client Component&apos;te fetch() çağır</li>
            <li>useState ile loading yönet</li>
            <li>preventDefault ekle</li>
          </ol>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-xl p-4">
          <p className="font-semibold text-green-700 mb-2">✅ Server Action yolu (kısa)</p>
          <ol className="text-green-700 space-y-1 list-decimal list-inside">
            <li>Fonksiyon yaz, başına &quot;use server&quot; ekle</li>
            <li>Form&apos;un action prop&apos;una ver</li>
            <li>Bitti 🎉</li>
          </ol>
        </div>
      </div>

      {/* MESAJ EKLEME FORMU */}
      <form action={mesajEkle} className="flex gap-2 mb-6">
        <input
          name="metin"
          placeholder="Mesajını yaz..."
          className="flex-1 border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-blue-700"
        >
          Gönder
        </button>
      </form>

      {/* MESAJ LİSTESİ */}
      <div className="space-y-2 mb-8">
        {mesajlar.length === 0 && (
          <p className="text-gray-400 text-sm text-center py-8">Henüz mesaj yok</p>
        )}
        {mesajlar.map((mesaj) => (
          <div key={mesaj.id} className="flex items-center gap-3 bg-white rounded-xl shadow-sm border p-4">
            <span className="flex-1 text-sm text-gray-800">{mesaj.metin}</span>
            <span className="text-xs text-gray-400">{mesaj.tarih}</span>

            {/* Silme de bir Server Action */}
            <form action={mesajSil}>
              <input type="hidden" name="id" value={mesaj.id} />
              <button
                type="submit"
                className="text-red-400 hover:text-red-600 text-sm px-2 py-1 hover:bg-red-50 rounded"
              >
                Sil
              </button>
            </form>
          </div>
        ))}
      </div>

      {/* ÖZET KUTU */}
      <div className="p-5 bg-amber-50 border border-amber-200 rounded-xl text-sm space-y-2">
        <h2 className="font-bold text-amber-900">💡 Server Actions Özeti</h2>
        <ul className="text-amber-800 space-y-1">
          <li>✅ <code className="bg-amber-100 px-1 rounded">&quot;use server&quot;</code> → fonksiyonu sunucuda çalıştırır</li>
          <li>✅ <code className="bg-amber-100 px-1 rounded">formData.get(&quot;alan&quot;)</code> → form verisini okur</li>
          <li>✅ <code className="bg-amber-100 px-1 rounded">revalidatePath()</code> → sayfayı yeniden render eder</li>
          <li>✅ JS kapalı olsa bile çalışır (progressive enhancement)</li>
          <li>✅ API route yazmaya, fetch/useState&apos;e gerek yok</li>
        </ul>
      </div>
    </div>
  );
}
