import { useEffect } from "react";
import "./App.css";
import root from "./router/root";
import { RouterProvider } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUserThunk } from "./redux/slices/features/user/authSlice";

function App() {
  const dispatch = useDispatch();
  const { isLoggedId, user } = useSelector((state) => state.authSlice);

  useEffect(() => {
    if (!isLoggedId && !user) {
      console.log("로그인 정보가 없어 초기 인증을 시도합니다");
      dispatch(getCurrentUserThunk());
    }
  }, [dispatch]);

  return <RouterProvider router={root} />;
}

export default App;
