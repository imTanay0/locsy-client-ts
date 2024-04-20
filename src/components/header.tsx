import axios from "axios";
import {
  LayoutGrid,
  LogOut,
  MenuIcon,
  ShoppingBag,
  ShoppingCart,
  Store,
  UserRound,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";

import { useMediaQuery } from "@/hooks/use-media-query";
import { server } from "@/redux/store";
import { AxiosErrorWithMessage } from "@/types/api-types";
import { User } from "@/types/types";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import logo from "../assets/logo.png";
import SearchBox from "./searchBox";
import { Button } from "./ui/button";
import { Drawer, DrawerClose, DrawerContent, DrawerTrigger } from "./ui/drawer";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { userNotExist } from "@/redux/slice/authSlice";

type HeaderProps = {
  user: User | null;
};

const Header = ({ user }: HeaderProps) => {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const dispatch = useDispatch();

  const logoutHandler = async () => {
    try {
      const { data } = await axios.get(`${server}/api/v1/user/logout`, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (data.success) {
        toast.success(data.message);
        dispatch(userNotExist());
      }
    } catch (error) {
      if (error instanceof Error) {
        const errorMessage = (error as AxiosErrorWithMessage).response?.data
          .message;
        toast.error(errorMessage);
      } else {
        console.error(error);
        toast.error("Internal Server Error");
      }
    }
  };

  return (
    <header className="flex items-center justify-between px-4 md:px-10 py-2 border-b">
      <Link to="/" className="hidden md:flex items-center">
        <img className="w-10" src={logo} alt="logo" />
        <span className="ml-2 text-xl font-semibold">Locsy</span>
      </Link>
      <div className="">
        <SearchBox />
      </div>
      {isDesktop ? (
        <nav className="flex gap-4 items-center">
          <Link className="hover:underline mr-2" to="/products">
            Products
          </Link>
          <Link to="/cart">
            <ShoppingCart />
          </Link>
          {user?._id ? (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="overflow-hidden rounded-full border border-slate-500"
                  >
                    <UserRound className="w-5 h-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <Link to="/account" className="w-full">
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                  </Link>
                  {user.role === 1 && (
                    <Link to="/admin" className="w-full">
                      <DropdownMenuItem>Admin Dashboard</DropdownMenuItem>
                    </Link>
                  )}
                  {user.role === 2 && (
                    <Link to="/seller" className="w-full">
                      <DropdownMenuItem>Seller Dashboard</DropdownMenuItem>
                    </Link>
                  )}
                  <Link to="/orders" className="w-full py-1 hover:bg-slate-300">
                    <DropdownMenuItem>Orders</DropdownMenuItem>
                  </Link>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <p
                      className="text-red-600 w-full cursor-pointer"
                      onClick={logoutHandler}
                    >
                      Sign out
                    </p>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <Link to="/login">
              <Button>Sign In</Button>
            </Link>
          )}
        </nav>
      ) : (
        <div>
          <Drawer direction="right">
            <DrawerTrigger>
              <MenuIcon className="h-6 w-6 cursor-pointer" />
            </DrawerTrigger>
            <DrawerContent>
              <div className="">
                <div className="flex flex-row justify-between px-5 py-2 border-b border-gray-200">
                  <div>
                    <Link to="/">
                      <DrawerClose className="flex md:hidden items-center">
                        <img className="w-8" src={logo} alt="logo" />
                        <span className="ml-2 text-lg font-semibold">
                          Locsy
                        </span>
                      </DrawerClose>
                    </Link>
                  </div>
                  <DrawerClose>
                    <X className="h-6 w-6 cursor-pointer" />
                  </DrawerClose>
                </div>
                <nav className="px-5 py-2 flex flex-col gap-2">
                  <Link className="py-1" to="/products">
                    <DrawerClose>
                      <div className="flex gap-2 items-center">
                        <Store className="h-5 w-5" />
                        <span>Products</span>
                      </div>
                    </DrawerClose>
                  </Link>

                  <Link className="py-1" to="/cart">
                    <DrawerClose>
                      <div className="flex gap-2 items-center">
                        <ShoppingCart className="h-5 w-5" />
                        <span>Cart</span>
                      </div>
                    </DrawerClose>
                  </Link>

                  {user?._id ? (
                    <>
                      {(user.role === 1 || user.role === 2) && (
                        <Link className="py-1" to="/dashboard">
                          <DrawerClose>
                            <div className="flex gap-2 items-center">
                              <LayoutGrid className="h-5 w-5" />
                              <span>Dashboard</span>
                            </div>
                          </DrawerClose>
                        </Link>
                      )}
                      <Link className="py-1" to="/orders">
                        <DrawerClose>
                          <div className="flex gap-2 items-center">
                            <ShoppingBag className="h-5 w-5" />
                            <span>Orders</span>
                          </div>
                        </DrawerClose>
                      </Link>
                      <DrawerClose>
                        <div
                          className="text-red-600 cursor-pointer flex gap-2 items-center py-1"
                          onClick={logoutHandler}
                        >
                          <LogOut className="h-5 w-5" />
                          <span>Sign out</span>
                        </div>
                      </DrawerClose>
                    </>
                  ) : (
                    <Link to="/login">
                      <DrawerClose>
                        <Button>Sign In</Button>
                      </DrawerClose>
                    </Link>
                  )}
                </nav>
              </div>
            </DrawerContent>
          </Drawer>
        </div>
      )}
    </header>
  );
};

export default Header;
