import { z } from "zod"

export const registerSchema = z
    .object({
        name: z
            .string()
            .min(1, "El nombre es obligatorio"),
        email: z
            .string()
            .min(1, "El correo es obligatorio")
            .email("Correo electrónico inválido"),
        password: z
            .string()
            .min(8, "La contraseña debe tener al menos 8 caracteres"),
        confirmPassword: z
            .string()
            .min(1, "Confirma tu contraseña"),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Las contraseñas no coinciden",
        path: ["confirmPassword"],
    })

export type RegisterFormInput = z.infer<typeof registerSchema>

/** Datos que se envían al caso de uso (sin confirmPassword) */
export type RegisterInput = Omit<RegisterFormInput, "confirmPassword">
