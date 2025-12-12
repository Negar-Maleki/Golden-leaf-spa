import styled from "styled-components";

import Heading from "../../ui/Heading";
import Row from "../../ui/Row";
import { useRecentBookings } from "../dashboard/useRecentBooking";
import { isSameDay } from "date-fns";
import Spinner from "../../ui/Spinner";
import TodayItem from "./TodayItem";

const StyledToday = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  padding: 3.2rem;
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  grid-column: 1 / span 2;
  padding-top: 2.4rem;
`;

const TodayList = styled.ul`
  overflow: scroll;
  overflow-x: hidden;

  /* Removing scrollbars for webkit, firefox, and ms, respectively */
  &::-webkit-scrollbar {
    width: 0 !important;
  }
  scrollbar-width: none;
  -ms-overflow-style: none;
`;

const NoActivity = styled.p`
  text-align: center;
  font-size: 1.8rem;
  font-weight: 500;
  margin-top: 0.8rem;
`;

function TodayActivity() {
  const { bookings, isLoading } = useRecentBookings();
  const today = new Date().toISOString();

  let todayBookings = bookings
    .filter(
      (booking) =>
        booking.status === "CONFIRMED" || booking.status === "PENDING"
    )
    .filter((booking) => isSameDay(new Date(booking.date), today));
  console.log(todayBookings);
  return (
    <StyledToday>
      <Row type="horizontal">
        <Heading as="h2">Today</Heading>
      </Row>
      {!isLoading ? (
        todayBookings.length > 0 ? (
          <TodayList>
            {todayBookings.map((booking) => (
              <TodayItem key={booking._id} activity={booking}></TodayItem>
            ))}
          </TodayList>
        ) : (
          <NoActivity>No activity for today.</NoActivity>
        )
      ) : (
        <Spinner />
      )}
    </StyledToday>
  );
}

export default TodayActivity;
