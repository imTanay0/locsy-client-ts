import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ColumnDef,
  SortingState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

import { SellerOrdersResponse } from "@/types/api-types";

interface SellerDataTableProps<TValue> {
  columns: ColumnDef<SellerOrdersResponse, TValue>[];
  data: SellerOrdersResponse[];
}

function SellerOrderDataTable<TValue>({
  columns,
  data,
}: SellerDataTableProps<TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
  });

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
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
              >
                {row.getVisibleCells().map((cell, i) => (
                  <TableCell key={cell.id}>
                    {i === 0 && (
                      <Link
                        to={`/orders/${row.original.order.orderId}`}
                        className="font-semibold"
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </Link>
                    )}
                    {i === 1 && (
                      <Link to={`/orders/${row.original.order.orderId}`}>
                        <div className="w-fit flex relative rounded-full">
                          {cell.row.original.products.map((product, i) => (
                            <Avatar
                              key={product.productId}
                              className={`${i !== 0 && "absolute left-[25px]"}`}
                            >
                              <AvatarImage
                                src={product.productImg}
                                className="w-full"
                              />
                            </Avatar>
                          ))}
                        </div>
                      </Link>
                    )}
                    {i !== 0 &&
                      i !== 1 &&
                      flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export default SellerOrderDataTable;
