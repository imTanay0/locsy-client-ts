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

import { productsDemoData } from "@/data/productDemoData";

const SellerProducts = () => {
  return (
    <div className="min-h-screen overflow-hidden p-4 md:p-6">
      <h1 className="font-semibold text-2xl h-fit">Recent Orders</h1>
      <main className="mt-10 flex flex-1 flex-col gap-4">
        <div className="border shadow-sm rounded-lg p-2">
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
              {productsDemoData.map((product) => (
                <TableRow key={product._id}>
                  <TableCell className="font-medium">{product._id}</TableCell>
                  <TableCell>
                    <img
                      src={product.productImg}
                      alt="product"
                      className="w-12 h-12 object-cover rounded-full"
                    />
                  </TableCell>
                  <TableCell>{product.productName}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    February 20, 2022
                  </TableCell>
                  <TableCell className="text-right">{product.price}</TableCell>
                  <TableCell className="hidden sm:table-cell">1</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button size="icon" variant="ghost">
                          <MoreHorizontalIcon className="w-4 h-4" />
                          <span className="sr-only">Actions</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        {/* <DropdownMenuItem className="cursor-pointer">
                          Update
                        </DropdownMenuItem> */}
                        <DropdownMenuItem className="cursor-pointer">
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </main>
    </div>
  );
};

function MoreHorizontalIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <circle cx="12" cy="12" r="1" />
      <circle cx="19" cy="12" r="1" />
      <circle cx="5" cy="12" r="1" />
    </svg>
  );
}

export default SellerProducts;
