import { graphql, HttpResponse } from "msw";

const mockAppointments = [
  {
    id: "apt-1",
    title: "Pemeriksaan Rutin - Budi",
    date: "2026-02-01",
    startTime: "09:00",
    endTime: "10:00",
    type: "CHECKUP",
    status: "SCHEDULED",
    patient: { id: "p-1", name: "Budi Santoso" },
  },
  {
    id: "apt-2",
    title: "Konsultasi Lab - Ani",
    date: "2026-02-05",
    startTime: "13:00",
    endTime: "14:00",
    type: "LAB",
    status: "SCHEDULED",
    patient: { id: "p-2", name: "Ani Wijaya" },
  },
];

export const appointmentHandlers = [
  graphql.query("GetAppointments", ({ variables }) => {
    const { start, end } = variables;

    const filtered = mockAppointments.filter((app) => {
      return app.date >= start && app.date <= end;
    });

    return HttpResponse.json({
      data: {
        appointments: filtered,
      },
    });
  }),
];
