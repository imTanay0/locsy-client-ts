import axios from "axios";
import { toast } from "sonner";

import { server } from "@/redux/store";
import { AxiosErrorWithMessage } from "@/types/api-types";
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
  const createCheckoutSessionRequest = async (
    orderedProducts: CartProduct[],
    totalPrice: number,
    address: Address
  ) => {
    try {
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
      const errMeg = (error as AxiosErrorWithMessage).response.data.message;
      toast.error(errMeg);
      throw new Error("Unable to create checkout session");
    }
  };

  return {
    createCheckoutSessionRequest,
  };
};
