import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getAllTrainers,
  getTrainerById,
  createTrainer,
  updateTrainer,
  deleteTrainer,
} from "../../api/super-admin/training";
import { toast } from "sonner";

export const useGetAllTrainers = () => {
  return useQuery({
    queryKey: ["superAdmin-trainers"],
    queryFn: () => getAllTrainers(),
    keepPreviousData: true,
  });
};

export const useGetTrainerById = (id, { enabled = true } = {}) => {
  return useQuery({
    queryKey: ["superAdmin-trainer", id],
    queryFn: ({ signal }) => getTrainerById({ signal, id }),
    enabled: enabled && !!id,
  });
};

export const useCreateTrainer = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createTrainer,
    onSuccess: () => {
      toast.success("Trainer created successfully");
      queryClient.invalidateQueries({ queryKey: ["superAdmin-trainers"] });
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to create trainer");
    },
  });
};

export const useUpdateTrainer = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateTrainer,
    onSuccess: (data, variables) => {
      toast.success("Trainer updated successfully");
      queryClient.invalidateQueries({ queryKey: ["superAdmin-trainers"] });
      queryClient.invalidateQueries({
        queryKey: ["superAdmin-trainer", variables.id],
      });
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to update trainer");
    },
  });
};

export const useDeleteTrainer = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteTrainer,
    onSuccess: () => {
      toast.success("Trainer deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["superAdmin-trainers"] });
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to delete trainer");
    },
  });
};
