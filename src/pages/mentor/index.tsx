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
          <div className="flex gap-8">
            <div className="block  sm:hidden">
              <MentorCard
                avatarUrl={mentors[currentIndex].avatarUrl}
                name={mentors[currentIndex].name}
                designation={mentors[currentIndex].designation}
                tasks={mentors[currentIndex].tasks}
                reviews={mentors[currentIndex].reviews}
              />
            </div>
            <div className="hidden sm:flex gap-8">
              {[0, 1, 2, 3].map((offset) => {
                const mentor = mentors[(currentIndex + offset) % mentors.length];
                return (
                  <div key={`recent-${offset}`} className="flex-1">
                    <MentorCard
                      avatarUrl={mentor.avatarUrl}
                      name={mentor.name}
                      designation={mentor.designation}
                      tasks={mentor.tasks}
                      reviews={mentor.reviews}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-8">
          <div>
            <h2 className="text-xl md:text-2xl font-semibold text-[#141522]">
              Popular Mentors
            </h2>
          </div>
          <div className="flex flex-col gap-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-8">
              {mentors.slice(0, 4).map((mentor, index) => (
                <MentorCard
                  key={`popular-row1-${index}`}
                  avatarUrl={mentor.avatarUrl}
                  name={mentor.name}
                  designation={mentor.designation}
                  tasks={mentor.tasks}
                  reviews={mentor.reviews}
                  description={mentor.description}
                />
              ))}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-8">
              {mentors.slice(4, 8).map((mentor, index) => (
                <MentorCard
                  key={`popular-row2-${index}`}
                  avatarUrl={mentor.avatarUrl}
                  name={mentor.name}
                  designation={mentor.designation}
                  tasks={mentor.tasks}
                  reviews={mentor.reviews}
                  description={mentor.description}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mentor;