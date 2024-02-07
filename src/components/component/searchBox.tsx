import { Input } from "../ui/input";
import { Button } from "../ui/button";

export default function SearchBox() {
  return (
    <div className="flex items-center gap-4">
      <form className="flex items-center gap-2">
        <Input
          className="w-40 md:w-64"
          placeholder="Search products..."
          type="search"
        />
        <Button size="icon" variant="ghost">
          <SearchIcon className="h-5 w-5" />
        </Button>
      </form>
    </div>
  );
}

function SearchIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}
