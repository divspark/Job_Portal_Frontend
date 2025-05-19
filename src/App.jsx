import { Route, Routes } from "react-router-dom";
import RecruiterLayout from "./components/recruiter-view/layout";
import ProfileSetupLayout from "./components/recruiter-view/profile-setup-layout";
import JobOpenings from "./pages/recruiter-view/job-openings";
import Candidates from "./pages/recruiter-view/candidates";
import CandidateCreate from "./pages/recruiter-view/candidate-create";
import MatchesAndSubmission from "./pages/recruiter-view/matches-and-submission";
import BasicDetails from "./pages/recruiter-view/basic-details";
import KycVerification from "./pages/recruiter-view/kyc-verification";
import SectoralDetails from "./pages/recruiter-view/sectoral-details";
import QualificationDetails from "./pages/recruiter-view/qualification-details";
import useAuthStore from "./stores/useAuthStore";
import ScrollToTop from "./components/common/scrollToTop";
import Congratulation from "./pages/recruiter-view/congratulation";
import CheckAuth from "./components/common/checkAuth";
import CandidateReleventDetails from "./pages/recruiter-view/candidate-releventDetails";
import RecruiterLogin from "./pages/recruiter-view/log-in";
import CorporateLogIn from "./pages/corporate-view/log-in";
import RecruiterDashboard from "./pages/recruiter-view/dashboard";
import CorporateDashboard from "./pages/corporate-view/dashboard";

function App() {
  const token =
    localStorage.getItem("token") || sessionStorage.getItem("token");
  if (token) {
    useAuthStore.getState().setToken(token, !!localStorage.getItem("token"));
    useAuthStore.getState().setIsAuthenticated(true);
  }

  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <ScrollToTop />
      <Routes>
        <Route
          path="/recruiter/profile-setup"
          element={
            <CheckAuth allowedRoles={["recruiter"]}>
              <ProfileSetupLayout />
            </CheckAuth>
          }
        >
          <Route path="basic-details" element={<BasicDetails />} />
          <Route path="kyc-verification" element={<KycVerification />} />
          <Route path="congratulation" element={<Congratulation />} />
          <Route path="sectoral-details" element={<SectoralDetails />} />
          <Route
            path="qualification-details"
            element={<QualificationDetails />}
          />
        </Route>
        <Route
          path="/recruiter"
          element={
            <CheckAuth allowedRoles={["recruiter"]}>
              <RecruiterLayout />
            </CheckAuth>
          }
        >
          <Route path="dashboard" element={<RecruiterDashboard />} />
          <Route path="candidates" element={<Candidates />} />
          <Route
            path="candidates/candidate-create"
            element={<CandidateCreate />}
          />
          <Route
            path="candidates/relevent-details"
            element={<CandidateReleventDetails />}
          />

          <Route path="job-openings" element={<JobOpenings />} />
          <Route
            path="matches-and-submissions"
            element={<MatchesAndSubmission />}
          />
        </Route>
        <Route
          path="/recruiter/log-in"
          element={
            <CheckAuth allowedRoles={["recruiter"]}>
              <RecruiterLogin />
            </CheckAuth>
          }
        />
        <Route
          path="/corporate/log-in"
          element={
            <CheckAuth allowedRoles={["corporate"]}>
              <CorporateLogIn />
            </CheckAuth>
          }
        />
        <Route
          path="/corporate/dashboard"
          element={
            <CheckAuth allowedRoles={["corporate"]}>
              <CorporateDashboard />
            </CheckAuth>
          }
        />

        <Route
          path="/"
          element={
            <CheckAuth allowedRoles={["corporate"]}>
              <CorporateDashboard />
            </CheckAuth>
          }
        />
        <Route
          path="*"
          element={
            <CheckAuth allowedRoles={[""]}>
              <CorporateDashboard />
            </CheckAuth>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
