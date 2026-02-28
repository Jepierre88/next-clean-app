'use client'

import { authClient } from "@/app/(modules)/auth/infrastructure/BetterAuthClient"

export default function ComponentExample() {
  const {
    data: session,
  } = authClient.useSession()
  const handleLogout = async () => {
    await authClient.signOut()
  }
    return (
        <div className="p-4 bg-gray-100 rounded">
            <h1 className="text-2xl font-bold mb-2">Component Example {session ? `(Logged in as ${session.user.name})` : "(Not logged in)"}</h1>
            <p>This is a simple example of a React component.</p>
            {session && (
                <button onClick={handleLogout} className="mt-4 px-4 py-2 bg-red-500 text-white rounded">
                    Logout
                </button>
            )}
        </div>
    )
}