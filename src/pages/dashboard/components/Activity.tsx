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
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { chartData as data, timeRanges } from "../../../constants";

interface DataPoint {
  day: string;
  value: number;
  tasks?: number;
}
type CustomTooltipProps = TooltipProps<ValueType, NameType>;
const Activity: React.FC = () => {
  const [timeRange, setTimeRange] = useState(timeRanges[0]);
  const CustomTooltip: React.FC<CustomTooltipProps> = ({
    active,
    payload,
    label,
  }) => {
    if (active && payload && payload.length && label === "M") {
      const data = payload[0].payload as DataPoint;
      return (
        <div className="bg-[#141522] text-white px-3 py-1 rounded shadow">
          <p className="font-medium text-sm">
            {data.tasks} Task
          </p>
        </div>
      );
    }
    return null;
  };
  return (
    <Card className="p-4 w-full flex flex-col h-53.5 shadow-none border-none bg-[#F5F5F7] gap-4">
      <div className="flex justify-between items-center">
        <h2 className="text-base font-semibold text-[#141522]">
          Activity
        </h2>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-28 sm:w-36 shadow-none cursor-pointer border-none">
            <SelectValue placeholder="Select Range" />
          </SelectTrigger>
          <SelectContent>
            {timeRanges.map((range) => (
              <SelectItem key={range} value={range}>
                {range}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="w-full bg-white p-1.5 rounded-lg h-48 ">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#6B7280", fontSize: 12 }}
            />
            <YAxis
              width={20}
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
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default Activity;
