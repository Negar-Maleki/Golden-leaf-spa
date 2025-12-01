import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createEditService } from "../../services/apiServices";

export function useEditService() {
  const queryClient = useQueryClient();
  const { isLoading: isEditing, mutate: editingService } = useMutation({
    mutationFn: ({ data, id }) => createEditService(data, id),
    onSuccess: () => {
      toast.success("Service edited successfully");
      queryClient.invalidateQueries({ queryKey: ["services"] });
    },
    onError: (error) => {
      toast.error("Error editing service: " + error.message);
    },
  });
  return { isEditing, editingService };
}
