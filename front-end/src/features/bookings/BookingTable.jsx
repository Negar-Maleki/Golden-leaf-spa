import BookingRow from "./BookingRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Empty from "../../ui/Empty";
import { useBookings } from "./useBookings";
import Spinner from "../../ui/Spinner";
import Pagination from "../../ui/Pagination";

function BookingTable() {
  const { isLoading, bookings, count } = useBookings();
  if (bookings?.length === 0) {
    return <Empty resourceName="bookings" />;
  }

  if (isLoading) {
    return <Spinner />;
  }
  console.log(bookings);

  return (
    <Menus>
      <Table columns="2fr 1.6fr 2fr 1.4fr 1fr 2fr 3.2rem">
        <Table.Header>
          <div>Service</div>
          <div>Guest</div>
          <div>Dates</div>
          <div>Status</div>
          <div>Amount</div>
          <div>Note</div>
        </Table.Header>

        <Table.Body
          data={bookings}
          render={(booking) => (
            <BookingRow key={booking.id} booking={booking} />
          )}
        />
        <Table.Footer>
          <Pagination count={count} />
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default BookingTable;
