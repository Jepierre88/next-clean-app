// src/core/application/ports/auth-commands.port.ts
export type RegisterInput = { email: string; password: string; name?: string }
export type LoginInput = { email: string; password: string }

export interface AuthCommandsPort {
  register(input: RegisterInput): Promise<void>
  login(input: LoginInput): Promise<void>
  logout(): Promise<void>
}