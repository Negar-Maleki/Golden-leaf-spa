import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditService } from "../../services/apiServices";
import toast from "react-hot-toast";

export function useCreateService() {
  const queryClient = useQueryClient();

  const { isLoading: isCreating, mutate: createService } = useMutation({
    mutationFn: (data) => createEditService(data),
    onSuccess: () => {
      toast.success("Service created successfully");
      queryClient.invalidateQueries({ queryKey: ["services"] });
    },
    onError: (error) => {
      toast.error("Error creating service: " + error.message);
    },
  });

  return { isCreating, createService };
}
