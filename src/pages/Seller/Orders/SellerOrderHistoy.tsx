import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

import SellerOrderDataTable from "./sellerOrderDataTable";
import { sellerOrderColumns } from "./sellerOrdersColumns";

import {
  completeSellerOrders,
  loadingSellerOrders,
  setSellerOrders,
} from "@/redux/slice/sellerOrdersSlice";
import { RootState, server } from "@/redux/store";

const SellerOrderHistoy = () => {
  const dispatch = useDispatch();
  const { orders, isLoading } = useSelector(
    (state: RootState) => state.sellerOrders
  );

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        dispatch(loadingSellerOrders());
        const { data } = await axios.get(`${server}/api/v1/order/seller`, {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (data.success) {
          dispatch(setSellerOrders(data.orders));
        }
      } catch (error) {
        console.log(error);
        toast.error("Failed to fetch orders");
      } finally {
        dispatch(completeSellerOrders());
      }
    };

    fetchOrders();
  }, [dispatch]);

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

export default SellerOrderHistoy;
