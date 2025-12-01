import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getBookingById } from "../../services/apiBookings";

export function useBooking() {
  const { bookingId } = useParams();

  const {
    isLoading,
    data: booking,
    error,
  } = useQuery({
    queryKey: ["booking", bookingId],
    queryFn: () => getBookingById(bookingId),
    retry: false,
  });

  return { isLoading, booking, error };
}
