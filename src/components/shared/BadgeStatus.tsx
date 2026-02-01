import { getStatusConfig } from "@/utils/status";
import { Badge } from "../ui/badge";

export function BadgeStatus({ status }: { status: string }) {
  return (
    <Badge className={getStatusConfig(status).className}>
      {getStatusConfig(status).label}
    </Badge>
  );
}
