"use client";

import { useState } from "react";
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  isSameMonth,
  isSameDay,
  eachDayOfInterval,
  parseISO,
} from "date-fns";
import { ChevronLeft, ChevronRight, Plus, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAppointments } from "@/hooks/appointments/useAppointments";
import { toast } from "sonner";
import { ERR } from "@/constants/en/message";

export function AppointmentCalendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart, { weekStartsOn: 1 });
  const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 });

  const calendarDays = eachDayOfInterval({
    start: startDate,
    end: endDate,
  });

  const { data: appointments = [], isLoading } = useAppointments(
    format(startDate, "yyyy-MM-dd"),
    format(endDate, "yyyy-MM-dd"),
  );

  return (
    <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-3">
          <h2 className="text-xl font-bold text-slate-900 capitalize">
            {format(currentMonth, "MMMM yyyy")}
          </h2>
          {isLoading && (
            <Loader2 className="w-4 h-4 animate-spin text-primary" />
          )}
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
          <Button
            className="ml-2"
            onClick={() => toast.warning(ERR.FEATURE_NOT_AVAILABLE)}
          >
            <Plus className="w-4 h-4 mr-2" /> New
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-7 border-b bg-slate-50">
        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
          <div
            key={day}
            className="py-2 text-center text-xs font-semibold text-slate-500 uppercase tracking-wider"
          >
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 min-h-[600px]">
        {calendarDays.map((day, idx) => {
          const dayAppointments = appointments.filter((app: any) =>
            isSameDay(parseISO(app.date), day),
          );

          return (
            <div
              key={idx}
              className={cn(
                "border-r border-b p-2 transition-colors hover:bg-slate-50 cursor-pointer min-h-[120px]",
                !isSameMonth(day, monthStart) &&
                  "bg-slate-50/50 text-slate-400",
              )}
            >
              <span
                className={cn(
                  "text-sm font-medium inline-block w-7 h-7 flex items-center justify-center rounded-full mb-1",
                  isSameDay(day, new Date()) && "bg-primary text-white",
                )}
              >
                {format(day, "d")}
              </span>

              <div className="space-y-1 overflow-y-auto max-h-[100px]">
                {dayAppointments.map((app: any) => (
                  <div
                    key={app.id}
                    className={cn(
                      "text-[10px] p-1.5 rounded border truncate font-medium",
                      app.type === "CHECKUP"
                        ? "bg-blue-50 text-blue-700 border-blue-100"
                        : "bg-emerald-50 text-emerald-700 border-emerald-100",
                    )}
                    title={`${app.startTime} - ${app.title}`}
                  >
                    <span className="opacity-70 mr-1">{app.startTime}</span>
                    {app.title}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
