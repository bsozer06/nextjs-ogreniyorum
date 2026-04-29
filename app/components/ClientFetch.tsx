"use client";

// Client Component'te veri çekme — useEffect + useState ile
// ❌ Bu yöntemin dezavantajları:
//   - Sayfa önce boş yüklenir, sonra veri gelir (SEO kötü)
//   - loading/error state'i manuel yönetmek gerekir
//   - Waterfall: önce JS indirilir, sonra fetch başlar

import { useState, useEffect } from "react";

type Kullanici = {
  id: number;
  name: string;
  email: string;
  company: { name: string };
};

export default function ClientFetch() {
  const [kullanicilar, setKullanicilar] = useState<Kullanici[]>([]);
  const [yukleniyor, setYukleniyor] = useState(true);
  const [hata, setHata] = useState<string | null>(null);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users?_limit=4")
      .then((res) => {
        if (!res.ok) throw new Error("Veri çekilemedi");
        return res.json();
      })
      .then((data) => {
        setKullanicilar(data);
        setYukleniyor(false);
      })
      .catch((err) => {
        setHata(err.message);
        setYukleniyor(false);
      });
  }, []);

  if (yukleniyor) {
    return (
      <div className="animate-pulse space-y-3">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-16 bg-gray-200 rounded-lg" />
        ))}
      </div>
    );
  }

  if (hata) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
        Hata: {hata}
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {kullanicilar.map((k) => (
        <div key={k.id} className="flex items-center gap-3 p-3 bg-white rounded-lg border">
          <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm flex-shrink-0">
            {k.name[0]}
          </div>
          <div>
            <p className="font-medium text-gray-800 text-sm">{k.name}</p>
            <p className="text-xs text-gray-500">{k.email}</p>
          </div>
          <span className="ml-auto text-xs text-gray-400">{k.company.name}</span>
        </div>
      ))}
    </div>
  );
}
