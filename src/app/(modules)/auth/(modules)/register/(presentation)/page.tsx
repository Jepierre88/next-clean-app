import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@shared/components/ui/card"
import RegisterForm from "./components/RegisterForm"
import Link from "next/link"

export default function RegisterPage() {
    return (
        <div className="flex min-h-screen items-center justify-center px-4">
            <div className="w-full max-w-md space-y-4">
                <Card>
                    <CardHeader className="text-center">
                        <CardTitle className="text-2xl font-bold">Crear cuenta</CardTitle>
                        <CardDescription>
                            Completa los datos para registrarte
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <RegisterForm />
                    </CardContent>
                </Card>
                <p className="text-center text-sm text-muted-foreground">
                    <Link
                        href="/auth"
                        className="hover:text-primary transition-colors"
                    >
                        ← Volver al inicio
                    </Link>
                </p>
            </div>
        </div>
    )
}
