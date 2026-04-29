// SQLite + Server Actions demo
// Gerçek bir dosyaya (mesajlar.db) yazıp okuyoruz — kalıcı veri!

import db from "@/lib/db";
import { revalidatePath } from "next/cache";

type Mesaj = { id: number; metin: string; tarih: string };

// SERVER ACTION — forma yazılanı DB'ye ekle
async function mesajEkle(formData: FormData) {
  "use server";

  const metin = formData.get("metin") as string;
  if (!metin?.trim()) return;

  const tarih = new Date().toLocaleTimeString("tr-TR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  db.prepare("INSERT INTO mesajlar (metin, tarih) VALUES (?, ?)").run(metin.trim(), tarih);

  revalidatePath("/sqlite-demo");
}

// SERVER ACTION — ID'ye göre sil
async function mesajSil(formData: FormData) {
  "use server";

  const id = Number(formData.get("id"));
  db.prepare("DELETE FROM mesajlar WHERE id = ?").run(id);

  revalidatePath("/sqlite-demo");
}

export default function SqliteDemoSayfasi() {
  // Server Component içinde doğrudan DB sorgusu — fetch gerekmez!
  const mesajlar = db
    .prepare("SELECT * FROM mesajlar ORDER BY id DESC")
    .all() as Mesaj[];

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-2">SQLite + Server Actions</h1>
      <p className="text-gray-500 mb-6">
        Gerçek veritabanı — sunucu yenilense de veriler kalır
      </p>

      {/* DB DOSYASI BİLGİSİ */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6 text-sm text-blue-800">
        📁 Veri şuraya kaydediliyor:{" "}
        <code className="bg-blue-100 px-1 rounded">proje-kökü/mesajlar.db</code>
        <br />
        <span className="text-blue-600 text-xs">
          SQL: INSERT INTO mesajlar (metin, tarih) VALUES (?, ?)
        </span>
      </div>

      {/* EKLEME FORMU */}
      <form action={mesajEkle} className="flex gap-2 mb-6">
        <input
          name="metin"
          placeholder="DB'ye eklenecek mesaj..."
          className="flex-1 border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-blue-700"
        >
          Kaydet
        </button>
      </form>

      {/* MESAJ LİSTESİ */}
      <div className="space-y-2 mb-8">
        {mesajlar.length === 0 ? (
          <p className="text-gray-400 text-sm text-center py-10">
            Henüz kayıt yok — yukarıdan ekle
          </p>
        ) : (
          mesajlar.map((mesaj) => (
            <div
              key={mesaj.id}
              className="flex items-center gap-3 bg-white rounded-xl shadow-sm border p-4"
            >
              <span className="text-xs text-gray-400 font-mono w-6">#{mesaj.id}</span>
              <span className="flex-1 text-sm text-gray-800">{mesaj.metin}</span>
              <span className="text-xs text-gray-400">{mesaj.tarih}</span>

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
          ))
        )}
      </div>

      {/* KOD ÖZETİ */}
      <div className="bg-gray-900 text-gray-100 rounded-xl p-5 text-xs font-mono space-y-1">
        <p className="text-gray-400 mb-2">// lib/db.ts</p>
        <p><span className="text-blue-400">const</span> db = <span className="text-yellow-300">new Database</span>(<span className="text-green-400">&quot;mesajlar.db&quot;</span>);</p>
        <p className="mt-3 text-gray-400">// Ekle</p>
        <p>db.<span className="text-yellow-300">prepare</span>(<span className="text-green-400">&quot;INSERT INTO mesajlar (metin, tarih) VALUES (?, ?)&quot;</span>).<span className="text-yellow-300">run</span>(metin, tarih);</p>
        <p className="mt-3 text-gray-400">// Getir</p>
        <p>db.<span className="text-yellow-300">prepare</span>(<span className="text-green-400">&quot;SELECT * FROM mesajlar&quot;</span>).<span className="text-yellow-300">all</span>();</p>
        <p className="mt-3 text-gray-400">// Sil</p>
        <p>db.<span className="text-yellow-300">prepare</span>(<span className="text-green-400">&quot;DELETE FROM mesajlar WHERE id = ?&quot;</span>).<span className="text-yellow-300">run</span>(id);</p>
      </div>
    </div>
  );
}
