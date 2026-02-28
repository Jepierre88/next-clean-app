import authAdapter from "@/app/(modules)/auth/infrastructure/adapters/AuthAdapter";

import { registerUserUseCase } from "@auth/application/usecases/RegisterUserUseCase";
import { loginUserUseCase } from "@auth/application/usecases/LoginUserUseCase";
import { logoutUserUseCase } from "@auth/application/usecases/LogoutUserUseCase";
import betterAuthDataSource from "@auth/infrastructure/datasource/BetterAuthDataSource";

export default function authContainer() {
    const auth = authAdapter(betterAuthDataSource());
    return {
        usecases: {
            registerUser: registerUserUseCase({ auth }),
            loginUser: loginUserUseCase({ auth }),
            logoutUser: logoutUserUseCase({ auth }),
        }
    }
}