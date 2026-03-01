"use server"

import authContainer from "@auth/application/composition/AuthContainer"
import { redirect } from "next/navigation"

export async function logoutAction(): Promise<void> {
  const { usecases } = authContainer()
  await usecases.logoutUser()
  redirect("/auth/login")
}
