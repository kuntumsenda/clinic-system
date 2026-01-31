export const ERR_MSG = {
  REQUIRED: (field: string) => `${field} is required`,
  INVALID_EMAIL: "Email is invalid",
  MIN_CHAR: (field: string, min: number) => `${field} min ${min} characters`,
  MAX_CHAR: (field: string, max: number) => `${field} max ${max} characters`,
};

import * as z from "zod";

export const zRequiredString = (fieldName: string) =>
  z.string().min(1, ERR_MSG.REQUIRED(fieldName));

export const zEmail = () =>
  z.string().min(1, ERR_MSG.REQUIRED("Email")).email(ERR_MSG.INVALID_EMAIL);

export const zPassword = (min = 8) =>
  z
    .string()
    .min(1, ERR_MSG.REQUIRED("Password"))
    .min(min, ERR_MSG.MIN_CHAR("Password", min));
