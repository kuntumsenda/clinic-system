"use client";

import { usePatients } from "@/hooks/patients/usePatients";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { PatientForm } from "@/components/patients/PatientForm";
import { type PatientFormValues } from "../patients.schema";

export default function AddPatientPage() {
  const { useCreatePatient } = usePatients();

  const { mutate, isPending } = useCreatePatient();

  const handleAdd = (values: PatientFormValues) => {
    mutate(values as any);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link
          href="/patients"
          className="p-2 hover:bg-slate-100 rounded-full transition-colors"
        >
          <ChevronLeft className="w-6 h-6 text-slate-600" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Registration New Patient
          </h1>
          <p className="text-sm text-slate-500">Complete patient identity</p>
        </div>
      </div>

      <PatientForm mode="create" onSubmit={handleAdd} isLoading={isPending} />
    </div>
  );
}
