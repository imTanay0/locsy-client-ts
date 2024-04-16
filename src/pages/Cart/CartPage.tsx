import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import CartItem from "@/components/cartItem";
import { Button } from "@/components/ui/button";
import { RootState } from "@/redux/store";
import { CartProduct } from "@/types/types";

const CartPage = () => {
  const { cart } = useSelector((state: RootState) => state.cart);
  const [cartProducts, setCartProducts] = useState<CartProduct[]>([]);

  useEffect(() => {
    if (cart && cart.products) {
      setCartProducts(cart.products);
    }
  }, [cart]);

  return (
    <div className="min-h-[100svh] flex flex-col md:flex-row gap-8 justify-between container px-4 md:px-6 py-12">
      <main className="md:w-[70%] md:flex-1 h-fit">
        <div className="flex flex-col gap-8">
          {cartProducts.map((cartItem) => (
            <CartItem key={cartItem.productId} cartItem={cartItem} />
          ))}
        </div>
      </main>
      <aside className="max-w-sm md:w-[30%] h-fit px-4 py-5 shadow-lg rounded-lg bg-gray-50">
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
          </div> */}
          {/* <div className="flex justify-between">
            <p>Shipping Charges</p>
            <p>&#8377;{shippingCharges}</p>
          </div> */}
          <div className="mt-2 flex justify-between text-lg font-bold text-green-600">
            <p>Total Amount</p>
            <p>&#8377;{cart?.totalPrice}</p>
          </div>
          <Link to="/checkout?step=2">
            <Button className="mt-2 w-full">Check Out</Button>
          </Link>
        </div>
      </aside>
    </div>
  );
};

export default CartPage;
