import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Link } from "react-router-dom";
import HomeHeadingCarousel from "./homeHeadingCarousel";

const HomePage = () => {
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
                You can buy products of other artisans and also become a seller. Let's connect the bridge between ourselves in a simpler and modern way
              </p>
              <Link
                to="/register"
                className="md:w-fit"
              >
                <Button className="w-full min-w-[200px]">
                  Register Now
                </Button>
              </Link>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Shop by Category
            </h2>
            <Carousel className="w-full mt-8">
              <CarouselContent>
                <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-1">
                    <Card>
                      <CardContent className="flex aspect-square items-center justify-center p-6">
                        <a href="#">
                          <h3 className="text-xl font-bold">Electronics</h3>
                        </a>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
                <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-1">
                    <Card>
                      <CardContent className="flex aspect-square items-center justify-center p-6">
                        <a href="#">
                          <h3 className="text-xl font-bold">Clothing</h3>
                        </a>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
                <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-1">
                    <Card>
                      <CardContent className="flex aspect-square items-center justify-center p-6">
                        <a href="#">
                          <h3 className="text-xl font-bold">Home Goods</h3>
                        </a>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              </CarouselContent>
            </Carousel>
          </div>
        </section>
      </main>
    </div>
  );
};

export default HomePage;
