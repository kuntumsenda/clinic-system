import * as z from "zod";
import { zEmail, zPassword } from "@/lib/zod-utils";

export const loginSchema = z.object({
  email: zEmail(),
  password: zPassword(8),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
