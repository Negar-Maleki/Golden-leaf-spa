import { useMutation } from "@tanstack/react-query";
import { signupApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useSignup() {
  const { mutate: signup, isLoading } = useMutation({
    mutationFn: signupApi,

    onSuccess: (user) => {
      toast.success("Signup successful! You can now log in.");
    },
    onError: (error) => {
      toast.error(`Signup failed: ${error.message}`);
    },
  });

  return { signup, isLoading };
}
123456;
