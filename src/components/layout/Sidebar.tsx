"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Calendar,
  LogOut,
  Workflow,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Button } from "../ui/button";
import { useLogout } from "@/hooks/auth/useLogout";

const menus = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Patients", href: "/patients", icon: Users },
  { name: "Appointment", href: "/appointments", icon: Calendar },
  { name: "Workflow", href: "/workflow", icon: Workflow },
];

export function Sidebar() {
  const pathname = usePathname();
  const { logout } = useLogout();
  return (
    <div className="h-full border-r bg-white flex flex-col">
      <div className="p-6 flex items-center gap-2">
        <Image src="/logo.webp" width={80} height={40} alt="Logo" />
      </div>

      <nav className="flex-1 px-4 space-y-1">
        {menus.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
              pathname === item.href
                ? "bg-primary/10 text-primary"
                : "text-slate-500 hover:bg-slate-100",
            )}
          >
            <item.icon size={20} />
            {item.name}
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t">
        <Button variant="link" onClick={logout}>
          Logout
          <LogOut size={20} />
        </Button>
      </div>
    </div>
  );
}
