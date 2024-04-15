import axios from "axios";
import { Suspense, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import MyLoader from "@/components/myLoader";
import ScrollToTop from "@/components/scrollToTop";
import BuyerRoutes from "@/routes/BuyerRoutes";
import SellerRoutes from "@/routes/SellerRoutes";
import { buyerExist, buyerNotExist } from "./redux/slice/buyerSlice";
import { server } from "./redux/store";
import { userExist, userNotExist } from "./redux/slice/authSlice";
import { cartExist, cartNotExist } from "./redux/slice/cartSlice";
import { AxiosErrorWithMessage } from "./types/api-types";

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const getUserData = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`${server}/api/v1/user`, {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (data.success) {
          dispatch(userExist(data));
          dispatch(buyerExist(data));
          setLoading(false);
        }
      } catch (error) {
        dispatch(userNotExist());
        dispatch(buyerNotExist());
        setLoading(false);
      }
    };

    const getCartForCurrentUser = async () => {
      try {
        setLoading(true);

        const { data } = await axios.get(`${server}/api/v1/cart/get`, {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (data.success) {
          dispatch(cartExist(data));
        }
      } catch (error) {
        const errMsg = (error as AxiosErrorWithMessage).response.data.message;
        console.log(errMsg);
        dispatch(cartNotExist());
      } finally {
        setLoading(false);
      }
    };

    getUserData();
    getCartForCurrentUser();
  }, [dispatch]);

  return (
    <div>
      {loading ? (
        <MyLoader />
      ) : (
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
      )}
    </div>
  );
}

export default App;
