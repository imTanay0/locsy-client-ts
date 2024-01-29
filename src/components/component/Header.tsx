import { useState } from "react";
import { Link } from "react-router-dom";
import { MenuIcon, ShoppingCart, UserRound, X } from "lucide-react";

import logo from "../../assets/logo.png";
import { Button } from "../ui/button";
import SearchBox from "./searchBox";

const user = { _id: "fd", role: 1 };

export function Header() {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const logoutHandler = () => {
    setIsDialogOpen(false);
  };

  return (
    <header className="flex items-center justify-between px-4 md:px-10 py-2 border-b">
      <Link to="/" className="flex items-center">
        <img className="w-10" src={logo} alt="logo" />
        <span className="ml-2 text-xl font-semibold">Locsy</span>
      </Link>
      <div>
        <SearchBox />
      </div>
      <nav className="hidden lg:flex gap-4 items-center">
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
              className="bg-slate-700 text-white p-4 w-28 rounded-md top-[8%] left-[calc(94%-112px)]"
            >
              <div className="flex flex-col gap-3 align-middle items-center">
                {(user.role === 1 || user.role === 2) && (
                  <Link to="/dashboard" onClick={() => setIsDialogOpen(false)}>
                    Dashboard
                  </Link>
                )}

                <Link to="/orders" onClick={() => setIsDialogOpen(false)}>
                  Orders
                </Link>
                <p
                  className="text-red-500 cursor-pointer"
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
      <div className="block lg:hidden">
        <MenuIcon className="h-6 w-6 cursor-pointer" />
        <X />
      </div>
    </header>
  );
}
