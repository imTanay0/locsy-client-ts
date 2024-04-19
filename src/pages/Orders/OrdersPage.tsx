import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { columns, Order } from "./columns";
import { OrderDataTable } from "./order-data-table";

import { server } from "@/redux/store";

const OrdersPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const getOrders = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get(`${server}/api/v1/order/get`, {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (data.success) {
          setOrders(data.orders);
        }
      } catch (error) {
        console.log(error);
        toast.error("Failed to get orders");
      } finally {
        setIsLoading(false);
      }
    };

    getOrders();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-[100svh] md:px-6 py-12 container flex flex-col md:flex-row gap-8">
      <main className="w-full">
        <OrderDataTable columns={columns} data={orders} />
      </main>
    </div>
  );
};

export default OrdersPage;
