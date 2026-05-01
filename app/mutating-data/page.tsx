import IsimFormu from "./IsimFormu";

export default function MutatingDataSayfasi() {
  return (
    <div className="max-w-lg">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Mutating Data</h1>
      <p className="text-gray-500 mb-8">
        Veri gönderirken yükleniyor durumu ve sunucudan hata mesajı almak
      </p>

      {/* KAVRAM */}
      <div className="space-y-3 mb-8 text-sm">
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <p className="font-semibold text-blue-800 mb-1">useActionState nedir?</p>
          <p className="text-blue-700">
            Server Action&apos;dan gelen cevabı ( hata veya başarı mesajı ) yakalar.
            <br />
            <code className="bg-blue-100 px-1 rounded">const [state, action] = useActionState(aksiyonFonk, null)</code>
          </p>
        </div>

        <div className="bg-purple-50 border border-purple-200 rounded-xl p-4">
          <p className="font-semibold text-purple-800 mb-1">useFormStatus nedir?</p>
          <p className="text-purple-700">
            Form gönderilirken <code className="bg-purple-100 px-1 rounded">pending = true</code> olur.
            Butonu bu sürede disable ederiz. <strong>Sadece form&apos;un içindeki child component&apos;te çalışır.</strong>
          </p>
        </div>
      </div>

      {/* DEMO */}
      <div className="bg-gray-50 border rounded-xl p-6">
        <p className="text-sm text-gray-500 mb-4">
          👇 Dene: boş gönder (hata), 1-2 harf yaz (hata), 3+ harf yaz (başarı)
        </p>
        <IsimFormu />
      </div>
    </div>
  );
}
