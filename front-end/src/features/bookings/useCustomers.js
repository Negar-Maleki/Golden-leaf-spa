import { useQuery } from "@tanstack/react-query";
import { getCustomers } from "../../services/apiCustomers";

export function useCustomers() {
  const {
    data: customers,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["customers"],
    queryFn: getCustomers,
  });
  return { customers: customers || [], error, isLoading };
}
