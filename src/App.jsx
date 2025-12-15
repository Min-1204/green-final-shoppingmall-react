import { useEffect } from "react";
import "./App.css";
import root from "./router/root";
import { RouterProvider } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getCurrentUserThunk } from "./redux/slices/features/user/authSlice";

function App() {
  const dispatch = useDispatch();

  // ⭐️ Local Storage에서 로그인 정보 복구하는 기능입니다.
  useEffect(() => {
    dispatch(getCurrentUserThunk());
  }, [dispatch]);
  return <RouterProvider router={root} />;
}

export default App;
