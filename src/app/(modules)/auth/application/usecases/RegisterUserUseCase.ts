import { AuthRegisterPort } from "@auth/domain/ports/AuthPort"
import { RegisterInput } from "@auth/domain/entities/RegisterInput"


export function registerUserUseCase(deps: { auth: AuthRegisterPort }) {
  return async function registerUser(input: RegisterInput) {
    await deps.auth.register(input)
  }
} 