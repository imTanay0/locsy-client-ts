import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import AddressCard from "@/components/addressCard";
import CartItem from "@/components/cartItem";
import { Button } from "@/components/ui/button";
import { RootState } from "@/redux/store";
import { CartProduct } from "@/types/types";

const OrderSummary = () => {
  const { cart } = useSelector((state: RootState) => state.cart);
  const [cartProducts, setCartProducts] = useState<CartProduct[]>([]);

  useEffect(() => {
    if (cart && cart.products) {
      setCartProducts(cart.products);
    }
  }, [cart]);

  return (
    <div>
      <div className="w-full px-8 py-5 rounded-lg shadow-custom">
        <AddressCard />
      </div>
      <div className="my-5 flex gap-5 flex-col md:flex-row">
        <div className="w-full px-8 py-5 flex flex-col gap-4 rounded-lg shadow-custom">
          {cartProducts.map((cartItem) => (
            <CartItem key={cartItem.productId} cartItem={cartItem} />
          ))}
        </div>
        <aside className="max-w-sm md:w-[35%] h-fit px-4 py-5 shadow-custom rounded-lg bg-gray-50">
          <h3 className="text-xl uppercase">Price Details</h3>
          <div className="mt-4 flex flex-col gap-2">
            <div className="flex justify-between">
              <p>Total Items</p>
              <p>{cart?.totalItems}</p>
            </div>
            <div className="flex justify-between">
              <p>Price</p>
              <p>&#8377;{cart?.totalPrice}</p>
            </div>
            {/* <div className="flex justify-between text-green-600">
              <p>Discount</p>
              <p>- &#8377;{discount}</p>
            </div>
            <div className="flex justify-between">
              <p>Shipping Charges</p>
              <p>&#8377;{shippingCharges}</p>
            </div> */}
            <div className="mt-2 flex justify-between text-lg font-bold text-green-600">
              <p>Total Amount</p>
              <p>&#8377;{cart?.totalPrice}</p>
            </div>
            <div className="mt-2 w-full flex justify-between">
              <Link to="/checkout?step=2">
                <Button>Back</Button>
              </Link>
              <Link to="/checkout?step=4">
                <Button className="">Pay Now</Button>
              </Link>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default OrderSummary;
