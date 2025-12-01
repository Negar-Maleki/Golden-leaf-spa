import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { updateSetting } from "../../services/apiSettings";

export function useUpdatingSetting() {
  const queryClient = useQueryClient();
  const { isLoading: isUpdating, mutate: updatingSetting } = useMutation({
    mutationFn: (newSetting) => updateSetting(newSetting),
    onSuccess: () => {
      toast.success("Setting edited successfully");
      queryClient.invalidateQueries({ queryKey: ["settings"] });
    },
    onError: (error) => {
      toast.error("Error editing setting: " + error.message);
    },
  });
  return { isUpdating, updatingSetting };
}
