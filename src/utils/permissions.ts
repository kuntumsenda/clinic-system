import { Role } from "@/types/auth";

export const ROUTE_PERMISSIONS: Record<string, Role[]> = {
  "/patients": ["SUPER_ADMIN", "ADMIN", "STAFF", "DOCTOR"],
  "/patients/edit": ["SUPER_ADMIN", "ADMIN"],
  "/workflow": ["SUPER_ADMIN", "ADMIN"],
  "/appointments": ["SUPER_ADMIN", "ADMIN", "STAFF", "DOCTOR"],
  "/inventory": ["SUPER_ADMIN", "ADMIN", "STAFF"],
  "/reports": ["SUPER_ADMIN"],
};
