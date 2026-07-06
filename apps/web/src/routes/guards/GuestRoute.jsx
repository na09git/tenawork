import { Navigate } from "react-router-dom";
import { getToken } from "@/utils/token";

export default function GuestRoute({ children }) {
  const token = getToken();

  if (token) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}
