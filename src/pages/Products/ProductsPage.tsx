import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { ListFilter } from "lucide-react";

import ProductCard from "@/components/productCard";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { server } from "@/redux/store";

interface ProductResponse {
  productId: string;
  productName: string;
  productDescription: string;
  productImage: string;
  price: number;
  sellerName: string;
  productCategories: string[];
  stock: number;
  createdAt: string;
  updatedAt: string;
}

const ProductsPage = () => {
  const [sort, setSort] = useState("");
  const [maxPrice, setMaxPrice] = useState(100000);
  const [page, setPage] = useState(1);
  const [products, setProducts] = useState<ProductResponse[]>();

  // const { data, error } = useGetAllProductsQuery({});

  useEffect(() => {
    const getAllProducts = async () => {
      try {
        const { data } = await axios.get(`${server}/api/v1/product/getall`, {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        });

        setProducts(data.filteredUpdatedProducts);
      } catch (error) {
        console.log(error);
        toast.error("Failed to fetch products");
      }
    };

    getAllProducts();
  }, []);

  // const isPrevPage = true;
  // const isNextPage = true;

  const handlePrevPage = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };

  const handleNextPage = () => {
    setPage((prev) => prev + 1);
  };

  return (
    <div className="min-h-[100svh] md:px-6 py-12 container flex flex-col md:flex-row gap-5">
      <aside className="w-full md:w-[22%] h-fit px-4 py-5 flex flex-col gap-4 shadow-custom rounded-lg">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold">Filters</h2>
          <ListFilter width={24} />
        </div>
        <div className="w-full">
          <h4 className="text-lg mb-2">Sort</h4>
          <Select value={sort} onValueChange={(val) => setSort(val)}>
            <SelectTrigger>
              <SelectValue placeholder="Sort" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">None</SelectItem>
              <SelectItem value="asc">Price (Low to High)</SelectItem>
              <SelectItem value="dsc">Price (High to Low)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <h4 className="text-lg">Max Price: {maxPrice || ""}</h4>
          <Input
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            type="range"
            min={100}
            max={100000}
            step={100}
            className="w-full"
          />
        </div>
      </aside>

      <main className="w-full md:w-[78%]">
        {products && products.length > 0 ? (
          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 min-h-[90%]">
            {products.map((product) => (
              <ProductCard
                key={product.productId}
                productId={product.productId}
                productName={product.productName}
                productImg={product.productImage}
                price={product.price}
                seller={product.sellerName}
              />
            ))}
          </div>
        ) : (
          <p>No products found</p>
        )}

        <Pagination className="mt-4">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                className="cursor-pointer"
                onClick={handlePrevPage}
              />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">of {page}</PaginationLink>
            </PaginationItem>

            {/* {renderPages()} */}

            <PaginationItem>
              <PaginationNext
                className="cursor-pointer"
                onClick={handleNextPage}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </main>
    </div>
  );
};

export default ProductsPage;
