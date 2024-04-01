import { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";

import Footer from "@/components/footer";
import Header from "@/components/header";
import NotFoundPage from "@/components/notFoundPage";
import { RootState } from "@/redux/store";
import { BuyerState } from "@/types/reducer-types";

const HomePage = lazy(() => import("@/pages/Home/homePage"));
const SignUpPage = lazy(() => import("@/pages/Register/SignUpPage"));
const SignInPage = lazy(() => import("@/pages/Login/SignInPage"));
const ProductsPage = lazy(() => import("@/pages/Products/ProductsPage"));
const ProductInfoPage = lazy(
  () => import("@/pages/ProductInfo/ProductInfoPage")
);
const CartPage = lazy(() => import("@/pages/Cart/CartPage"));
const CheckoutPage = lazy(() => import("@/pages/Checkout/CheckoutPage"));
const OrdersPage = lazy(() => import("@/pages/Orders/OrdersPage"));

const BuyerRoutes = () => {
  const { user } = useSelector<RootState, BuyerState>((state) => state.buyer);

  return (
    <div>
      <Header user={user} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/product/:productId" element={<ProductInfoPage />} />
        <Route path="/cart" element={<CartPage />} />

        <Route path="/register" element={<SignUpPage />} />
        <Route path="/login" element={<SignInPage />} />

        {/* LOGGED IN ROUTES */}
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/orders" element={<OrdersPage />} />

        <Route path="/*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default BuyerRoutes;
