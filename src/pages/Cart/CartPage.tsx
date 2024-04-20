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
        {cartProducts && cartProducts.length > 0 ? (
          <div className="flex flex-col gap-8">
            {cartProducts.map((cartItem) => (
              <CartItem key={cartItem.productId} cartItem={cartItem} />
            ))}
          </div>
        ) : (
          <section className="min-h-[240px] border-2 border-dashed border-gray-400 flex justify-center items-center rounded-lg">
            <div className="flex flex-col gap-3 items-center text-xl">
              <h2>No products are avaiable in cart.</h2>
              <h2>
                {" "}
                Add them from{" "}
                <span className="hover:underline hover:underline-offset-2 text-blue-500">
                  <Link to="/products">here</Link>
                </span>
                <span>.</span>
              </h2>
            </div>
          </section>
        )}
      </main>
      <aside className="max-w-sm md:w-[30%] h-fit px-4 py-5 shadow-lg rounded-lg bg-gray-50">
        <h2 className="text-xl uppercase">Cart Details</h2>
        <div className="mt-4 flex flex-col gap-2">
          <div className="flex justify-between">
            <p>Total Items</p>
            <p>{cart?.totalItems}</p>
          </div>
          <div className="flex justify-between">
            <p>Price</p>
            <p>&#8377;{cart?.totalPrice}</p>
          </div>
          <div className="mt-2 flex justify-between text-lg font-bold text-green-600">
            <p>Total Amount</p>
            <p>&#8377;{cart?.totalPrice}</p>
          </div>
          {cartProducts && cartProducts.length > 0 ? (
            <Link to="/checkout?step=2">
              <Button className="mt-2 w-full">Check Out</Button>
            </Link>
          ) : (
            <Button className="mt-2 w-full" disabled>
              Checkout
            </Button>
          )}
        </div>
      </aside>
    </div>
  );
};

export default CartPage;
