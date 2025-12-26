import React, { lazy, Suspense } from "react";

const Loading = <div>Loading...</div>;
const ProductSearch = lazy(() =>
  import("../pages/admin/product/ProductSearchPage")
);
const ProductAdd = lazy(() => import("../pages/admin/product/ProductAddPage"));
const ProductModify = lazy(() =>
  import("../pages/admin/product/ProductModifyPage")
);
const RestockNoti = lazy(() =>
  import("../pages/admin/restock/RestockNotiPage")
);
const SalesStatistics = lazy(() =>
  import("../pages/admin/statistics/SalesStatisticsPage")
);
const CouponAddPage = lazy(() => import("../pages/admin/coupon/CouponAddPage"));
const CouponSearchPage = lazy(() =>
  import("../pages/admin/coupon/CouponSearchPage")
);
const CouponModifyPage = lazy(() =>
  import("../pages/admin/coupon/CouponModifyPage")
);
const UserInfoMgr = lazy(() => import("../components/admin/user/UserInfoMgr"));
const OrderMgr = lazy(() =>
  import("../components/admin/order/AdminOrderMgrComponent")
);
const FaqMgr = lazy(() => import("../pages/admin/posts/FaqManagementPage"));
const InquiryMgr = lazy(() =>
  import("../pages/admin/posts/InquiryManagementPage")
);

const adminRouter = () => {
  return [
    {
      path: "products",
      element: (
        <Suspense fallback={Loading}>
          <ProductSearch />
        </Suspense>
      ),
    },
    {
      path: "product/add",
      element: (
        <Suspense fallback={Loading}>
          <ProductAdd />
        </Suspense>
      ),
    },
    {
      path: "product/modify/:id",
      element: (
        <Suspense fallback={Loading}>
          <ProductModify />
        </Suspense>
      ),
    },
    {
      path: "restock/noti",
      element: (
        <Suspense fallback={Loading}>
          <RestockNoti />
        </Suspense>
      ),
    },
    {
      path: "statistics",
      element: (
        <Suspense fallback={Loading}>
          <SalesStatistics />
        </Suspense>
      ),
    },
    {
      path: "coupon/register",
      element: (
        <Suspense fallback={Loading}>
          <CouponAddPage />
        </Suspense>
      ),
    },
    {
      path: "coupon/search",
      element: (
        <Suspense fallback={Loading}>
          <CouponSearchPage />
        </Suspense>
      ),
    },
    {
      path: "coupon/modify/:id",
      element: (
        <Suspense fallback={Loading}>
          <CouponModifyPage />
        </Suspense>
      ),
    },
    {
      path: "user/search",
      element: (
        <Suspense fallback={Loading}>
          <UserInfoMgr />
        </Suspense>
      ),
    },
    {
      path: "order/search",
      element: (
        <Suspense fallback={Loading}>
          <OrderMgr />
        </Suspense>
      ),
    },
    {
      path: "posts/faq",
      element: (
        <Suspense fallback={Loading}>
          <FaqMgr />
        </Suspense>
      ),
    },
    {
      path: "posts/inquiry",
      element: (
        <Suspense fallback={Loading}>
          <InquiryMgr />
        </Suspense>
      ),
    },
  ];
};

export default adminRouter;
