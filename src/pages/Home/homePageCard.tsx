import { Card, CardContent, CardTitle } from "@/components/ui/card";

type HomePageCardProps = {
  key: React.Key | null | undefined;
  productName: string;
  productImg: string;
  price: number;
  seller: string;
};

const HomePageCard: React.FC<HomePageCardProps> = ({
  productName,
  productImg,
  price,
  seller,
}) => {
  return (
    <div className="">
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
      </Card>
    </div>
  );
};

export default HomePageCard;
