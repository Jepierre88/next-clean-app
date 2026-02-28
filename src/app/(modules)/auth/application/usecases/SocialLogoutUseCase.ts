import type { SocialAuthRegistry } from "@auth/domain/ports/AuthPort"
import type { SocialProvider } from "@auth/domain/types/SocialProvider"

export function socialLogoutUseCase(deps: { registry: SocialAuthRegistry }) {
  return async function socialLogout(provider: SocialProvider) {
    await deps.registry[provider].logout()
  }
}
