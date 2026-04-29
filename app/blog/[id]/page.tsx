// localhost:3000/blog/1, /blog/2, /blog/3 → artık kendi statik sayfaları var!
// Bu dosya yalnızca tanımsız id'leri yakalar: /blog/99, /blog/abc ...
// Statik route (app/blog/1/) her zaman dinamik route'dan ([id]) önce gelir.

import Link from "next/link";

export default async function BlogDetayFallback({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div>
      <Link href="/blog" className="text-blue-500 hover:underline text-sm">
        ← Blog&apos;a Dön
      </Link>

      <div className="text-center py-20 bg-white rounded-xl shadow mt-4">
        <h1 className="text-2xl font-bold text-red-600">Yazı bulunamadı!</h1>
        <p className="text-gray-500 mt-2">
          ID: <strong>{id}</strong> numaralı yazı mevcut değil.
        </p>
      </div>

      <div className="mt-6 p-4 bg-purple-50 border border-purple-200 rounded-lg">
        <p className="text-purple-800 font-medium">
          🎯 <strong>Dinamik Route Fallback:</strong> Bu dosya (
          <code className="bg-purple-100 px-1 rounded">app/blog/[id]/page.tsx</code>
          ) yalnızca statik sayfası <strong>olmayan</strong> id&apos;ler için çalışır.
          /blog/1, /blog/2, /blog/3 artık kendi{" "}
          <code className="bg-purple-100 px-1 rounded">page.tsx</code> dosyalarına sahip.
        </p>
      </div>
    </div>
  );
}

