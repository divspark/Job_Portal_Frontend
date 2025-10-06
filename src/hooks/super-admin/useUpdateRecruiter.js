import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { updateRecruiter } from "../../api/super-admin/database";

export const useUpdateRecruiter = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => updateRecruiter({ id, data }),
    onSuccess: (data, variables) => {
      toast.success("Recruiter updated successfully!");

      // Invalidate and refetch recruiter details
      queryClient.invalidateQueries({
        queryKey: ["superAdmin-recruiter", variables.id],
      });

      // Invalidate and refetch recruiters list
      queryClient.invalidateQueries({
        queryKey: ["superAdmin-recruiters"],
      });
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message || "Failed to update recruiter"
      );
    },
  });
};
