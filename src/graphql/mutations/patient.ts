export const CREATE_PATIENT_MUTATION = `
  mutation CreatePatient($input: CreatePatientInput!) {
    createPatient(input: $input) {
      id
      name
      medicNo
    }
  }
`;

export const UPDATE_PATIENT_MUTATION = `
  mutation UpdatePatient($id: ID!, $input: UpdatePatientInput!) {
    updatePatient(id: $id, input: $input) {
      id
      name
      updatedAt
    }
  }
`;
