import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getAllBookings } from "../../services/apiBookings";
import { subDays } from "date-fns";

export function useRecentBookings() {
  const [searchParams] = useSearchParams();

  const numDays = !searchParams.get("last")
    ? 7
    : Number(searchParams.get("last"));

  const { data: bookings, isLoading } = useQuery({
    queryKey: ["bookings"],
    queryFn: getAllBookings,
  });

  const queryDate = subDays(new Date(), numDays).toString();
  let recentBookings = [];
  let confirmedBookings = [];
  if (bookings) {
    recentBookings = bookings?.filter(
      (booking) => new Date(booking.date) >= new Date(queryDate)
    );

    confirmedBookings = recentBookings.filter(
      (booking) =>
        booking.status === "CONFIRMED" || booking.status === "COMPLETED"
    );
  }

  return { isLoading, bookings, recentBookings, confirmedBookings, numDays };
}
