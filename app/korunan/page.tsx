// Korunan sayfa — sadece giriş yapmış kullanıcılar görebilir
// Middleware zaten /login'e yönlendiriyor ama burada da kontrol ediyoruz

import { auth, signOut } from "@/auth";
import { redirect } from "next/navigation";

export default async function KorunanSayfa() {
  const session = await auth(); // sunucuda session oku

  if (!session) redirect("/login"); // middleware'e rağmen ekstra güvenlik

  return (
    <div className="max-w-lg mx-auto mt-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">🔒 Korunan Sayfa</h1>
      <p className="text-gray-500 mb-6">
        Bu sayfayı sadece giriş yapmış kullanıcılar görebilir
      </p>

      {/* KULLANICI BİLGİSİ */}
      <div className="bg-green-50 border border-green-200 rounded-xl p-5 mb-6">
        <p className="text-green-700 font-semibold mb-3">✅ Giriş yapıldı!</p>
        <div className="space-y-1 text-sm text-green-800">
          <p><span className="font-medium">İsim:</span> {session.user?.name}</p>
          <p><span className="font-medium">Email:</span> {session.user?.email}</p>
        </div>
      </div>

      {/* SESSION OBJESI */}
      <div className="bg-gray-900 text-gray-100 rounded-xl p-4 text-xs font-mono mb-6">
        <p className="text-gray-400 mb-2">// await auth() şunu döndürür:</p>
        <pre>{JSON.stringify(session, null, 2)}</pre>
      </div>

      {/* ÇIKIŞ */}
      <form
        action={async () => {
          "use server";
          await signOut({ redirectTo: "/" });
        }}
      >
        <button
          type="submit"
          className="bg-red-500 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-red-600"
        >
          Çıkış Yap
        </button>
      </form>
    </div>
  );
}
