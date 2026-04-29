"use client";

// API Routes demo — Client Component içinden kendi API'mizi çağırıyoruz

import { useState, useEffect, useCallback } from "react";

type Gorev = {
  id: number;
  baslik: string;
  tamamlandi: boolean;
};

export default function ApiDemoSayfasi() {
  const [gorevler, setGorevler] = useState<Gorev[]>([]);
  const [yeniBaslik, setYeniBaslik] = useState("");
  const [yukleniyor, setYukleniyor] = useState(true);

  // GET /api/gorevler
  const gorevleriGetir = useCallback(async () => {
    setYukleniyor(true);
    const res = await fetch("/api/gorevler");
    const data = await res.json();
    setGorevler(data);
    setYukleniyor(false);
  }, []);

  useEffect(() => {
    gorevleriGetir();
  }, [gorevleriGetir]);

  // POST /api/gorevler
  async function gorevEkle(e: React.FormEvent) {
    e.preventDefault();
    if (!yeniBaslik.trim()) return;

    await fetch("/api/gorevler", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ baslik: yeniBaslik }),
    });

    setYeniBaslik("");
    gorevleriGetir();
  }

  // PATCH /api/gorevler/[id]
  async function tamamlandiToggle(id: number, mevcut: boolean) {
    await fetch(`/api/gorevler/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tamamlandi: !mevcut }),
    });
    gorevleriGetir();
  }

  // DELETE /api/gorevler/[id]
  async function gorevSil(id: number) {
    await fetch(`/api/gorevler/${id}`, { method: "DELETE" });
    gorevleriGetir();
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-2">API Routes</h1>
      <p className="text-gray-500 mb-8">
        Aynı Next.js projesinde backend endpoint yazma
      </p>

      {/* API YAPISI AÇIKLAMA */}
      <div className="bg-gray-900 rounded-xl p-5 mb-8 text-xs font-mono space-y-1 overflow-x-auto">
        <p className="text-gray-400 mb-2">{`// app/api/gorevler/route.ts`}</p>
        <p><span className="text-blue-400">GET</span>    <span className="text-green-300">/api/gorevler</span>      <span className="text-gray-500">→ tüm görevleri getir</span></p>
        <p><span className="text-yellow-400">POST</span>   <span className="text-green-300">/api/gorevler</span>      <span className="text-gray-500">→ yeni görev ekle</span></p>
        <p className="text-gray-400 mt-2">{`// app/api/gorevler/[id]/route.ts`}</p>
        <p><span className="text-blue-400">GET</span>    <span className="text-green-300">/api/gorevler/:id</span>  <span className="text-gray-500">→ tek görev</span></p>
        <p><span className="text-orange-400">PATCH</span>  <span className="text-green-300">/api/gorevler/:id</span>  <span className="text-gray-500">→ güncelle</span></p>
        <p><span className="text-red-400">DELETE</span> <span className="text-green-300">/api/gorevler/:id</span>  <span className="text-gray-500">→ sil</span></p>
      </div>

      {/* GÖREV EKLE FORMU */}
      <form onSubmit={gorevEkle} className="flex gap-2 mb-6">
        <input
          type="text"
          value={yeniBaslik}
          onChange={(e) => setYeniBaslik(e.target.value)}
          placeholder="Yeni görev yaz..."
          className="flex-1 border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50"
          disabled={!yeniBaslik.trim()}
        >
          + Ekle (POST)
        </button>
      </form>

      {/* GÖREV LİSTESİ */}
      {yukleniyor ? (
        <div className="space-y-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-14 bg-gray-100 rounded-lg animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="space-y-2">
          {gorevler.map((gorev) => (
            <div
              key={gorev.id}
              className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-sm border hover:shadow-md transition-shadow"
            >
              {/* PATCH — tamamlandı toggle */}
              <button
                onClick={() => tamamlandiToggle(gorev.id, gorev.tamamlandi)}
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                  gorev.tamamlandi
                    ? "bg-green-500 border-green-500 text-white"
                    : "border-gray-300 hover:border-green-400"
                }`}
              >
                {gorev.tamamlandi && "✓"}
              </button>

              <span className={`flex-1 text-sm ${gorev.tamamlandi ? "line-through text-gray-400" : "text-gray-800"}`}>
                {gorev.baslik}
              </span>

              <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded">
                id: {gorev.id}
              </span>

              {/* DELETE */}
              <button
                onClick={() => gorevSil(gorev.id)}
                className="text-red-400 hover:text-red-600 text-sm px-2 py-1 hover:bg-red-50 rounded transition-colors"
              >
                Sil
              </button>
            </div>
          ))}
        </div>
      )}

      {/* NASIL ÇALIŞIYOR NOTU */}
      <div className="mt-8 p-5 bg-blue-50 border border-blue-200 rounded-xl space-y-3">
        <h2 className="font-bold text-blue-900">📌 API Routes Nasıl Çalışır?</h2>
        <ul className="text-blue-800 text-sm space-y-2">
          <li>✅ <code className="bg-blue-100 px-1 rounded">app/api/*/route.ts</code> dosyaları otomatik endpoint olur</li>
          <li>✅ HTTP metodunu fonksiyon adı belirler: <code className="bg-blue-100 px-1 rounded">GET</code>, <code className="bg-blue-100 px-1 rounded">POST</code>, <code className="bg-blue-100 px-1 rounded">PATCH</code>, <code className="bg-blue-100 px-1 rounded">DELETE</code></li>
          <li>✅ Aynı uygulamada hem frontend hem backend — ayrı bir sunucu gerekmez</li>
          <li>✅ Gerçek projede bu fonksiyonların içinde Prisma / veritabanı olur</li>
          <li>🔍 Tarayıcıda direkt test: <a href="/api/gorevler" target="_blank" className="underline font-medium">/api/gorevler</a></li>
        </ul>
      </div>
    </div>
  );
}
