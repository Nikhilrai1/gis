import { RouterProvider } from "react-router-dom";
import { useVerifyTokenMutation } from "./redux/features/auth/authApi";
import { useEffect } from "react";
import router from "./routes/router";
import { useAppDispatch } from "./redux/store";
import { initGisFileData } from "./redux/features/gis-data/gisDataSlice";



const App = () => {
  const pathname = window.location.pathname;
  const dispatch = useAppDispatch()
  const [verifyToken] = useVerifyTokenMutation();


  useEffect(() => {
    const authToken = localStorage.getItem("gis_auth_token") || "";
    const selectedGisFile = localStorage.getItem("selected_gis_file") || "";

    const verifyUserToken = async () => {
      await verifyToken({ token: authToken }).unwrap().then(() => {
        // Add gisfile which is selected in previous session
        dispatch(initGisFileData(JSON.parse(selectedGisFile)))
      })
    };

    if (pathname !== "/login") {
      verifyUserToken();
    }
  }, [ pathname]);


  return <RouterProvider router={router} />;
};

export default App;
