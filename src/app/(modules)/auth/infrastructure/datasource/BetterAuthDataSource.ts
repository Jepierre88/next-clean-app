import { AuthCommandsPort } from "@auth/domain/ports/AuthPort";
import { LoginInput } from "@auth/domain/entities/LoginInput";
import { RegisterInput } from "@auth/domain/entities/RegisterInput";
import { auth } from "../BetterAuth";
import { headers } from "next/headers";

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
        const h = await headers()
        await auth.api.signOut({ headers: h })
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