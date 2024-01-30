import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import MyLoader from "@/components/header";
import Header from "@/components/header";
import Footer from "./components/footer";

// import HomePage from "@/pages/Home/HomePage";

const HomePage = lazy(() => import("@/pages/Home/HomePage"));
const ProductsPage = lazy(() => import("./pages/Products/ProductsPage"));
const SignInPage = lazy(() => import("./pages/SignIn/SignInPage"));
const NotFoundPage = lazy(() => import("./components/notFoundPage"));

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
