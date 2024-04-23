import { Link, useLocation } from "react-router-dom";

import {
  ArrowUpFromLine,
  Package2Icon,
  PackageIcon,
  ShoppingCartIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="min-h-screen w-fit md:w-full">
      <div className="hidden border-r bg-gray-100/40 md:block dark:bg-gray-800/40">
        <div className="flex flex-col gap-2">
          <div className="flex h-[60px] items-center px-0 md:px-6">
            <Link
              className="flex items-center gap-2 font-semibold"
              to="/seller/orders"
            >
              <Package2Icon className="h-6 w-6" />
              <span className="uppercase">Seller Dashboard</span>
            </Link>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-4 text-sm font-medium">
              <Link
                className={cn(
                  "flex items-center gap-3 rounded-lg  px-3 py-2   transition-all hover:text-gray-900",
                  location.pathname.split("/")[2] === "orders"
                    ? "text-gray-900 bg-gray-100"
                    : "text-gray-500"
                )}
                to="/seller/orders"
              >
                <ShoppingCartIcon className="h-4 w-4" />
                Orders
              </Link>
              <Link
                className={cn(
                  "flex items-center gap-3 rounded-lg  px-3 py-2   transition-all hover:text-gray-900",
                  location.pathname.split("/")[2] === "products"
                    ? "text-gray-900 bg-gray-100"
                    : "text-gray-500"
                )}
                to="/seller/products"
              >
                <PackageIcon className="h-4 w-4" />
                Products
              </Link>
              <Link
                className={cn(
                  "flex items-center gap-3 rounded-lg  px-3 py-2   transition-all hover:text-gray-900",
                  location.pathname.split("/")[2] === "upload"
                    ? "text-gray-900 bg-gray-100"
                    : "text-gray-500"
                )}
                to="/seller/upload"
              >
                <ArrowUpFromLine className="h-4 w-4" />
                Upload Products
              </Link>
              {/* <Link
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                to="#"
              >
                <LineChartIcon className="h-4 w-4" />
                Analytics
              </Link> */}
            </nav>
          </div>
        </div>
      </div>

      {/* AVATAR WITH DROPDOWN */}
      {/* <div className="flex flex-col">
        <div className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-gray-100/40 px-2 md:px-6 dark:bg-gray-800/40">
          <div className="flex flex-1 items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="rounded-full" size="icon" variant="ghost">
                  <img
                    alt="Avatar"
                    className="rounded-full"
                    height="32"
                    src="/placeholder.svg"
                    style={{
                      aspectRatio: "32/32",
                      objectFit: "cover",
                    }}
                    width="32"
                  />
                  <span className="sr-only">Toggle user menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Support</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div> */}
    </nav>
  );
};

export default Navbar;
