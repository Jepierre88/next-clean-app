"use client"

import { useTransition } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
    registerSchema,
    type RegisterFormInput,
} from "@auth/domain/schemas/RegisterSchema"
import { register as registerAction } from "../actions"
import { Input } from "@shared/components/ui/input"
import { Button } from "@shared/components/ui/button"
import { Label } from "@shared/components/ui/label"
import Link from "next/link"

export default function RegisterForm() {
    const [isPending, startTransition] = useTransition()

    const {
        register: field,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm<RegisterFormInput>({
        resolver: zodResolver(registerSchema),
        defaultValues: { name: "", email: "", password: "", confirmPassword: "" },
    })

    const onSubmit = (data: RegisterFormInput) => {
        const { confirmPassword: _, ...input } = data

        startTransition(async () => {
            const response = await registerAction(input)
            if (!response.success) {
                setError("root", {
                    message: response.error ?? "Error al registrarse",
                })
            }
        })
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
                <Label htmlFor="name">Nombre</Label>
                <Input
                    id="name"
                    type="text"
                    placeholder="Tu nombre"
                    autoComplete="name"
                    disabled={isPending}
                    {...field("name")}
                />
                {errors.name && (
                    <p className="text-sm text-destructive">{errors.name.message}</p>
                )}
            </div>

            <div className="flex flex-col gap-2">
                <Label htmlFor="email">Correo electrónico</Label>
                <Input
                    id="email"
                    type="email"
                    placeholder="tu@email.com"
                    autoComplete="email"
                    disabled={isPending}
                    {...field("email")}
                />
                {errors.email && (
                    <p className="text-sm text-destructive">{errors.email.message}</p>
                )}
            </div>

            <div className="flex flex-col gap-2">
                <Label htmlFor="password">Contraseña</Label>
                <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    autoComplete="new-password"
                    disabled={isPending}
                    {...field("password")}
                />
                {errors.password && (
                    <p className="text-sm text-destructive">{errors.password.message}</p>
                )}
            </div>

            <div className="flex flex-col gap-2">
                <Label htmlFor="confirmPassword">Confirmar contraseña</Label>
                <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    autoComplete="new-password"
                    disabled={isPending}
                    {...field("confirmPassword")}
                />
                {errors.confirmPassword && (
                    <p className="text-sm text-destructive">{errors.confirmPassword.message}</p>
                )}
            </div>

            {errors.root && (
                <p className="text-sm text-destructive text-center">{errors.root.message}</p>
            )}

            <Button type="submit" className="w-full" disabled={isPending}>
                {isPending ? "Creando cuenta..." : "Crear cuenta"}
            </Button>

            <p className="text-center text-sm text-muted-foreground">
                ¿Ya tienes cuenta?{" "}
                <Link
                    href="/auth/login"
                    className="text-primary font-medium hover:underline"
                >
                    Inicia sesión
                </Link>
            </p>
        </form>
    )
}
