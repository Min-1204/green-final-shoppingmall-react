import { lazy, Suspense } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

// 관리자 권한 보호 컴포넌트
function AdminRoute({ children }) {
  const { isAdmin, isLoggedIn } = useAuth();
  const location = useLocation();

  // 1. 로그인 여부 확인
  if (!isLoggedIn) {
    console.warn("AdminRoute: 로그인이 필요합니다.");
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 2. 관리자 권한 확인
  if (!isAdmin) {
    console.warn("AdminRoute: 관리자 권한이 필요합니다.");
    return <Navigate to="/" replace />;
  }
  return children;
}
const Loading = <div>고객센터 페이지 로딩 중...</div>;

const HelpNoticePage = lazy(() => import("../pages/helpcenter/HelpNoticePage"));
const HelpFaqPage = lazy(() => import("../pages/helpcenter/HelpFaqPage"));
const HelpInquiryPage = lazy(() =>
  import("../pages/helpcenter/HelpInquiryPage")
);

const NoticeWritePage = lazy(() =>
  import("../pages/helpcenter/admin/NoticeWritePage")
);
const NoticeEditPage = lazy(() =>
  import("../pages/helpcenter/admin/NoticeEditPage")
);

const helpRouter = () => {
  return [
    {
      index: true,
      element: (
        <Suspense fallback={Loading}>
          <HelpNoticePage />
        </Suspense>
      ),
    },
    {
      path: "faq",
      element: (
        <Suspense fallback={Loading}>
          <HelpFaqPage />
        </Suspense>
      ),
    },
    {
      path: "inquiry",
      element: (
        <Suspense fallback={Loading}>
          <HelpInquiryPage />
        </Suspense>
      ),
    },
    // --- 관리자 전용 라우트 ---
    {
      path: "notice/write",
      element: (
        // AdminRoute로 래핑하여 권한 보호
        <AdminRoute>
          <Suspense fallback={Loading}>
            <NoticeWritePage />
          </Suspense>
        </AdminRoute>
      ),
    },
    {
      path: "notice/edit",
      element: (
        // AdminRoute로 래핑하여 권한 보호
        <AdminRoute>
          <Suspense fallback={Loading}>
            <NoticeEditPage />
          </Suspense>
        </AdminRoute>
      ),
    },
  ];
};

export default helpRouter;
