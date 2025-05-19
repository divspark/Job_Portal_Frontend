import { useNavigate } from "react-router-dom";
import { login } from "../../api/corporate/auth";
import useAuthStore from "../../stores/useAuthStore";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useLogin = () => {
  const navigate = useNavigate();
  const { setUser, setToken, setIsAuthenticated } = useAuthStore();
  return useMutation({
    mutationFn: login,
    onSuccess: (data, variables) => {
      toast.success(data.data.message);
      // setUser(data.data.data);
      setToken(data.data.data.token, variables.rememberme);
      setIsAuthenticated(true);
      navigate("/corporate/dashboard");
    },
    onError: (error) => {
      toast.error(error.response.data.message, {});
    },
  });
};
