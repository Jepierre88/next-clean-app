import { AuthLogoutPort } from "@auth/domain/ports/AuthPort"
export function logoutUserUseCase(deps: { auth: AuthLogoutPort }) {
  return async function logoutUser() {
    await deps.auth.logout()
  }
}