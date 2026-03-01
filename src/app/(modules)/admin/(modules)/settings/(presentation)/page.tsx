import { redirect } from "next/navigation"
import { headers } from "next/headers"

import { auth } from "@auth/infrastructure/BetterAuth"
import settingsContainer from "../application/composition/SettingsContainer"
import AccountSettingsClient from "./components/AccountSettingsClient"

export default async function SettingsPage() {
    const h = await headers()
    const session = await auth.api.getSession({ headers: h })

    if (!session?.user?.id) {
        redirect("/auth/login")
    }

    const { usecases } = settingsContainer()
    const linkedProviders = await usecases.listLinkedProviders(session.user.id)

    return (
        <AccountSettingsClient
            user={{
                name: session.user.name ?? "",
                email: session.user.email ?? "",
                image: session.user.image ?? null,
            }}
            linkedProviders={linkedProviders}
        />
    )
}