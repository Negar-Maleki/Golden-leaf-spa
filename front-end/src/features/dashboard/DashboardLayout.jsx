import styled from "styled-components";

import Spinner from "../../ui/Spinner";
import { useRecentBookings } from "./useRecentBooking";
import { useServices } from "../sevices/useServices";
import Stats from "./Stats";
import SalesChart from "./SalesChart";
import DurationChart from "./DurationChart";
import TodayActivity from "../check-in-out/TodayActivity";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 40rem auto;
  gap: 2.4rem;
`;

function DashboardLayout() {
  const { recentBookings, confirmedBookings, isLoading, numDays } =
    useRecentBookings();
  const { services, isLoading: servicesLoading } = useServices();

  if (isLoading || servicesLoading) {
    return <Spinner />;
  }

  return (
    <StyledDashboardLayout>
      <Stats
        confirmedBookings={confirmedBookings}
        recentBookings={recentBookings}
        numDays={numDays}
        servicesLength={services.length}
      />
      <TodayActivity />
      <DurationChart confirmedBookings={confirmedBookings} />
      <SalesChart confirmedBookings={confirmedBookings} numDays={numDays} />
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
