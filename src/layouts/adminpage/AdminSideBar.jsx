import { Link } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// 컴포넌트 외부에서 Arrow Up/Down 아이콘을 위한 TailwindCSS 클래스명을 정의합니다.
const iconClass = "transform transition-transform duration-200";

const AdminSideBar = ({ activeTab, onTabClick }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // 어떤 메뉴 그룹이 펼쳐져 있는지 관리하는 상태
  const [expandedMenus, setExpandedMenus] = useState(["products"]);

  useEffect(() => {
    const menuTab = getMenuFromUrl();

    setExpandedMenus((prev) => {
      const filteredPrev = prev.filter((menu) => menu !== menuTab);
      const newMenus = [...filteredPrev, menuTab];
      console.log(newMenus);
      return newMenus;
    });
  }, [location]);

  const getMenuFromUrl = () => {
    const path = location.pathname;

    const pathMap = {
      "/admin/products": "products",
      "/admin/product/add": "products",
      "/admin/restock/noti": "products",
      "/admin/order/search": "transactions",
      "/admin/user/search": "user-management",
      "/admin/coupon/register": "coupon-management",
      "/admin/coupon/search": "coupon-management",
      "/admin/statistics": "statistics",
      "/admin/posts/faq": "post-management",
      "/admin/posts/inquiry": "post-management",
    };
    return pathMap[path] || "products";
  };

  // 메뉴 그룹의 펼침/접힘을 토글하는 함수
  const toggleMenu = (menuTab) => {
    setExpandedMenus(
      (prev) =>
        prev.includes(menuTab)
          ? prev.filter((id) => id !== menuTab) // 이미 펼쳐져 있으면 제거 (접기)
          : [...prev, menuTab] // 없으면 추가 (펼치기)
    );
  };

  // 특정 메뉴 그룹이 현재 펼쳐져 있는지 확인
  const isMenuExpanded = (menuTab) => expandedMenus.includes(menuTab);

  // 서브 아이템 클릭 핸들러
  const handleSubItemClick = (e, itemId, path) => {
    // e.preventDefault();
    onTabClick(itemId);
    // 실제 라우팅 처리 (선택사항): navigate(href);
    if (path) {
      navigate(path);
    }
  };

  // 메인 메뉴 스타일링을 위한 기본 클래스
  const baseMainMenuClass =
    "flex items-center justify-between px-6 py-3 cursor-pointer transition-colors duration-200 text-gray-100 hover:bg-[#1e3358]";
  // 서브 메뉴 스타일링을 위한 기본 클래스
  const baseSubMenuClass =
    "block w-full text-left py-2 px-10 text-sm transition-colors duration-200 text-gray-200 hover:bg-[#1a2d4d]";
  // 활성화된 서브 메뉴 클래스
  const activeSubMenuClass = "bg-[#3d5a80] text-white font-medium";

  return (
    <aside className="w-48 bg-[#2A4474] text-white overflow-y-auto min-h-screen">
      <nav className="sidebar-nav">
        <ul className="py-2">
          {/* === 1. 상품 관리 (products) === */}
          <li className="border-l-4 border-transparent">
            <div
              className={`${baseMainMenuClass}  `}
              onClick={() => toggleMenu("products")}
            >
              <div className="flex items-center">상품 관리</div>
              <span
                className={`${iconClass} ${
                  isMenuExpanded("products") ? "rotate-180" : ""
                }`}
              >
                ▲
              </span>
            </div>

            {isMenuExpanded("products") && (
              <ul className="bg-[#22385F]  ">
                <li>
                  <button
                    className={`${baseSubMenuClass} ${
                      activeTab === "product-search" ? activeSubMenuClass : ""
                    }`}
                    onClick={(e) =>
                      handleSubItemClick(e, "product-search", "/admin/products")
                    }
                  >
                    상품조회
                  </button>
                </li>
                <li>
                  <button
                    className={`${baseSubMenuClass} ${
                      activeTab === "product-add" ? activeSubMenuClass : ""
                    }`}
                    onClick={(e) =>
                      handleSubItemClick(e, "product-add", "/admin/product/add")
                    }
                  >
                    상품등록
                  </button>
                </li>
                {/* <li>
                  <button
                    className={`${baseSubMenuClass} ${
                      activeTab === "restock-notification"
                        ? activeSubMenuClass
                        : ""
                    }`}
                    onClick={(e) =>
                      handleSubItemClick(
                        e,
                        "restock-notification",
                        "/admin/restock/noti"
                      )
                    }
                  >
                    재입고 알림
                  </button>
                </li> */}
              </ul>
            )}
          </li>

          {/* === 2. 거래내역 관리 (transactions) === */}
          <li className="border-l-4 border-transparent">
            <div
              className={`${baseMainMenuClass}  `}
              onClick={() => toggleMenu("transactions")}
            >
              <div className="flex items-center">거래내역 관리</div>
              <span
                className={`${iconClass} ${
                  isMenuExpanded("transactions") ? "rotate-180" : ""
                }`}
              >
                ▲
              </span>
            </div>
            {isMenuExpanded("transactions") && (
              <ul className="bg-[#22385F]  ">
                <li>
                  <button
                    className={`${baseSubMenuClass} ${
                      activeTab === "order-history" ? activeSubMenuClass : ""
                    }`}
                    onClick={(e) =>
                      handleSubItemClick(
                        e,
                        "order-history",
                        "/admin/order/search"
                      )
                    }
                  >
                    주문내역 조회
                  </button>
                </li>
              </ul>
            )}
          </li>

          {/* === 3. 회원 관리 (user-management) === */}
          <li className="border-l-4 border-transparent">
            <div
              className={`${baseMainMenuClass}  `}
              onClick={() => toggleMenu("user-management")}
            >
              <div className="flex items-center">회원 관리</div>
              <span
                className={`${iconClass} ${
                  isMenuExpanded("user-management") ? "rotate-180" : ""
                }`}
              >
                ▲
              </span>
            </div>
            {isMenuExpanded("user-management") && (
              <ul className="bg-[#22385F]  ">
                <li>
                  <button
                    className={`${baseSubMenuClass} ${
                      activeTab === "user-search" ? activeSubMenuClass : ""
                    }`}
                    onClick={(e) =>
                      handleSubItemClick(e, "user-search", "/admin/user/search")
                    }
                  >
                    회원 조회
                  </button>
                </li>
              </ul>
            )}
          </li>

          {/* === 4. 쿠폰 관리 (coupon-management) === */}
          <li className="border-l-4 border-transparent">
            <div
              className={`${baseMainMenuClass}  `}
              onClick={() => toggleMenu("coupon-management")}
            >
              <div className="flex items-center">쿠폰 관리</div>
              <span
                className={`${iconClass} ${
                  isMenuExpanded("coupon-management") ? "rotate-180" : ""
                }`}
              >
                ▲
              </span>
            </div>
            {isMenuExpanded("coupon-management") && (
              <ul className="bg-[#22385F]  ">
                <li>
                  <button
                    className={`${baseSubMenuClass} ${
                      activeTab === "coupon-search" ? activeSubMenuClass : ""
                    }`}
                    onClick={(e) =>
                      handleSubItemClick(
                        e,
                        "coupon-search",
                        "/admin/coupon/search"
                      )
                    }
                  >
                    쿠폰 조회
                  </button>
                </li>
                <li>
                  <button
                    className={`${baseSubMenuClass} ${
                      activeTab === "coupon-register" ? activeSubMenuClass : ""
                    }`}
                    onClick={(e) =>
                      handleSubItemClick(
                        e,
                        "coupon-register",
                        "/admin/coupon/register"
                      )
                    }
                  >
                    쿠폰 등록
                  </button>
                </li>
              </ul>
            )}
          </li>

          {/* === 5. 게시글 관리 (post-management) === */}
          <li className="border-l-4 border-transparent">
            <div
              className={`${baseMainMenuClass}`}
              onClick={() => toggleMenu("post-management")}
            >
              <div className="flex items-center">게시글 관리</div>
              <span
                className={`${iconClass} ${
                  isMenuExpanded("post-management") ? "rotate-180" : ""
                }`}
              >
                ▲
              </span>
            </div>
            {isMenuExpanded("post-management") && (
              <ul className="bg-[#22385F]">
                <li>
                  <button
                    className={`${baseSubMenuClass} ${
                      activeTab === "faq-management" ? activeSubMenuClass : ""
                    }`}
                    onClick={(e) =>
                      handleSubItemClick(
                        e,
                        "faq-management",
                        "/admin/posts/faq"
                      )
                    }
                  >
                    자주 묻는 질문
                  </button>
                </li>
                <li>
                  <button
                    className={`${baseSubMenuClass} ${
                      activeTab === "inquiry-management"
                        ? activeSubMenuClass
                        : ""
                    }`}
                    onClick={(e) =>
                      handleSubItemClick(
                        e,
                        "inquiry-management",
                        "/admin/posts/inquiry"
                      )
                    }
                  >
                    1:1 문의 내역
                  </button>
                </li>
              </ul>
            )}
          </li>

          {/* === 5. 통계 (statistics) === */}
          {/* <li className="border-l-4 border-transparent">
            <div
              className={`${baseMainMenuClass}  `}
              onClick={() => toggleMenu("statistics")}
            >
              <div className="flex items-center">통계</div>
              <span
                className={`${iconClass} ${
                  isMenuExpanded("statistics") ? "rotate-180" : ""
                }`}
              >
                ▲
              </span>
            </div>
            {isMenuExpanded("statistics") && (
              <ul className="bg-[#22385F]  ">
                <li>
                  <button
                    className={`${baseSubMenuClass} ${
                      activeTab === "sales-statistics" ? activeSubMenuClass : ""
                    }`}
                    onClick={(e) =>
                      handleSubItemClick(
                        e,
                        "sales-statistics",
                        "/admin/statistics"
                      )
                    }
                  >
                    판매 통계
                  </button>
                </li>
              </ul>
            )}
          </li> */}
        </ul>
      </nav>
    </aside>
  );
};

export default AdminSideBar;
