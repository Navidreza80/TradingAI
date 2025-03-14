"use client";
// React table components
import {
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
// React built in hooks
import React from "react";
// Server actions
import { deleteComment, fetchUserComment } from "@/actions/comment.action";
// ShadCn components
import { Button } from "../../../../components/ui/button";
import { Input } from "../../../../components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../../components/ui/table";
// i18n for translation
import EditComment from "@/components/dashboard/edit-comment";
import { Trash } from "lucide-react";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";

export default function DataTableDemo() {
  // i18n hook for translation
  const { t } = useTranslation();
  // State to save data of the users comment
  const [data, setData] = React.useState([]);
  // State to sort table items
  const [sorting, setSorting] = React.useState<SortingState>([]);
  // State to filter table items
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  // State to visible column
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  // State to select row
  const [rowSelection, setRowSelection] = React.useState({});
  // Function to fetch users comments
  const fetchComments = async () => {
    const data = await fetchUserComment();
    setData(data);
  };
  // useEffect with callback function to fetch users comments when the component is mounting
  React.useEffect(() => {
    fetchComments();
  }, []);
  // Function to delete users comment
  const handleDelete = async (id) => {
    const request = await deleteComment(id)
    if(request == "User not authenticated") toast.error("User not authenticated")
    else if(request.success)toast.success("Comment deleted successfully!!")
  }
  // Tables column items
  const columns = [
    {
      accessorKey: "id",
      enableHiding: true,
      header: "",
      cell: "",
    },
    {
      accessorKey: "content",
      header: t("dashboard.commentsPage.content"),
      cell: ({ row }) => (
        <div className="capitalize dark:text-white text-black">
          {row.getValue("content")}
        </div>
      ),
    },
    {
      accessorKey: "likes",
      header: t("dashboard.commentsPage.likes"),
      cell: ({ row }) => (
        <div className="capitalize dark:text-white text-black">
          {row.getValue("likes")}
        </div>
      ),
    },
    {
      accessorKey: "dislikes",
      header: t("dashboard.commentsPage.dislikes"),
      cell: ({ row }) => (
        <div className="capitalize dark:text-white text-black">
          {row.getValue("dislikes")}
        </div>
      ),
    },
    {
      accessorKey: "createdAt",
      header: t("dashboard.commentsPage.created"),
      cell: ({ row }) => (
        <div className="capitalize dark:text-white text-black">
          {new Date(row.getValue("createdAt")).toLocaleDateString()}
        </div>
      ),
    },
    {
      accessorKey: "actions",
      header: t("dashboard.commentsPage.actions"),
      cell: ({ row }) => (
        <div className="flex gap-1">
          <EditComment
            content={row.getValue("content")}
            commentId={row.getValue("id")}
          />
          <Trash onClick={() => handleDelete(row.getValue("id"))} className="hover:text-gray-400 cursor-pointer rounded-full dark:text-black text-white bg-black dark:bg-white p-2 w-8 h-8" />
        </div>
      ),
    },
  ];
  // React table hook
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
        {/* Search input */}
        <Input
          placeholder={t("dashboard.commentsPage.filter")}
          value={(table.getColumn("content")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("content")?.setFilterValue(event.target.value)
          }
          className="max-w-sm border dark:border-white dark:bg-white bg-black text-black placeholder:text-white dark:placeholder:text-black"
        />
      </div>
      <div className="rounded-md border border-black dark:border-white">
        {/* User Comment Table */}
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
                  {t("dashboard.commentsPage.no")}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="space-x-2">
          {/* Previous Page Button */}
          <Button
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            {t("dashboard.commentsPage.prev")}
          </Button>
          {/* Next Page Button */}
          <Button
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            {t("dashboard.commentsPage.next")}
          </Button>
        </div>
      </div>
    </div>
  );
}
