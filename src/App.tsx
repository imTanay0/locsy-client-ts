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

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const getUserData = async () => {
      try {
        const { data } = await axios.get(`${server}/api/v1/buyer`, {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (data.success) {
          dispatch(buyerExist(data));
          setLoading(false);
        }
      } catch (error) {
        dispatch(buyerNotExist());
        setLoading(false);
      }
    };

    getUserData();
  }, [dispatch]);

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
