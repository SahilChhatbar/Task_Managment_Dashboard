import { MdChevronRight, MdChevronLeft } from "react-icons/md";
import { useState } from "react";
import { mentors } from "@/constants";
import MentorCard from "../dashboard/components/MentorCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ListFilterIcon } from "lucide-react";

const Mentor = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? mentors.length - 1 : prevIndex - 1
    );
  };
  const handleNextClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === mentors.length - 1 ? 0 : prevIndex + 1
    );
  };
  const renderMentorCards = (
    startIndex: number,
    count: number,
    showDescription = true,
    keyPrefix = ""
  ) => {
    return Array.from({ length: count }).map((_, i) => {
      const index = (startIndex + i) % mentors.length;
      const mentor = mentors[index];
      return (
        <div
          key={`${keyPrefix}-${index}`}
          className={
            i > 0 ? `hidden ${i < 2 ? "sm" : i < 3 ? "md" : "lg"}:block` : ""
          }
        >
          <MentorCard
            avatarUrl={mentor.avatarUrl}
            name={mentor.name}
            designation={mentor.designation}
            tasks={mentor.tasks}
            reviews={mentor.reviews}
            description={showDescription ? mentor.description : ""}
          />
        </div>
      );
    });
  };
  return (
    <div className="jakarta grid grid-cols-1 gap-8 lg:p-0 md:p-0 sm:p-0 p-7">
        <div className="block flex-col md:hidden text-start mb-4 text-2xl font-semibold text-[#141522]">
       <h2>Explore Task</h2> 
        <div className="flex items-center justify-between flex-row">
            <Input
              placeholder="Search Task"
              className="border-none w-80 h-13 bg-white"
            />
          <div className="flex text-xs text-[#141522] flex-row">
            <Button
              variant="outline"
              className="cursor-pointer flex items-center gap-2 h-13 w-13 bg-white"
            >
              <ListFilterIcon className="w-5 h-5" /> 
            </Button>
          </div>
          </div>
      </div>
      <div className="p-6 md:p-8 flex flex-col gap-8">
        <div className="flex flex-col gap-8">
          <div className="flex items-center justify-between">
            <h2 className="text-xl md:text-2xl font-semibold text-[#141522]">
              Recent Mentors
            </h2>
            <div className="flex items-center gap-2">
              <button
                className="p-1 rounded-full hover:bg-gray-100"
                onClick={handlePrevClick}
              >
                <MdChevronLeft size={24} className="text-[#141522]" />
              </button>
              <button
                className="p-1 rounded-full hover:bg-gray-100"
                onClick={handleNextClick}
              >
                <MdChevronRight size={24} className="text-[#141522]" />
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {renderMentorCards(currentIndex, 4, false, "recent")}
          </div>
        </div>
        <div className="flex flex-col gap-8">
          <div>
            <h2 className="text-xl md:text-2xl font-semibold text-[#141522]">
              Popular Mentors
            </h2>
          </div>
          <div className="flex flex-col gap-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {Array.from({ length: 4 }).map((_, i) => {
                const mentor = mentors[i % mentors.length];
                return (
                  <MentorCard
                    key={`popular-row1-${i}`}
                    avatarUrl={mentor.avatarUrl}
                    name={mentor.name}
                    designation={mentor.designation}
                    tasks={mentor.tasks}
                    reviews={mentor.reviews}
                    description={mentor.description}
                  />
                );
              })}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {Array.from({ length: 4 }).map((_, i) => {
                const mentor = mentors[(i + 4) % mentors.length];
                return (
                  <MentorCard
                    key={`popular-row2-${i}`}
                    avatarUrl={mentor.avatarUrl}
                    name={mentor.name}
                    designation={mentor.designation}
                    tasks={mentor.tasks}
                    reviews={mentor.reviews}
                    description={mentor.description}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mentor;
