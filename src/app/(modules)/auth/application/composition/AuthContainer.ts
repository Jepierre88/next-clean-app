import authAdapter from "@auth/infrastructure/adapters/AuthAdapter";
import socialAuthAdapter from "@auth/infrastructure/adapters/SocialAuthAdapter";

import { registerUserUseCase } from "@auth/application/usecases/RegisterUserUseCase";
import { loginUserUseCase } from "@auth/application/usecases/LoginUserUseCase";
import { logoutUserUseCase } from "@auth/application/usecases/LogoutUserUseCase";
import { socialLoginUseCase } from "@auth/application/usecases/SocialLoginUseCase";
import betterAuthDataSource from "@auth/infrastructure/datasource/BetterAuthDataSource";
import githubAuthDatasource from "@auth/infrastructure/datasource/GithubAuthDatasource";

export default function authContainer() {
    const emailAuth = authAdapter(betterAuthDataSource());
    const githubAuth = socialAuthAdapter(githubAuthDatasource());

    return {
        usecases: {
            registerUser: registerUserUseCase({ auth: emailAuth }),
            loginUser: loginUserUseCase({ auth: emailAuth }),
            logoutUser: logoutUserUseCase({ auth: emailAuth }),
            socialLogin: socialLoginUseCase({ auth: githubAuth }),
            socialLogout: logoutUserUseCase({ auth: githubAuth }),
        }
    }
}