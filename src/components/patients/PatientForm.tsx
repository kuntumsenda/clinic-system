"use client";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import {
  createPatientSchema,
  updatePatientSchema,
  type PatientFormValues,
} from "@/app/(dashboard)/patients/patients.schema";
import { GENDER_OPTIONS, STATUS_PATIENT_OPTIONS } from "@/constants/en/general";
import { PatientDetail } from "@/types/patient";
import { IField } from "../shared/form/IField";
import { Button } from "../ui/button";
import { logger } from "@/utils/logger";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";

interface PatientFormProps {
  mode: "create" | "update";
  initialData?: PatientDetail;
  onSubmit: (data: PatientFormValues) => void;
  isLoading?: boolean;
}

const BLOOD_TYPE_OPTIONS = ["A", "B", "AB", "O", "UNKNOWN"];

export function PatientForm({
  mode,
  initialData,
  onSubmit,
  isLoading,
}: PatientFormProps) {
  const activeSchema =
    mode === "create" ? createPatientSchema : updatePatientSchema;

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<PatientFormValues>({
    resolver: zodResolver(activeSchema) as any,
    defaultValues: initialData || {
      gender: "MALE",
      bloodType: "UNKNOWN",
      status: "ACTIVE",
    },
  });

  if (Object.keys(errors).length > 0) {
    logger.debug("Validation Errors:", errors);
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit, (err) =>
        logger.error("Form Error:", err),
      )}
      className="space-y-8 bg-white p-6 rounded-lg border"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <IField label="Full Name" error={errors.name?.message}>
          <Input {...register("name")} placeholder="e.g. Budi" />
        </IField>

        {mode === "create" && (
          <IField label="NIK (16 Digits)" error={(errors as any).nik?.message}>
            <Input {...register("nik" as any)} placeholder="3201..." />
          </IField>
        )}

        <IField label="Phone Number" error={errors.phoneNumber?.message}>
          <Input {...register("phoneNumber")} placeholder="0812..." />
        </IField>

        <Controller
          control={control}
          name="gender"
          render={({ field }) => (
            <IField label="Patient Gender" error={errors.status?.message}>
              <RadioGroup
                onValueChange={field.onChange}
                value={field.value}
                className="flex gap-4 pt-2"
              >
                {GENDER_OPTIONS.map((opt) => (
                  <div key={opt.value} className="flex items-center space-x-2">
                    <RadioGroupItem
                      value={opt.value}
                      id={`gender-${opt.value}`}
                    />
                    <Label
                      htmlFor={`status-${opt.value}`}
                      className="font-normal cursor-pointer"
                    >
                      {opt.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </IField>
          )}
        />

        <IField label="Birth Place" error={errors.birthPlace?.message}>
          <Input {...register("birthPlace")} placeholder="e.g. Jakarta" />
        </IField>

        <IField label="Birth Date" error={errors.birthDate?.message}>
          <Input {...register("birthDate")} type="date" />
        </IField>
        <Controller
          control={control}
          name="gender"
          render={({ field }) => (
            <IField label="Blood Type" error={errors.bloodType?.message}>
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="Select Blood Type" />
                </SelectTrigger>
                <SelectContent>
                  {BLOOD_TYPE_OPTIONS.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </IField>
          )}
        />

        <Controller
          control={control}
          name="status"
          render={({ field }) => (
            <IField label="Patient Status" error={errors.status?.message}>
              <RadioGroup
                onValueChange={field.onChange}
                value={field.value}
                className="flex gap-4 pt-2"
              >
                {STATUS_PATIENT_OPTIONS.map((opt) => (
                  <div key={opt.value} className="flex items-center space-x-2">
                    <RadioGroupItem
                      value={opt.value}
                      id={`status-${opt.value}`}
                    />
                    <Label
                      htmlFor={`status-${opt.value}`}
                      className="font-normal cursor-pointer"
                    >
                      {opt.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </IField>
          )}
        />

        <div className="md:col-span-2">
          <h3 className="text-sm font-semibold mb-3 border-b pb-2 text-slate-700">
            Address Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <IField
              label="Street Address"
              error={errors.address?.street?.message}
            >
              <Input
                {...register("address.street")}
                placeholder="Jl. Pancoran No. 123"
              />
            </IField>
            <IField label="City" error={errors.address?.city?.message}>
              <Input
                {...register("address.city")}
                placeholder="e.g. South Jakarta"
              />
            </IField>
          </div>
        </div>

        {mode === "create" && (
          <IField
            label="Medical Record No (RM)"
            error={(errors as any).medicNo?.message}
          >
            <Input {...register("medicNo" as any)} placeholder="MD-001" />
          </IField>
        )}
      </div>

      <div className="flex justify-end gap-4 border-t pt-6">
        <Button
          variant="outline"
          type="button"
          onClick={() => window.history.back()}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Saving..." : mode === "create" ? "Register" : "Update"}
        </Button>
      </div>
    </form>
  );
}
