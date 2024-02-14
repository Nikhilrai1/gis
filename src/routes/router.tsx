import Login from "@/pages/auth/Login";
import Signup from "@/pages/auth/Signup";
import NotFound from "@/pages/error/NotFound";
import Landing from "@/pages/landing/Landing";
import { createBrowserRouter } from "react-router-dom";
import ChildRoutes from "./ChildRoutes";
import { ProtectedRoute } from "@/lib/ProtectedRoute";
import MainLayout from "@/components/layout/MainLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
     <ProtectedRoute>
      <MainLayout />
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
