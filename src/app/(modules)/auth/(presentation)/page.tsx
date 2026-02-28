import Link from "next/link"
import { Button } from "@shared/components/ui/button"
import { Key } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

export default function AuthLandingPage() {
    return (
        <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-background">
            {/* Animated gradient orbs */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-primary/20 blur-3xl animate-pulse" />
                <div className="absolute -right-32 top-1/3 h-80 w-80 rounded-full bg-primary/15 blur-3xl animate-pulse [animation-delay:1s]" />
                <div className="absolute -bottom-24 left-1/3 h-72 w-72 rounded-full bg-primary/10 blur-3xl animate-pulse [animation-delay:2s]" />
            </div>

            {/* Grid pattern overlay */}
            <div
                className="pointer-events-none absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage:
                        "linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)",
                    backgroundSize: "64px 64px",
                }}
            />

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center gap-8 px-6 text-center">
                {/* Logo / Icon */}
                <div className="bg-primary p-4 rounded-full">
                    <HugeiconsIcon icon={Key} color="white" size={50}/>
                </div>

                {/* Heading */}
                <div className="flex flex-col gap-3">
                    <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
                        Bienvenido a{" "}
                        <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                            JPCORP
                        </span>
                    </h1>
                    <p className="mx-auto max-w-md text-lg text-muted-foreground">
                        Tu plataforma segura. Inicia sesión o crea una cuenta para
                        comenzar.
                    </p>
                </div>

                {/* CTA Buttons */}
                <div className="flex w-full max-w-xs flex-col gap-3 sm:max-w-sm sm:flex-row justify-center">
                    <Button
                        asChild
                        size="lg"
                        className="w-full text-base font-semibold shadow-lg shadow-primary/25 transition-all hover:shadow-xl hover:shadow-primary/30"
                    >
                        <Link href="/auth/login">Iniciar sesión</Link>
                    </Button>
                    <Button
                        asChild
                        variant="outline"
                        size="lg"
                        className="w-full text-base font-semibold transition-all hover:bg-primary/5"
                    >
                        <Link href="/auth/register">Crear cuenta</Link>
                    </Button>
                </div>

                {/* Footer hint */}
                <p className="text-xs text-muted-foreground/60">
                    Protegido con autenticación de nivel empresarial
                </p>
            </div>
        </div>
    )
}