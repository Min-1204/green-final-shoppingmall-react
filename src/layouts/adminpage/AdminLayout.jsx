import React, { useEffect, useState } from "react";
import AdminSideBar from "./AdminSideBar";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserProfileThunk,
  logoutAsyncThunk,
} from "../../redux/slices/features/user/authSlice";

const AdminLayout = ({ children }) => {
  // const [activeTab, setActiveTab] = useState("product-search"); // 기본 선택 탭
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, profile } = useSelector((state) => state.authSlice);

  const location = useLocation();
  // console.log(location.pathname);
  // console.log("어드민 유저 확인 : ", user);

  useEffect(() => {
    if (user?.loginId && !profile) {
      // console.log(
      //   "여기는 AdminLayOut 로그인한 유저는 있지만 Profile이 없음으로 API 호출 실행"
      // );
      dispatch(getUserProfileThunk(user.loginId));
    }
  }, [user, profile, dispatch]);

  const getActiveTabFromUrl = () => {
    const path = location.pathname;

    const pathMap = {
      "/admin/products": "product-search",
      "/admin/product/add": "product-add",
      "/admin/restock/noti": "restock-notification",
      "/admin/order/search": "order-history",
      "/admin/user/search": "user-search",
      "/admin/coupon/register": "coupon-register",
      "/admin/coupon/search": "coupon-search",
      "/admin/statistics": "sales-statistics",
    };

    return pathMap[path] || "product-search";
  };

  const activeTab = getActiveTabFromUrl();

  const handleTabClick = (tabId) => {
    // setActiveTab(tabId);
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleLogoutClick = () => {
    if (user.loginId) {
      if (window.confirm("로그아웃 하시겠습니까?")) {
        dispatch(logoutAsyncThunk());
        navigate("/");
        alert("로그아웃 되었습니다.");
      }
      return;
    }
  };

  return (
    <div className="flex flex-col h-screen">
      {/* 네비게이션 바 */}
      <nav className="flex justify-between items-center px-8 h-18 bg-[#22385F] text-white shadow-md">
        <div className="navbar-brand">
          <h1 className="text-xl font-semibold">MOISTURE VILLAGE</h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="navbar-user">{profile?.loginId} 관리자님</div>
          {user?.loginId ? (
            <>
              <button
                className="px-3 py-1 bg-[#8399C5] rounded text-white hover:bg-[#6A82B0] transition-colors duration-200"
                onClick={handleLogoutClick}
              >
                로그아웃
              </button>
            </>
          ) : (
            <button
              className="px-3 py-1 bg-blue-500  rounded hover:bg-blue-600 transition-colors duration-200"
              onClick={handleLoginClick}
            >
              로그인
            </button>
          )}
        </div>
      </nav>

      <div className="flex flex-1 overflow-hidden">
        {/* 사이드바 */}
        <AdminSideBar activeTab={activeTab} onTabClick={handleTabClick} />

        {/* 메인 콘텐츠 영역 */}
        <main className="flex-1 p-4 bg-white overflow-y-auto">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
