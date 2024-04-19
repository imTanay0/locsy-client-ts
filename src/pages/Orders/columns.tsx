import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";

type OrderedProducts = {
  productId: string;
  productName: string;
  productImg: string;
  price: number;
  stock: number;
  sellerId: string;
};

type Address = {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
};

export type Order = {
  orderId: string;
  address: Address;
  buyerId: string;
  totalPrice: number;
  orderStatus: string;
  products: OrderedProducts[];
  date: Date;
};

export const columns: ColumnDef<Order>[] = [
  {
    accessorKey: "orderId",
    header: "Order Id",
  },
  {
    accessorKey: "products",
    header: "Products",
  },
  {
    accessorKey: "totalPrice",
    header: "Total Price",
  },
  {
    accessorKey: "date",
    header: "Date",
  },
  {
    accessorKey: "orderStatus",
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
