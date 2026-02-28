import type { SocialAuthRegistry } from "@auth/domain/ports/AuthPort"
import type { SocialProvider } from "@auth/domain/types/SocialProvider"

export function socialLoginUseCase(deps: { registry: SocialAuthRegistry }) {
  return async function socialLogin(provider: SocialProvider) {
    await deps.registry[provider].login()
  }
}
