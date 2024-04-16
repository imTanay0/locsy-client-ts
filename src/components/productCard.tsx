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
import { useDispatch, useSelector } from "react-redux";
import { RootState, server } from "@/redux/store";
import { AxiosErrorWithMessage } from "@/types/api-types";
import { useState } from "react";
import LoadingButton from "./loadingButton";
import axios from "axios";
import { addToCart, cartExist, cartNotExist } from "@/redux/slice/cartSlice";

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
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const { cart } = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();

  const handleAddToCart = async (productId: string) => {
    if (!cart) {
      try {
        setIsLoading(true);
        const { data } = await axios.post(
          `${server}/api/v1/cart/create`,
          {
            productId,
          },
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (data.success) {
          // console.log(data);
          dispatch(cartExist(data));
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
          });
        }
      } catch (error) {
        const errMsg = (error as AxiosErrorWithMessage).response.data.message;
        console.log(errMsg);
        toast.error(errMsg);
        dispatch(cartNotExist());
      } finally {
        setIsLoading(false);
      }
    } else {
      try {
        setIsLoading(true);
        const { data } = await axios.put(
          `${server}/api/v1/cart/add-item`,
          {
            productId,
          },
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (data.success) {
          dispatch(addToCart(data));
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
          });
        }
      } catch (error) {
        const errMsg = (error as AxiosErrorWithMessage).response.data.message;
        console.log(errMsg);
        toast.error(errMsg);
      } finally {
        setIsLoading(false);
      }
    }
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
          {isLoading ? (
            <LoadingButton />
          ) : (
            <Button
              className="w-full"
              onClick={() => handleAddToCart(productId)}
            >
              Add to Cart
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default ProductCard;
