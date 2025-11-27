import React from "react";
import { useDispatch } from "react-redux";
import { useAuth } from "../../hooks/useAuth";
import { updateUserRole } from "../../redux/slices/features/user/authSlice";

export default function DevToolTest() {
  const dispatch = useDispatch();
  const { user } = useAuth();
  console.log("여기는 DevToolTest 확인 : ", user);

  return (
    <div>
      {/* 개발자 테스트 UI 이후 서버와 연결 후에는 권한 확인을 서버에서 데이터를 받아서 확인할 예정~ */}
      {user && (
        <div className="mb-6 p-4 bg-yellow-100 border border-yellow-300 rounded-xl shadow-inner">
          <p className="text-sm text-yellow-900 font-semibold mb-3">
            개발자 테스트 | 현재 권한: {user.userRole || "user"}
          </p>
          <div className="flex gap-3">
            <button
              onClick={() => {
                dispatch(updateUserRole({ userRole: "admin" }));
              }}
              className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              관리자로 전환
            </button>
            <button
              onClick={() => {
                dispatch(updateUserRole({ userRole: "user" }));
              }}
              className="px-4 py-2 text-sm bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
            >
              일반회원으로 전환
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
