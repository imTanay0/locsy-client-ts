import { Route, Routes } from "react-router-dom";

import NotFoundPage from "@/components/notFoundPage";
import Header from "@/components/seller/header";

import SellerPage from "@/pages/Seller/Home/SellerPage";
import SellerOrderHistoy from "@/pages/Seller/Orders/SellerOrderHistoy";
import UploadProducts from "@/pages/Seller/Upload Products/UploadProducts";
import SellerProducrs from "@/pages/Seller/Products/SellerProducts";

const SellerRoutes = () => {
  return (
    <div className="flex">
      <div className="w-fit md:w-[300px]">
        <Header />
      </div>
      <div className="w-full">
        <Routes>
          <Route path="/" element={<SellerPage />} />
          <Route path="/orders" element={<SellerOrderHistoy />} />
          <Route path="/products" element={<SellerProducrs />} />
          <Route path="/upload" element={<UploadProducts />} />

          <Route path="/*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </div>
  );
};

export default SellerRoutes;
