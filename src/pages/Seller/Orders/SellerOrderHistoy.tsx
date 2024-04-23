import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { sellerOrderColumns } from "./sellerOrdersColumns";
import SellerOrderDataTable from "./sellerOrderDataTable";

import { server } from "@/redux/store";
import { SellerOrdersResponse } from "@/types/api-types";

const SellerOrderHistoy = () => {
  const [orders, setOrders] = useState<SellerOrdersResponse[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setIsLoading(true);

        const { data } = await axios.get(`${server}/api/v1/order/seller`, {
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
        toast.error("Failed to fetch orders");
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="min-h-[100svh] md:px-6 py-12 container">
      <h1 className="font-semibold text-2xl h-fit">Recent Orders</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <main className="mt-10 flex flex-1 flex-col gap-4">
          <SellerOrderDataTable columns={sellerOrderColumns} data={orders} />
        </main>
      )}
    </div>
  );
};

// function MoreHorizontalIcon(props: React.SVGProps<SVGSVGElement>) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <circle cx="12" cy="12" r="1" />
//       <circle cx="19" cy="12" r="1" />
//       <circle cx="5" cy="12" r="1" />
//     </svg>
//   );
// }

export default SellerOrderHistoy;
