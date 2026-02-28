import { AuthCommandsPort, LoginInput, RegisterInput } from "@auth/domain/entities/LoginInput";
import { authClient } from "../BetterAuthClient";
import { betterAuthInstance } from "../BetterAuth";

export default function betterAuthDataSource(): AuthCommandsPort {
    async function login(input: LoginInput): Promise<void> {
       await betterAuthInstance.api.signInEmail({
        body: {
            email: input.email,
            password: input.password,
        },
       })
    }

    async function logout(): Promise<void> {
        // Implement the logout logic using better-auth
    }

    async function register(input: RegisterInput): Promise<void> {
        // Implement the register logic using better-auth
    }

    return {
        login,
        logout,
        register,
    }
}