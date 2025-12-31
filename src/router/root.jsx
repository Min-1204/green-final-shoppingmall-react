import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import adminRouter from "./adminRouter";
import mypageRouter from "./mypageRouter";
import helpRouter from "./helpRouter";
import { ProtectedAdminLayout } from "./ProtectedLayout";

const Main = lazy(() => import("../pages/mainpage/MainPage"));
const LoginPage = lazy(() => import("../pages/user/LoginPage"));
const SignPage = lazy(() => import("../pages/user/SignUpPage"));
const FindIdPage = lazy(() => import("../pages/user/FindIdPage"));
const FindPasswordPage = lazy(() => import("../pages/user/FindPasswordPage"));
const MyPageLayout = lazy(() => import("../layouts/mypage/MyPageLayout"));

const ProductList = lazy(() => import("../pages/product/ProductListPage"));
const ProductDetail = lazy(() => import("../pages/product/ProductDetailPage"));

const Order = lazy(() => import("../pages/order/OrderPage"));
const OrderComplete = lazy(() => import("../pages/order/OrderCompletePage"));

const Cart = lazy(() => import("../pages/cart/CartPage"));

const Helpcenter = lazy(() => import("../pages/helpcenter/HelpCenterPage"));
const ProductQuestionPage = lazy(() =>
  import("../components/productquestion/ProductQuestion")
);

const SearchResultPage = lazy(() => import("../pages/search/SearchResultPage"));

const Loading = <div>Loading...</div>;

const root = createBrowserRouter([
  {
    path: "",
    element: (
      <Suspense fallback={Loading}>
        <Main />
      </Suspense>
    ),
  },
  {
    path: "login",
    element: (
      <Suspense fallback={Loading}>
        <LoginPage />
      </Suspense>
    ),
  },
  {
    path: "signup",
    element: (
      <Suspense fallback={Loading}>
        <SignPage />
      </Suspense>
    ),
  },
  {
    path: "findid",
    element: (
      <Suspense fallback={Loading}>
        <FindIdPage />
      </Suspense>
    ),
  },
  {
    path: "findpw",
    element: (
      <Suspense fallback={Loading}>
        <FindPasswordPage />
      </Suspense>
    ),
  },
  {
    path: "mypage",
    element: (
      <Suspense fallback={Loading}>
        <MyPageLayout />
      </Suspense>
    ),
    children: mypageRouter(),
  },
  {
    path: "products",
    element: (
      <Suspense fallback={Loading}>
        <ProductList />
      </Suspense>
    ),
  },
  {
    path: "product/:id",
    element: (
      <Suspense fallback={Loading}>
        <ProductDetail />
      </Suspense>
    ),
  },
  {
    path: "order",
    element: (
      <Suspense fallback={Loading}>
        <Order />
      </Suspense>
    ),
  },
  {
    path: "order/complete",
    element: (
      <Suspense fallback={Loading}>
        <OrderComplete />
      </Suspense>
    ),
  },
  {
    path: "cart",
    element: (
      <Suspense fallback={Loading}>
        <Cart />
      </Suspense>
    ),
  },
  {
    path: "admin",
    element: (
      <Suspense fallback={Loading}>
        <ProtectedAdminLayout />
      </Suspense>
    ),
    children: adminRouter(),
  },
  {
    path: "/helpcenter",
    element: <Helpcenter />,
    children: helpRouter(),
  },
  {
    path: "productquestion",
    element: (
      <Suspense fallback={Loading}>
        <ProductQuestionPage />
      </Suspense>
    ),
  },
  {
    path: "/search",
    element: (
      <Suspense fallback={Loading}>
        <SearchResultPage />
      </Suspense>
    ),
  },
]);

export default root;
