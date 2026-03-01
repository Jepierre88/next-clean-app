import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getSessionFromHeaders } from "@auth/infrastructure/proxy/getSessionFromHeaders"

export default async function proxy(request: NextRequest) {
  const session = await getSessionFromHeaders(request.headers)

  if (!session) {
    const loginUrl = new URL("/auth/login", request.url)
    loginUrl.searchParams.set("next", request.nextUrl.pathname)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*"],
}