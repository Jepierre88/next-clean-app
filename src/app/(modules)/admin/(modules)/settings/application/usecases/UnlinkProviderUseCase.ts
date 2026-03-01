import type { SocialProvider } from "@auth/domain/types/SocialProvider"
import type { AccountSettingsPort } from "../../domain/ports/AccountSettingsPort"

export function unlinkProviderUseCase(deps: { port: AccountSettingsPort }) {
  return async function unlinkProvider(userId: string, provider: SocialProvider) {
    await deps.port.unlinkProvider(userId, provider)
  }
}
