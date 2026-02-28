import { AuthCommandsPort } from "@auth/domain/ports/AuthPort";
import { LoginInput } from "@auth/domain/entities/LoginInput";
import { RegisterInput } from "@auth/domain/entities/RegisterInput";
import { auth } from "../BetterAuth";

export default function betterAuthDataSource(): AuthCommandsPort {
    async function login(input: LoginInput): Promise<void> {
       await auth.api.signInEmail({
        body: {
            email: input.email,
            password: input.password,
        },
       })
    }

    async function logout(): Promise<void> {
        await auth.api.signOut()
    }

    async function register(input: RegisterInput): Promise<void> {
        await auth.api.signUpEmail({
            body: input
        })
    }

    return {
        login,
        logout,
        register,
    }
}