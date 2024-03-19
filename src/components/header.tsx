import { useState } from "react";
import { Link } from "react-router-dom";
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

import { useMediaQuery } from "@/hooks/use-media-query";
import SearchBox from "./searchBox";
import { Button } from "./ui/button";
import { Drawer, DrawerClose, DrawerContent, DrawerTrigger } from "./ui/drawer";
import logo from "../assets/logo.png";

const user = { _id: "123", role: 2 };

const Header = () => {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const logoutHandler = () => {
    setIsDialogOpen(false);
    console.log("Logged out");
    alert("Logged out");
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
              <button
                className="bg-slate-300 p-3 rounded-full"
                onClick={() => setIsDialogOpen((prev) => !prev)}
              >
                <UserRound className="w-5 h-5" />
              </button>
              <dialog
                open={isDialogOpen}
                className="bg-slate-200 py-1 w-28 rounded-sm top-[8%] left-[calc(94%-112px)] z-50"
              >
                <div className="flex flex-col align-middle items-center text-center">
                  <Link
                    to="/account"
                    className=" w-full py-1 hover:bg-slate-300"
                    onClick={() => setIsDialogOpen(false)}
                  >
                    Profile
                  </Link>

                  {(user.role === 1 || user.role === 2) && (
                    <Link
                      to="/dashboard"
                      onClick={() => setIsDialogOpen(false)}
                      className="w-full py-1 hover:bg-slate-300"
                    >
                      Dashboard
                    </Link>
                  )}

                  <Link
                    to="/orders"
                    onClick={() => setIsDialogOpen(false)}
                    className="w-full py-1 hover:bg-slate-300"
                  >
                    Orders
                  </Link>
                  <p
                    className="text-red-500 w-full py-1 hover:bg-slate-300"
                    onClick={logoutHandler}
                  >
                    Sign Out
                  </p>
                </div>
              </dialog>
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
                          <span>Sign Out</span>
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
