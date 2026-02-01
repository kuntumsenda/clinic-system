import { Loader2 } from "lucide-react";

export function LoaderPage<T>({
  caption = "Fetch Data...",
}: {
  caption?: string;
}) {
  return (
    <div className="h-[60vh] flex flex-col items-center justify-center">
      <Loader2 className="h-10 w-10 animate-spin text-primary" />
      <p className="mt-4 text-slate-500">{caption}</p>
    </div>
  );
}
