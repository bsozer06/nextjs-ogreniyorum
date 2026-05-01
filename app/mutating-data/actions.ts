"use server";

// Bu fonksiyon sunucuda çalışır.
// useActionState ile kullanılacaksa imzası şu şekilde OLMAK ZORUNDA:
// (öncekiDurum, formData) → yeni durum
export async function isimKaydetAction(
  _oncekiDurum: { hata?: string; basari?: string } | null,
  formData: FormData
) {
  // Yapay gecikme — gerçekte DB yazımı bu kadar sürer
  await new Promise((r) => setTimeout(r, 1500));

  const isim = formData.get("isim") as string;

  // Sunucu taraflı validasyon
  if (!isim || isim.trim().length < 3) {
    return { hata: "İsim en az 3 karakter olmalı!" };
  }

  // Başarılı → gerçek uygulamada burada DB'ye yazarsın
  return { basari: `"${isim.trim()}" kaydedildi ✅` };
}
