"use client";

import { DataTable } from "@/components/shared/table/DataTable";
import { usePatients } from "@/hooks/patients/usePatients";
import { ISearch } from "@/components/shared/input/ISearch";
import { Title } from "@/components/shared/Title";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function PatientsPage() {
  const router = useRouter();
  const {
    fetchPatientList,
    debouncedSearch,
    searchList,
    setSearchList,
    columns,
  } = usePatients();

  return (
    <div>
      <div className="flex gap-4 justify-between">
        <Title title="Patients" />
        <Button onClick={() => router.push(`/patients/add`)}>
          <Plus /> New Patient
        </Button>
      </div>

      <ISearch
        value={searchList}
        name="searchList"
        className="mb-4 w-[50%]"
        placeholder="Search eg. budi or MD-"
        onChange={(e) => setSearchList(e.target.value)}
      />

      <DataTable
        queryKey="patients"
        fetcher={fetchPatientList}
        columns={columns}
        search={debouncedSearch}
        onRowClick={(patient) => router.push(`/patients/${patient.id}`)}
      />
    </div>
  );
}
