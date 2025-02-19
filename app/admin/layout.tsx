import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/auth.config";
import { redirect } from "next/navigation";
import AdminNavbar from "@/app/admin/AdminNavbar";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "ADMIN") {
    redirect("/");
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <AdminNavbar />
      <main className="py-10">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">{children}</div>
      </main>
    </div>
  );
}
