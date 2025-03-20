import React, { useState } from "react";
import { format, addMonths, subMonths, startOfWeek, addDays } from "date-fns";
import { daysOfWeek } from "@/constants";

const Calendar: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handlePrevMonth = () => setSelectedDate(subMonths(selectedDate, 1));
  const handleNextMonth = () => setSelectedDate(addMonths(selectedDate, 1));

  const startDate = startOfWeek(selectedDate, { weekStartsOn: 0 });

  const handleDateClick = (day: Date) => setSelectedDate(day);

  const isSelected = (day: Date) =>
    format(day, "yyyy-MM-dd") === format(selectedDate, "yyyy-MM-dd");

  return (
    <div className="w-full max-w-md p-4 rounded-lg shadow-md bg-white">
      <div className="flex justify-between items-center mb-4">
        <button onClick={handlePrevMonth} className="cursor-pointer">
          &lt;
        </button>
        <h2>{format(selectedDate, "MMMM yyyy")}</h2>
        <button onClick={handleNextMonth} className="cursor-pointer">
          &gt;
        </button>
      </div>

      <div className="grid grid-cols-7 gap-2">
        {daysOfWeek.map((day) => (
          <div key={day} className="text-center font-medium">
            {day}
          </div>
        ))}

        {[...Array(7)].map((_, i) => {
          const day = addDays(startDate, i);
          return (
            <button
              key={i}
              onClick={() => handleDateClick(day)}
              className={`w-10 h-10 rounded-full ${
                isSelected(day)
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              {format(day, "d")}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
