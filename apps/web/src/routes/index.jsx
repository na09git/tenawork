import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PublicLayout from "@/layouts/PublicLayout";
import AuthLayout from "@/layouts/AuthLayout";
import DashboardLayout from "@/layouts/DashboardLayout";
import ProtectedRoute from "@/routes/guards/ProtectedRoute";
import GuestRoute from "@/routes/guards/GuestRoute";
import RoleRoute from "@/routes/guards/RoleRoute";
import LoadingScreen from "@/components/common/LoadingScreen";

const HomePage = lazy(() => import("@/pages/HomePage"));
const LoginPage = lazy(() => import("@/pages/auth/LoginPage"));
const RegisterPage = lazy(() => import("@/pages/auth/RegisterPage"));
const ProfessionalDashboardPage = lazy(
  () => import("@/pages/professional/DashboardPage"),
);
const EmployerDashboardPage = lazy(
  () => import("@/pages/employer/DashboardPage"),
);
const AdminDashboardPage = lazy(() => import("@/pages/admin/DashboardPage"));
const NotFoundPage = lazy(() => import("@/pages/NotFoundPage"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicLayout />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "auth",
        element: (
          <GuestRoute>
            <AuthLayout />
          </GuestRoute>
        ),
        children: [
          { path: "login", element: <LoginPage /> },
          { path: "register", element: <RegisterPage /> },
        ],
      },
      {
        path: "dashboard",
        element: (
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        ),
        children: [
          { index: true, element: <HomePage /> },
          {
            path: "professional",
            element: (
              <RoleRoute allowedRoles={["Professional"]}>
                <ProfessionalDashboardPage />
              </RoleRoute>
            ),
          },
          {
            path: "employer",
            element: (
              <RoleRoute allowedRoles={["Employer"]}>
                <EmployerDashboardPage />
              </RoleRoute>
            ),
          },
          {
            path: "admin",
            element: (
              <RoleRoute allowedRoles={["Admin"]}>
                <AdminDashboardPage />
              </RoleRoute>
            ),
          },
        ],
      },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);

export default function AppRouter() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <RouterProvider router={router} />
    </Suspense>
  );
}
