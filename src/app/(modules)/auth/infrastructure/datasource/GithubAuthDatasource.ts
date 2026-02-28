import { AuthSocialPort } from "@auth/domain/ports/AuthPort";
import { authClient } from "../BetterAuthClient";

export default function githubAuthDatasource(): AuthSocialPort {
    async function login(): Promise<void> {
       await authClient.signIn.social({
        provider: "github",
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