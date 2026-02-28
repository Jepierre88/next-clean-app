import { AuthSocialLoginPort } from "@auth/domain/ports/AuthPort"

export function socialLoginUseCase(deps: { auth: AuthSocialLoginPort }) {
  return async function socialLogin() {
    await deps.auth.login()
  }
}
