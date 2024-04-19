import { CircleDot } from "lucide-react";
import { Link } from "react-router-dom";

type orderItemType = {
  _id: string;
  productName: string;
  productImg: string;
  price: number;
  orderedQuantity: number;
  stock: number;
  seller: string;
};

type OrderCardProps = {
  orderItem: orderItemType;
};

const OrderCard = ({ orderItem }: OrderCardProps) => {
  const { _id, productName, productImg, price } = orderItem;

  return (
    <div className="flex flex-col lg:flex-row gap-5 p-4 rounded-lg shadow-custom bg-gray-50">
      <Link to={`/product/${_id}`} className="mx-auto">
        <img
          src={productImg}
          alt={productName}
          className="w-32 h-auto rounded-md"
        />
      </Link>

      <div className="flex flex-col gap-1 flex-1 py-5">
        <p className="font-bold">{productName}</p>
        <p className="font-bold mt-2 text-green-500">&#8377;{price}</p>
      </div>
      <div className="flex gap-2 py-5">
        <CircleDot className="text-green-600" width={20} />
        <p className="font-semibold">Expected Delivery On March 23</p>
      </div>
    </div>
  );
};

export default OrderCard;
