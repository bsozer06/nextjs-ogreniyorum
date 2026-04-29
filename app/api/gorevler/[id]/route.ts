// app/api/gorevler/[id]/route.ts
// → GET    /api/gorevler/1  — tek görev getir
// → PATCH  /api/gorevler/1  — güncelle (tamamlandı toggle)
// → DELETE /api/gorevler/1  — sil

import { NextRequest, NextResponse } from "next/server";
import { gorevler } from "../store";

type Params = { params: Promise<{ id: string }> };

// GET /api/gorevler/[id]
export async function GET(_req: NextRequest, { params }: Params) {
  const { id } = await params;
  const gorev = gorevler.find((g) => g.id === Number(id));

  if (!gorev) {
    return NextResponse.json({ hata: "Görev bulunamadı" }, { status: 404 });
  }

  return NextResponse.json(gorev);
}

// PATCH /api/gorevler/[id]  — tamamlandi alanını güncelle
export async function PATCH(req: NextRequest, { params }: Params) {
  const { id } = await params;
  const index = gorevler.findIndex((g) => g.id === Number(id));

  if (index === -1) {
    return NextResponse.json({ hata: "Görev bulunamadı" }, { status: 404 });
  }

  const body = await req.json();
  gorevler[index] = { ...gorevler[index], ...body };

  return NextResponse.json(gorevler[index]);
}

// DELETE /api/gorevler/[id]
export async function DELETE(_req: NextRequest, { params }: Params) {
  const { id } = await params;
  const index = gorevler.findIndex((g) => g.id === Number(id));

  if (index === -1) {
    return NextResponse.json({ hata: "Görev bulunamadı" }, { status: 404 });
  }

  const silinen = gorevler.splice(index, 1)[0];
  return NextResponse.json({ mesaj: "Silindi", silinen });
}
