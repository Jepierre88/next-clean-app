import { prisma } from "@shared/lib/prisma"
import {
  SOCIAL_PROVIDERS,
  type SocialProvider,
} from "@auth/domain/types/SocialProvider"
import type { AccountSettingsPort } from "../../domain/ports/AccountSettingsPort"

function isSocialProvider(value: string): value is SocialProvider {
  return (SOCIAL_PROVIDERS as readonly string[]).includes(value)
}

export default function prismaAccountSettingsDatasource(): AccountSettingsPort {
  async function listLinkedProviders(userId: string): Promise<SocialProvider[]> {
    const accounts = await prisma.account.findMany({
      where: { userId },
      select: { providerId: true },
    })

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
    await prisma.user.update({
      where: { id: userId },
      data: { image },
    })
  }

  async function unlinkProvider(
    userId: string,
    provider: SocialProvider
  ): Promise<void> {
    const accountCount = await prisma.account.count({
      where: { userId },
    })

    if (accountCount <= 1) {
      throw new Error("No puedes desvincular el último método de inicio de sesión")
    }

    await prisma.account.deleteMany({
      where: {
        userId,
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
