import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";

import NotFoundPage from "@/components/notFoundPage";
import Navbar from "@/components/seller/navbar";

import SellerOrderHistoy from "@/pages/Seller/Orders/SellerOrderHistoy";
import UploadProducts from "@/pages/Seller/Upload Products/UploadProducts";
import SellerProducrs from "@/pages/Seller/Products/SellerProducts";
import UpdateProduct from "@/pages/Seller/Products/UpdateProduct";
import ProtectedRoute from "@/components/protectedRoute";

import { RootState } from "@/redux/store";

const SellerRoutes = () => {
  const { user, isAuthenticated } = useSelector(
    (state: RootState) => state.user
  );

  return (
    <div className="flex">
      <div className="w-fit md:w-[300px]">
        <Navbar />
      </div>
      <div className="w-full">
        <Routes>
          <Route
            element={
              <ProtectedRoute
                isAuthenticated={isAuthenticated}
                redirect="/"
                sellerOnly={true}
                seller={user?.role === 2 ? true : false}
              />
            }
          >
            <Route path="/" element={<SellerOrderHistoy />} />
            <Route path="/orders" element={<SellerOrderHistoy />} />
            <Route path="/products" element={<SellerProducrs />} />
            <Route path="/product/:productId" element={<UpdateProduct />} />
            <Route path="/upload" element={<UploadProducts />} />
          </Route>

          <Route path="/*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </div>
  );
};

export default SellerRoutes;
