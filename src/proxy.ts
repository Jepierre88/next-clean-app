// src/proxy.ts
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { auth } from "../auth"

// Puedes exportarlo default o como `export function proxy(...)` :contentReference[oaicite:2]{index=2}
export default async function proxy(request: NextRequest) {
  // Mejor Auth: usa los headers del request del Proxy
  const session = await auth.api.getSession({
    headers: request.headers,
  })

  if (!session) {
    const loginUrl = new URL("/auth/login", request.url)
    // opcional: para volver luego de login
    loginUrl.searchParams.set("next", request.nextUrl.pathname)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

// Aquí pones los paths reales que quieres proteger.
export const config = {
  matcher: [
    "/admin/:path*",
  ],
}