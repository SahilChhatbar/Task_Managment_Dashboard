import React, { useState } from "react";
import { format, addMonths, subMonths, startOfWeek, addDays } from "date-fns";
import { daysOfWeek } from "@/constants";
import { Button } from "@/components/ui/button";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

const Calendar: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const handlePrevMonth = () => setSelectedDate(subMonths(selectedDate, 1));
  const handleNextMonth = () => setSelectedDate(addMonths(selectedDate, 1));
  const startDate = startOfWeek(selectedDate, { weekStartsOn: 0 });
  const handleDateClick = (day: Date) => setSelectedDate(day);
  const isSelected = (day: Date) =>
    format(day, "yyyy-MM-dd") === format(selectedDate, "yyyy-MM-dd");

  return (
    <div className="jakarta w-full max-w-md p-4 rounded-lg bg-white">
      <div className="flex justify-between items-center pb-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={handlePrevMonth} 
          className="cursor-pointer p-0 hover:bg-transparent"
        >
          <MdChevronLeft className="w-5 h-5"/>
        </Button>
        <h2 className="text-sm font-semibold text-[#141522]">{format(selectedDate, "MMMM yyyy")}</h2>
        <Button 
          variant="ghost"
          size="sm"
          onClick={handleNextMonth} 
          className="cursor-pointer p-0 hover:bg-transparent"
        >
          <MdChevronRight className="w-5 h-5"/>
        </Button>
      </div>
      <div className="grid grid-cols-7 gap-1">
        {daysOfWeek.map((day, i) => {
          const dayDate = addDays(startDate, i);
          return (
            <div key={day} className="relative text-center text-sm font-semibold p-1">
              {isSelected(dayDate) && (
                <div className="absolute inset-x-2 top-0 h-[4.25rem] md:w-[38.5px] bg-black rounded-full z-0"></div>
              )}
              <span className={`relative z-10 ${isSelected(dayDate) ? "text-white" : "text-[#141522]"}`}>
                {day[0]}
              </span>
            </div>
          );
        })}
        {[...Array(7)].map((_, i) => {
          const day = addDays(startDate, i);
          return (
            <div key={i} className="relative flex justify-center">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleDateClick(day)}
                className={`relative z-10 w-8 h-8 p-0 cursor-pointer rounded-full text-sm font-normal flex items-center justify-center ${
                  isSelected(day)
                    ? "bg-[#546FFF] text-white"
                    : "bg-transparent text-gray-700 hover:bg-gray-100"
                }`}
              >
                {format(day, "d")}
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;