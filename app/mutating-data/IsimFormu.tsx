"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { isimKaydetAction } from "./actions";

// ── useFormStatus sadece <form> içindeki child component'te çalışır ──
// Bu yüzden butonu ayrı component olarak çıkardık
function GonderButonu() {
  const { pending } = useFormStatus(); // form gönderiliyor mu?

  return (
    <button
      type="submit"
      disabled={pending}
      className="bg-blue-600 text-white px-5 py-2 rounded-lg text-sm disabled:opacity-50"
    >
      {pending ? "Gönderiliyor..." : "Gönder"}
    </button>
  );
}

// ── Ana form bileşeni ──
export default function IsimFormu() {
  // useActionState:
  // - state   → sunucudan gelen son cevap ({ hata } veya { basari })
  // - action  → forma verilecek action fonksiyonu
  const [state, action] = useActionState(isimKaydetAction, null);

  return (
    <form action={action} className="space-y-3 max-w-xs">
      <input
        name="isim"
        placeholder="İsminizi yazın..."
        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
      />

      {/* Sunucudan hata geldiyse göster */}
      {state?.hata && (
        <p className="text-red-600 text-sm">❌ {state.hata}</p>
      )}

      {/* Sunucudan başarı geldiyse göster */}
      {state?.basari && (
        <p className="text-green-600 text-sm">{state.basari}</p>
      )}

      <GonderButonu />
    </form>
  );
}
