"use client";

import { useAuthStore } from "@/store/useAuthStore";
import { getInitialName } from "@/utils/formatter";

export function Navbar() {
  const user = useAuthStore((state) => state.user);

  return (
    <header className="h-16 border-b bg-white/80 backdrop-blur-md sticky top-0 z-40 flex items-center justify-end px-6">
      <div className="flex items-center gap-4">
        <div className="text-right hidden sm:block">
          <p className="text-sm font-medium">{user?.name}</p>
          <p className="text-xs text-slate-500">{user?.roleName}</p>
        </div>
        <div className="h-9 w-9 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
          {user?.name ? getInitialName(user?.name) : "A"}
        </div>
      </div>
    </header>
  );
}
