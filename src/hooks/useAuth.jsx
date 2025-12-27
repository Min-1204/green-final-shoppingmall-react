import { useSelector } from "react-redux";

// prettier-ignore
// useCustomHook
export const useAuth = () => {
  const { user , isLoggedIn } = useSelector((state) => state.authSlice || {});
  // 유저와 로그인상태를 불러옴
  console.log("useAuth 확인: " ,user);

  const isAdmin = user?.userRole === "ADMIN";
  // user의 userRole이 admin과 같다면 isAdmin 변수에 저장

  // 반환하는 건 user 정보와 isAdmin (권한) , 로그인상태를 반환한다.
  return { user, isAdmin, isLoggedIn };
};
