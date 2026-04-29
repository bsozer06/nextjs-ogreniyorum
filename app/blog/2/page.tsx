import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Server Components Nedir? | Blog",
  description: "Sunucu bileşenleri ile performanslı uygulamalar.",
};

export default function ServerComponentsNedir() {
  return (
    <div>
      <Link href="/blog" className="text-blue-500 hover:underline text-sm">
        ← Blog&apos;a Dön
      </Link>

      <article className="bg-white rounded-xl shadow p-8 mt-4">
        <span className="text-xs text-gray-400">2024-01-20</span>
        <h1 className="text-3xl font-bold text-gray-800 mt-2 mb-6">
          Server Components Nedir?
        </h1>

        <p className="text-gray-700 leading-relaxed text-lg mb-6">
          Server Components, React 18 ile gelen ve Next.js App Router&apos;da
          varsayılan olarak kullanılan bileşen türüdür. Sunucuda render
          edilirler, bu da daha iyi SEO ve performans sağlar.
        </p>

        <h2 className="text-xl font-semibold text-gray-800 mb-3">
          Server Component Özellikleri
        </h2>
        <ul className="space-y-2 text-gray-700 mb-6">
          <li>✅ Varsayılan olarak tüm bileşenler Server Component&apos;tır</li>
          <li>✅ Veritabanına, dosya sistemine doğrudan erişebilir</li>
          <li>✅ JavaScript bundle&apos;ına dahil edilmez → tarayıcıya az kod gider</li>
          <li>✅ SEO mükemmeldir — HTML sunucuda hazır gelir</li>
          <li>❌ <code className="bg-gray-100 px-1 rounded">useState</code>, <code className="bg-gray-100 px-1 rounded">useEffect</code> kullanamaz</li>
          <li>❌ Tarayıcı eventleri (<code className="bg-gray-100 px-1 rounded">onClick</code> vb.) çalışmaz</li>
        </ul>

        <h2 className="text-xl font-semibold text-gray-800 mb-3">
          Ne Zaman Client Component Kullanmalı?
        </h2>
        <div className="bg-gray-50 rounded-lg p-4 font-mono text-sm mb-4">
          <div className="text-gray-500 mb-2">// Client Component — dosyanın en üstüne ekle</div>
          <div className="text-purple-600">&quot;use client&quot;;</div>
          <div className="mt-2 text-blue-600">import {"{ useState }"} from &quot;react&quot;;</div>
        </div>
        <p className="text-gray-700">
          Eğer <code className="bg-gray-100 px-1 rounded">useState</code>,{" "}
          <code className="bg-gray-100 px-1 rounded">useEffect</code> veya{" "}
          <code className="bg-gray-100 px-1 rounded">onClick</code> gibi şeyler
          kullanman gerekiyorsa dosyanın en üstüne{" "}
          <code className="bg-gray-100 px-1 rounded">&quot;use client&quot;</code> yaz.
        </p>
      </article>

      <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
        <p className="text-green-800 font-medium">
          📁 Bu sayfa <code className="bg-green-100 px-1 rounded">app/blog/2/page.tsx</code>{" "}
          dosyasından geliyor — <strong>statik route</strong>.
        </p>
      </div>
    </div>
  );
}
