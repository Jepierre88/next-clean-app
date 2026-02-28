'use client'

import { login } from "./actions";

export default function AuthPage() {
    const onClick = async () => {
        await login({
            email: "email@example.com",
            password: "password123"
        });
    }
    return (
        <div>
            <h1>Auth Page</h1>
            <button onClick={onClick}>Login</button>
        </div>
    );
}