// NextAuth v5 (Auth.js) konfigürasyonu
// Credentials provider — kullanıcı adı + şifre ile giriş

import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

// Gerçek uygulamada bu kullanıcılar DB'den gelir
const kullanicilar = [
  { id: "1", name: "Admin", email: "admin@test.com", password: "1234" },
  { id: "2", name: "Burhan", email: "burhan@test.com", password: "5678" },
];

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email" },
        password: { label: "Şifre", type: "password" },
      },
      authorize(credentials) {
        // Kullanıcıyı bul ve şifreyi kontrol et
        const kullanici = kullanicilar.find(
          (k) =>
            k.email === credentials.email &&
            k.password === credentials.password
        );

        if (!kullanici) return null; // null → giriş başarısız

        return { id: kullanici.id, name: kullanici.name, email: kullanici.email };
      },
    }),
  ],
  pages: {
    signIn: "/login", // varsayılan NextAuth sayfası yerine kendi sayfamız
  },
});
