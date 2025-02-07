import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import Loading from "../Loading";

interface ProtectedRouteProps {
  permission?: string; // e.g. 'read:products' or 'admin'
  children: ReactNode;
}

export const ProtectedRoute = ({
  permission,
  children,
}: ProtectedRouteProps) => {
  const { isAuthenticated, user, isLoading } = useAuth0();
  const navigate = useNavigate();

  if (isLoading) {
    return <Loading />;
  }

  if (!isAuthenticated || !user) {
    navigate("/");
  }

  // Get permissions from app_metadata or default to empty array
  const claims: string = user!.user_claims;
  const permissions = claims ? claims.split(" ") : [];

  // Check access
  const hasAccess = permission
    ? permissions.includes("admin") || permissions.includes(permission)
    : true; // If no permission specified, just require authentication

  if (!hasAccess) {
    navigate("/unauthorized");
  }

  return <>{children}</>;
};
