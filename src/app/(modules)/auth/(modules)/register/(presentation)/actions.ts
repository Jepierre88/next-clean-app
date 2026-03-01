"use server"

import type { ActionResponse } from "@/shared/types/ActionResponse"
import authContainer from "@auth/application/composition/AuthContainer"
import { toAuthActionResponse } from "@auth/application/mappers/toAuthActionResponse"
import type { RegisterInput } from "@auth/domain/entities/RegisterInput"

export const register = async (params: RegisterInput): Promise<ActionResponse> => {
  const { usecases } = authContainer()

  try {
    await usecases.registerUser(params)
    return { success: true }
  } catch (error) {
    console.error("Register error:", error)
    return toAuthActionResponse(error)
  }
}
