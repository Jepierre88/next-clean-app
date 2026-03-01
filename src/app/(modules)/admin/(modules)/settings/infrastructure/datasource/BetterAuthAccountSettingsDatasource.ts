import { auth } from "@auth/infrastructure/BetterAuth"
import {
  SOCIAL_PROVIDERS,
  type SocialProvider,
} from "@auth/domain/types/SocialProvider"
import type { AccountSettingsPort } from "../../domain/ports/AccountSettingsPort"
import { headers } from "next/headers"

function isSocialProvider(value: string): value is SocialProvider {
  return (SOCIAL_PROVIDERS as readonly string[]).includes(value)
}

async function requireAuthedHeadersForUser(userId: string): Promise<Headers> {
  const h = await headers()
  const session = await auth.api.getSession({ headers: h })

  if (!session?.user?.id) {
    throw new Error("No autenticado")
  }

  if (session.user.id !== userId) {
    throw new Error("No autorizado")
  }

  return h
}

export default function betterAuthAccountSettingsDatasource(): AccountSettingsPort {
  async function listLinkedProviders(userId: string): Promise<SocialProvider[]> {
    const h = await requireAuthedHeadersForUser(userId)

    const accounts = await auth.api.listUserAccounts({ headers: h })

    return accounts
      .map((a) => a.providerId)
      .filter((providerId): providerId is SocialProvider =>
        isSocialProvider(providerId)
      )
  }

  async function updateProfileImage(
    userId: string,
    image: string | null
  ): Promise<void> {
    const h = await requireAuthedHeadersForUser(userId)

    await auth.api.updateUser({
      headers: h,
      body: {
        image,
      },
    })
  }

  async function unlinkProvider(
    userId: string,
    provider: SocialProvider
  ): Promise<void> {
    const h = await requireAuthedHeadersForUser(userId)

    await auth.api.unlinkAccount({
      headers: h,
      body: {
        providerId: provider,
      },
    })
  }

  return {
    listLinkedProviders,
    updateProfileImage,
    unlinkProvider,
  }
}
