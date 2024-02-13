import { RouterProvider } from "react-router-dom";
import { useVerifyTokenMutation } from "./redux/features/auth/authApi";
import { useEffect } from "react";
import router from "./routes/router";



const App = () => {
  const pathname = window.location.pathname;
  const [verifyToken] = useVerifyTokenMutation();

  useEffect(() => {
    const authToken = localStorage.getItem("ha_auth_token") || "";

    const verifyUserToken = async () => {
      await verifyToken({ token: authToken });
    };

    if (pathname !== "/login") {
      verifyUserToken();
    }
  }, [verifyToken, pathname]);

  return <RouterProvider router={router} />;
};

export default App;
