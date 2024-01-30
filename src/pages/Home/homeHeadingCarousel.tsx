import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const HomeHeadingCarousel = () => {
  return (
    <Carousel>
      <CarouselContent>
        <CarouselItem>
          <img
            alt="Hero"
            className="mx-auto aspect-[12/5] overflow-hidden rounded-xl object-contain"
            height="500"
            src="https://media.istockphoto.com/id/1217638970/photo/the-jaapi-is-a-traditional-conical-hat-from-assam-india-which-is-made-from-tightly-woven.jpg?s=612x612&w=0&k=20&c=mQ6ID-Xbgc4OaBtbO1jVkzS_3ZcWVhzgz-Khu2RwWTg="
            width="1200"
          />
        </CarouselItem>
        <CarouselItem>
          <img
            alt="Hero"
            className="mx-auto aspect-[12/5] overflow-hidden rounded-xl object-contain"
            height="500"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYbwVk1P-Or43tnW0rGUpJFOUsvZAnJsptNmbihWBbSQ&s"
            width="1200"
          />
        </CarouselItem>
        <CarouselItem>
          <img
            alt="Hero"
            className="mx-auto aspect-[12/5] overflow-hidden rounded-xl object-contain"
            height="500"
            src="https://media.istockphoto.com/id/1217638970/photo/the-jaapi-is-a-traditional-conical-hat-from-assam-india-which-is-made-from-tightly-woven.jpg?s=612x612&w=0&k=20&c=mQ6ID-Xbgc4OaBtbO1jVkzS_3ZcWVhzgz-Khu2RwWTg="
            width="1200"
          />
        </CarouselItem>
      </CarouselContent>
      <CarouselPrevious className="hidden lg:block"/>
      <CarouselNext className="hidden lg:block" />
    </Carousel>
  );
};

export default HomeHeadingCarousel;
