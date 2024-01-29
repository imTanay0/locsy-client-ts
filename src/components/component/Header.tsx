import { Link } from "react-router-dom";

import SearchBox from "./searchBox";
import logo from "../../assets/logo.png";

export function Header() {
  return (
    <header className="flex items-center justify-between px-4 py-2 border-b">
      <Link to="/" className="flex items-center">
        <img className="w-10" src={logo} alt="logo" />
        <span className="ml-2 text-xl font-semibold">Locsy</span>
      </Link>
      <nav className="hidden lg:flex gap-4">
        <Link className="text-sm hover:underline" to="/products">
          Products
        </Link>
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
