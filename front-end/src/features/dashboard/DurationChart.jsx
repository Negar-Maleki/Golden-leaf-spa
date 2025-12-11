import styled from "styled-components";
import { useDarkMode } from "../../context/DarkModeContext";
import Heading from "../../ui/Heading";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const ChartBox = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  padding: 2.4rem 3.2rem;
  grid-column: 3 / span 2;

  & > *:first-child {
    margin-bottom: 1.6rem;
  }

  & .recharts-pie-label-text {
    font-weight: 600;
  }
`;

const startDataLight = [
  {
    duration: "45 minutes",
    value: 0,
    color: "#ef4444",
  },
  {
    duration: "1 hour",
    value: 0,
    color: "#f97316",
  },
  {
    duration: "1.5 hours",
    value: 0,
    color: "#eab308",
  },
  {
    duration: "2 hours",
    value: 0,
    color: "#84cc16",
  },
  {
    duration: "3.5-4 hours",
    value: 0,
    color: "#22c55e",
  },
  {
    duration: "4+ hours",
    value: 0,
    color: "#14b8a6",
  },
];

const startDataDark = [
  {
    duration: "45 minutes",
    value: 0,
    color: "#b91c1c",
  },
  {
    duration: "1 hour",
    value: 0,
    color: "#c2410c",
  },
  {
    duration: "1.5 hours",
    value: 0,
    color: "#a16207",
  },
  {
    duration: "2 hours",
    value: 0,
    color: "#4d7c0f",
  },
  {
    duration: "3.5-4 hours",
    value: 0,
    color: "#15803d",
  },
  {
    duration: "4+ hours",
    value: 0,
    color: "#0f766e",
  },
];

function prepareData(startData, stays) {
  function incArrayValue(arr, field) {
    return arr.map((obj) =>
      obj.duration === field ? { ...obj, value: obj.value + 1 } : obj
    );
  }

  const data = stays
    .reduce((arr, cur) => {
      const num = Number(cur.duration);
      if (num === 45) return incArrayValue(arr, "45 minutes");
      if (num === 60) return incArrayValue(arr, "1 hour");
      if (num === 90) return incArrayValue(arr, "1.5 hours");
      if (num === 120) return incArrayValue(arr, "2 hours");
      if ([180, 240].includes(num)) return incArrayValue(arr, "3.5-4 hours");
      if (num > 240) return incArrayValue(arr, "4+ hours");

      return arr;
    }, startData)
    .filter((obj) => obj.value > 0);

  return data;
}

function DurationChart({ confirmedBookings }) {
  const { isDark } = useDarkMode();

  const startData = isDark ? startDataDark : startDataLight;
  const data = prepareData(startData, confirmedBookings);

  return (
    <ChartBox>
      <Heading as="h2">Duration of Stays</Heading>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart width={400} height={300}>
          <Pie
            data={data}
            dataKey="value"
            nameKey="duration"
            cx="40%"
            cy="50%"
            paddingAngle={2}
            innerRadius={85}
            outerRadius={100}
            fill="#8884d8"
            label
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.color}
                stroke={entry.color}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend
            verticalAlign="middle"
            align="right"
            width="30%"
            layout="vertical"
            iconSize={15}
            iconType="
        circle"
          />
        </PieChart>
      </ResponsiveContainer>
    </ChartBox>
  );
}

export default DurationChart;
