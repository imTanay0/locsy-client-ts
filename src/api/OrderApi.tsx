import axios from "axios";
import { useState } from "react";
import { toast } from "sonner";

import { server } from "@/redux/store";
import { CartProduct } from "@/types/types";

export type CheckoutSessionRequest = {
  orderedProducts: CartProduct[];
  totalPrice: number;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
};

export type Address = {
  street: string;
  city: string;
  state: string;
  zipCode: string;
};

export const useCreateCheckoutSession = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const createCheckoutSessionRequest = async (
    orderedProducts: CartProduct[],
    totalPrice: number,
    address: Address
  ) => {
    try {
      setIsLoading(true);
      const { data } = await axios.post(
        `${server}/api/v1/order/checkout/create-checkout-session`,
        {
          orderedProducts,
          totalPrice,
          address,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (data.success) {
        return data;
      }
    } catch (error) {
      console.log(error);
      toast.error("Unable to create checkout session");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    createCheckoutSessionRequest,
  };
};
