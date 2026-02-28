import { LoginInput, RegisterInput } from "../entities/LoginInput"


export interface AuthCommandsPort {
  register(input: RegisterInput): Promise<void>
  login(input: LoginInput): Promise<void>
  logout(): Promise<void>
}