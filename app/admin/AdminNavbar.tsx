"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";

const navItems = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/aiApps", label: "Manage Apps" },
  { href: "/admin/aiModels", label: "Manage Models" },
  { href: "/admin/submissions", label: "Manage Submissions" },
];

export default function AdminNavbar() {
  const pathname = usePathname();

  return (
    <nav className="border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center">
            <Link href="/admin" className="text-xl font-bold">
              Admin Panel
            </Link>
          </div>
          <div className="ml-10 flex items-baseline space-x-4">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative px-3 py-2 rounded-md text-sm font-medium ${
                    isActive ? "text-white" : "text-gray-400 hover:text-white"
                  }`}>
                  {isActive && (
                    <div className="absolute inset-0 bg-white/10 rounded-md -z-10" />
                  )}
                  {item.label}
                </Link>
              );
            })}

            <button
              onClick={() => signOut()}
              className="ml-4 px-4 py-2 text-sm bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors">
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
