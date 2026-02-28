import authAdapter from "@auth/infrastructure/adapters/AuthAdapter";

import { registerUserUseCase } from "../usecases/RegisterUserUseCase";
import { loginUserUseCase } from "../usecases/LoginUserUseCase";
import { logoutUserUseCase } from "../usecases/LogoutUserUseCase";

export default function authContainer() {
    const auth = authAdapter();
    return {
        usecases: {
            registerUser: registerUserUseCase({ auth }),
            loginUser: loginUserUseCase({ auth }),
            logoutUser: logoutUserUseCase({ auth }),
        }
    }
}