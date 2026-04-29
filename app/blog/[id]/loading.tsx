// loading.tsx → Sayfa yüklenirken otomatik gösterilir
// Bu dosyayı oluşturmak yeterli, Next.js gerisini halleder!

export default function BlogDetayYukleniyor() {
  return (
    <div className="animate-pulse">
      <div className="h-4 bg-gray-200 rounded w-24 mb-6"></div>
      <div className="bg-white rounded-xl shadow p-8">
        <div className="h-3 bg-gray-200 rounded w-24 mb-4"></div>
        <div className="h-8 bg-gray-300 rounded w-3/4 mb-6"></div>
        <div className="space-y-3">
          <div className="h-4 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          <div className="h-4 bg-gray-200 rounded w-4/6"></div>
        </div>
      </div>
    </div>
  );
}
