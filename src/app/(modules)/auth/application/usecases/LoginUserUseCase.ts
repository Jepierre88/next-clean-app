import { AuthCommandsPort } from "@auth/domain/ports/AuthPort"
import { LoginInput } from "@auth/domain/entities/LoginInput"

export function loginUserUseCase(deps: { auth: AuthCommandsPort }) {
  return async function loginUser(input: LoginInput) {
    console.log("Executing loginUserUseCase with input:", input)
    if (!input.email || !input.password) throw new Error("VALIDATION_ERROR")
    await deps.auth.login(input)
  }
}