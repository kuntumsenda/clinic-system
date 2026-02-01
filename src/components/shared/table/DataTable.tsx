"use client";

import { ReactNode, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { formatCurrency, formatDate, formatNumber } from "@/utils/formatter";
import { BadgeStatus } from "../BadgeStatus";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type Column<T> = {
  header: string;
  accessor: (item: T) => ReactNode;
  className?: string;
  type?: string;
};

type DataTableProps<T> = {
  columns: Column<T>[];
  queryKey: string;
  fetcher: (
    page: number,
    search: string,
    limit: number,
  ) => Promise<{
    items: T[];
    total: number;
  }>;
  search?: string;
  defaultLimit?: number;
  onRowClick?: (item: T) => void;
};

export function DataTable<T>({
  columns,
  queryKey,
  fetcher,
  search = "",
  onRowClick,
  defaultLimit = 10,
}: DataTableProps<T>) {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(defaultLimit);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPage(1);
  }, [search, limit]);

  const { data, isLoading } = useQuery({
    queryKey: [queryKey, page, search, limit],
    queryFn: () => fetcher(page, search, limit),
    placeholderData: (prev) => prev,
  });

  const totalItems = data?.total || 0;
  const totalPages = Math.ceil(totalItems / limit);

  const renderCell = (item: T, col: Column<T>) => {
    const value = col.accessor(item);

    if (value === null || value === undefined || value === "") return "-";

    switch (col.type) {
      case "currency":
        return formatCurrency(value as string);

      case "date":
        return formatDate(value as string);

      case "number":
        return formatNumber(value as string);

      case "status":
        const status = String(value).toUpperCase();
        return <BadgeStatus status={status} />;

      case "ellipsis":
        return (
          <div className="max-w-[150px] truncate" title={String(value)}>
            {value}
          </div>
        );

      default:
        return value;
    }
  };

  return (
    <div className="space-y-4">
      <div className="border rounded-md bg-white overflow-hidden relative">
        {isLoading && (
          <div className="absolute inset-0 bg-white/50 z-10 flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        )}

        <Table>
          <TableHeader className="bg-primary">
            <TableRow>
              {columns.map((col, i) => (
                <TableHead
                  key={i}
                  className={cn(col.className, "text-white font-semibold")}
                >
                  {col.header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.items && data.items.length > 0
              ? data.items.map((item, rowIndex) => (
                  <TableRow
                    key={rowIndex}
                    onClick={() => onRowClick?.(item)}
                    className={cn(
                      onRowClick &&
                        "cursor-pointer hover:bg-slate-50 transition-colors",
                    )}
                  >
                    {columns.map((col, colIndex) => (
                      <TableCell key={colIndex}>
                        {renderCell(item, col)}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              : !isLoading && (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center text-muted-foreground"
                    >
                      Data not found.
                    </TableCell>
                  </TableRow>
                )}
          </TableBody>
        </Table>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-2">
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <p className="text-sm font-medium">Rows per page</p>
            <Select
              value={`${limit}`}
              onValueChange={(value) => setLimit(Number(value))}
            >
              <SelectTrigger className="h-8 w-[70px]">
                <SelectValue placeholder={limit} />
              </SelectTrigger>
              <SelectContent side="top">
                {[5, 10, 20, 50].map((pageSize) => (
                  <SelectItem key={pageSize} value={`${pageSize}`}>
                    {pageSize}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <p className="text-sm text-muted-foreground">
            Total {totalItems} items
          </p>
        </div>

        {/* Kontrol Navigasi */}
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            disabled={page === 1 || isLoading}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div className="flex items-center justify-center text-sm font-medium min-w-[100px]">
            Page {page} of {totalPages || 1}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage((p) => p + 1)}
            disabled={page >= totalPages || isLoading}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
