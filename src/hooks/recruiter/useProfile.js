import { useNavigate } from "react-router-dom";
import { kycDetails, sectoralDetails } from "../../api/recruiter/auth";
import { toast } from "sonner";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getUserDetails } from "../../api/recruiter/user";
import useAuthStore from "../../stores/useAuthStore";

export const useKycDetails = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: kycDetails,
    onSuccess: (data) => {
      toast.success(data.data.message);
      navigate("/recruiter/profile-setup/congratulation");
    },
    onError: (error) => {
      toast.error(error.response.data.message, {});
    },
  });
};
export const useSectoralDetails = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: sectoralDetails,
    onSuccess: (data, variables) => {
      toast.success(data.data.message);
      if (variables.sectorSpecialization) {
        navigate("/recruiter/profile-setup/qualification-details");
      } else {
        navigate("/recruiter/profile-setup/dashboard");
      }
    },
    onError: (error) => {
      toast.error(error.response.data.message, {});
    },
  });
};
export const useGetUserProfile = ({ enabled = true } = {}) => {
  const { token } = useAuthStore();
  const setUser = useAuthStore((state) => state.setUser);
  const setIsAuthenticated = useAuthStore((state) => state.setIsAuthenticated);
  const navigate = useNavigate();

  return useQuery({
    queryKey: ["user-profile", token],
    queryFn: ({ signal }) => getUserDetails({ signal }),
    enabled: enabled && !!token,
    select: (data) => {
      const newUser = data.data;
      setUser(newUser);
      setIsAuthenticated(true);
    },
    onError: (error) => {
      toast.error("Session expired. Please login again.");
      navigate("/recruiter/log-in");
    },
    staleTime: 5 * 60 * 1000,
    retry: false,
  });
};
