import { useSelector } from "react-redux";

export const useAuth = () => {
  const { user = null, isLoggedIn = false } = useSelector(
    (state) => state.authSlice || {}
  );

  const isAdmin = user?.userRole === "admin";

  return {
    currentUser: user,
    isAdmin,
    isLoggedIn,
  };
};
