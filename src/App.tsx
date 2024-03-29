import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import MyLoader from "@/components/myLoader";
import ScrollToTop from "@/components/scrollToTop";
import SellerRoutes from "@/routers/SellerRoutes";
import BuyerRoutes from "@/routers/BuyerRoutes";

const NotFoundPage = lazy(() => import("@/components/notFoundPage"));

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

              <Route path="/*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </ScrollToTop>
      </BrowserRouter>
    </div>
  );
}

export default App;
