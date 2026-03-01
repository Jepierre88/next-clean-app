"use server"

import type { ActionResponse } from "@/shared/types/ActionResponse"
import type { SocialProvider } from "@auth/domain/types/SocialProvider"
import { auth } from "@auth/infrastructure/BetterAuth"
import settingsContainer from "../application/composition/SettingsContainer"
import { headers } from "next/headers"

async function requireUserId(): Promise<string> {
  const h = await headers()
  const session = await auth.api.getSession({ headers: h })
  const userId = session?.user?.id

  if (!userId) {
    throw new Error("No autenticado")
  }

  return userId
}

export async function updateProfileImageAction(image: string): Promise<ActionResponse> {
  const { usecases } = settingsContainer()

  try {
    const userId = await requireUserId()
    await usecases.updateProfileImage(userId, image)
    return { success: true }
  } catch (error) {
    const message = error instanceof Error ? error.message : "No se pudo actualizar la imagen"
    return { success: false, error: message }
  }
}

export async function removeProfileImageAction(): Promise<ActionResponse> {
  const { usecases } = settingsContainer()

  try {
    const userId = await requireUserId()
    await usecases.updateProfileImage(userId, null)
    return { success: true }
  } catch (error) {
    const message = error instanceof Error ? error.message : "No se pudo quitar la imagen"
    return { success: false, error: message }
  }
}

export async function unlinkProviderAction(provider: SocialProvider): Promise<ActionResponse> {
  const { usecases } = settingsContainer()

  try {
    const userId = await requireUserId()
    await usecases.unlinkProvider(userId, provider)
    return { success: true }
  } catch (error) {
    const message = error instanceof Error ? error.message : "No se pudo desvincular el proveedor"
    return { success: false, error: message }
  }
}
