export const getInitialName = (name: string) => {
  if (!name) return "??";

  const parts = name.trim().split(/\s+/);

  if (parts.length === 1) {
    return parts[0].substring(0, 2).toUpperCase();
  }

  const initials = parts[0][0] + parts[1][0];
  return initials.toUpperCase();
};

export function formatCurrency(value: number | string) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(Number(value));
}

export function formatDate(date: string | Date) {
  if (!date) return "-";
  return new Intl.DateTimeFormat("id-ID", {
    dateStyle: "medium",
  }).format(new Date(date));
}

export function formatNumber(value: number | string) {
  return new Intl.NumberFormat("id-ID").format(Number(value));
}
