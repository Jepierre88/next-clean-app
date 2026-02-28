import { useCallback } from "react";
import type { SocialProvider } from "@auth/domain/types/SocialProvider";
import socialAuthContainer from "@auth/application/composition/socialAuthContainer";

export default function useAuth() {
    const { usecases } = socialAuthContainer();

    const loginWithProvider = useCallback(async (provider: SocialProvider) => {
        await usecases.socialLogin(provider)
    }, [usecases]);

    const logout = useCallback(async () => {
        await usecases.socialLogout("github")
    }, [usecases]);

    return {
        loginWithProvider,
        logout,
    }
}