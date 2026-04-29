// Login sayfası — Server Action ile giriş
// signIn() NextAuth'un kendi fonksiyonu, fetch yazmaya gerek yok

import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";

export default function LoginSayfasi({
  searchParams,
}: {
  searchParams: Promise<{ hata?: string }>;
}) {
  return (
    <div className="max-w-sm mx-auto mt-16">
      <h1 className="text-2xl font-bold text-gray-800 mb-2">Giriş Yap</h1>
      <p className="text-gray-500 text-sm mb-6">
        Test hesabı: <code className="bg-gray-100 px-1 rounded">admin@test.com</code> /{" "}
        <code className="bg-gray-100 px-1 rounded">1234</code>
      </p>

      <form
        action={async (formData: FormData) => {
          "use server";
          try {
            await signIn("credentials", {
              email: formData.get("email"),
              password: formData.get("password"),
              redirectTo: "/korunan",
            });
          } catch (error) {
            if (error instanceof AuthError) {
              redirect("/login?hata=1");
            }
            throw error; // redirect için gerekli
          }
        }}
        className="bg-white rounded-xl shadow-sm border p-6 space-y-4"
      >
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            name="email"
            type="email"
            defaultValue="admin@test.com"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Şifre
          </label>
          <input
            name="password"
            type="password"
            defaultValue="1234"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-700"
        >
          Giriş Yap
        </button>
      </form>
    </div>
  );
}
