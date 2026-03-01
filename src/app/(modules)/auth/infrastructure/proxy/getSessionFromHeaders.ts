import { auth } from "@auth/infrastructure/BetterAuth"

export async function getSessionFromHeaders(headers: Headers) {
  return auth.api.getSession({ headers })
}
