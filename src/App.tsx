import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import MyLoader from "./components/myLoader";
import NotFoundPage from "./components/notFoundPage";
import { Header } from "./components/component/header";
import ProductsPage from "./pages/Products/ProductsPage";
const HomePage = lazy(() => import("./pages/Home/HomePage"));
const SignInPage = lazy(() => import("./pages/SignIn/SignInPage"));

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
    </BrowserRouter>
    </div>
  );
}

export default App;
