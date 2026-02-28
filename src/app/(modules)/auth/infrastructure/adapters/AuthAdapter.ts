import { AuthCommandsPort, LoginInput, RegisterInput } from "@auth/domain/entities/LoginInput";

export default function authAdapter(): AuthCommandsPort {

    function login(input: LoginInput): Promise<void> {
        return Promise.resolve();
    }

    function logout(): Promise<void> {
        return Promise.resolve();
    }

    function register(input: RegisterInput): Promise<void> {
        return Promise.resolve();
    }

    return {
        login,
        logout,
        register,
    }
    
}