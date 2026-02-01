"use client";

import { ERR } from "@/constants/en/message";
import { logger } from "@/utils/logger";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useLogout = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const logout = () => {
    try {
      localStorage.clear();
      sessionStorage.clear();
      document.cookie =
        "auth_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      const cookies = document.cookie.split(";");
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i];
        const eqPos = cookie.indexOf("=");
        const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie =
          name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
      }

      queryClient.clear();
      window.location.href = "/login";
    } catch (error) {
      logger.error("Logout Error:", error);
      toast.error(ERR.GENERAL);
    }
  };

  return { logout };
};
