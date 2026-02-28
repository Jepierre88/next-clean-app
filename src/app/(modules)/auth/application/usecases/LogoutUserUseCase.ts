import { AuthCommandsPort } from "@auth/domain/ports/AuthPort"
export function logoutUserUseCase(deps: { auth: AuthCommandsPort }) {
  return async function logoutUser() {
    await deps.auth.logout()
  }
}