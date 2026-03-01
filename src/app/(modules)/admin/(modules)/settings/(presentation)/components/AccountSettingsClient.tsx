"use client"

import { useMemo, useState, useTransition } from "react"
import { useRouter } from "next/navigation"

import { Avatar, AvatarFallback, AvatarImage } from "@shared/components/ui/avatar"
import { Button } from "@shared/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@shared/components/ui/card"
import { Input } from "@shared/components/ui/input"
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@shared/components/ui/field"

import { SOCIAL_PROVIDERS, type SocialProvider } from "@auth/domain/types/SocialProvider"

import { removeProfileImageAction, unlinkProviderAction, updateProfileImageAction } from "../actions"

type Props = {
  user: {
    name: string
    email: string
    image: string | null
  }
  linkedProviders: SocialProvider[]
}

const PROVIDER_LABEL: Record<SocialProvider, string> = {
  github: "GitHub",
  microsoft: "Microsoft",
  linkedin: "LinkedIn",
}

export default function AccountSettingsClient({ user, linkedProviders }: Props) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const [imageUrl, setImageUrl] = useState(user.image ?? "")
  const [error, setError] = useState<string | null>(null)

  const linkedSet = useMemo(() => new Set(linkedProviders), [linkedProviders])

  const onSaveImage = () => {
    setError(null)
    startTransition(async () => {
      const res = await updateProfileImageAction(imageUrl)
      if (!res.success) {
        setError(res.error ?? "No se pudo actualizar la imagen")
        return
      }
      router.refresh()
    })
  }

  const onRemoveImage = () => {
    setError(null)
    startTransition(async () => {
      const res = await removeProfileImageAction()
      if (!res.success) {
        setError(res.error ?? "No se pudo quitar la imagen")
        return
      }
      setImageUrl("")
      router.refresh()
    })
  }

  const onUnlinkProvider = (provider: SocialProvider) => {
    setError(null)
    startTransition(async () => {
      const res = await unlinkProviderAction(provider)
      if (!res.success) {
        setError(res.error ?? "No se pudo desvincular")
        return
      }
      router.refresh()
    })
  }

  return (
    <div className="flex w-full flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold">Cuenta</h1>
        <p className="text-muted-foreground mt-1 text-sm">
          Vincula proveedores y actualiza tu perfil.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Perfil</CardTitle>
          <CardDescription>Información básica de tu cuenta.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={user.image ?? undefined} alt={user.name} className="rounded-none"/>
              <AvatarFallback className="rounded-none">
                {(user.name?.[0] ?? "U").toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0">
              <div className="truncate text-sm font-medium">{user.name}</div>
              <div className="text-muted-foreground truncate text-xs">{user.email}</div>
            </div>
          </div>

          <FieldGroup>
            <Field data-disabled={isPending}>
              <FieldLabel htmlFor="profile-image-url">Imagen (URL)</FieldLabel>
              <Input
                id="profile-image-url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://..."
                disabled={isPending}
              />
              <FieldDescription>
                Pega una URL pública. Puedes dejarlo vacío para quitarla.
              </FieldDescription>
            </Field>
          </FieldGroup>

          {error && <FieldError>{error}</FieldError>}

          <div className="flex gap-2">
            <Button onClick={onSaveImage} disabled={isPending}>
              Guardar
            </Button>
            <Button variant="outline" onClick={onRemoveImage} disabled={isPending}>
              Quitar
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Proveedores vinculados</CardTitle>
          <CardDescription>
            Si ya estás logueado, al conectar un proveedor se vincula a esta cuenta.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          {SOCIAL_PROVIDERS.map((provider) => {
            const isLinked = linkedSet.has(provider)
            const canUnlink = isLinked && linkedProviders.length > 1

            return (
              <div key={provider} className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <div className="text-sm font-medium">{PROVIDER_LABEL[provider]}</div>
                  <div className="text-muted-foreground text-xs">
                    {isLinked ? "Vinculado" : "No vinculado"}
                  </div>
                </div>

                <div className="flex shrink-0 gap-2">
                  {isLinked && (
                    <Button
                      variant="outline"
                      onClick={() => onUnlinkProvider(provider)}
                      disabled={isPending || !canUnlink}
                    >
                      Desvincular
                    </Button>
                  )}
                </div>
              </div>
            )
          })}
        </CardContent>
      </Card>
    </div>
  )
}
