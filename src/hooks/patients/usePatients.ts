"use client";

import { GET_PATIENT_BY_ID, GET_PATIENTS } from "@/graphql/queries/patient";
import { gqlClient } from "@/lib/graphql-client";
import { Patient, PatientDetail } from "@/types/patient";
import { useState } from "react";
import { useDebounce } from "../useDebounce";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  CREATE_PATIENT_MUTATION,
  UPDATE_PATIENT_MUTATION,
} from "@/graphql/mutations/patient";
import { queryClient } from "@/lib/query-client";
import { ClientError } from "graphql-request";
import { logger } from "@/utils/logger";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { PatientFormValues } from "@/app/(dashboard)/patients/patients.schema";

const columns = [
  { header: "Medic No.", type: "string", accessor: (p: Patient) => p.medicNo },
  { header: "Name", type: "string", accessor: (p: Patient) => p.name },
  {
    header: "Phone Number",
    type: "string",
    accessor: (p: Patient) => p.phoneNumber,
  },
  {
    header: "Last Visit",
    type: "string",
    accessor: (p: Patient) => p.lastVisit,
  },
  { header: "Status", type: "status", accessor: (p: Patient) => p.status },
];

export function usePatients() {
  const router = useRouter();
  const [searchList, setSearchList] = useState("");

  const debouncedSearch = useDebounce(searchList, 500);

  const fetchPatientList = async (
    page: number,
    search: string,
    limit: number,
  ) => {
    try {
      const response = await gqlClient.request(GET_PATIENTS, {
        page,
        search,
        limit: limit,
      });

      return {
        items: response.getPatients.items || [],
        total: response.getPatients.total || 0,
      };
    } catch (error) {
      console.error("Fetch Patient Error:", error);
      return { items: [], total: 0 };
    }
  };

  const usePatientDetail = (id: string) => {
    return useQuery({
      queryKey: ["patient", id],
      queryFn: async () => {
        const response = await gqlClient.request(GET_PATIENT_BY_ID, { id });
        return response.getPatient;
      },
      enabled: !!id,
      staleTime: 0,
      gcTime: 0,
    });
  };

  const useCreatePatient = () => {
    return useMutation({
      mutationFn: async (newPatient: Partial<PatientDetail>) => {
        const response = await gqlClient.request(CREATE_PATIENT_MUTATION, {
          input: newPatient,
        });
        return response.createPatient;
      },
      onSuccess: (data) => {
        queryClient.invalidateQueries({ queryKey: ["patients"] });
        toast.success(`Pasien ${data.name} berhasil didaftarkan!`);
        router.push("/patients");
      },
      onError: (error: ClientError) => {
        logger.error("Gagal menambah pasien:", error);
        toast.error("Terjadi kesalahan saat mendaftar.");
      },
    });
  };

  const useUpdatePatient = () => {
    return useMutation({
      mutationFn: async ({
        id,
        input,
      }: {
        id: string;
        input: PatientFormValues;
      }) => {
        const response = await gqlClient.request<{
          updatePatient: PatientDetail;
        }>(UPDATE_PATIENT_MUTATION, {
          id,
          input,
        });
        return response.updatePatient;
      },
      onSuccess: (data) => {
        queryClient.invalidateQueries({ queryKey: ["patients"] });
        queryClient.invalidateQueries({ queryKey: ["patient", data.id] });

        toast.success(`Pasien ${data.name} berhasil diperbarui!`);
        router.push("/patients");
      },
      onError: (error: ClientError) => {
        logger.error("Gagal memperbarui pasien:", error);
        toast.error("Terjadi kesalahan saat memperbarui data.");
      },
    });
  };

  return {
    fetchPatientList,
    debouncedSearch,
    searchList,
    setSearchList,
    columns,
    usePatientDetail,
    useCreatePatient,
    useUpdatePatient,
  };
}
