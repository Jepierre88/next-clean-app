import { useCallback, useState } from "react";
import { AuthCommandsPort } from "@auth/domain/ports/AuthPort";
import { LoginInput } from "@auth/domain/entities/LoginInput";
import { RegisterInput } from "@auth/domain/entities/RegisterInput";

export default function useAuth(): AuthCommandsPort {

    const [authState, setAuthState] = useState({
        isAuthenticated: false,
        user: null,
    });

    const login = useCallback(async (params: LoginInput) => {
        // Implement the login logic using the auth use case
    }, []);

    const logout = useCallback(async () => {
        // Implement the logout logic using the auth use case
    }, []);
    const register = useCallback(async (params: RegisterInput) => {
        // Implement the register logic using the auth use case
    }, []);

    return {
        login,
        logout,
        register,
    }
}