import {
  getApplicantsById,
  updateStatusOfApplicant,
} from "@/api/corporate/applicant";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

export const useGetApplicantById = (id) => {
  return useQuery({
    queryKey: ["applicant", id],
    queryFn: ({ signal }) => getApplicantsById({ id, signal }),
    enabled: !!id,
    retry: false,
  });
};

export const useUpdateStatusOfApplicant = (applicationId, data) => {
  return useMutation({
    mutationFn: () => updateStatusOfApplicant({ applicationId, data }),
    onSuccess: () => {
      // Invalidate and refetch
      toast.success("Applicant status updated successfully");
    },
    onError: (error) => {
      console.error("Error updating applicant status:", error);
    },
  });
};
