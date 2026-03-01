export const SOCIAL_PROVIDERS = ["github", "microsoft", "linkedin"] as const

export type SocialProvider = (typeof SOCIAL_PROVIDERS)[number]
