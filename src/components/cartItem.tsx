import { Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

import { Button } from "./ui/button";

type CartItemProps = {
  cartItem: any;
};

const CartItem = ({ cartItem }: CartItemProps) => {
  const { _id, productName, productImg, price, quantity, stock, seller } =
    cartItem;

  return (
    <div className="flex flex-col md:flex-row gap-5 p-4 shadow-lg rounded-lg bg-gray-50">
      <Link to={`/product/${_id}`} className="mx-auto">
        <img
          src={productImg}
          alt={productName}
          className="w-40 h-auto rounded-md"
        />
      </Link>

      <div className="flex flex-col gap-1 flex-1">
        <p className="font-bold">{productName}</p>
        <p className="text-gray-600">Stock: {stock}</p>
        <p className="text-gray-600">Seller: {seller}</p>
        <p className="font-bold mt-2">&#8377;{price}</p>
      </div>

      <div className="flex gap-4 items-center mx-auto h-fit">
        {quantity === 1 ? (
          <Button disabled>-</Button>
        ) : (
          <Button variant={"outline"}>-</Button>
        )}
        <p className="font-semibold">{quantity}</p>
        {quantity === stock ? (
          <Button disabled>+</Button>
        ) : (
          <Button variant={"outline"}>+</Button>
        )}
        <Button variant={"outline"} className="hover:text-red-500">
          <Trash2 width={20} />
        </Button>
      </div>
    </div>
  );
};

export default CartItem;
