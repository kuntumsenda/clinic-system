"use client";

import { useEffect, useState } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/query-client";

export function QueryProvider({ children }: { children: React.ReactNode }) {
  const [mockingEnabled, setMockingEnabled] = useState(false);

  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      const initMsw = async () => {
        const { worker } = await import("@/mocks/browser");
        await worker.start({
          onUnhandledRequest: "bypass",
        });
        setMockingEnabled(true);
      };
      initMsw();
    } else {
      setMockingEnabled(true);
    }
  }, []);

  if (!mockingEnabled) return null;

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
