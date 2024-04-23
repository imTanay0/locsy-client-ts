import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

import { SellerOrdersResponse } from "@/types/api-types";
import { Button } from "@/components/ui/button";

export const sellerOrderColumns: ColumnDef<SellerOrdersResponse>[] = [
  {
    accessorKey: "order.orderId",
    header: "Order Id",
  },
  {
    accessorKey: "products",
    header: "Products",
  },
  // {
  //   accessorKey: "order.totalPrice",
  //   header: "Total Price (₹)",
  // },
  {
    accessorKey: "order.date",
    header: ({ column }) => {
      return (
        <Button
          className="w-fit"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "order.orderStatus",
    header: ({ column }) => {
      return (
        <Button
          className="w-fit"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
];
