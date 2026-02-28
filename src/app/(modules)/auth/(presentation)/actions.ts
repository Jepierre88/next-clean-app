"use server"

import { EAuthErrors } from "@/shared/enums/AuthErrors"
import { ActionResponse } from "@/shared/types/ActionResponse"
import authContainer from "@auth/application/composition/AuthContainer"
import { LoginInput } from "@auth/domain/entities/LoginInput"
import { RegisterInput } from "@auth/domain/entities/RegisterInput"
import { APIError } from "better-auth"

export const login = async (params: LoginInput): Promise<ActionResponse> => {
    const { usecases } = authContainer();
    try {
        await usecases.loginUser(params);
        return { success: true }
    } catch (error) {
        console.error("Login error:", error);
        return validateAuthError(error);
    }
}

export const register = async (params: RegisterInput): Promise<ActionResponse> => {
    const { usecases } = authContainer();
    try {
        await usecases.registerUser(params);
        return { success: true }
    } catch (error) {
        console.error("Register error:", error);
        return validateAuthError(error);
    }
}

export const loginWithGithub = async (): Promise<ActionResponse> => {
    const { usecases } = authContainer();
    try {
        await usecases.socialLogin();
        return { success: true }
    } catch (error) {
        console.error("Social login error:", error);
        return validateAuthError(error);
    }
}

const validateAuthError = (error: APIError | unknown): ActionResponse => {
    if (error instanceof APIError) {
        if (error.statusCode === 401) {
            return { success: false, error: EAuthErrors.INVALID_CREDENTIALS };
        } else if (error.statusCode === 409 || error.statusCode === 422) {
            return { success: false, error: EAuthErrors.USER_ALREADY_EXISTS };
        }
    }
    return { success: false, error: EAuthErrors.UNKNOWN_ERROR };
}