import { Link } from "react-router-dom";
import { CircleDot } from "lucide-react";

import { Order } from "@/types/types";

type OrderCardProps = {
  order: Order;
};

const OrderCard = ({ order }: OrderCardProps) => {
  const { orderId, address, date, orderStatus, totalPrice, products } = order;

  return (
    <div className="flex flex-col lg:flex-row lg:justify-between gap-5 py-8 px-10 rounded-lg shadow-custom bg-gray-50 border">
      <div className="flex flex-col gap-10">
        {products.map((product) => (
          <div key={product.productId} className="flex ">
            <Link to={`/product/${product.productId}`} className="mx-auto">
              <img
                src={product.productImg}
                alt={product.productName}
                className="w-32 h-auto rounded-md"
              />
            </Link>

            <div className="flex flex-col gap-1 flex-1 px-5 my-auto">
              <p className="font-bold">{product.productName}</p>
              <p>Quantity: {product.quantity}</p>
              <p className="font-bold text-green-500">
                &#8377;{product.price}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="py-5 flex flex-col gap-2">
        <p>Order Id: {orderId}</p>
        <p>Street: {`${address.street}`}</p>
        <p>City: {`${address.city}`}</p>
        <p>Zip Code: {address.zipCode}</p>
        <p>
          Total Price:{" "}
          <span className="text-green-500 font-semibold">
            &#8377;{totalPrice}
          </span>
        </p>
        <p>Status: {orderStatus}</p>
        <p>Date: {date.toString()}</p>
      </div>
      <div className="flex gap-2 py-5">
        <CircleDot className="text-green-600" width={20} />
        <p className="font-semibold">Expected Delivery On March 23</p>
      </div>
    </div>
  );
};

export default OrderCard;
