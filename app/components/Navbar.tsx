"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const linkler = [
  { href: "/", label: "🏠 Ana Sayfa" },
  { href: "/hakkinda", label: "Hakkında" },
  { href: "/blog", label: "Blog" },
  { href: "/bilesenler", label: "Server vs Client" },
  { href: "/veri-cekme", label: "Veri Çekme" },
  { href: "/api-demo", label: "API Routes" },
  { href: "/server-actions", label: "Server Actions" },
  { href: "/sqlite-demo", label: "SQLite" },
  { href: "/mutating-data", label: "Mutating Data" },
  { href: "/caching", label: "Caching" },
  { href: "/revalidating", label: "Revalidating" },
  { href: "/image-optimization", label: "Image" },
  { href: "/korunan", label: "🔒 Korunan" },
  { href: "/login", label: "Giriş" },
];

export default function Navbar() {
  const pathname = usePathname(); // mevcut URL yolu, örn: "/blog"

  return (
    <nav className="bg-blue-600 text-white px-6 py-4 flex gap-6">
      {linkler.map(({ href, label }) => {
        // Aktif mi? Ana sayfa için tam eşleşme, diğerleri için startsWith
        const aktif =
          href === "/" ? pathname === "/" : pathname.startsWith(href);

        return (
          <Link
            key={href}
            href={href}
            className={
              aktif
                ? "font-bold underline underline-offset-4"
                : "hover:underline opacity-80"
            }
          >
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
