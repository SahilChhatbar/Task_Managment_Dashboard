import { useState } from "react";
import Activity from "./components/Activity";
import MentorCard from "./components/MentorCard";
import RunningTaskCard from "./components/RunningTaskCard";
import { MdChevronRight, MdChevronLeft } from "react-icons/md";
import george from "../../assets/george.png";
import licoln from "../../assets/lincoln.png";

const mentors = [
  {
    avatarUrl: george,
    name: "Curious George",
    designation: "UI UX Design",
    tasks: 40,
    reviews: {
      rating: 4.7,
      count: 750,
    },
  },
  {
    avatarUrl: licoln,
    name: "Abraham Lincoln",
    designation: "3D Design",
    tasks: 32,
    reviews: {
      rating: 4.9,
      count: 510,
    },
  },
  {
    avatarUrl: licoln,
    name: "Albert Einstein",
    designation: "Physics",
    tasks: 28,
    reviews: {
      rating: 4.8,
      count: 620,
    },
  },
  {
    avatarUrl: george,
    name: "Isaac Newton",
    designation: "Mathematics",
    tasks: 35,
    reviews: {
      rating: 4.6,
      count: 540,
    },
  },
];

const DashboardContent = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? mentors.length - 2 : prevIndex - 2));
  };

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex === mentors.length - 2 ? 0 : prevIndex + 2));
  };

  return (
    <div className="p-7 md:w-[61%] flex flex-col gap-7">
      <div className="flex flex-row gap-8">
        <RunningTaskCard />
        <Activity />
      </div>
      <div className="flex flex-row items-center justify-between">
        <h1 className="jakarta text-2xl font-semibold text-[#141522]">
          Monthly Mentors
        </h1>
        <div className="flex flex-row">
          <MdChevronLeft size="24px" cursor="pointer" onClick={handlePrevClick} />
          <MdChevronRight size="24px" cursor="pointer" onClick={handleNextClick} />
        </div>
      </div>
      <div className="flex flex-row gap-8">
        {mentors.slice(currentIndex, currentIndex + 2).map((mentor, index) => (
          <MentorCard
            key={index}
            avatarUrl={mentor.avatarUrl}
            name={mentor.name}
            designation={mentor.designation}
            tasks={mentor.tasks}
            reviews={mentor.reviews}
          />

          
        ))}
      </div>
      <div className="flex flex-row items-center justify-between">
        <h1 className="jakarta text-2xl font-semibold text-[#141522]">
        Upcoming Task
        </h1>
        <div className="flex flex-row">
          <MdChevronLeft size="24px" cursor="pointer" />
          <MdChevronRight size="24px" cursor="pointer" />
        </div>
      </div>
      
    </div>
  );
};

export default DashboardContent;