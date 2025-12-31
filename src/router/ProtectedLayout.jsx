import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import AdminIndex from "../pages/admin/AdminIndex";

export const ProtectedLayout = ({ requiredRoles = ["ADMIN", "MANAGER"] }) => {
  const { user, isLoggedIn, isInitialized } = useSelector(
    (state) => state.authSlice
  );

  // 로딩 상태
  if (!isInitialized) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div>인증 확인 중...</div>
      </div>
    );
  }

  // 로그인 체크
  if (!isLoggedIn) {
    alert("로그인이 필요합니다.");
    return <Navigate to="/login" replace />;
  }

  // 권한 체크
  if (!requiredRoles.includes(user?.userRole)) {
    alert("접근 권한이 없습니다.");
    return <Navigate to="/" replace />;
  }

  // 권한 통과
  return <AdminIndex />;
};

export const ProtectedAdminLayout = () => {
  return (
    <ProtectedLayout requiredRoles={["ADMIN", "MANAGER"]}></ProtectedLayout>
  );
};
