import { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import MyLoader from "@/components/myLoader";
import ScrollToTop from "@/components/scrollToTop";
import BuyerRoutes from "@/routers/BuyerRoutes";
import SellerRoutes from "@/routers/SellerRoutes";

function App() {
  return (
    <div className="">
      <BrowserRouter>
        <ScrollToTop>
          <Suspense fallback={<MyLoader />}>
            <Routes>
              <Route path="/*" element={<BuyerRoutes />} />

              {/* SELLER ROUTES */}
              <Route path="/seller/*" element={<SellerRoutes />} />
            </Routes>
          </Suspense>
        </ScrollToTop>
      </BrowserRouter>
    </div>
  );
}

export default App;
