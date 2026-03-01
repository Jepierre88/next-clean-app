import type { AccountSettingsPort } from "../../domain/ports/AccountSettingsPort"

export function updateProfileImageUseCase(deps: { port: AccountSettingsPort }) {
  return async function updateProfileImage(userId: string, image: string | null) {
    const normalizedImage = image?.trim() ? image.trim() : null
    await deps.port.updateProfileImage(userId, normalizedImage)
  }
}
