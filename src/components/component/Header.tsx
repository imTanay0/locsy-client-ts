import SearchBox from "./searchBox";

export function Header() {
  return (
    <header className="flex items-center justify-between px-4 py-2 border-b">
      <a className="flex items-center" href="#">
        <ShoppingBagIcon className="h-6 w-6" />
        <span className="ml-2 text-lg font-semibold">EcomShop</span>
      </a>
      <nav className="hidden lg:flex gap-4">
        <a className="text-sm hover:underline" href="#">
          Electronics
        </a>
        <a className="text-sm hover:underline" href="#">
          Clothing
        </a>
        <a className="text-sm hover:underline" href="#">
          Home Goods
        </a>
        <a className="text-sm hover:underline" href="#">
          More
        </a>
      </nav>
      <div>
        <SearchBox />
      </div>
    </header>
  );
}

function ShoppingBagIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
      <path d="M3 6h18" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  );
}
