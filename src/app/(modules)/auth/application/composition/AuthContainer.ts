import authAdapter from "@auth/infrastructure/adapters/AuthAdapter";

import { registerUserUseCase } from "@auth/application/usecases/RegisterUserUseCase";
import { loginUserUseCase } from "@auth/application/usecases/LoginUserUseCase";
import { logoutUserUseCase } from "@auth/application/usecases/LogoutUserUseCase";
import betterAuthDataSource from "@auth/infrastructure/datasource/BetterAuthDataSource";

/**
 * Container para autenticación con email/password (server-only).
 * Usa Prisma/pg, NO puede importarse desde componentes del cliente.
 */
export default function authContainer() {
    const emailAuth = authAdapter(betterAuthDataSource());

    return {
        usecases: {
            registerUser: registerUserUseCase({ auth: emailAuth }),
            loginUser: loginUserUseCase({ auth: emailAuth }),
            logoutUser: logoutUserUseCase({ auth: emailAuth }),
        }
    }
}