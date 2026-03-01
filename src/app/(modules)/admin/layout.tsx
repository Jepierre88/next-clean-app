import { SidebarInset, SidebarTrigger } from "@/shared/components/ui/sidebar";
import AdminProviders from "./providers";
import { AppSidebar } from "@/shared/components/jp/app-sidebar";
import { Separator } from "@/shared/components/ui/separator";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/shared/components/ui/breadcrumb";
import { auth } from "../auth/infrastructure/BetterAuth";
import { headers } from "next/headers";
import { logoutAction } from "./actions";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const userData = await getUserData()
  return (
    <AdminProviders>
      <AppSidebar user={userData} onLogout={logoutAction} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">
                    Build Your Application
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <main className="bg-muted/50 min-h-screen flex-1 rounded-xl md:min-h-min p-4">
          {children}
        </main>
      </SidebarInset>
    </AdminProviders>
  );
}


async function getUserData() {
  const h = await headers()
  const session = await auth.api.getSession({
    headers: h
  }).then((session) => {
    return {
      name: session?.user.name ?? "" ,
      email: session?.user.email ?? "" ,
      avatar: session?.user.image ?? "" ,
    }
  });

  return session
}