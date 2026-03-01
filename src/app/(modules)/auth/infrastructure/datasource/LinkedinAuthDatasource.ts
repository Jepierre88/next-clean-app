import { AuthSocialPort } from "@auth/domain/ports/AuthPort";
import { authClient } from "../BetterAuthClient";

export default function linkedinAuthDatasource():AuthSocialPort {
    async function login(): Promise<void> {
        authClient.signIn.social({
            provider: "linkedin",
            callbackURL: "/",
        })
    }

    async function logout(): Promise<void> {
        await authClient.signOut()
    }

    return {
        login,
        logout,
    }
}