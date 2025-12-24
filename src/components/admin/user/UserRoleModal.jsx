import React from "react";

const UserRoleModal = ({ isOpen, onClose, user, onConfirm }) => {
  if (!isOpen || !user) return null;

  const usrRole = ["USER", "MANAGER", "ADMIN"];

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-[320px] p-5 shadow-lg">
        <h2 className="text-lg font-semibold mb-4">권한 변경</h2>

        <div className="mb-4 text-sm text-gray-700">
          <p>
            아이디: <span className="font-medium">{user.loginId}</span>
          </p>
          <p>
            현재 권한: <span className="font-medium">{user.userRole}</span>
          </p>
        </div>

        <div className="flex flex-col gap-2">
          {usrRole.map((role) => (
            <button
              key={role}
              onClick={() => onConfirm(user, role)}
              className={`border border-gray-300 rounded-md py-2 text-sm transition cursor-pointer
                ${
                  user.userRole === role
                    ? "bg-indigo-200 cursor-not-allowed"
                    : "hover:bg-indigo-50 hover:border-indigo-300"
                }
              `}
              disabled={user.userRole === role}
            >
              {role}
            </button>
          ))}
        </div>

        <button
          onClick={onClose}
          className="mt-4 w-full text-sm text-gray-500 hover:underline"
        >
          취소
        </button>
      </div>
    </div>
  );
};

export default UserRoleModal;
