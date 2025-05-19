import { useMutation, useQuery } from "@tanstack/react-query";
import {
  createJobSeeker,
  getAllApplicantDetails,
} from "../../api/recruiter/applicant";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const useGetAllApplicant = () => {
  return useQuery({
    queryKey: ["applicants"],
    queryFn: ({ signal }) => getAllApplicantDetails({ signal }),
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
    retry: 2,
    refetchOnWindowFocus: false,
  });
};
export const useCreateApplicant = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: createJobSeeker,
    onSuccess: (data, variables) => {
      toast.success(data.data.message);
      if (variables.name) {
        navigate("/recruiter/candidates/relevent-details");
      } else {
        navigate("/recruiter/candidates");
      }
    },
    onError: (error) => {
      toast.error(error.response.data.message, {});
    },
  });
};
