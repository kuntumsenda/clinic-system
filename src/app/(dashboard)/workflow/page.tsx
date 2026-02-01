import { Title } from "@/components/shared/Title";
import {} from "@/components/shared/TitleWithBack";
import { WorkflowBuilder } from "@/components/workflow/WorkflowBuilder";

export default function WorkflowPage() {
  return (
    <div>
      <Title
        title="Workflow Clinic"
        subtitle="Determine the patient service flow from start to finish."
      />
      <WorkflowBuilder />
    </div>
  );
}
