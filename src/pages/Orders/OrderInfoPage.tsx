import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";

import { Order } from "@/types/types";
import { server } from "@/redux/store";
import OrderCard from "@/components/orderCard";

const OrderInfoPage = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState<Order>();

  useEffect(() => {
    const getOrder = async () => {
      try {
        const { data } = await axios.get(`${server}/api/v1/order/${orderId}`, {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (data.success) {
          setOrder(data.order);
        }
      } catch (error) {
        console.log(error);
        toast.error("Failed to fetch order");
      }
    };

    getOrder();
  }, [orderId]);

  return (
    <section className="min-h-[100svh] md:px-6 py-12 container">
      <main>
        {!order ? <div>No Orders Found.</div> : <OrderCard order={order} />}
      </main>
    </section>
  );
};

export default OrderInfoPage;
