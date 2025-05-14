import { useMutation, useQuery } from "@tanstack/react-query";
import {
  createJobSeeker,
  getAllApplicantDetails,
} from "../api/recruiter/applicant";
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
    onSuccess: (data) => {
      toast.success(data.data.message);
      navigate("/recruiter/candidates/relevent-details");
    },
    onError: (error) => {
      toast.error(error.response.data.message, {});
    },
  });
};
