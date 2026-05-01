import Image from "next/image";

export default function ImageOptimizationSayfasi() {
  return (
    <div className="max-w-2xl">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Image Optimization</h1>
      <p className="text-gray-500 mb-8">
        Normal <code className="bg-gray-100 px-1 rounded">&lt;img&gt;</code> ile Next.js{" "}
        <code className="bg-gray-100 px-1 rounded">&lt;Image&gt;</code> farkı
      </p>

      {/* KARŞILAŞTIRMA */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">

        {/* Normal img */}
        <div className="border rounded-xl p-4 bg-red-50 border-red-200">
          <p className="font-semibold text-red-800 mb-3">❌ Normal &lt;img&gt;</p>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://picsum.photos/seed/nextjs/400/300"
            alt="normal img"
            className="w-full rounded-lg mb-3"
          />
          <ul className="text-xs text-red-700 space-y-1">
            <li>• Orijinal boyutu indirir (gereksiz MB)</li>
            <li>• WebP/AVIF dönüşümü yok</li>
            <li>• Lazy load manuel yapılmalı</li>
            <li>• Layout shift (CLS) problemi</li>
          </ul>
        </div>

        {/* next/image */}
        <div className="border rounded-xl p-4 bg-green-50 border-green-200">
          <p className="font-semibold text-green-800 mb-3">✅ next/image &lt;Image&gt;</p>
          <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden mb-3">
            <Image
              src="https://picsum.photos/seed/nextjs/400/300"
              alt="next/image"
              fill
              className="object-cover"
            />
          </div>
          <ul className="text-xs text-green-700 space-y-1">
            <li>• Otomatik boyut optimizasyonu</li>
            <li>• WebP/AVIF formatına çevirir</li>
            <li>• Lazy load varsayılan olarak açık</li>
            <li>• Layout shift önler (yer tutar)</li>
          </ul>
        </div>
      </div>

      {/* KULLANIM ŞEKILLERI */}
      <div className="space-y-6 mb-8">

        {/* width/height ile */}
        <div className="border rounded-xl p-5">
          <p className="font-semibold text-gray-800 mb-1">1. width + height (boyutu bilinen resim)</p>
          <p className="text-xs text-gray-500 mb-3">Sabit boyutlu resimler için — en yaygın kullanım</p>
          <Image
            src="https://picsum.photos/seed/abc/600/400"
            alt="sabit boyutlu"
            width={300}
            height={200}
            className="rounded-lg"
          />
          <pre className="mt-3 bg-gray-900 text-green-400 text-xs rounded-lg p-3 overflow-x-auto">{`<Image
  src="https://picsum.photos/..."
  alt="açıklama"
  width={300}
  height={200}
/>`}</pre>
        </div>

        {/* fill ile */}
        <div className="border rounded-xl p-5">
          <p className="font-semibold text-gray-800 mb-1">2. fill (kapsayıcıyı doldur)</p>
          <p className="text-xs text-gray-500 mb-3">
            Parent&apos;ın boyutuna göre doldurmak istediğinde — <code className="bg-gray-100 px-1 rounded">relative + overflow-hidden</code> parent zorunlu
          </p>
          <div className="relative w-full h-40 rounded-lg overflow-hidden">
            <Image
              src="https://picsum.photos/seed/xyz/800/400"
              alt="fill örneği"
              fill
              className="object-cover"
            />
          </div>
          <pre className="mt-3 bg-gray-900 text-green-400 text-xs rounded-lg p-3 overflow-x-auto">{`<div className="relative w-full h-40">
  <Image
    src="..."
    alt="..."
    fill
    className="object-cover"
  />
</div>`}</pre>
        </div>

        {/* priority ile */}
        <div className="border rounded-xl p-5">
          <p className="font-semibold text-gray-800 mb-1">3. priority (LCP resmi)</p>
          <p className="text-xs text-gray-500 mb-3">
            Sayfada ilk görünen büyük resim için — lazy load kapatılır, öncelikli yüklenir
          </p>
          <Image
            src="https://picsum.photos/seed/priority/600/200"
            alt="priority resim"
            width={500}
            height={167}
            priority
            className="rounded-lg w-full"
          />
          <pre className="mt-3 bg-gray-900 text-green-400 text-xs rounded-lg p-3 overflow-x-auto">{`<Image
  src="..."
  alt="..."
  width={600}
  height={200}
  priority   // ← hero banner, üst kısımdaki resimler için
/>`}</pre>
        </div>
      </div>

      {/* ÖZET */}
      <div className="bg-gray-900 text-gray-100 rounded-xl p-5 text-sm space-y-2">
        <p className="text-gray-400 mb-3">// Kurallar</p>
        <p>✅ <span className="text-yellow-300">alt</span> zorunlu — boş bırakılabilir ama yazılmalı</p>
        <p>✅ Dış URL kullanıyorsan <span className="text-yellow-300">next.config.ts</span>&apos;e domain ekle</p>
        <p>✅ Sayfa açılışındaki ana görsel → <span className="text-yellow-300">priority</span> ekle</p>
        <p>✅ Boyutu bilmiyorsan → <span className="text-yellow-300">fill</span> + relative parent</p>
        <p>✅ Boyutu biliyorsan → <span className="text-yellow-300">width + height</span></p>
      </div>
    </div>
  );
}
