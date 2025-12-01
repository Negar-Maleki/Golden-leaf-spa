import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteService as deleteServiceApi } from "../../services/apiServices";
import toast from "react-hot-toast";

export function useService() {
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: deleteService } = useMutation({
    mutationFn: (id) => deleteServiceApi(id),

    onSuccess: () => {
      toast.success("Service deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["services"] });
    },
    onError: (error) => {
      toast.error("Error deleting service: " + error.message);
    },
  });

  return { isDeleting, deleteService };
}
