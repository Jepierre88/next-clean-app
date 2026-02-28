import { LoginInput } from "../entities/LoginInput"
import { RegisterInput } from "../entities/RegisterInput"

export interface AuthLoginPort {
  login(input: LoginInput): Promise<void>
}

export interface AuthSocialLoginPort {
  login(): Promise<void>
}

export interface AuthLogoutPort {
  logout(): Promise<void>
}

export interface AuthRegisterPort {
  register(input: RegisterInput): Promise<void>
}

export type AuthCommandsPort = AuthLoginPort & AuthLogoutPort & AuthRegisterPort
export type AuthSocialPort = AuthSocialLoginPort & AuthLogoutPort