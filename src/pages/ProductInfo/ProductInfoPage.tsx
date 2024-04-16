import axios from "axios";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

import MyLoader from "@/components/myLoader";
import { Button } from "@/components/ui/button";
import { addToCart, cartExist, cartNotExist } from "@/redux/slice/cartSlice";
import { RootState, server } from "@/redux/store";
import { AxiosErrorWithMessage } from "@/types/api-types";
import { Product } from "@/types/types";

// const reviews = { href: "#", average: 4, totalCount: 117 };

const ProductInfoPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState<Product>();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cart } = useSelector((state: RootState) => state.cart);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/v1/product/${productId}`,
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setProduct(response.data.product);
      } catch (error) {
        console.error("Error: ", error);
        toast.error("Failed to fetch product");
      }
    };
    getProduct();
  }, [productId]);

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
    <section className="py-12 container px-4 md:px-6 min-h-[100svh]">
      {!product ? (
        <MyLoader />
      ) : (
        <>
          <div className="flex flex-col md:flex-row md:gap-8">
            <div className="mx-auto mt-6 w-full md:w-[30%]">
              <div className="aspect-h-4 overflow-hidden rounded-lg">
                <img
                  src={product?.mainImage.image.url}
                  alt={`product`}
                  className="w-full h-full object-cover object-center"
                />
              </div>
            </div>

            <div className="w-full md:w-[70%] py-10 lg:col-span-2 lg:col-start-1 lg:pb-16 lg:pt-6">
              <div>
                {/* Product info */}
                <div className="max-w-2xl pb-8 pt-10 lg:grid lg:max-w-7xl">
                  <div className="lg:col-span-2 lg:border-r lg:border-gray-200">
                    <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                      {product?.productName}
                    </h1>
                  </div>
                </div>
                <div className="space-y-2 text-base md:text-lg">
                  <p className=" text-gray-900">
                    {product?.productDescription}
                  </p>
                  <p>
                    Only <span className="font-bold">{product?.stock}</span>{" "}
                    left in stock.
                  </p>
                </div>
              </div>

              {/* <div className="mt-5">
            <p className="text-base md:text-lg font-medium text-gray-900">
              Seller: {product?.seller}
            </p>
          </div> */}
            </div>
          </div>

          <div className="mt-4 lg:row-span-3 lg:mt-0">
            <h2 className="sr-only">Product information</h2>
            <p className="text-3xl tracking-tight text-gray-900 mt-8">
              &#8377; {product?.price}
            </p>

            {/* REVIEWS */}
            {/* <div className="mt-6">
              <h3 className="sr-only">Reviews</h3>
              <div className="flex items-center">
                <div className="flex items-center cursor-pointer">
                  <Star />
                </div>
                <p className="sr-only">{reviews.average} out of 5 stars</p>
                <a
                  href={reviews.href}
                  className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500"
                >
                  {reviews.totalCount} reviews
                </a>
              </div>
            </div> */}

            <div className="mt-10">
              {isLoading ? (
                <Button type="submit" className="w-full md:w-1/3" disabled>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Loading
                </Button>
              ) : (
                <Button
                  className="w-full md:w-1/3"
                  onClick={() => handleAddToCart(product?._id)}
                >
                  Add to Cart
                </Button>
              )}
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default ProductInfoPage;
