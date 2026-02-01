export type StatusType = "SUCCESS" | "PENDING" | "ERROR" | "NEUTRAL";

interface StatusConfig {
  label: string;
  className: string;
}

export function getStatusConfig(status: string): StatusConfig {
  const normalizedStatus = status?.toUpperCase() || "";

  const statusMap: Record<string, StatusConfig> = {
    ACTIVE: {
      label: "Active",
      className: "bg-emerald-50 text-emerald-700 border-emerald-200",
    },
    SUCCESS: {
      label: "Success",
      className: "bg-emerald-50 text-emerald-700 border-emerald-200",
    },
    PAID: {
      label: "Paid",
      className: "bg-emerald-50 text-emerald-700 border-emerald-200",
    },
    DONE: {
      label: "Done",
      className: "bg-emerald-50 text-emerald-700 border-emerald-200",
    },

    PENDING: {
      label: "Pending",
      className: "bg-amber-50 text-amber-700 border-amber-200",
    },
    WAITING: {
      label: "Waiting",
      className: "bg-amber-50 text-amber-700 border-amber-200",
    },
    INACTIVE: {
      label: "Inactive",
      className: "bg-red-50 text-red-700 border-red-200",
    },
    CANCELLED: {
      label: "Cancelled",
      className: "bg-rose-50 text-rose-700 border-rose-200",
    },
    FAILED: {
      label: "Failed",
      className: "bg-rose-50 text-rose-700 border-rose-200",
    },
    DELETED: {
      label: "Deleted",
      className: "bg-rose-50 text-rose-700 border-rose-200",
    },
  };

  return (
    statusMap[normalizedStatus] || {
      label: status || "-",
      className: "bg-slate-50 text-slate-600 border-slate-200",
    }
  );
}
