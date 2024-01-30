import { Button } from "./ui/button";
import { Input } from "./ui/input";

const Footer = () => {
  return (
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
  );
};

export default Footer;
