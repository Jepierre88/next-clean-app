import type { AccountSettingsPort } from "../../domain/ports/AccountSettingsPort"

export function listLinkedProvidersUseCase(deps: { port: AccountSettingsPort }) {
  return async function listLinkedProviders(userId: string) {
    return deps.port.listLinkedProviders(userId)
  }
}
