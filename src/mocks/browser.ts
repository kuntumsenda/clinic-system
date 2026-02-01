import { authHandlers } from "./handlers/auth";
import { patientHandlers } from "./handlers/patients";
import { setupWorker } from "msw/browser";
import { appointmentHandlers } from "./handlers/appointments";

export const handlers = [
  ...authHandlers,
  ...patientHandlers,
  ...appointmentHandlers,
];

export const worker = setupWorker(...handlers);
