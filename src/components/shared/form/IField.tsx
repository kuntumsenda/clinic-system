"use client";

import React from "react";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface IFieldProps {
  label: string;
  error?: string;
  children: React.ReactElement<{ className?: string }>;
}

export function IField({ label, error, children }: IFieldProps) {
  return (
    <div className="grid gap-2 w-full">
      <Label className={cn(error && "text-destructive")}>{label}</Label>

      {React.cloneElement(children, {
        className: cn(
          "bg-white transition-all",
          children.props.className,
          error && "border-destructive focus-visible:ring-destructive",
        ),
      })}

      {error && <p className="text-xs font-medium text-destructive">{error}</p>}
    </div>
  );
}
