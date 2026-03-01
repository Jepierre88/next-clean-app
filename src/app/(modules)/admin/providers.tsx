'use client'

import { SidebarProvider } from "@/shared/components/ui/sidebar"
import { TooltipProvider } from "@/shared/components/ui/tooltip"


export default function AdminProviders({ children }: { children: React.ReactNode }) {
    return (
        <TooltipProvider>
                    <SidebarProvider>
            {children}
        </SidebarProvider>
        </TooltipProvider>
    )
}