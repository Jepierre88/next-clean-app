"use server"

import { EAuthErrors } from "@/shared/enums/AuthErrors"
import { ActionResponse } from "@/shared/types/ActionResponse"
import authContainer from "@auth/application/composition/AuthContainer"
import { LoginInput } from "@auth/domain/entities/LoginInput"
import { APIError } from "better-auth"

export const login = async (params: LoginInput): Promise<ActionResponse> => {
    const { usecases } = authContainer();
    try {
        await usecases.loginUser(params);
        return { success: true }
    } catch (error) {
        return validateAuthError(error);
    }
}

const validateAuthError = (error: APIError | unknown): ActionResponse => {
    if (error instanceof APIError) {
        console.error("API Error:", error);
        if (error.statusCode === 401) {
            return { success: false, error: EAuthErrors.INVALID_CREDENTIALS };
        } else if (error.statusCode === 409) {
            return { success: false, error: EAuthErrors.USER_ALREADY_EXISTS };
        }
    }
    return { success: false, error: EAuthErrors.UNKNOWN_ERROR };
}