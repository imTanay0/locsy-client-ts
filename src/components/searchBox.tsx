import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { SearchIcon } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";

import { cn } from "@/lib/utils";
import { server } from "@/redux/store";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

type SearchedProducts = {
  productId: string;
  productName: string;
  price: number;
};

export default function SearchBox() {
  const [productName, setProductName] = useState("");
  const [products, setProducts] = useState<SearchedProducts[]>([]);
  const [toggle, setToggle] = useState<boolean>(false);

  const handleSearch = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (productName === "" || productName === " ") {
      return;
    }

    try {
      const { data } = await axios.get(
        `${server}/api/v1/product/search?productName=${productName}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (data.success) {
        setProducts(data.products);
      }
    } catch (error) {
      console.log(error);
      toast.error(`No product found named ${productName}`);
      setProducts([]);
      setProductName("");
    }
  };

  const toggleProductSearch = () => {
    setToggle(!toggle);
    setProductName("");
  };

  return (
    <div className="flex items-center gap-4 relative">
      <form className="flex items-center gap-2" onSubmit={handleSearch}>
        <Input
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          className="w-40 md:w-64"
          placeholder="Search products..."
          type="search"
        />
        <Button
          size="icon"
          variant="ghost"
          type="submit"
          onClick={() => setToggle(!toggle)}
        >
          <SearchIcon className="h-5 w-5" />
        </Button>
      </form>
      {products.length > 0 && (
        <div
          className={cn(
            "w-[85%] z-10 absolute top-14 bg-gray-800 opacity-90 text-white rounded-md py-1 flex flex-col",
            toggle ? "flex" : "hidden"
          )}
        >
          {products.map((product, i) => (
            <Link
              key={product.productId}
              to={`/product/${product.productId}`}
              className={cn(
                "px-4 py-2",
                i % 2 === 0 && "border-b border-white"
              )}
              onClick={toggleProductSearch}
            >
              {product.productName}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
