// Basit in-memory veri deposu
// Gerçek projede burada veritabanı (Prisma, Drizzle vb.) olur
// Dev server yeniden başladığında sıfırlanır

export type Gorev = {
  id: number;
  baslik: string;
  tamamlandi: boolean;
};

// Başlangıç verileri
export const gorevler: Gorev[] = [
  { id: 1, baslik: "Next.js öğren", tamamlandi: true },
  { id: 2, baslik: "API Routes yaz", tamamlandi: false },
  { id: 3, baslik: "Proje deploy et", tamamlandi: false },
];

export let sonId = gorevler.length;
