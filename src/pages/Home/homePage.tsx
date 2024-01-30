import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import HomeHeadingCarousel from "./homeHeadingCarousel";
import HomePageCard from "./homePageCard";
import { products } from "@/data/productDemoData";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <section className="py-12">
          <div className="container px-4 md:px-6">
            <div>
              <HomeHeadingCarousel />
            </div>
            <div className="flex flex-col justify-center space-y-4 mt-4">
              <h1 className="text-3xl max-w-[900px] font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                Locsy is an online platform that supports the local artisans
              </h1>
              <p className="max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                You can buy products of other artisans and also become a seller.
                Let's connect the bridge between ourselves in a simpler and
                modern way
              </p>
              <Link to="/register" className="md:w-fit">
                <Button className="w-full min-w-[200px]">Register Now</Button>
              </Link>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold uppercase tracking-tighter sm:text-5xl">
                Latest Prodcuts
              </h2>
              <Link
                to="/products"
                className="hover:underline text-base md:text-lg"
              >
                More
              </Link>
            </div>
            <div className="mt-5 py-10">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-6">
                {products.map((product, index) => (
                  <HomePageCard
                    key={index}
                    productName={product.productName}
                    productImg={product.productImg}
                    price={product.price}
                    seller={product.seller}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

// export default HomePage;
