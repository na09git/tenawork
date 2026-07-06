import { Navigate } from "react-router-dom";
import { getUser } from "@/utils/token";

export default function RoleRoute({ children, allowedRoles }) {
  const user = getUser();
  const role = user?.role;

  if (!role || !allowedRoles.includes(role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}
