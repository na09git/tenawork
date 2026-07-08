import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PublicLayout from "@/layouts/PublicLayout";
import AuthLayout from "@/layouts/AuthLayout";
import DashboardLayout from "@/layouts/DashboardLayout";
import ProtectedRoute from "@/routes/guards/ProtectedRoute";
import GuestRoute from "@/routes/guards/GuestRoute";
import RoleRoute from "@/routes/guards/RoleRoute";
import LoadingScreen from "@/components/common/LoadingScreen";

const Home = lazy(() => import("@/pages/public/Home"));
const LoginPage = lazy(() => import("@/pages/auth/LoginPage"));
const RegisterPage = lazy(() => import("@/pages/auth/RegisterPage"));
const ForgotPasswordPage = lazy(() => import("@/pages/auth/ForgotPasswordPage"));
const ProfessionalDashboardPage = lazy(
  () => import("@/pages/professional/DashboardPage"),
);
const PreferencesWizardPage = lazy(
  () => import("@/pages/professional/PreferencesWizardPage"),
);
const MatchResultsPage = lazy(
  () => import("@/pages/professional/MatchResultsPage"),
);
const JobDetailPage = lazy(
  () => import("@/pages/professional/JobDetailPage"),
);
const EmployerDashboardPage = lazy(
  () => import("@/pages/employer/DashboardPage"),
);
const JobPostWizardPage = lazy(
  () => import("@/pages/employer/JobPostWizardPage"),
);
const CandidateResultsPage = lazy(
  () => import("@/pages/employer/CandidateResultsPage"),
);
const CandidateDetailPage = lazy(
  () => import("@/pages/employer/CandidateDetailPage"),
);
const MyApplicationsPage = lazy(
  () => import("@/pages/professional/MyApplicationsPage"),
);
const ContactedCandidatesPage = lazy(
  () => import("@/pages/employer/ContactedCandidatesPage"),
);
const AdminDashboardPage = lazy(() => import("@/pages/admin/DashboardPage"));
const NotFoundPage = lazy(() => import("@/pages/NotFoundPage"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicLayout />,
    children: [
      { index: true, element: <Home /> },
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
          { path: "forgot-password", element: <ForgotPasswordPage /> },
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
          { index: true, element: <ProfessionalDashboardPage /> }, // Note: We might want a router here later to direct based on role
          {
            path: "professional",
            element: (
              <RoleRoute allowedRoles={["EMPLOYEE"]}>
                <ProfessionalDashboardPage />
              </RoleRoute>
            ),
          },
          {
            path: "professional/preferences",
            element: (
              <RoleRoute allowedRoles={["EMPLOYEE"]}>
                <PreferencesWizardPage />
              </RoleRoute>
            ),
          },
          {
            path: "jobs/:id",
            element: (
              <RoleRoute allowedRoles={["EMPLOYEE"]}>
                <JobDetailPage />
              </RoleRoute>
            ),
          },
          {
            path: "professional/matches",
            element: (
              <RoleRoute allowedRoles={["EMPLOYEE"]}>
                <MatchResultsPage />
              </RoleRoute>
            ),
          },
          {
            path: "employer",
            element: (
              <RoleRoute allowedRoles={["EMPLOYER"]}>
                <EmployerDashboardPage />
              </RoleRoute>
            ),
          },
          {
            path: "employer/post-job",
            element: (
              <RoleRoute allowedRoles={["EMPLOYER"]}>
                <JobPostWizardPage />
              </RoleRoute>
            ),
          },
          {
            path: "employer/matches",
            element: (
              <RoleRoute allowedRoles={["EMPLOYER"]}>
                <CandidateResultsPage />
              </RoleRoute>
            ),
          },
          {
            path: "candidates/:id",
            element: (
              <RoleRoute allowedRoles={["EMPLOYER"]}>
                <CandidateDetailPage />
              </RoleRoute>
            ),
          },
          {
            path: "professional/applications",
            element: (
              <RoleRoute allowedRoles={["EMPLOYEE"]}>
                <MyApplicationsPage />
              </RoleRoute>
            ),
          },
          {
            path: "employer/contacts",
            element: (
              <RoleRoute allowedRoles={["EMPLOYER"]}>
                <ContactedCandidatesPage />
              </RoleRoute>
            ),
          },
          {
            path: "admin",
            element: (
              <RoleRoute allowedRoles={["ADMIN"]}>
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
