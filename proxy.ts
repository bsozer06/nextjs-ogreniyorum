// Proxy (eski adı: middleware) — her istekten ÖNCE çalışır
// /korunan altındaki tüm sayfalara giriş zorunluluğu getirir
// Next.js 16+ → dosya adı middleware.ts yerine proxy.ts oldu

export { auth as proxy } from "@/auth";

export const config = {
  matcher: ["/korunan/:path*"], // sadece bu path'leri kontrol et
};
