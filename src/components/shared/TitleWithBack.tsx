import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";

interface TitleWithBackProps {
  title: string;
  href?: string;
  subtitle?: string | ReactNode;
  statusSlot?: ReactNode;
  actionSlot?: ReactNode;
}

export function TitleWithBack({
  title,
  href,
  subtitle,
  statusSlot,
}: TitleWithBackProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 w-full">
      <div className="flex items-center gap-4">
        {href && (
          <Link
            href={href}
            className="p-2 hover:bg-slate-100 rounded-full transition-all border border-transparent hover:border-slate-200"
          >
            <ChevronLeft className="w-6 h-6 text-slate-600" />
          </Link>
        )}

        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              {title}
            </h1>
            {statusSlot && <div>{statusSlot}</div>}
          </div>

          {subtitle && (
            <div className="text-sm text-slate-500 mt-0.5">{subtitle}</div>
          )}
        </div>
      </div>
    </div>
  );
}
