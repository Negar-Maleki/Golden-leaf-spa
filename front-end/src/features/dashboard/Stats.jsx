import PropTypes from "prop-types";
import Stat from "./Stat";
import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineChartBar,
  HiOutlineCalendarDays,
} from "react-icons/hi2";
import { formatCurrency } from "../../utils/helpers";

function Stats({ confirmedBookings, recentBookings, numDays, servicesLength }) {
  const numBookings = recentBookings?.length || 0;
  const revenue =
    confirmedBookings?.reduce(
      (acc, booking) => acc + (booking?.totalPrice || 0),
      0
    ) || 0;

  const checkIns = confirmedBookings?.length || 0;

  const totalBookedDuration =
    confirmedBookings?.reduce(
      (acc, booking) => acc + (booking?.duration || 0),
      0
    ) || 0;

  const capacity = (numDays || 0) * (servicesLength || 0);

  const occupancyRate =
    capacity > 0 ? (totalBookedDuration / 60 / capacity) * 100 : 0;

  return (
    <>
      <Stat
        title="Total Bookings"
        value={numBookings}
        color="blue"
        icon={<HiOutlineBriefcase />}
      />
      <Stat
        title="Total Revenue"
        value={formatCurrency(revenue)}
        color="green"
        icon={<HiOutlineBanknotes />}
      />
      <Stat
        title="Total Check-ins"
        value={checkIns}
        color="blue"
        icon={<HiOutlineCalendarDays />}
      />
      <Stat
        title="Occupancy Rate"
        value={Math.round(occupancyRate) + "%"}
        color="blue"
        icon={<HiOutlineChartBar />}
      />
    </>
  );
}

export default Stats;

Stats.propTypes = {
  confirmedBookings: PropTypes.arrayOf(
    PropTypes.shape({
      totalPrice: PropTypes.number,
      duration: PropTypes.number,
    })
  ),
  bookings: PropTypes.array,
  numDays: PropTypes.number,
  servicesLength: PropTypes.number,
};
