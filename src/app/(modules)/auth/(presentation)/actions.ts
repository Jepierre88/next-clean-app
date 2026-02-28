"use server"

import authContainer from "@auth/application/composition/AuthContainer"
import { LoginInput } from "@auth/domain/entities/LoginInput"

export const login = async (params: LoginInput) => {
    const {
        usecases: { loginUser }
    } = authContainer()
    await loginUser(params)
}