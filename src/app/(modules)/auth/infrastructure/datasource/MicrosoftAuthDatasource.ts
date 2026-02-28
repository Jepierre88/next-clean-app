import { AuthSocialPort } from "@auth/domain/ports/AuthPort"
import { authClient } from "../BetterAuthClient"

export default function microsoftAuthDatasource(): AuthSocialPort {
    async function login(): Promise<void> {
        await authClient.signIn.social({
            provider: "microsoft",
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
