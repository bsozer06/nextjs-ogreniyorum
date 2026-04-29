# Next.js Özet

## Proje Kurulumu
```bash
npx create-next-app@latest proje-adi --typescript --tailwind --eslint --app
cd proje-adi
npm run dev  # localhost:3000
```

---

## Klasör Yapısı
```
app/
├── layout.tsx        → Tüm sayfalara sarılan şablon (navbar, footer)
├── page.tsx          → / (ana sayfa)
├── hakkinda/
│   └── page.tsx      → /hakkinda
├── blog/
│   ├── page.tsx      → /blog
│   └── [id]/
│       ├── page.tsx  → /blog/1, /blog/2 ... (dinamik route)
│       └── loading.tsx → Yüklenirken gösterilen skeleton
└── components/
    └── Bilesenim.tsx → Paylaşılan bileşenler
```

---

## Routing
- Klasör adı = URL segmenti
- İçinde `page.tsx` olması zorunlu
- `[id]` → dinamik parametre, `params.id` ile okunur

---

## layout.tsx
```tsx
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <body>
        <nav>...</nav>
        {children}   {/* aktif sayfa buraya gelir */}
      </body>
    </html>
  );
}
```

---

## Server vs Client Component

| | Server Component | Client Component |
|---|---|---|
| Varsayılan | ✅ | ❌ |
| `"use client"` | Gerekmez | Gerekir |
| useState / onClick | ❌ | ✅ |
| SEO | ✅ | Zayıf |

```tsx
// Client Component — dosyanın en üstüne yaz
"use client";
import { useState } from "react";
```

---

## Link Bileşeni
```tsx
import Link from "next/link";

// <a> yerine bunu kullan → sayfa yenilemeden geçiş yapar
<Link href="/blog">Blog</Link>
```

---

## Metadata (SEO)
```tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sayfa Başlığı",
  description: "Sayfa açıklaması",
};
```

---

## Dinamik Route — params okuma
```tsx
export default async function Sayfa({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <div>ID: {id}</div>;
}
```

---

## Özel Dosyalar
| Dosya | Ne işe yarar |
|---|---|
| `layout.tsx` | Sayfaları saran şablon |
| `page.tsx` | Route'un sayfası |
| `loading.tsx` | Yüklenirken otomatik gösterilir |
| `error.tsx` | Hata olunca gösterilir |
| `not-found.tsx` | 404 sayfası |

---

## Statik vs Dinamik Route Önceliği
```
app/blog/1/page.tsx    → /blog/1  (statik, önce gelir)
app/blog/[id]/page.tsx → /blog/99 (dinamik, fallback)
```

---

## Aktif Link — usePathname
```tsx
"use client"; // hook kullandığı için zorunlu
import { usePathname } from "next/navigation";

const pathname = usePathname(); // örn: "/blog"
const aktif = pathname.startsWith("/blog");
```
- `layout.tsx` Server Component olduğu için `usePathname` doğrudan içinde kullanılamaz
- Navbar'ı ayrı Client Component'e çıkar, layout'ta import et

---

## Veri Çekme — Server Component (önerilen)
```tsx
export default async function Sayfa() {
  const res = await fetch("https://api.example.com/data");
  const data = await res.json();
  return <div>{data.title}</div>;
}
```
- `async/await` yeterli, hook gerekmez
- HTML sunucuda hazır gelir → SEO mükemmel
- API key tarayıcıya gitmez → güvenli

## Veri Çekme — Client Component
```tsx
"use client";
const [data, setData] = useState(null);
useEffect(() => {
  fetch("/api/...").then(r => r.json()).then(setData);
}, []);
```
- Sayfa önce boş yüklenir, sonra veri gelir
- Gerçek zamanlı / interaktif veri için kullan

## Fetch Cache Seçenekleri
```ts
fetch("/api", { cache: "no-store" })          // her zaman taze
fetch("/api", { next: { revalidate: 60 } })   // 60sn'de bir yenile (ISR)
fetch("/api", { cache: "force-cache" })       // sonsuza cache (default)
```

---

## API Routes (Route Handlers)
```
app/api/gorevler/route.ts       → GET /api/gorevler
                                   POST /api/gorevler
app/api/gorevler/[id]/route.ts  → GET /api/gorevler/1
                                   PATCH /api/gorevler/1
                                   DELETE /api/gorevler/1
```
- Dosya adı her zaman `route.ts` (page.tsx değil!)
- Fonksiyon adı = HTTP metodu

```ts
import { NextRequest, NextResponse } from "next/server";

export function GET() {
  return NextResponse.json(data);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  return NextResponse.json(yeni, { status: 201 });
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  // sil...
  return NextResponse.json({ mesaj: "Silindi" });
}
```

## Route Handler Ne Zaman Gerekir?
| Durum | Yöntem |
|---|---|
| Dış API'den veri çekme | Server Component'te direkt `fetch` |
| DB'ye yazma / okuma | Route Handler veya Server Action |

---

## Server Actions

Form submit ve mutation işlemleri için **önerilen yöntem** (Next.js resmi tavsiyesi).

```ts
// Fonksiyon başına "use server" ekle
async function kaydet(formData: FormData) {
  "use server";
  const metin = formData.get("metin") as string;
  // DB işlemi...
  revalidatePath("/sayfa"); // sayfayı yeniden render et
}

// Form'un action prop'una direkt ver
<form action={kaydet}>
  <input name="metin" />
  <button type="submit">Gönder</button>
</form>
```

- `"use server"` → fonksiyonu sunucuda çalıştırır
- `formData.get("alan")` → form verisini okur
- `revalidatePath()` → sayfayı yeniden render eder
- JS kapalı olsa bile çalışır (progressive enhancement)
- CSRF koruması otomatik gelir

## Route Handler vs Server Actions Karşılaştırma

| Durum | Route Handler | Server Actions |
|---|---|---|
| Form submit / CRUD | Fazla kod | ✅ Best practice |
| Mobil uygulama da kullanacak | ✅ | ❌ |
| Dış servis webhook (Stripe, GitHub) | ✅ | ❌ |
| GET endpoint — veri okuma | ✅ | ❌ (sadece mutation) |
| Sadece Next.js frontend'i var | Çalışır | ✅ Önerilen |
| CSRF koruması | Manuel | ✅ Otomatik |

**Özet kural:**
- Kendi Next.js app'inden mutation → **Server Actions**
- API olarak dışarıya açman gerekiyor → **Route Handler**
| Mobil uygulama da kullanacaksa | Route Handler |
| Sadece form submit | **Server Action** daha basit |
