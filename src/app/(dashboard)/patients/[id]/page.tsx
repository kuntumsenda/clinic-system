"use client";

import { BadgeStatus } from "@/components/shared/BadgeStatus";
import { formatDate } from "@/utils/formatter";
import {
  ChevronLeft,
  Calendar,
  Phone,
  MapPin,
  CreditCard,
  User,
  Activity,
  ShieldAlert,
  FileText,
  Loader2,
  AlertCircle,
  Edit,
} from "lucide-react";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DetailCard } from "@/components/shared/card/CDetail";
import { InfoItem } from "@/components/shared/InfoItem";
import { usePatients } from "@/hooks/patients/usePatients";
import { ERR } from "@/constants/en/message";
import { logger } from "@/utils/logger";
import React from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { TitleWithBack } from "@/components/shared/TitleWithBack";
import { LoaderPage } from "@/components/shared/loader/LoaderPage";
import { AlertNotFound } from "@/components/shared/alert/AlertNotFound";

export default function PatientDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const { id } = React.use(params);

  logger.log("id:", id);
  const { usePatientDetail } = usePatients();
  const { data: patient, isLoading, isError } = usePatientDetail(id);
  if (isLoading) {
    return <LoaderPage caption="Fetch data patients..." />;
  }

  if (isError || !patient) {
    return (
      <AlertNotFound caption="The patient has not been registered in the system" />
    );
  }
  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex">
        <TitleWithBack
          title={patient.name}
          subtitle={`${patient.medicNo} • registered ${formatDate(patient.createdAt)}`}
          href="/patients"
          statusSlot={<BadgeStatus status={patient.status} />}
        />
        <div className="ml-auto">
          <Button
            variant="link"
            onClick={() => router.push(`/patients/${patient.id}/edit`)}
          >
            <Edit />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
            <h3 className="text-sm font-bold text-slate-400 uppercase mb-4 flex items-center gap-2">
              <User size={14} /> General Information
            </h3>
            <div className="space-y-4">
              <InfoItem
                icon={<Phone size={14} />}
                label="Phone Number"
                value={patient.phoneNumber}
              />
              <InfoItem
                icon={<MapPin size={14} />}
                label="Address"
                value={`${patient.address.street}, ${patient.address.city}`}
              />
              <InfoItem
                icon={<Calendar size={14} />}
                label="DoB"
                value={`${patient.birthPlace}, ${formatDate(patient.birthDate)}`}
              />
              <InfoItem
                icon={<Activity size={14} />}
                label="Blood Type"
                value={patient.bloodType}
              />
            </div>

            <hr className="my-5" />

            <h3 className="text-sm font-bold text-slate-400 uppercase mb-4 flex items-center gap-2">
              <ShieldAlert size={14} /> Emergency Contact
            </h3>
            <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
              <p className="text-sm font-bold text-slate-800">
                {patient.emergencyContact.name}
              </p>
              <p className="text-xs text-slate-500">
                {patient.emergencyContact.relationship}
              </p>
              <p className="text-sm text-blue-600 font-medium mt-1">
                {patient.emergencyContact.phoneNumber}
              </p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-3 space-y-6">
          {(patient.medicalAlerts.allergies.length > 0 ||
            patient.medicalAlerts.chronicDiseases.length > 0) && (
            <div className="bg-rose-50 border border-rose-100 rounded-xl p-4 flex gap-4 items-start">
              <ShieldAlert className="text-rose-600 shrink-0" />
              <div>
                <p className="text-sm font-bold text-rose-800">
                  Medical Warning
                </p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {patient.medicalAlerts.allergies.map((a: string) => (
                    <span
                      key={a}
                      className="px-2 py-0.5 bg-rose-200 text-rose-800 text-[10px] font-bold rounded uppercase"
                    >
                      Allergies: {a}
                    </span>
                  ))}
                  {patient.medicalAlerts.chronicDiseases.map((c: string) => (
                    <span
                      key={c}
                      className="px-2 py-0.5 bg-amber-200 text-amber-800 text-[10px] font-bold rounded uppercase"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
              <TabsTrigger value="overview">Summary</TabsTrigger>
              <TabsTrigger value="visits">Visit</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-4 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <DetailCard
                  title="Insurance"
                  icon={<CreditCard className="text-blue-500" />}
                  content={patient.insurance.providerName}
                  subContent={`No. Kartu: ${patient.insurance.cardNumber}`}
                />
                <DetailCard
                  title="NIK (KTP)"
                  icon={<FileText className="text-slate-500" />}
                  content={patient.nik}
                />
              </div>
            </TabsContent>

            <TabsContent value="visits" className="mt-4">
              <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden"></div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
