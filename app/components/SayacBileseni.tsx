"use client"; // ← BU SATIR çok önemli! useState kullandığımız için gerekli.

// Client Component: Tarayıcıda çalışır
// useState, useEffect, onClick gibi şeyler kullanabilir
// "use client" direktifi OLMADAN bunlar çalışmaz!

import { useState } from "react";

export default function SayacBileseni() {
  const [sayi, setSayi] = useState(0);

  return (
    <div className="bg-white rounded-xl shadow p-6 border-l-4 border-pink-500">
      <h3 className="font-bold text-lg mb-1">🎮 Client Component Örneği</h3>
      <p className="text-gray-500 text-sm mb-4">
        Bu bileşen <code className="bg-gray-100 px-1 rounded">&quot;use client&quot;</code> ile başlar.
        useState ve onClick kullanabiliriz.
      </p>
      <div className="flex items-center gap-4">
        <button
          onClick={() => setSayi(sayi - 1)}
          className="bg-red-500 text-white w-10 h-10 rounded-full text-xl font-bold hover:bg-red-600"
        >
          −
        </button>
        <span className="text-3xl font-bold text-gray-800 w-12 text-center">{sayi}</span>
        <button
          onClick={() => setSayi(sayi + 1)}
          className="bg-green-500 text-white w-10 h-10 rounded-full text-xl font-bold hover:bg-green-600"
        >
          +
        </button>
      </div>
    </div>
  );
}
