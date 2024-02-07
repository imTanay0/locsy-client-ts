import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import MyLoader from "@/components/myLoader";
import Header from "@/components/header";
import Footer from "@/components/footer";

const HomePage = lazy(() => import("@/pages/Home/homePage"));
const SignUpPage = lazy(() => import("@/pages/Register/SignUpPage"));
const SignInPage = lazy(() => import("@/pages/Login/SignInPage"));
const ProductsPage = lazy(() => import("@/pages/Products/ProductsPage"));
const NotFoundPage = lazy(() => import("@/components/notFoundPage"));
const SellerRegisterPage = lazy(
  () => import("@/pages/Seller/SellerRegisterPage")
);
const SellerLoginPage = lazy(() => import("@/pages/Seller/SellerLoginPage"));

function App() {
  return (
    <div className="">
      <BrowserRouter>
        <Header />
        <Suspense fallback={<MyLoader />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/register" element={<SignUpPage />} />
            <Route path="/login" element={<SignInPage />} />
            <Route path="/products" element={<ProductsPage />} />

            {/* SELLER ROUTES */}
            <Route path="/seller/register" element={<SellerRegisterPage />} />
            <Route path="/seller/login" element={<SellerLoginPage />} />

            <Route path="/*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
