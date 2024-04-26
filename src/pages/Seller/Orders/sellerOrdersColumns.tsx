import { ArrowUpDown } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { SellerOrdersResponse } from "@/types/api-types";

export const sellerOrderColumns: ColumnDef<SellerOrdersResponse>[] = [
  {
    accessorKey: "order.orderId",
    header: "Order Id",
  },
  {
    accessorKey: "products",
    header: "Products",
  },
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
