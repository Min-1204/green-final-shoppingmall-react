import React, { memo, useState } from "react";
import CategoryMegaMenu from "../../components/category/CategoryMegaMenu";
import { useNavigate } from "react-router-dom";

const NavBar = memo(() => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const menus = [
    "TitleName",
    "TitleName",
    "TitleName",
    "TitleName",
    "TitleName",
    "TitleName",
    "TitleName",
    "TitleName",
  ];

  return (
    <nav className="bg-[#111111]" onMouseLeave={() => setOpen(false)}>
      <div className="max-w-7xl mx-auto h-12 flex items-center px-13 gap-8">
        {/* ☰ 카테고리 */}
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          className="flex items-center gap-2 text-white font-semibold whitespace-nowrap transition-colors hover:text-white/80 cursor-pointer"
        >
          <span className="flex flex-col gap-[3px]">
            <span className="w-5 h-[2px] bg-white rounded transition-transform duration-300" />
            <span className="w-5 h-[2px] bg-white rounded transition-opacity duration-300" />
            <span className="w-5 h-[2px] bg-white rounded transition-transform duration-300" />
          </span>
          <span>카테고리</span>
        </button>

        {/* 메뉴 목록 */}
        <ul className="flex items-center gap-7 text-[13px]">
          {menus.map((menu, idx) => (
            <li key={idx} className="shrink-0">
              <button
                className="inline-flex items-center gap-1 text-white/85 hover:text-white whitespace-nowrap transition-colors cursor-default"
                aria-disabled
              >
                <span className="text-white text-[14px]">{menu}</span>
                <span className="text-white/40 text-[14px]">(미정)</span>
              </button>
            </li>
          ))}
        </ul>

        <div className="ml-auto" />
      </div>

      {/* 열림/닫힘 애니메이션 */}
      <div className={open ? "block" : "hidden"}>
        <CategoryMegaMenu isOpen={open} setOpen={setOpen} />
      </div>
    </nav>
  );
});

export default NavBar;
