import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useGetUserProfile } from "../../hooks/useProfile";
import useAuthStore from "../../stores/useAuthStore";

const CheckAuth = ({ allowedRoles = [], children }) => {
  const location = useLocation();
  const { isAuthenticated, user } = useAuthStore();
  const shouldFetchProfile = !user; // Only fetch if authenticated and no user data
  const { isLoading } = useGetUserProfile({ enabled: shouldFetchProfile });

  const isLoginOrRegisterRoute =
    location.pathname.includes("/log-in") ||
    location.pathname.includes("/basic-details");
  if (isLoading && shouldFetchProfile) return <div>Loading...</div>;

  // Redirect logged-in users away from login/register pages
  if (isAuthenticated && isLoginOrRegisterRoute) {
    return <Navigate to={`/${user?.role}/dashboard`} replace />;
  }

  // If not authenticated and trying to access protected routes
  if (!isAuthenticated && !isLoginOrRegisterRoute) {
    return (
      <Navigate
        to={`/${allowedRoles[0]}/log-in`}
        replace
        state={{ from: location }}
      />
    );
  }

  // If user is authenticated but does not have access to this route
  if (
    isAuthenticated &&
    allowedRoles.length > 0 &&
    !allowedRoles.includes(user?.role)
  ) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
};

export default CheckAuth;
