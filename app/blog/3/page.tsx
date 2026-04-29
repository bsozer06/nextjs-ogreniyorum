import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "App Router Kullanımı | Blog",
  description: "File-based routing ile hızlı navigasyon.",
};

export default function AppRouterKullanimı() {
  return (
    <div>
      <Link href="/blog" className="text-blue-500 hover:underline text-sm">
        ← Blog&apos;a Dön
      </Link>

      <article className="bg-white rounded-xl shadow p-8 mt-4">
        <span className="text-xs text-gray-400">2024-01-25</span>
        <h1 className="text-3xl font-bold text-gray-800 mt-2 mb-6">
          App Router Kullanımı
        </h1>

        <p className="text-gray-700 leading-relaxed text-lg mb-6">
          Next.js App Router ile dosya sistemine dayalı routing kullanılır.
          Her klasör bir route segmenti, her{" "}
          <code className="bg-gray-100 px-1 rounded">page.tsx</code> o
          route&apos;un sayfasıdır.
        </p>

        <h2 className="text-xl font-semibold text-gray-800 mb-3">
          Özel Dosyalar
        </h2>
        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="text-left p-3 border border-gray-200">Dosya</th>
                <th className="text-left p-3 border border-gray-200">Ne işe yarar</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["page.tsx", "Route'un ana sayfası"],
                ["layout.tsx", "Sayfaları saran şablon (navbar, footer)"],
                ["loading.tsx", "Yüklenirken otomatik gösterilir"],
                ["error.tsx", "Hata oluşunca gösterilir"],
                ["not-found.tsx", "404 sayfası"],
              ].map(([dosya, aciklama]) => (
                <tr key={dosya} className="border border-gray-200">
                  <td className="p-3">
                    <code className="bg-gray-100 px-1 rounded">{dosya}</code>
                  </td>
                  <td className="p-3 text-gray-600">{aciklama}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 className="text-xl font-semibold text-gray-800 mb-3">
          Route Türleri
        </h2>
        <div className="space-y-3 text-gray-700">
          <div className="bg-gray-50 rounded-lg p-3 font-mono text-sm">
            <span className="text-gray-400">// Statik route</span>
            <br />
            app/hakkinda/page.tsx → /hakkinda
          </div>
          <div className="bg-gray-50 rounded-lg p-3 font-mono text-sm">
            <span className="text-gray-400">// Dinamik route</span>
            <br />
            app/blog/[id]/page.tsx → /blog/1, /blog/2, /blog/99...
          </div>
          <div className="bg-gray-50 rounded-lg p-3 font-mono text-sm">
            <span className="text-gray-400">// Statik önceliklidir!</span>
            <br />
            app/blog/1/page.tsx → /blog/1 (dinamik [id]&apos;den önce gelir)
          </div>
        </div>
      </article>

      <div className="mt-6 p-4 bg-purple-50 border border-purple-200 rounded-lg">
        <p className="text-purple-800 font-medium">
          📁 Bu sayfa <code className="bg-purple-100 px-1 rounded">app/blog/3/page.tsx</code>{" "}
          dosyasından geliyor — <strong>statik route</strong>.
        </p>
      </div>
    </div>
  );
}
