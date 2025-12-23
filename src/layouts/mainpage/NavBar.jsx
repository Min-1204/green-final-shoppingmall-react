import React, { memo, useState } from "react";
import CategoryMegaMenu from "../../components/category/CategoryMegaMenu";
import { useNavigate } from "react-router-dom";

const NavBar = memo(() => {
  const [open, setOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const navigate = useNavigate();

  const menus = [
    { name: "스킨케어", url: "/products?categoryDepth=1&categoryId=1" },
    { name: "마스크팩", url: "/products?categoryDepth=1&categoryId=2" },
    { name: "클렌징", url: "/products?categoryDepth=1&categoryId=3" },
    { name: "선케어", url: "/products?categoryDepth=1&categoryId=4" },
    { name: "메이크업", url: "/products?categoryDepth=1&categoryId=5" },
  ];

  // 스크롤 이벤트 리스너
  React.useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`bg-[#ffffff] transition-all duration-300 ${
        isSticky ? "fixed top-0 left-0 right-0 z-50 shadow-lg" : "relative"
      }`}
    >
      <div className="max-w-7xl mx-auto h-12 flex items-center px-13 gap-15">
        {/* ☰ 카테고리 */}
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          className="flex items-center gap-2 text-gray-700 font-semibold whitespace-nowrap transition-colors cursor-pointer"
        >
          <span className="flex flex-col gap-[3px]">
            <span className="w-5 h-[2px] bg-gray-700 rounded transition-transform duration-300" />
            <span className="w-5 h-[2px] bg-gray-700 rounded transition-opacity duration-300" />
            <span className="w-5 h-[2px] bg-gray-700 rounded transition-transform duration-300" />
          </span>
          <span>카테고리</span>
        </button>

        {/* 메뉴 목록 */}
        <ul className="flex items-center gap-15 text-[13px]">
          {menus.map((menu, idx) => (
            <li key={idx} className="shrink-0">
              <button
                onClick={() => navigate(menu.url)}
                className="inline-flex items-center gap-1 text-gray-700 hover:text-white whitespace-nowrap transition-colors cursor-pointer"
                aria-disabled
              >
                <span className="text-gray-700 text-[14px]">{menu.name}</span>
              </button>
            </li>
          ))}
        </ul>

        <div className="ml-auto" />
      </div>

      {/* 열림/닫힘 애니메이션 */}
      {open && <CategoryMegaMenu isOpen={open} setOpen={setOpen} />}
    </nav>
  );
});

export default NavBar;
