"use server"

import type { ActionResponse } from "@/shared/types/ActionResponse"
import authContainer from "@auth/application/composition/AuthContainer"
import { toAuthActionResponse } from "@auth/application/mappers/toAuthActionResponse"
import type { LoginInput } from "@auth/domain/entities/LoginInput"

export const login = async (params: LoginInput): Promise<ActionResponse> => {
  const { usecases } = authContainer()

  try {
    await usecases.loginUser(params)
    return { success: true }
  } catch (error) {
    console.error("Login error:", error)
    return toAuthActionResponse(error)
  }
}
