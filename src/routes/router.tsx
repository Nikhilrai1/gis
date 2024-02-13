import Login from "@/pages/auth/Login";
import Signup from "@/pages/auth/Signup";
import NotFound from "@/pages/error/NotFound";
import Landing from "@/pages/landing/Landing";
import { ProtectedRoute } from "@/utils/ProtectedRoute";
import { createBrowserRouter } from "react-router-dom";
import ChildRoutes from "./ChildRoutes";


const router = createBrowserRouter([
  {
    path: "/",
    element: (
     <ProtectedRoute>
        <h1>auth</h1>
     </ProtectedRoute>
    ),
    errorElement: <NotFound />,
    children: ChildRoutes,
  },
  {
    path: "/home",
    element: <Landing />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
]);

export default router;
