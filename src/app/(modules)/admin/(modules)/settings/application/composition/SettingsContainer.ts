import accountSettingsAdapter from "../../infrastructure/adapters/AccountSettingsAdapter"
import betterAuthAccountSettingsDatasource from "../../infrastructure/datasource/BetterAuthAccountSettingsDatasource"
import { listLinkedProvidersUseCase } from "../usecases/ListLinkedProvidersUseCase"
import { unlinkProviderUseCase } from "../usecases/UnlinkProviderUseCase"
import { updateProfileImageUseCase } from "../usecases/UpdateProfileImageUseCase"

/**
 * Container para Settings -> Cuenta (server-only).
 * No debe importarse desde componentes del cliente.
 */
export default function settingsContainer() {
  const port = accountSettingsAdapter(betterAuthAccountSettingsDatasource())

  return {
    usecases: {
      listLinkedProviders: listLinkedProvidersUseCase({ port }),
      updateProfileImage: updateProfileImageUseCase({ port }),
      unlinkProvider: unlinkProviderUseCase({ port }),
    },
  }
}
