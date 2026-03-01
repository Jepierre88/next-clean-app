"use client"

import { useTransition } from "react"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { registerSchema, type RegisterFormInput } from "@auth/domain/schemas/RegisterSchema"
import { register as registerAction } from "../actions"
import { Input } from "@shared/components/ui/input"
import { Button } from "@shared/components/ui/button"
import { Field, FieldLabel, FieldError, FieldGroup } from "@shared/components/ui/field"
import Link from "next/link"

export default function RegisterForm() {
  const [isPending, startTransition] = useTransition()

  const form = useForm<RegisterFormInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: { name: "", email: "", password: "", confirmPassword: "" },
  })

  const onSubmit = (data: RegisterFormInput) => {
    const { confirmPassword: _, ...input } = data

    startTransition(async () => {
      const response = await registerAction(input)
      if (!response.success) {
        form.setError("root", {
          message: response.error ?? "Error al registrarse",
        })
      }
    })
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <FieldGroup>
        <Controller
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} data-disabled={isPending}>
              <FieldLabel htmlFor="register-name">Nombre</FieldLabel>
              <Input
                {...field}
                id="register-name"
                type="text"
                placeholder="Tu nombre"
                autoComplete="name"
                aria-invalid={fieldState.invalid}
                disabled={isPending}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} data-disabled={isPending}>
              <FieldLabel htmlFor="register-email">Correo electrónico</FieldLabel>
              <Input
                {...field}
                id="register-email"
                type="email"
                placeholder="tu@email.com"
                autoComplete="email"
                aria-invalid={fieldState.invalid}
                disabled={isPending}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="password"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} data-disabled={isPending}>
              <FieldLabel htmlFor="register-password">Contraseña</FieldLabel>
              <Input
                {...field}
                id="register-password"
                type="password"
                placeholder="••••••••"
                autoComplete="new-password"
                aria-invalid={fieldState.invalid}
                disabled={isPending}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="confirmPassword"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} data-disabled={isPending}>
              <FieldLabel htmlFor="register-confirm-password">Confirmar contraseña</FieldLabel>
              <Input
                {...field}
                id="register-confirm-password"
                type="password"
                placeholder="••••••••"
                autoComplete="new-password"
                aria-invalid={fieldState.invalid}
                disabled={isPending}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>

      {form.formState.errors.root && <FieldError errors={[form.formState.errors.root]} />}

      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? "Creando cuenta..." : "Crear cuenta"}
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        ¿Ya tienes cuenta?{" "}
        <Link href="/auth/login" className="text-primary font-medium hover:underline">
          Inicia sesión
        </Link>
      </p>
    </form>
  )
}
