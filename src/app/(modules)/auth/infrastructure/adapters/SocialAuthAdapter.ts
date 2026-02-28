import { AuthSocialPort } from "@auth/domain/ports/AuthPort";

export default function socialAuthAdapter(datasource: AuthSocialPort): AuthSocialPort {

    function login(): Promise<void> {
        return datasource.login()
    }

    function logout(): Promise<void> {
        return datasource.logout()
    }

    return {
        login,
        logout,
    }
}
