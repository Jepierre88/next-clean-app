"use client"

import { useTransition } from "react"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { loginSchema, type LoginInput } from "@auth/domain/schemas/LoginSchema"
import { login } from "../actions"
import useAuth from "../hooks/UseAuth"
import { Input } from "@shared/components/ui/input"
import { Button } from "@shared/components/ui/button"
import { Separator } from "@shared/components/ui/separator"
import { Field, FieldLabel, FieldError, FieldGroup } from "@shared/components/ui/field"
import Link from "next/link"

export default function LoginForm() {
    const [isPending, startTransition] = useTransition()
    const { loginWithProvider } = useAuth()

    const form = useForm<LoginInput>({
        resolver: zodResolver(loginSchema),
        defaultValues: { email: "", password: "" },
    })

    const onSubmit = (data: LoginInput) => {
        startTransition(async () => {
            const response = await login(data)
            if (!response.success) {
                form.setError("root", {
                    message: response.error ?? "Error al iniciar sesión",
                })
            }
        })
    }

    const handleSocialLogin = (provider: "github" | "microsoft") => {
        startTransition(async () => {
            await loginWithProvider(provider)
        })
    }

    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
                <Button
                    type="button"
                    variant="outline"
                    className="w-full gap-2"
                    disabled={isPending}
                    onClick={() => handleSocialLogin("github")}
                >
                    <svg viewBox="0 0 24 24" className="size-4" fill="currentColor">
                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
                    </svg>
                    Continuar con GitHub
                </Button>

                <Button
                    type="button"
                    variant="outline"
                    className="w-full gap-2"
                    disabled={isPending}
                    onClick={() => handleSocialLogin("microsoft")}
                >
                    <svg viewBox="0 0 24 24" className="size-4" fill="currentColor">
                        <path d="M0 0h11.5v11.5H0V0zm12.5 0H24v11.5H12.5V0zM0 12.5h11.5V24H0V12.5zm12.5 0H24V24H12.5V12.5z" />
                    </svg>
                    Continuar con Microsoft
                </Button>
            </div>

            <div className="flex items-center gap-3">
                <Separator className="flex-1" />
                <span className="text-xs text-muted-foreground">o</span>
                <Separator className="flex-1" />
            </div>

            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
                <FieldGroup>
                    <Controller
                        name="email"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid} data-disabled={isPending}>
                                <FieldLabel htmlFor="login-email">
                                    Correo electrónico
                                </FieldLabel>
                                <Input
                                    {...field}
                                    id="login-email"
                                    type="email"
                                    placeholder="tu@email.com"
                                    autoComplete="email"
                                    aria-invalid={fieldState.invalid}
                                    disabled={isPending}
                                />
                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                        )}
                    />

                    <Controller
                        name="password"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid} data-disabled={isPending}>
                                <div className="flex items-center justify-between">
                                    <FieldLabel htmlFor="login-password">
                                        Contraseña
                                    </FieldLabel>
                                    <Link
                                        href="#"
                                        className="text-xs text-muted-foreground hover:text-primary transition-colors"
                                    >
                                        ¿Olvidaste tu contraseña?
                                    </Link>
                                </div>
                                <Input
                                    {...field}
                                    id="login-password"
                                    type="password"
                                    placeholder="••••••••"
                                    autoComplete="current-password"
                                    aria-invalid={fieldState.invalid}
                                    disabled={isPending}
                                />
                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                        )}
                    />
                </FieldGroup>

                {form.formState.errors.root && (
                    <FieldError errors={[form.formState.errors.root]} />
                )}

                <Button type="submit" className="w-full" disabled={isPending}>
                    {isPending ? "Iniciando sesión..." : "Iniciar sesión"}
                </Button>

                <p className="text-center text-sm text-muted-foreground">
                    ¿No tienes cuenta?{" "}
                    <Link
                        href="/auth/register"
                        className="text-primary font-medium hover:underline"
                    >
                        Regístrate
                    </Link>
                </p>
            </form>
        </div>
    )
}
