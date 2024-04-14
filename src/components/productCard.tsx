import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { Link, useNavigate } from "react-router-dom";

type productCardProps = {
  key: React.Key | null | undefined;
  productId: string;
  productName: string;
  productImg: string;
  price: number;
  seller: string;
};

const ProductCard = ({
  productId,
  productName,
  productImg,
  price,
  seller,
}: productCardProps) => {
  const navigate = useNavigate();

  const handleAddToCart = () => {
    toast.success("Added to cart", {
      action: {
        label: "Check",
        onClick: () => navigate("/cart"),
      },
      actionButtonStyle: {
        backgroundColor: "green",
        paddingInline: "12px",
        paddingTop: "8px",
        paddingBottom: "8px",
      },
      // duration: 1000,
    });
  };

  return (
    <div>
      <Card className="shadow-lg">
        <CardHeader className="overflow-hidden cursor-pointer">
          <Link to={`/product/${productId}`}>
            <img
              src={productImg}
              alt="product_image"
              className="aspect-square object-contain hover:scale-110 duration-500 transition-transform mx-auto"
            />
          </Link>
        </CardHeader>
        <CardContent>
          <CardTitle className="text-lg">{productName}</CardTitle>
          <p className="mt-2">&#8377; {price}</p>
          <p>{seller}</p>
        </CardContent>
        <CardFooter>
          <Button className="w-full" onClick={handleAddToCart}>
            Add to Cart
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ProductCard;
