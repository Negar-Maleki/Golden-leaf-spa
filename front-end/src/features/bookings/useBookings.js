import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { LIST_SIZE } from "../../utils/constants";

export function useBookings() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  const filteredValue = searchParams.get("status");
  const filter =
    filteredValue && filteredValue !== "all"
      ? { field: "status", value: filteredValue }
      : null;

  let page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  const sortByRaw = searchParams.get("sortBy") || "date-desc";

  const lastHyphen = sortByRaw.lastIndexOf("-");

  const field = lastHyphen === -1 ? sortByRaw : sortByRaw.slice(0, lastHyphen);
  const direction =
    lastHyphen === -1 ? undefined : sortByRaw.slice(lastHyphen + 1);

  const sortBy = { field, direction };

  const { data: bookings, isLoading } = useQuery({
    queryKey: ["bookings", filter, sortBy, page],
    queryFn: () => getBookings({ filter, sortBy, page }),
  });

  const pageCount = Math.ceil(bookings?.count / LIST_SIZE);

  if (page < pageCount) {
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page + 1],
      queryFn: () => getBookings({ filter, sortBy, page: page + 1 }),
    });
  }
  if (page > 1) {
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page - 1],
      queryFn: () => getBookings({ filter, sortBy, page: page - 1 }),
    });
  }

  return { isLoading, bookings };
}
