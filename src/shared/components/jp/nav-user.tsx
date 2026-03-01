"use client"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@shared/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@shared/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@shared/components/ui/sidebar"
import { HugeiconsIcon } from "@hugeicons/react"
import { UnfoldMoreIcon, SparklesIcon, CheckmarkBadgeIcon, CreditCardIcon, NotificationIcon, LogoutIcon } from "@hugeicons/core-free-icons"

export function NavUser({
  user,
}: {
  user: {
    name: string
    email: string
    avatar: string
  }
}) {
  const { isMobile } = useSidebar()

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent/60 data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{user.name}</span>
                <span className="truncate text-xs">{user.email}</span>
              </div>
              <HugeiconsIcon
                icon={UnfoldMoreIcon}
                strokeWidth={2}
                className="ml-auto size-4"
              />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="bg-sidebar text-sidebar-foreground ring-sidebar-border/50 w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg ring-1"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-sidebar-foreground/80 p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="rounded-lg">{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{user.name}</span>
                  <span className="truncate text-xs">{user.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-sidebar-border" />
            <DropdownMenuGroup>
              <DropdownMenuItem className="focus:bg-sidebar-accent/60 focus:text-sidebar-accent-foreground">
                <HugeiconsIcon
                  icon={SparklesIcon}
                  strokeWidth={2}
                  className="size-4"
                />
                Upgrade to Pro
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator className="bg-sidebar-border" />
            <DropdownMenuGroup>
              <DropdownMenuItem className="focus:bg-sidebar-accent/60 focus:text-sidebar-accent-foreground">
                <HugeiconsIcon
                  icon={CheckmarkBadgeIcon}
                  strokeWidth={2}
                  className="size-4"
                />
                Account
              </DropdownMenuItem>
              <DropdownMenuItem className="focus:bg-sidebar-accent/60 focus:text-sidebar-accent-foreground">
                <HugeiconsIcon
                  icon={CreditCardIcon}
                  strokeWidth={2}
                  className="size-4"
                />
                Billing
              </DropdownMenuItem>
              <DropdownMenuItem className="focus:bg-sidebar-accent/60 focus:text-sidebar-accent-foreground">
                <HugeiconsIcon
                  icon={NotificationIcon}
                  strokeWidth={2}
                  className="size-4"
                />
                Notifications
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator className="bg-sidebar-border" />
            <DropdownMenuItem className="focus:bg-sidebar-accent/60 focus:text-sidebar-accent-foreground">
              <HugeiconsIcon icon={LogoutIcon} strokeWidth={2} className="size-4" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
