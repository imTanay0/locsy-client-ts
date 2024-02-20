import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

type productCardProps = {
  key: React.Key | null | undefined;
  productName: string;
  productImg: string;
  price: number;
  seller: string;
};

const ProductCard = ({
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
      duration: 1000,
    });
  };

  return (
    // todo -> The div below should be a Link tag to product detail page

    <div className="cursor-pointer">
      <Card className="shadow-lg">
        <div className="overflow-hidden">
          <img
            src={productImg}
            alt="product_image"
            className="h-auto w-full object-contain hover:scale-110 duration-500 transition-transform"
          />
        </div>
        <CardContent>
          <CardTitle>{productName}</CardTitle>
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
