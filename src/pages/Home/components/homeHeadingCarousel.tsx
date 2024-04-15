import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { server } from "@/redux/store";
import { Product } from "@/types/api-types";

const HomeHeadingCarousel = () => {
  const [latestProducts, setLatestProducts] = useState<Product[]>();

  useEffect(() => {
    const getLatestProducts = async () => {
      try {
        const { data } = await axios.get(`${server}/api/v1/product/latest`, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        // console.log(data);
        if (data.success) {
          setLatestProducts(data.products);
        }
      } catch (error) {
        console.log(error);
        toast.error("Failed to fetch the latest products");
      }
    };

    getLatestProducts();
  }, []);

  return (
    <Carousel>
      <CarouselContent>
        {latestProducts
          ? latestProducts.map((product) => (
              <CarouselItem key={product._id}>
                <img
                  alt="Hero"
                  className="mx-auto aspect-[12/5] overflow-hidden rounded-xl object-contain"
                  height="500"
                  src={product.mainImage.image.url}
                  width="1200"
                />
              </CarouselItem>
            ))
          : null}
      </CarouselContent>
      <CarouselPrevious className="hidden lg:block" />
      <CarouselNext className="hidden lg:block" />
    </Carousel>
  );
};

export default HomeHeadingCarousel;
