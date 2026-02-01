import { useQuery } from "@tanstack/react-query";
import { GET_APPOINTMENTS_QUERY } from "@/graphql/mutations/appointment";
import { gqlClient } from "@/lib/graphql-client";

export const useAppointments = (start: string, end: string) => {
  return useQuery({
    queryKey: ["appointments", { start, end }],
    queryFn: async () => {
      const response = await gqlClient.request<{ appointments: any[] }>(
        GET_APPOINTMENTS_QUERY,
        { start, end },
      );
      return response.appointments;
    },
    enabled: !!start && !!end,
  });
};
