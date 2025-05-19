import { useNavigate } from "react-router-dom";
import useAuthStore from "../../stores/useAuthStore";
import { useMutation } from "@tanstack/react-query";
import { login, register } from "../../api/recruiter/auth";
import { toast } from "sonner";

export const useLogin = () => {
  const navigate = useNavigate();
  const { setUser, setToken, setIsAuthenticated } = useAuthStore();
  return useMutation({
    mutationFn: login,
    onSuccess: (data, variables) => {
      toast.success(data.data.message);
      setUser(data.data.data);
      setToken(data.data.data.token, variables.rememberme);
      setIsAuthenticated(true);
      navigate("/recruiter/dashboard");
    },
    onError: (error) => {
      toast.error(error.response.data.message, {});
    },
  });
};

export const useRegister = () => {
  const { setToken } = useAuthStore();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: register,
    onSuccess: (data) => {
      toast.success(data.data.message);
      setToken(data.data.data.token);
      navigate("/recruiter/profile-setup/kyc-verification");
    },
    onError: (error) => {
      toast.error(error.response.data.message, {});
    },
  });
};
