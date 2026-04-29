// app/api/gorevler/route.ts
// → GET  /api/gorevler   — tüm görevleri getir
// → POST /api/gorevler   — yeni görev ekle
//
// Dosya adı her zaman route.ts olmalı (page.tsx değil!)

import { NextRequest, NextResponse } from "next/server";
import { gorevler, sonId } from "./store";
import * as store from "./store";

// GET /api/gorevler
export function GET() {
  return NextResponse.json(gorevler);
}

// POST /api/gorevler
export async function POST(request: NextRequest) {
  const body = await request.json();

  // Basit validasyon
  if (!body.baslik || typeof body.baslik !== "string" || body.baslik.trim() === "") {
    return NextResponse.json(
      { hata: "baslik alanı zorunludur" },
      { status: 400 }
    );
  }

  store.sonId += 1;
  const yeniGorev = {
    id: store.sonId,
    baslik: body.baslik.trim(),
    tamamlandi: false,
  };

  gorevler.push(yeniGorev);

  return NextResponse.json(yeniGorev, { status: 201 });
}
