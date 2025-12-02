import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useCheckIn() {
  const query = useQueryClient();
  const navigate = useNavigate();

  const { isLoading: isCheckingIn, mutate: checkIn } = useMutation({
    mutationFn: (bookingId) =>
      updateBooking(bookingId, {
        status: "COMPLETED",
        paid: true,
      }),
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} successfully checked in`);
      query.invalidateQueries({ active: true, queryKey: ["bookings"] });
      navigate("/");
    },
    onError: (error) => {
      toast.error("Error editing booking" + error.message);
    },
  });

  return { checkIn, isCheckingIn };
}
