import { AuthCommandsPort, LoginInput, RegisterInput } from "@auth/domain/entities/LoginInput";
import { betterAuthInstance } from "../BetterAuth";

export default function authAdapter(datasource: AuthCommandsPort): AuthCommandsPort {

    function login(input: LoginInput): Promise<void> {
        return datasource.login(input)
    }

    function logout(): Promise<void> {
        return datasource.logout();
    }

    function register(input: RegisterInput): Promise<void> {
        return datasource.register(input);
    }

    return {
        login,
        logout,
        register,
    }
    
}