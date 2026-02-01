export const UPDATE_WORKFLOW_MUTATION = `
  mutation UpdateWorkflow($steps: [WorkflowStepInput!]!) {
    updateWorkflow(steps: $steps) {
      id
      steps {
        id
        name
        order
      }
    }
  }
`;
