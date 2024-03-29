import { useNavigate, useParams } from "react-router-dom";
import { Star } from "lucide-react";

import { Button } from "@/components/ui/button";

import { productsDemoData } from "@/data/productDemoData";
import { toast } from "sonner";

const reviews = { href: "#", average: 4, totalCount: 117 };

const ProductInfoPage = () => {
  const { productId } = useParams();
  const navigate = useNavigate();

  const product = productsDemoData.find((product) => product._id === productId);

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
    });
  };

  return (
    <section className="py-12 container px-4 md:px-6">
      <div className="flex flex-col md:flex-row">
        <div className="mx-auto mt-6 w-full md:w-[30%]">
          <div className="aspect-h-4 overflow-hidden rounded-lg">
            <img
              src={product?.productImg}
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
            <h3 className="sr-only">Description</h3>

            <div className="space-y-6">
              <p className="text-base md:text-lg text-gray-900">
                {product?.description}
              </p>
            </div>
          </div>

          <div className="mt-5">
            <p className="text-base md:text-lg font-medium text-gray-900">
              Seller: {product?.seller}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-4 lg:row-span-3 lg:mt-0">
        <h2 className="sr-only">Product information</h2>
        <p className="text-3xl tracking-tight text-gray-900">
          &#8377; {product?.price}
        </p>
        <div className="mt-6">
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
        </div>

        <div className="mt-10">
          <Button className="w-full md:w-1/3" onClick={handleAddToCart}>
            Add to cart
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProductInfoPage;
