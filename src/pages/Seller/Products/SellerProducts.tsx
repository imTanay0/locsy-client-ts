import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { MoreHorizontalIcon } from "lucide-react";
import axios from "axios";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  getProductsFailure,
  getProductsStart,
  getProductsSuccess,
} from "@/redux/slice/productsSlice";
import { RootState, server } from "@/redux/store";
import { ProductResponse } from "@/types/api-types";

const SellerProducts = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state: RootState) => state.products);

  useEffect(() => {
    const getAllProducts = async () => {
      try {
        dispatch(getProductsStart());
        const res = await axios.get(`${server}/api/v1/product/get`, {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        });

        // console.log(res);
        const products = res.data.products as ProductResponse[];
        dispatch(getProductsSuccess(products));
      } catch (error) {
        console.error("Error: ", error);
        dispatch(getProductsFailure());
      }
    };

    getAllProducts();
  }, [dispatch]);

  return (
    <div className="min-h-screen overflow-hidden p-4 md:p-6">
      <h1 className="font-semibold text-2xl h-fit">Products</h1>
      <main className="mt-10 flex flex-1 flex-col gap-4">
        <div className="border shadow-sm rounded-lg p-2">
          {products.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Product ID</TableHead>
                  <TableHead className="">Product Image</TableHead>
                  <TableHead className="">Product Name</TableHead>

                  <TableHead className="hidden md:table-cell">Date</TableHead>
                  <TableHead className="text-right">Price</TableHead>
                  <TableHead className="hidden sm:table-cell">Stock</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product._id}>
                    <TableCell className="font-medium">{product._id}</TableCell>
                    <TableCell>
                      <img
                        src={product.mainImage.image.url}
                        alt="product"
                        className="w-12 h-12 object-cover rounded-full"
                      />
                    </TableCell>
                    <TableCell>{product.productName}</TableCell>
                    <TableCell className="hidden md:table-cell">
                      February 20, 2022
                    </TableCell>
                    <TableCell className="text-right">
                      {product.price}
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      {product.stock}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button size="icon" variant="ghost">
                            <MoreHorizontalIcon className="w-4 h-4" />
                            <span className="sr-only">Actions</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem className="cursor-pointer">
                            <Link
                              to={`/seller/product/${product._id}`}
                              className="w-full"
                            >
                              Update
                            </Link>
                          </DropdownMenuItem>

                          {/* <DropdownMenuItem className="cursor-pointer">
                            <span className="hover:text-red-500 w-full">
                              Delete
                            </span>
                          </DropdownMenuItem> */}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <p>No products found</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default SellerProducts;
