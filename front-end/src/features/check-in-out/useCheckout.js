import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useCheckOut() {
  const query = useQueryClient();
  const navigate = useNavigate();

  const { isLoading: isCheckingOut, mutate: checkout } = useMutation({
    mutationFn: (bookingId) =>
      updateBooking(bookingId, {
        status: "COMPLETED",
      }),
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} successfully checked out`);
      query.invalidateQueries({ active: true, queryKey: ["bookings"] });
      navigate("/");
    },
    onError: (error) => {
      toast.error("Error editing booking" + error.message);
    },
  });

  return { checkout, isCheckingOut };
}
