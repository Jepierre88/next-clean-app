import type { AccountSettingsPort } from "../../domain/ports/AccountSettingsPort"

export default function accountSettingsAdapter(
  datasource: AccountSettingsPort
): AccountSettingsPort {
  return {
    listLinkedProviders: datasource.listLinkedProviders,
    updateProfileImage: datasource.updateProfileImage,
    unlinkProvider: datasource.unlinkProvider,
  }
}
