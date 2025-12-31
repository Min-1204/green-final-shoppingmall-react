import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import Header from "../../layouts/mainpage/Header";

export default function HelpCenterPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      {/* 상단 타이틀 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-6">
        <h1 className="text-2xl font-bold text-gray-900">고객센터</h1>
        <p className="text-sm text-gray-400 mt-1">
          공지사항, 자주 묻는 질문, 1:1 문의를 확인하세요.
        </p>
      </div>

      {/* 본문 레이아웃 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 flex gap-10">
        {/* 왼쪽 메뉴 */}
        <aside className="w-56 shrink-0">
          <div className="flex flex-col gap-2">
            <NavLink
              to="/helpcenter"
              end
              className={({ isActive }) =>
                `text-left px-3 py-2 rounded ${
                  isActive ? "bg-black text-white" : "hover:bg-gray-100"
                }`
              }
            >
              공지사항
            </NavLink>
            <NavLink
              to="/helpcenter/faq"
              className={({ isActive }) =>
                `text-left px-3 py-2 rounded ${
                  isActive ? "bg-black text-white" : "hover:bg-gray-100"
                }`
              }
            >
              자주 묻는 질문
            </NavLink>
            <NavLink
              to="/helpcenter/inquiry"
              className={({ isActive }) =>
                `text-left px-3 py-2 rounded ${
                  isActive ? "bg-black text-white" : "hover:bg-gray-100"
                }`
              }
            >
              1:1 문의
            </NavLink>
          </div>

          {/* 고객센터 안내 박스 */}
          <div className="mt-8 bg-gray-100 border border-gray-200 rounded-md p-5">
            <p className="text-xs text-gray-400 mb-2">고객센터 이용안내</p>
            <p className="text-xl font-bold text-gray-900 mb-3">080-080-1510</p>
            <p className="text-xs text-gray-500 leading-relaxed">
              평일 10:00~17:00 <br />
              (점심 12:00~14:00) <br />
              주말/공휴일 휴무
            </p>
            <button className="mt-4 w-full border border-gray-300 text-xs py-1.5 rounded hover:bg-white cursor-pointer">
              고객 불만 처리절차
            </button>
          </div>
        </aside>

        {/* 오른쪽 컨텐츠 자리 */}
        <div className="flex-1">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
