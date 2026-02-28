import { auth } from "@auth/infrastructure/BetterAuth"
import { toNextJsHandler } from "better-auth/next-js"

export const { GET, POST } = toNextJsHandler(auth)
