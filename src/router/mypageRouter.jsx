// src/router/mypageRouter.jsx
import React, { lazy, Suspense } from "react";

const Loading = <div>Loading...</div>;

// 페이지들 lazy 로딩
const MyPageProfilePage = lazy(() =>
  import("../pages/mypage/MyPageProfilePage")
);
const MyPagePasswordPage = lazy(() =>
  import("../pages/mypage/MyPagePasswordPage")
);
const MyPageInquiriesPage = lazy(() =>
  import("../pages/mypage/MyPageInquiriesPage")
);
const MyPageWishPage = lazy(() => import("../pages/mypage/MyPageWishPage"));
const MyPageCouponsPage = lazy(() =>
  import("../pages/mypage/MyPageCouponsPage")
);
const MyPageWithdrawPage = lazy(() =>
  import("../pages/mypage/MyPageWithdrawPage")
);
const OrderHistory = lazy(() =>
  import("../pages/mypage/MyPageOrderHistoryPage")
);
const MyProductPageQnA = lazy(() => import("../pages/mypage/MyProductQnA"));
const MyPageReviewPage = lazy(() => import("../pages/mypage/MyPageReviewPage"));

const mypageRouter = () => {
  return [
    {
      index: true,
      element: (
        <Suspense fallback={Loading}>
          <OrderHistory />
        </Suspense>
      )
    },
    {
      path: "profile",
      element: (
        <Suspense fallback={Loading}>
          <MyPageProfilePage />
        </Suspense>
      )
    },
    {
      path: "password",
      element: (
        <Suspense fallback={Loading}>
          <MyPagePasswordPage />
        </Suspense>
      )
    },
    {
      path: "inquiries",
      element: (
        <Suspense fallback={Loading}>
          <MyPageInquiriesPage />
        </Suspense>
      )
    },
    {
      path: "wish",
      element: (
        <Suspense fallback={Loading}>
          <MyPageWishPage />
        </Suspense>
      )
    },
    {
      path: "coupons",
      element: (
        <Suspense fallback={Loading}>
          <MyPageCouponsPage />
        </Suspense>
      )
    },
    {
      path: "withdraw",
      element: (
        <Suspense fallback={Loading}>
          <MyPageWithdrawPage />
        </Suspense>
      )
    },
    {
      path: "orders",
      element: (
        <Suspense fallback={Loading}>
          <OrderHistory />
        </Suspense>
      )
    },
    {
      path: "productqna",
      element: (
        <Suspense fallback={Loading}>
          <MyProductPageQnA />
        </Suspense>
      )
    },
    {
      path: "reviews",
      element: (
        <Suspense fallback={Loading}>
          <MyPageReviewPage />
        </Suspense>
      )
    }
  ];
};

export default mypageRouter;
