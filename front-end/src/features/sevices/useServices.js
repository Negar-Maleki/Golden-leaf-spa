import { useQuery } from "@tanstack/react-query";
import { getServices } from "../../services/apiServices";

export function useServices() {
  const {
    data: services,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["services"],
    queryFn: getServices,
  });

  return { services, error, isLoading };
}
