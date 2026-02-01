import { mockPatients } from "@/constants/dummy";
import { logger } from "@/utils/logger";
import { graphql, HttpResponse } from "msw";

export const patientHandlers = [
  graphql.query("GetPatients", ({ variables }) => {
    const { search, page = 1, limit = 10 } = variables;

    let filtered = mockPatients;
    if (search) {
      filtered = mockPatients.filter(
        (p) =>
          p.name.toLowerCase().includes(search.toLowerCase()) ||
          p.medicNo.includes(search),
      );
    }

    const start = (page - 1) * limit;
    const items = filtered.slice(start, start + limit);

    return HttpResponse.json({
      data: {
        getPatients: {
          items,
          total: filtered.length,
          page,
          limit,
        },
      },
    });
  }),

  graphql.query("GetPatientById", ({ variables }) => {
    const { id } = variables;
    const patient = mockPatients.find((p) => p.id === id);

    if (!patient) {
      return HttpResponse.json({ errors: [{ message: "Patient not found" }] });
    }

    return HttpResponse.json({
      data: {
        getPatient: {
          ...patient,
          nik: "327501...",
          emergencyContact: {
            name: "Siti",
            relationship: "Istri",
            phoneNumber: "0812...",
          },
          medicalAlerts: { allergies: ["Dust"], chronicDiseases: [] },
        },
      },
    });
  }),
  graphql.mutation("CreatePatient", ({ variables }) => {
    const { input } = variables;

    const exists = mockPatients.find((p) => p.nik === input.nik);
    if (exists) {
      return HttpResponse.json({
        errors: [{ message: "NIK already registered" }],
      });
    }

    const newPatient = {
      id: Math.random().toString(36).substr(2, 9),
      ...input,
    };

    mockPatients.push(newPatient);
    logger.log("Mock DB Updated (Add):", mockPatients);

    return HttpResponse.json({
      data: { createPatient: newPatient },
    });
  }),

  graphql.mutation("UpdatePatient", ({ variables }) => {
    const { id, input } = variables;
    const index = mockPatients.findIndex((p) => p.id === id);

    if (index === -1) {
      return HttpResponse.json({
        errors: [{ message: "Patient not found" }],
      });
    }

    mockPatients[index] = { ...mockPatients[index], ...input };
    logger.log("Mock DB Updated (Update):", mockPatients[index]);

    return HttpResponse.json({
      data: { updatePatient: mockPatients[index] },
    });
  }),
];
