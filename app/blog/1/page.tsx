import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Next.js'e Giriş | Blog",
  description: "Next.js nedir ve ne işe yarar?",
};

export default function NextJsGiris() {
  return (
    <div>
      <Link href="/blog" className="text-blue-500 hover:underline text-sm">
        ← Blog&apos;a Dön
      </Link>

      <article className="bg-white rounded-xl shadow p-8 mt-4">
        <span className="text-xs text-gray-400">2024-01-15</span>
        <h1 className="text-3xl font-bold text-gray-800 mt-2 mb-6">
          Next.js&apos;e Giriş
        </h1>

        <p className="text-gray-700 leading-relaxed text-lg mb-6">
          Next.js, React üzerine inşa edilmiş güçlü bir framework&apos;tür.
          Server-side rendering, static site generation ve API routes gibi
          özellikler sunar.
        </p>

        <h2 className="text-xl font-semibold text-gray-800 mb-3">
          Next.js Ne Sağlar?
        </h2>
        <ul className="space-y-2 text-gray-700 mb-6">
          <li>✅ <strong>SSR</strong> — Sayfa sunucuda render edilir, SEO mükemmel olur</li>
          <li>✅ <strong>SSG</strong> — Build sırasında statik HTML üretilir, çok hızlı</li>
          <li>✅ <strong>File-based Routing</strong> — Klasör = URL, router kurulumu gerekmez</li>
          <li>✅ <strong>API Routes</strong> — Aynı projede backend yazılabilir</li>
          <li>✅ <strong>Image Optimizasyonu</strong> — Otomatik WebP dönüşümü ve lazy loading</li>
        </ul>

        <h2 className="text-xl font-semibold text-gray-800 mb-3">
          React&apos;tan Farkı Nedir?
        </h2>
        <p className="text-gray-700 leading-relaxed">
          Normal React uygulamaları yalnızca tarayıcıda çalışır (CSR). Bu SEO
          açısından zayıftır çünkü Google botu JavaScript&apos;i çalıştırmadan
          HTML&apos;i okur. Next.js, sayfaları sunucuda hazırlayıp gönderdiği
          için arama motorları içeriği hemen görebilir.
        </p>
      </article>

      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-blue-800 font-medium">
          📁 Bu sayfa <code className="bg-blue-100 px-1 rounded">app/blog/1/page.tsx</code>{" "}
          dosyasından geliyor — <strong>statik route</strong>.
          Next.js&apos;de statik route, dinamik route&apos;dan ({" "}
          <code className="bg-blue-100 px-1 rounded">[id]</code>) önce gelir!
        </p>
      </div>
    </div>
  );
}
