export function InfoItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3 text-sm">
      <div className="mt-1 text-slate-400">{icon}</div>
      <div>
        <p className="text-slate-400 text-xs font-medium">{label}</p>
        <p className="text-slate-700 font-medium leading-tight">{value}</p>
      </div>
    </div>
  );
}
