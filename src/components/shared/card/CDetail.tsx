export function DetailCard({
  title,
  icon,
  content,
  subContent,
}: {
  title: string;
  icon: React.ReactNode;
  content?: string;
  subContent?: string;
}) {
  return (
    <div className="bg-white border border-slate-200 p-4 rounded-xl flex gap-4 items-center shadow-sm">
      <div className="p-2 bg-slate-50 rounded-lg">{icon}</div>
      <div>
        <p className="text-xs text-slate-500 font-semibold uppercase">
          {title}
        </p>
        <p className="text-lg font-bold text-slate-800">{content || "-"}</p>
        {subContent && <p className="text-xs text-slate-400">{subContent}</p>}
      </div>
    </div>
  );
}
