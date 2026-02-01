import { zRequiredString } from "@/lib/zod-utils";
import * as z from "zod";

const BLOOD_TYPES = ["A", "B", "AB", "O", "UNKNOWN"] as const;

const basePatientSchema = z.object({
  name: zRequiredString("Full Name").min(3, "Min 3 characters"),
  phoneNumber: zRequiredString("Phone Number").min(10, "Invalid phone number"),
  gender: zRequiredString("gender"),
  birthPlace: zRequiredString("Birth Place"),
  birthDate: zRequiredString("Birth Date"),
  bloodType: z.enum(BLOOD_TYPES),
  address: z.object({
    street: zRequiredString("Street Address").min(5, "Address too short"),
    city: zRequiredString("City"),
  }),
});

export const createPatientSchema = basePatientSchema.extend({
  nik: zRequiredString("NIK").length(16, "NIK must be 16 digits"),
  medicNo: zRequiredString("Medical Record Number"),
  status: z.enum(["ACTIVE", "INACTIVE"]),
});

export const updatePatientSchema = basePatientSchema.extend({
  status: z.enum(["ACTIVE", "INACTIVE"]),
});

export type CreatePatientInput = z.infer<typeof createPatientSchema>;
export type UpdatePatientInput = z.infer<typeof updatePatientSchema>;

export type PatientFormValues = CreatePatientInput | UpdatePatientInput;
