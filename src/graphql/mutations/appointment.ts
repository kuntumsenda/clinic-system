export const GET_APPOINTMENTS_QUERY = `
  query GetAppointments($start: String!, $end: String!) {
    appointments(start: $start, end: $end) {
      id
      title
      date
      startTime
      endTime
      type
      patient {
        id
        name
      }
    }
  }
`;
