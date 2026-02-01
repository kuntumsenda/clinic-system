import { ERR } from "@/constants/en/message";
import { AlertCircle } from "lucide-react";

export function AlertNotFound<T>({ caption }: { caption?: string }) {
  return (
    <div className="bg-white border border-rose-200 p-10 rounded-xl text-center">
      <AlertCircle className="mx-auto h-12 w-12 text-rose-500 mb-4" />
      <h2 className="text-xl font-bold text-slate-900">{ERR.DATA_NOT_FOUND}</h2>
      {caption && <p className="text-slate-500">{caption}</p>}
    </div>
  );
}
