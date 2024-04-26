import { useState } from "react";
import { useDispatch } from "react-redux";
import { MoreHorizontal } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";
import {
  ColumnDef,
  SortingState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import orderStatus from "@/constants/orderStatus";
import {
  completeSellerOrders,
  loadingSellerOrders,
  setSellerOrders,
} from "@/redux/slice/sellerOrdersSlice";
import { server } from "@/redux/store";
import { AxiosErrorWithMessage, SellerOrdersResponse } from "@/types/api-types";

interface SellerDataTableProps<TValue> {
  columns: ColumnDef<SellerOrdersResponse, TValue>[];
  data: SellerOrdersResponse[];
}

function SellerOrderDataTable<TValue>({
  columns,
  data,
}: SellerDataTableProps<TValue>) {
  const dispatch = useDispatch();
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

  const updateStatusHandler = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    orderId: string
  ) => {
    e.preventDefault();

    const orderStatus = (e.target as HTMLButtonElement).textContent;

    try {
      dispatch(loadingSellerOrders());

      const { data } = await axios.put(
        `${server}/api/v1/order//update-status`,
        { orderId, orderStatus },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (data.success) {
        toast.success("Order satus changed successfully");
        dispatch(setSellerOrders(data.orders));
      }
    } catch (error) {
      console.log(error);
      const errMsg = (error as AxiosErrorWithMessage).response.data
        .message as string;
      toast.error(errMsg);
    } finally {
      dispatch(completeSellerOrders());
    }
  };

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
                      <div className="font-semibold">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </div>
                    )}
                    {i === 1 && (
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
                    )}
                    {i === 3 && (
                      <div className="w-full h-full flex gap-4 items-center">
                        <p>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </p>
                        <DropdownMenu>
                          <DropdownMenuTrigger>
                            <MoreHorizontal className="w-4 h-4" />
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            {orderStatus.map((status, i) => (
                              <DropdownMenuItem key={i}>
                                <button
                                  className="w-full"
                                  value={status}
                                  onClick={(e) =>
                                    updateStatusHandler(
                                      e,
                                      cell.row.original.order.orderId
                                    )
                                  }
                                >
                                  {status}
                                </button>
                              </DropdownMenuItem>
                            ))}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    )}
                    {i === 2 &&
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
