import { useCallback } from "react"
import type { SocialProvider } from "@auth/domain/types/SocialProvider"
import socialAuthContainer from "@auth/application/composition/socialAuthContainer"

export default function useAuth() {
  const { usecases } = socialAuthContainer()

  const loginWithProvider = useCallback(
    async (provider: SocialProvider) => {
      await usecases.socialLogin(provider)
    },
    [usecases]
  )

  const logout = useCallback(
    async (provider: SocialProvider) => {
      await usecases.socialLogout(provider)
    },
    [usecases]
  )

  return {
    loginWithProvider,
    logout,
  }
}
