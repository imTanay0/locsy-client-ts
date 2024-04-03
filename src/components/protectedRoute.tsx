import { ReactElement } from "react";
import { Navigate, Outlet } from "react-router-dom";

interface Props {
  children?: ReactElement;
  isAuthenticated: boolean;
  sellerOnly?: boolean;
  seller?: boolean;
  adminOnly?: boolean;
  admin?: boolean;
  redirect?: string;
}

const ProtectedRoute = ({
  children,
  isAuthenticated,
  sellerOnly,
  seller,
  adminOnly,
  admin,
  redirect,
}: Props) => {
  if (!isAuthenticated) {
    // console.log("Buyer");
    if (redirect) {
      return <Navigate to={redirect} />;
    }
  }

  if (isAuthenticated && sellerOnly && !seller) {
    // console.log("Seller");
    if (redirect) {
      return <Navigate to={redirect} />;
    }
  }

  if (isAuthenticated && adminOnly && !admin) {
    if (redirect) {
      return <Navigate to={redirect} />;
    }
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoute;
