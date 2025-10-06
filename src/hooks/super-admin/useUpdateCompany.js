import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { updateCompany } from "../../api/super-admin/database";

export const useUpdateCompany = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => updateCompany({ id, data }),
    onSuccess: (data, variables) => {
      toast.success("Company updated successfully!");

      // Invalidate and refetch company details
      queryClient.invalidateQueries({
        queryKey: ["superAdmin-company", variables.id],
      });

      // Invalidate and refetch companies list
      queryClient.invalidateQueries({
        queryKey: ["superAdmin-companies"],
      });
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to update company");
    },
  });
};
