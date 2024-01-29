import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import MyLoader from "./components/myLoader";
import NotFoundPage from "./components/notFoundPage";
import { Header } from "./components/component/header";
const HomePage = lazy(() => import("./pages/Home/homePage"));
const SignInPage = lazy(() => import("./pages/SignIn/SignInPage"));

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Suspense fallback={<MyLoader />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signin" element={<SignInPage />} />

          <Route path="/*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
