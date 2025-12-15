import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import NavBar from "../../layouts/mainpage/NavBar";
import ProductSearchBar from "../../components/search/ProductSearchBar";
import { useDispatch, useSelector } from "react-redux";
import { logoutAsyncThunk } from "../../redux/slices/features/user/authSlice";

export default function Header() {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.authSlice);

  const notices = [
    "[WELCOME] 공지/이벤트(미정)",
    "11월 신규가입 3,000P 지급 예정",
    "배송지연 지역 안내 (서울/경기 일부)",
  ];
  const [current, setCurrent] = useState(0);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(
      () => setCurrent((prev) => (prev + 1) % notices.length),
      3500
    );
    return () => clearInterval(timer);
  }, [notices.length]);

  const handleLogout = () => {
    if (window.confirm("로그아웃 하시겠습니까?")) {
      const response = dispatch(logoutAsyncThunk());
      alert("로그아웃 되었습니다.");
      console.log("로그아웃 핸들러 : ", response);
      navigate("/");
    }
  };

  return (
    <header className="w-full bg-white">
      {/* 1) 공지 바 */}
      <div className="w-full h-9 border-b border-gray-200 flex items-center">
        <div className="max-w-7xl mx-auto w-full px-6 flex items-center justify-center">
          <div className="flex items-center gap-2 notice-slide">
            <span className="w-2 h-2 rounded-full bg-[#b6423a] notice-blink" />
            <p className="text-xs text-gray-600 tracking-tight">
              {notices[current]}
            </p>
          </div>
        </div>
      </div>

      {/* 2) 브랜드 헤더 */}
      <div className="w-full">
        <div className="max-w-7xl mx-auto px-6 py-5 lg:py-6 relative flex items-center justify-center">
          {/* 가운데 로고 */}
          <div className="text-center leading-tight">
            <h1 className="text-black text-[30px] tracking-[0.32em] font-semibold">
              <Link to="/" className="cursor-pointer">
                SKPL
              </Link>
            </h1>
            <p className="text-[12px] text-black mt-1 tracking-[0.08em]">
              Skin Korea Pure Lab
            </p>
          </div>

          {/* 오른쪽 유틸 + 2차 메뉴 */}
          <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col items-end gap-1">
            {/* 위쪽: 로그인/회원가입/장바구니/... */}
            <div className="flex items-center gap-2.5 text-[12px] text-black">
              {isLoggedIn ? (
                <>
                  <button
                    onClick={handleLogout}
                    className="hover:text-gray-400 cursor-pointer transition-colors"
                  >
                    로그아웃
                  </button>
                  <span className="text-white/30">|</span>
                  {/* 회원가입 버튼 숨김 - 대신 마이페이지로 이동 */}
                  <button
                    onClick={() => navigate("/mypage")}
                    className="hover:text-gray-400 cursor-pointer transition-colors"
                  >
                    마이페이지
                  </button>
                </>
              ) : (
                <>
                  {/* 로그아웃 상태: 로그인/회원가입 버튼 */}
                  <button
                    onClick={() => navigate("/login")}
                    className="hover:text-gray-400 cursor-pointer transition-colors"
                  >
                    로그인
                  </button>
                  <span className="text-white/30">|</span>
                  <button
                    onClick={() => navigate("/signup")}
                    className="hover:text-gray-400 cursor-pointer transition-colors"
                  >
                    회원가입
                  </button>
                </>
              )}

              <span className="text-white/30">|</span>
              <button
                onClick={() => navigate("/cart")}
                className="hover:text-gray-400 cursor-pointer transition-colors"
              >
                장바구니
              </button>
              <span className="text-white/30">|</span>
              <button
                onClick={() => navigate("/helpcenter")}
                className="hover:text-gray-400 cursor-pointer transition-colors"
              >
                고객센터
              </button>
              <button onClick={() => navigate("/mypage")}>
                마이페이지(임시)
              </button>
            </div>

            {/* 아래쪽: 오특 | 랭킹 | 신상 | 이벤트 */}
            <div className="flex items-center gap-3 text-sm">
              <button className="text-black hover:text-orange-400 cursor-pointer transition-colors">
                오특
              </button>
              <span className="w-[1px] h-4 bg-white/15"></span>
              <button className="text-black hover:text-orange-400 cursor-pointer transition-colors">
                랭킹
              </button>
              <span className="w-[1px] h-4 bg-white/15"></span>
              <button className="text-black hover:text-orange-400 cursor-pointer transition-colors">
                신상
              </button>
              <span className="w-[1px] h-4 bg-white/15"></span>
              <button className="text-orange-600 font-medium cursor-pointer">
                이벤트
              </button>
            </div>
          </div>
        </div>
      </div>

      <ProductSearchBar />
      <NavBar />
    </header>
  );
}
