import { CircleDot } from "lucide-react";
import { Link } from "react-router-dom";

type orderItemType = {
  _id: string;
  productName: string;
  productImg: string;
  price: number;
  quantity: number;
  stock: number;
  seller: string;
};

type OrderCardProps = {
  orderItem: orderItemType;
};

const OrderCard = ({ orderItem }: OrderCardProps) => {
  const { _id, productName, productImg, price, seller } = orderItem;

  return (
    <div className="flex flex-col lg:flex-row gap-5 p-4 rounded-lg shadow-custom bg-gray-50">
      <Link to={`/product/${_id}`} className="mx-auto">
        <img
          src={productImg}
          alt={productName}
          className="w-32 h-auto rounded-md"
        />
      </Link>

      <div className="flex flex-col gap-1 flex-1">
        <p className="font-bold">{productName}</p>
        <p className="text-gray-600">Seller: {seller}</p>
        <p className="font-bold mt-2">&#8377;{price}</p>
      </div>
      <div className="flex gap-2">
        <CircleDot className="text-green-600" width={20} />
        <p className="font-semibold">Expected Delivery On March 23</p>
      </div>
    </div>
  );
};

export default OrderCard;
