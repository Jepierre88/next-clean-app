import { betterAuth } from "better-auth";

export const betterAuthInstance = betterAuth({
    secret: process.env.BETTER_AUTH_SECRET!,
    emailAndPassword: {
        enabled: true,
    },
});