"use client";

import * as React from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface ISearchProps extends React.ComponentProps<"input"> {
  wrapperClassName?: string;
}

const ISearch = React.forwardRef<HTMLInputElement, ISearchProps>(
  (
    { className, placeholder = "Search...", wrapperClassName, ...props },
    ref,
  ) => {
    return (
      <div className={cn("relative w-full", wrapperClassName)}>
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">
          <Search size={18} />
        </div>

        <Input
          type="search"
          placeholder={placeholder}
          className={cn(
            "pl-10 bg-white focus-visible:ring-primary/20 transition-all",
            className,
          )}
          ref={ref}
          {...props}
        />
      </div>
    );
  },
);

ISearch.displayName = "ISearch";

export { ISearch };
