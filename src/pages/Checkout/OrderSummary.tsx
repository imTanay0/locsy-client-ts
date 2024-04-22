import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { useCreateCheckoutSession } from "@/api/OrderApi";
import CartItem from "@/components/cartItem";
import { Button } from "@/components/ui/button";
import { RootState } from "@/redux/store";
import { CartProduct } from "@/types/types";
import { Loader2 } from "lucide-react";

const OrderSummary = () => {
  const { cart } = useSelector((state: RootState) => state.cart);
  const { user, role } = useSelector((state: RootState) => state.user);
  const { address, contactNo } = useSelector(
    (state: RootState) => state.address
  );
  const [cartProducts, setCartProducts] = useState<CartProduct[]>([]);

  const { isLoading, createCheckoutSessionRequest } =
    useCreateCheckoutSession();

  useEffect(() => {
    if (cart && cart.products) {
      setCartProducts(cart.products);
    }
  }, [cart]);

  const handleCreateCheckoutSession = async () => {
    if (!cart || !address) {
      return;
    }

    const orderedProducts = cartProducts;
    const totalPrice = cart.totalPrice;

    const data = await createCheckoutSessionRequest(
      orderedProducts,
      totalPrice,
      address
    );

    console.log(data);
    window.location.href = data.session;
  };

  if (!user || !role || !address) {
    return <p>Loding...</p>;
  }

  return (
    <div>
      <div className="w-full px-8 py-5 rounded-lg shadow-custom">
        <div className="w-full">
          <div className="space-y-3">
            <p className="font-semibold">{`${user.fname} ${user.lname}`}</p>
            <p className="">
              <span>{address.street}</span>
              <span>, {address.city}</span>
              <span>, {address.state}</span>
              <span>, {address.zipCode}</span>
            </p>
            <div className="space-y-1">
              <p className="font-semibold">Phone Number</p>
              <p className="">+91 {contactNo}</p>
            </div>
          </div>
        </div>
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
              <Link to="/checkout?step=1">
                <Button>Back</Button>
              </Link>
              {isLoading ? (
                <Button disabled>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Pay Now
                </Button>
              ) : (
                <Button className="" onClick={handleCreateCheckoutSession}>
                  Pay Now
                </Button>
              )}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default OrderSummary;
