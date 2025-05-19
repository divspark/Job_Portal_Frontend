import { Navigate, useLocation } from "react-router-dom";
import useAuthStore from "../../stores/useAuthStore";
import { useGetUserProfile as useGetRecruiterUserProfile } from "../../hooks/recruiter/useProfile";

const CheckAuth = ({ allowedRoles = [], fetchProfileHook, children }) => {
  const location = useLocation();
  const { isAuthenticated, user } = useAuthStore();
  const shouldFetchProfile = !user; // Only fetch if authenticated and no user data
  const role = user?.role || allowedRoles[0]; // fallback to allowedRole during first render

  // ✅ Always call both hooks
  const recruiterProfile = useGetRecruiterUserProfile({
    enabled: !user && role === "recruiter",
  });
  // const corporateProfile = useGetCorporateUserProfile({
  //   enabled: !user && role === "corporate",
  // });

  // ✅ Use only the relevant hook result
  const isLoading = recruiterProfile.isLoading;
  const isLoginOrRegisterRoute =
    location.pathname.includes("/log-in") ||
    location.pathname.includes("/basic-details");

  if (isLoading && shouldFetchProfile) return <div>Loading...</div>;
  // If user is at root route "/"
  if (location.pathname === "/") {
    if (isAuthenticated) {
      // Redirect to user's role-based dashboard
      return <Navigate to={`/${user?.role}/dashboard`} replace />;
    } else {
      // Default unauthenticated to recruiter login for now
      return <Navigate to="/recruiter/log-in" replace />;
    }
  }
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
