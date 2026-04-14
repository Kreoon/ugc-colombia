// Login manejado directamente en el cliente con @supabase/ssr createBrowserClient.
// Este endpoint ya no es necesario pero se mantiene el archivo para no romper
// referencias existentes. Devuelve 404 para cualquier método.
import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json(
    { error: "Endpoint deprecado. Usa Supabase Auth directamente." },
    { status: 404 }
  );
}
