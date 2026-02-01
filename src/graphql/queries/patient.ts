export const GET_PATIENTS = `
  query GetPatients($search: String, $page: Int, $limit: Int) {
    getPatients(search: $search, page: $page, limit: $limit) {
      items { id medicNo name phoneNumber lastVisit status }
      total
    }
  }
`;

export const GET_PATIENT_BY_ID = `
  query GetPatientById($id: ID!) {
    getPatient(id: $id) {
      id
      name
      medicNo
      nik
      status
      phoneNumber
      email
      gender
      birthPlace
      birthDate
      bloodType
      maritalStatus
      address {
        street
        city
        province
        postalCode
      }
      insurance {
        type
        providerName
        cardNumber
      }
      emergencyContact {
        name
        relationship
        phoneNumber
      }
      medicalAlerts {
        allergies
        chronicDiseases
      }
      createdAt
    }
  }
`;
