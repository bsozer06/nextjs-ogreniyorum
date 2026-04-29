"use client";

// Client Component — tarayıcıda çalışır
// useState, useEffect, onClick gibi her şey burada kullanılabilir

import { useState, useEffect } from "react";

export default function SaatBileseni() {
  const [saat, setSaat] = useState<string>("");

  // useEffect → tarayıcıda mount olduktan sonra çalışır
  useEffect(() => {
    const guncelle = () => {
      setSaat(new Date().toLocaleTimeString("tr-TR"));
    };
    guncelle();
    const interval = setInterval(guncelle, 1000);
    return () => clearInterval(interval); // temizlik (cleanup)
  }, []);

  return (
    <div className="bg-white rounded-xl shadow p-6 border-l-4 border-indigo-500">
      <p className="text-sm text-gray-500 mb-1">
        <code className="bg-gray-100 px-1 rounded">&quot;use client&quot;</code> +{" "}
        <code className="bg-gray-100 px-1 rounded">useEffect</code>
      </p>
      <h3 className="font-bold text-lg mb-3">🕐 Canlı Saat</h3>
      <p className="text-4xl font-mono font-bold text-indigo-600">{saat}</p>
      <p className="text-xs text-gray-400 mt-2">
        Bu değer sunucuda hesaplanamaz — tarayıcıya özgü bir bilgi.
      </p>
    </div>
  );
}
