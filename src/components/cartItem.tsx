import axios from "axios";
import { Trash2 } from "lucide-react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "sonner";

import { server } from "@/redux/store";
import { AxiosErrorWithMessage } from "@/types/api-types";
import { CartProduct } from "@/types/types";
import { Button } from "./ui/button";
import { updateCartitems } from "@/redux/slice/cartSlice";

type CartItemProps = {
  cartItem: CartProduct;
};

const CartItem = ({ cartItem }: CartItemProps) => {
  const dispatch = useDispatch();
  const { productId, productName, ProductImage, price, quantity, stock } =
    cartItem;

  const increaseCartItemQuantity = async (productId: string) => {
    try {
      const { data } = await axios.put(
        `${server}/api/v1/cart/increaseItem`,
        {
          productId,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (data.success) {
        dispatch(updateCartitems(data));
      }
    } catch (error) {
      const errMsg = (error as AxiosErrorWithMessage).response.data.message;
      console.error("Error: ", errMsg);
      toast.error("Server error, please try again.");
    }
  };

  const decreaseCartItemQuantity = async (productId: string) => {
    try {
      const { data } = await axios.put(
        `${server}/api/v1/cart/decreaseItem`,
        {
          productId,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (data.success) {
        dispatch(updateCartitems(data));
      }
    } catch (error) {
      const errMsg = (error as AxiosErrorWithMessage).response.data.message;
      console.error("Error: ", errMsg);
      toast.error("Server error, please try again.");
    }
  };

  const deleteCartItemHandler = async (productId: string) => {
    try {
      const { data } = await axios.delete(`${server}/api/v1/cart/delete-item`, {
        data: {
          productId,
        },
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (data.success) {
        dispatch(updateCartitems(data));
      }
    } catch (error) {
      const errMsg = (error as AxiosErrorWithMessage).response.data.message;
      console.error("Error: ", errMsg);
      toast.error("Server error, please try again.");
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-5 p-4 rounded-lg bg-gray-50">
      <Link to={`/product/${productId}`} className="mx-auto">
        <img
          src={ProductImage.url}
          alt={productName}
          className="w-40 h-auto rounded-md"
        />
      </Link>

      <div className="flex flex-col gap-1 flex-1">
        <p className="font-bold">{productName}</p>
        <p className="text-gray-600">Stock: {stock}</p>
        <p className="font-bold mt-2">&#8377;{price}</p>
      </div>

      <div className="flex gap-4 items-center mx-auto h-fit">
        {quantity === 1 ? (
          <Button disabled>-</Button>
        ) : (
          <Button
            variant={"outline"}
            onClick={() => decreaseCartItemQuantity(productId)}
          >
            -
          </Button>
        )}
        <p className="font-semibold">{quantity}</p>
        {quantity === stock ? (
          <Button disabled>+</Button>
        ) : (
          <Button
            variant={"outline"}
            onClick={() => increaseCartItemQuantity(productId)}
          >
            +
          </Button>
        )}
        <Button
          variant={"outline"}
          className="hover:text-red-500"
          onClick={() => deleteCartItemHandler(productId)}
        >
          <Trash2 width={20} />
        </Button>
      </div>
    </div>
  );
};

export default CartItem;
