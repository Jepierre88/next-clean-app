import socialAuthAdapter from "@auth/infrastructure/adapters/SocialAuthAdapter";
import { socialLoginUseCase } from "@auth/application/usecases/SocialLoginUseCase";
import { socialLogoutUseCase } from "@auth/application/usecases/SocialLogoutUseCase";
import githubAuthDatasource from "@auth/infrastructure/datasource/GithubAuthDatasource";
import microsoftAuthDatasource from "@auth/infrastructure/datasource/MicrosoftAuthDatasource";
import type { SocialAuthRegistry } from "@auth/domain/ports/AuthPort";
import linkedinAuthDatasource from "@auth/infrastructure/datasource/LinkedinAuthDatasource";

/**
 * Container para autenticación social (client-safe).
 * Solo importa datasources que usan authClient (browser).
 * NO importa Prisma, pg ni ningún módulo server-only.
 */
export default function socialAuthContainer() {
    const socialRegistry: SocialAuthRegistry = {
        github: socialAuthAdapter(githubAuthDatasource()),
        microsoft: socialAuthAdapter(microsoftAuthDatasource()),
        linkedin: socialAuthAdapter(linkedinAuthDatasource()),
    }

    return {
        usecases: {
            socialLogin: socialLoginUseCase({ registry: socialRegistry }),
            socialLogout: socialLogoutUseCase({ registry: socialRegistry }),
        }
    }
}
