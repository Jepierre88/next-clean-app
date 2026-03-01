import { AuthLoginPort } from "@auth/domain/ports/AuthPort"
import { LoginInput } from "@auth/domain/entities/LoginInput"

export function loginUserUseCase(deps: { auth: AuthLoginPort }) {
  return async function loginUser(input: LoginInput) {
    await deps.auth.login(input)
  }
}