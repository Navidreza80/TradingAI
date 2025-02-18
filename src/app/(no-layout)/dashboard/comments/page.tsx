"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ChevronDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import EditComment from "@/components/dashboard/edit-comment";
import ViewReplies from "@/components/dashboard/view-replies";

const data: Payment[] = [
  {
    id: "13",
    title: "Very Helpfull",
    description: "That was very helpful thank you bro",
    blog: "Understanding bitcoin",
    date: "11/02/2025",
    likes: 1,
    replies: 10,
    dislikes: 11,
  },
  {
    id: "13",
    title: "Very Helpfull",
    description: "That was very helpful thank you bro",
    blog: "Understanding bitcoin",
    date: "11/02/2025",
    likes: 1,
    replies: 10,
    dislikes: 11,
  },
  {
    id: "13",
    title: "Very Helpfull",
    description: "That was very helpful thank you bro",
    blog: "Understanding bitcoin",
    date: "11/02/2025",
    likes: 1,
    replies: 10,
    dislikes: 11,
  },
];

export type Payment = {
  id: string;
  title: string;
  description: string;
  blog: string;
  date: string;
  likes: number;
  replies: number;
  dislikes: number;
};

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => (
      <div className="capitalize dark:text-white text-black">
        {row.getValue("title")}
      </div>
    ),
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => (
      <div className="capitalize dark:text-white text-black">
        {row.getValue("description")}
      </div>
    ),
  },
  {
    accessorKey: "blog",
    header: "Blog",
    cell: ({ row }) => (
      <div className="capitalize dark:text-white text-black">
        {row.getValue("blog")}
      </div>
    ),
  },
  {
    accessorKey: "likes",
    header: "Likes",
    cell: ({ row }) => (
      <div className="capitalize dark:text-white text-black">
        {row.getValue("likes")}
      </div>
    ),
  },
  {
    accessorKey: "dislikes",
    header: "Dislikes",
    cell: ({ row }) => (
      <div className="capitalize dark:text-white text-black">
        {row.getValue("dislikes")}
      </div>
    ),
  },
  {
    accessorKey: "replies",
    header: "Replies",
    cell: ({ row }) => (
      <div className="capitalize dark:text-white text-black flex flex-row items-center gap-2">
        {row.getValue("replies")}
        <ViewReplies />
      </div>
    ),
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => (
      <div className="capitalize dark:text-white text-black">
        {row.getValue("date")}
      </div>
    ),
  },
  {
    accessorKey: "actions",
    header: "Actions",
    enableHiding: false,
    cell: () => <EditComment />,
  },
];

export default function DataTableDemo() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full p-5">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter comments..."
          value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("title")?.setFilterValue(event.target.value)
          }
          className="max-w-sm border dark:border-white dark:bg-white bg-black text-black placeholder:text-white dark:placeholder:text-black"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="ml-auto">
              Columns <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border border-black dark:border-white">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                className="border-black dark:border-white"
                key={headerGroup.id}
              >
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="border-black dark:border-white"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="space-x-2">
          <Button
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
