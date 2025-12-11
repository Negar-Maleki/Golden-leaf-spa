import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateCurrentUserApi } from "../../services/apiAuth";

export function useUpdateUser() {
  const queryClient = useQueryClient();
  const { isLoading: isUpdating, mutate: updateUser } = useMutation({
    mutationFn: updateCurrentUserApi,
    onSuccess: () => {
      toast.success("User account updated successfully");
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (error) => {
      toast.error("Error updating user account: " + error.message);
    },
  });
  return { isUpdating, updateUser };
}
