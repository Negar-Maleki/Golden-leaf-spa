import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBookingApi } from "../../services/apiBookings";
import toast from "react-hot-toast";

export function useDeleteBooking() {
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: deleteBooking } = useMutation({
    mutationFn: deleteBookingApi,

    onSuccess: () => {
      toast.success("Booking deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
    },

    onError: (error) => {
      toast.error("Error deleting booking: " + error.message);
    },
  });
  return { isDeleting, deleteBooking };
}
