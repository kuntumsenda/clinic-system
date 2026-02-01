import { AppointmentCalendar } from "@/components/appointments/AppointmentCalendar";
import { Title } from "@/components/shared/Title";

export default function AppointmentsPage() {
  return (
    <div>
      <div>
        <Title
          title="Appointments Patients"
          subtitle="Manage patients appointments and doctor availability"
        />
      </div>

      <AppointmentCalendar />
    </div>
  );
}
