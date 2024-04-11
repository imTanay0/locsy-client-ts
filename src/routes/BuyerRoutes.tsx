import { lazy } from "react";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";

import Footer from "@/components/footer";
import Header from "@/components/header";
import NotFoundPage from "@/components/notFoundPage";
import ProtectedRoute from "@/components/protectedRoute";
import { RootState } from "@/redux/store";
import { UserReducerInitialState } from "@/types/reducer-types";

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
  const { user, isAuthenticated } = useSelector<RootState, UserReducerInitialState>(
    (state) => state.user
  );

  return (
    <div>
      <Header user={user} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/product/:productId" element={<ProductInfoPage />} />
        <Route
          path="/register"
          element={
            <ProtectedRoute isAuthenticated={!isAuthenticated} redirect="/">
              <SignUpPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/login"
          element={
            <ProtectedRoute isAuthenticated={!isAuthenticated} redirect="/">
              <SignInPage />
            </ProtectedRoute>
          }
        />

        {/* LOGGED IN ROUTES */}
        <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} redirect="/login" />}>
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/orders" element={<OrdersPage />} />
        </Route>

        <Route path="/*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default BuyerRoutes;
