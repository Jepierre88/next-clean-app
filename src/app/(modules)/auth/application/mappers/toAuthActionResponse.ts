import { APIError } from "better-auth"
import { EAuthErrors } from "@/shared/enums/AuthErrors"
import type { ActionResponse } from "@/shared/types/ActionResponse"

export function toAuthActionResponse(error: unknown): ActionResponse {
  if (error instanceof APIError) {
    if (error.statusCode === 401) {
      return { success: false, error: EAuthErrors.INVALID_CREDENTIALS }
    }

    if (error.statusCode === 409 || error.statusCode === 422) {
      return { success: false, error: EAuthErrors.USER_ALREADY_EXISTS }
    }
  }

  return { success: false, error: EAuthErrors.UNKNOWN_ERROR }
}
