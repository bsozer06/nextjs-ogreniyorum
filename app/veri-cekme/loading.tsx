// loading.tsx → veri-cekme sayfası yüklenirken otomatik gösterilir
// Suspense ile entegre çalışır, hiçbir şey yazmana gerek yok

export default function VeriCekmeYukleniyor() {
  return (
    <div className="animate-pulse">
      <div className="h-8 bg-gray-200 rounded w-64 mb-2" />
      <div className="h-4 bg-gray-200 rounded w-48 mb-10" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[1, 2].map((i) => (
          <div key={i} className="bg-white rounded-xl shadow p-6">
            <div className="h-5 bg-gray-200 rounded w-40 mb-4" />
            <div className="space-y-3">
              {[1, 2, 3, 4].map((j) => (
                <div key={j} className="h-14 bg-gray-100 rounded-lg" />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
