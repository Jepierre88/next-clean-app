import { AuthCommandsPort } from "@auth/domain/ports/AuthPort"
import { RegisterInput } from "@auth/domain/entities/LoginInput"


export function registerUserUseCase(deps: { auth: AuthCommandsPort }) {
  return async function registerUser(input: RegisterInput) {
    if (!input.email || !input.password) throw new Error("VALIDATION_ERROR")
    await deps.auth.register(input)
  }
} 