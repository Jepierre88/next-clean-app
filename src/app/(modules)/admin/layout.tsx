import AdminProviders from "./providers";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminProviders>
      <div>
        <h1>Admin Layout</h1>
        {children}
      </div>
    </AdminProviders>
  );
}
