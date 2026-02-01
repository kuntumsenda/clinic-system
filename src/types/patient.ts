import { BloodType, Gender, MaritalStatus } from "./general";

export type Patient = {
  id: string;
  medicNo: string;
  name: string;
  phoneNumber: string;
  lastVisit: string;
  status: "ACTIVE" | "INACTIVE";
};

export type PatientListRes = {
  items: Patient[];
  total: number;
  page: number;
  limit: number;
};

export type PatientDetail = Patient & {
  nik: string;
  email?: string;
  gender: Gender;
  birthPlace: string;
  birthDate: string;
  address: {
    street: string;
    city: string;
    province: string;
    postalCode: string;
  };
  bloodType: BloodType;
  maritalStatus: MaritalStatus;
  occupation?: string;
  religion?: string;

  insurance: {
    type: "GENERAL" | "BPJS" | "INSURANCE";
    providerName?: string;
    cardNumber?: string;
  };

  emergencyContact: {
    name: string;
    relationship: string;
    phoneNumber: string;
  };

  medicalAlerts: {
    allergies: string[];
    chronicDiseases: string[];
    disabilities?: string;
  };

  createdAt: string;
  updatedAt: string;
};

export type PatientVisit = {
  id: string;
  patientId: string;
  date: string;
  doctorName: string;
  department: string;
  diagnosis: string;
  action: string;
  cost: number;
  paymentStatus: "PAID" | "UNPAID" | "CANCELLED";
};

export type CreatePatientRes = {
  createPatient: PatientDetail;
};

export type UpdatePatientRes = {
  updatePatient: PatientDetail;
};
