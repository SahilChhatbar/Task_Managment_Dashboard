import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  TooltipProps,
} from "recharts";
import {
  NameType,
  ValueType,
} from "recharts/types/component/DefaultTooltipContent";

interface DataPoint {
  day: string;
  value: number;
  tasks?: number;
}

type CustomTooltipProps = TooltipProps<ValueType, NameType>;

const Activity: React.FC = () => {
  const [timeRange, setTimeRange] = useState("This Week");

  const data: DataPoint[] = [
    { day: "S", value: 1 },
    { day: "M", value: 2, tasks: 2 },
    { day: "T", value: 1 },
    { day: "W", value: 1 },
    { day: "T", value: 2 },
    { day: "F", value: 1.8 },
    { day: "S", value: 1.7 },
  ];

  const CustomTooltip: React.FC<CustomTooltipProps> = ({
    active,
    payload,
    label,
  }) => {
    if (active && payload && payload.length && label === "M") {
      const data = payload[0].payload as DataPoint;
      return (
        <div className="bg-slate-900 text-white px-3 py-1 rounded shadow">
          <p className="font-medium text-sm">{data.tasks} Task</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-[#f5f5f7] rounded-lg self-center w-115.5 h-53.5">
      <div className="flex justify-between items-center p-4">
        <h2 className="jakarta text-base font-semibold text-[#141522]">
          Activity
        </h2>
        <div className="jakarta text-xs text-[#141522] flex flex-row items-center">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="bg-transparent border-none outline-none cursor-pointer"
          >
            <option value="This Week">This Week</option>
            <option value="This Month">This Month</option>
            <option value="This Year">This Year</option>
          </select>
        </div>
      </div>

      <ResponsiveContainer
        className="bg-[#ffffff] rounded-xl"
        width="91%"
        height="60%"
        style={{ margin: "0 auto"}}
      >
        <LineChart
          data={data}
          margin={{ top: 20, right: 10, left: -30, bottom: 0 }}
        >
          <XAxis
            dataKey="day"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#6B7280", fontSize: 12 }}
          />
          <YAxis
            domain={[0, 3]}
            ticks={[1, 2, 3]}
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#6B7280", fontSize: 12 }}
          />
          <Tooltip content={<CustomTooltip />} cursor={false} />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#111827"
            strokeWidth={2}
            dot={false}
            activeDot={{
              r: 6,
              fill: "#4F46E5",
              stroke: "#fff",
              strokeWidth: 2,
              onClick: () => {},
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Activity;
