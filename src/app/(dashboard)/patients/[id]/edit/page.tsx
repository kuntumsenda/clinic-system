"use client";

import { usePatients } from "@/hooks/patients/usePatients";
import { ChevronLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { PatientForm } from "@/components/patients/PatientForm";
import { PatientFormValues } from "../../patients.schema";

export default function EditPatientPage() {
  const params = useParams();
  const id = params.id as string;

  const { usePatientDetail, useUpdatePatient } = usePatients();

  const { data: patient, isLoading: isFetching } = usePatientDetail(id);

  const { mutate, isPending: isUpdating } = useUpdatePatient();

  const handleUpdate = (values: PatientFormValues) => {
    const { ...inputData } = values;

    mutate({
      id: id,
      input: inputData,
    });
  };

  if (isFetching) {
    return (
      <div className="flex h-[400px] items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
        <span className="ml-2">Loading patient data...</span>
      </div>
    );
  }

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
          <h1 className="text-2xl font-bold text-slate-900">Update Patient</h1>
          <p className="text-sm text-slate-500">
            Edit patient identity for <strong>{patient?.name}</strong>
          </p>
        </div>
      </div>

      <PatientForm
        mode="update"
        initialData={patient}
        onSubmit={handleUpdate}
        isLoading={isUpdating}
      />
    </div>
  );
}
