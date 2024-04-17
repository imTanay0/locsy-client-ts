import axios from "axios";
import { toast } from "sonner";

import { server } from "@/redux/store";
import { AxiosErrorWithMessage } from "@/types/api-types";
import { CartProduct } from "@/types/types";

// type OrderedProducts = {
//   productId: string;
//   productName: string;
//   productDescription: string;
//   price: number;
//   stock: number;
//   quantity: number;
//   ProductImage: {
//     public_id: string;
//     url: string;
//   };
//   sellerName: string;
//   createdAt: string;
//   updatedAt: string;
// };

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

// const STRIPE_API_KEY = sk_test_51P6FZVSEUdBiePIY3fU5EwVp58uhmeyWtM97rGNqb1qyEDo0CBBJXEz3M6eCZL5Jqa1N6LhNNGf2VE1oN4KVh7wW004SCDqBES

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

      // const response = await fetch(
      //   `${server}/api/v1/order/checkout/create-checkout-session`,
      //   {
      //     method: "POST",
      //     credentials: "include",
      //     headers: {
      //       Authorization:
      //         "Bearer sk_test_51P6FZVSEUdBiePIY3fU5EwVp58uhmeyWtM97rGNqb1qyEDo0CBBJXEz3M6eCZL5Jqa1N6LhNNGf2VE1oN4KVh7wW004SCDqBES",
      //       "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify({
      //       orderedProducts,
      //       totalPrice,
      //       address,
      //     }),
      //   }
      // );

      // console.log(response)

      // if (response.ok) {
      //   console.log("Yeah");
      //   const data = await response.json();
      //   return data;
      // }
    } catch (error) {
      const errMeg = (error as AxiosErrorWithMessage).response.data.message;
      toast.error(errMeg);
      throw new Error("Unable to create checkout session");
    }
  };

  return {
    // data,
    createCheckoutSessionRequest,
  };
};
