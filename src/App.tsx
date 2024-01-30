import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import MyLoader from "@/components/MyLoader";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const HomePage = lazy(() => import("@/pages/Home/HomePage"));
const ProductsPage = lazy(() => import("@/pages/Products/ProductsPage"));
const SignInPage = lazy(() => import("@/pages/SignIn/SignInPage"));
const NotFoundPage = lazy(() => import("@/components/NotFoundPage"));

function App() {
  return (
    <div className="">
      <BrowserRouter>
        <Header />
        <Suspense fallback={<MyLoader />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<SignInPage />} />
            <Route path="/products" element={<ProductsPage />} />

            <Route path="/*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
