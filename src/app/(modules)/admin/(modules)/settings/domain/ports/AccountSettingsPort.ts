import type { SocialProvider } from "@auth/domain/types/SocialProvider"

export interface AccountSettingsPort {
  listLinkedProviders(userId: string): Promise<SocialProvider[]>
  updateProfileImage(userId: string, image: string | null): Promise<void>
  unlinkProvider(userId: string, provider: SocialProvider): Promise<void>
}
