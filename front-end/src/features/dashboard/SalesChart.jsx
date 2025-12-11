import PropTypes from "prop-types";
import styled from "styled-components";
import DashboardBox from "./DashboardBox";
import Heading from "../../ui/Heading";
import {
  AreaChart,
  CartesianGrid,
  Area,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { useDarkMode } from "../../context/DarkModeContext";
import { eachDayOfInterval, isSameDay, subDays, format } from "date-fns";
import { useSetting } from "../settings/useSetting";

const StyledSalesChart = styled(DashboardBox)`
  grid-column: 1 / -1;

  /* Hack to change grid line colors */
  & .recharts-cartesian-grid-horizontal line,
  & .recharts-cartesian-grid-vertical line {
    stroke: var(--color-grey-300);
  }
`;

function SalesChart({ confirmedBookings, numDays }) {
  const { isDark } = useDarkMode();
  const { settings } = useSetting();
  const { foodPrice, drinkPrice } = settings?.[0] || {};

  const allDates = eachDayOfInterval({
    start: subDays(new Date(), numDays - 1),
    end: new Date(),
  });
  const data = allDates.map((date) => {
    return {
      label: format(date, "MM/dd"),
      totalPrice: confirmedBookings
        .filter((booking) => isSameDay(new Date(booking.date), date))
        .reduce((acc, booking) => acc + booking.totalPrice, 0),
      extrasSales: confirmedBookings
        .filter((booking) => isSameDay(new Date(booking.date), date))
        .map((booking) => {
          let ExtraCost = 0;
          if (booking.food) ExtraCost += foodPrice || 0;
          if (booking.drink) ExtraCost += drinkPrice || 0;
          return ExtraCost;
        })
        .reduce((acc, extra) => acc + extra, 0),
    };
  });

  const colors = isDark
    ? {
        extrasSales: { stroke: "#00d1186b", fill: "#00d1186b" },
        totalSales: { stroke: "#f7a210", fill: "#f7a210" },
        text: "#e5e7eb",
        background: "#18212f",
      }
    : {
        totalSales: { stroke: "#f7a210", fill: "#f7a210" },
        extrasSales: { stroke: "#00d1186b", fill: "#00d1186b" },
        text: "#374151",
        background: "#fff",
      };

  return (
    <StyledSalesChart>
      <Heading as="h2">
        Sales from {format(allDates[0], "MM/dd/yyyy")} to{" "}
        {format(allDates[allDates.length - 1], "MM/dd/yyyy")}{" "}
      </Heading>

      <AreaChart data={data} width={700} height={300}>
        <XAxis
          dataKey="label"
          tick={{ fill: colors.text }}
          tickLine={{ stroke: colors.text }}
          style={{ fontSize: "1.2rem" }}
        />
        <YAxis
          unit="$"
          tick={{ fill: colors.text }}
          tickLine={{ stroke: colors.text }}
        />
        <Tooltip contentStyle={{ backgroundColor: colors.background }} />
        <CartesianGrid strokeDasharray="3 3" />
        <Area
          dataKey="totalPrice"
          type="monotone"
          stroke={colors.totalSales.stroke}
          fill={colors.totalSales.fill}
          strokeWidth={1}
          name="Total Sales"
          unit="$"
        />
        <Area
          dataKey="extrasSales"
          stroke={colors.extrasSales.stroke}
          fill={colors.extrasSales.fill}
          strokeWidth={1}
          name="Total Extras Sales"
          unit="$"
        />
      </AreaChart>
    </StyledSalesChart>
  );
}

export default SalesChart;

SalesChart.propTypes = {
  confirmedBookings: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
      totalPrice: PropTypes.number,
      food: PropTypes.bool,
      drink: PropTypes.bool,
      extraCost: PropTypes.number,
    })
  ),
  numDays: PropTypes.number,
};
