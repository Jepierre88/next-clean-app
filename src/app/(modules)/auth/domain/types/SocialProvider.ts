export const SOCIAL_PROVIDERS = ["github", "microsoft"] as const

export type SocialProvider = (typeof SOCIAL_PROVIDERS)[number]
