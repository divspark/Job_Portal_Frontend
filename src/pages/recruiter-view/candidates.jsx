import React from "react";
import CandidateProfile from "../../components/recruiter-view/candidates";
import { useGetAllApplicant } from "../../hooks/recruiter/useApplicant";

const Candidates = () => {
  const { data: applicants, isLoading, isError, error } = useGetAllApplicant();

  return (
    <div className="lg:pt-[80px] w-full">
      <CandidateProfile applicants={applicants} />
    </div>
  );
};

export default Candidates;
