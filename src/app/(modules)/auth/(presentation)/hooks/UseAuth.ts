import { useCallback } from "react";
import { authClient } from "@auth/infrastructure/BetterAuthClient";

export default function useAuth() {

    const loginWithGithub = useCallback(async () => {
        await authClient.signIn.social({
            provider: "github",
            callbackURL: "/",
        })
    }, []);

    const logout = useCallback(async () => {
        await authClient.signOut()
    }, []);

    return {
        loginWithGithub,
        logout,
    }
}