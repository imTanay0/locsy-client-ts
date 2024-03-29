import { Route, Routes } from "react-router-dom";

import SellerPage from "@/pages/Seller/Home/SellerPage";

const SellerRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<SellerPage />} />
      </Routes>
    </div>
  );
};

export default SellerRoutes;
