import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CardContent, Card } from "@/components/ui/card";
import {
  CarouselItem,
  CarouselContent,
  Carousel,
} from "@/components/ui/carousel";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <section className="py-12">
          <div className="container px-4 md:px-6">
            <img
              alt="Hero"
              className="mx-auto aspect-[12/5] overflow-hidden rounded-xl object-cover"
              height="500"
              src="data:image/jpeg;base64,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"
              width="1200"
            />
            <div className="flex flex-col justify-center space-y-4 mt-4">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                The Biggest Sale of the Year!
              </h1>
              <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                Don't miss out on our biggest sale of the year. Save up to 50%
                on select items.
              </p>
              <a
                className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                href="#"
              >
                Shop Now
              </a>
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
              {/* <CarouselPrevious /> */}
              {/* <CarouselNext /> */}
            </Carousel>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <div className="flex flex-col gap-2 sm:flex-row">
          <a className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </a>
          <a className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </a>
          <a className="text-xs hover:underline underline-offset-4" href="#">
            Contact Us
          </a>
        </div>
        <div className="flex items-center mt-4 sm:mt-0 sm:ml-auto">
          <form className="flex space-x-2">
            <Input
              className="max-w-lg flex-1"
              placeholder="Enter your email"
              type="email"
            />
            <Button type="submit">Subscribe</Button>
          </form>
        </div>
      </footer>
    </div>
  );
}
