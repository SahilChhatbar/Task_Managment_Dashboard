import { useState } from "react";
import Activity from "./components/Activity";
import MentorCard from "./components/MentorCard";
import RunningTaskCard from "./components/RunningTaskCard";
import { MdChevronRight, MdChevronLeft } from "react-icons/md";
import { mentors, taskData } from "@/constants";
import TaskCard from "./components/TaskCard";

const Dashboard = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [taskIndex, setTaskIndex] = useState(0);
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
  const handleTaskPrevClick = () => {
    setTaskIndex((prevIndex) =>
      prevIndex === 0 ? taskData.length - 1 : prevIndex - 1
    );
  };
  const handleTaskNextClick = () => {
    setTaskIndex((prevIndex) =>
      prevIndex === taskData.length - 1 ? 0 : prevIndex + 1
    );
  };
  return (
    <div className="flex flex-col gap-7 p-7">
      <div className="block md:hidden text-start mb-4 text-2xl font-semibold text-[#141522]">
        Hi, Dennis <br />
        Nzioki
        <br />
        <span className="text-[#54577A] text-sm">
          Let's finish your task today!
        </span>
      </div>
      <div className="flex flex-col gap-8 md:flex-row">
        <RunningTaskCard />
        <Activity />
      </div>
      <div className="grid grid-cols-1 gap-8">
        <div className="grid grid-cols-1 grid-flow-col items-center">
          <h1 className="text-2xl font-semibold text-[#141522]">
            Monthly Mentors
          </h1>
          <div className="flex justify-end gap-2">
            <MdChevronLeft
              size="24px"
              cursor="pointer"
              onClick={handlePrevClick}
            />
            <MdChevronRight
              size="24px"
              cursor="pointer"
              onClick={handleNextClick}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 place-items-center md:grid-cols-2 gap-7">
          <div className="w-full max-w-[328px]">
            <MentorCard
              key={currentIndex}
              avatarUrl={mentors[currentIndex].avatarUrl}
              name={mentors[currentIndex].name}
              designation={mentors[currentIndex].designation}
              tasks={mentors[currentIndex].tasks}
              reviews={mentors[currentIndex].reviews}
            />
          </div>
          <div className="hidden md:block w-full max-w-[328px]">
            {mentors[(currentIndex + 1) % mentors.length] && (
              <MentorCard
                key={(currentIndex + 1) % mentors.length}
                avatarUrl={
                  mentors[(currentIndex + 1) % mentors.length].avatarUrl
                }
                name={mentors[(currentIndex + 1) % mentors.length].name}
                designation={
                  mentors[(currentIndex + 1) % mentors.length].designation
                }
                tasks={mentors[(currentIndex + 1) % mentors.length].tasks}
                reviews={mentors[(currentIndex + 1) % mentors.length].reviews}
              />
            )}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-8">
        <div className="grid grid-cols-1 grid-flow-col items-center">
          <h1 className="text-2xl font-semibold text-[#141522]">
            Upcoming Task
          </h1>
          <div className="flex justify-end gap-2">
            <MdChevronLeft
              size="24px"
              cursor="pointer"
              onClick={handleTaskPrevClick}
            />
            <MdChevronRight
              size="24px"
              cursor="pointer"
              onClick={handleTaskNextClick}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 place-items-center md:grid-cols-2 gap-7">
          <TaskCard
            key={taskIndex}
            category={taskData[taskIndex].category}
            title={taskData[taskIndex].title}
            daysLeft={taskData[taskIndex].daysLeft}
            imageSrc={taskData[taskIndex].imageSrc}
            progressPercent={taskData[taskIndex].progressPercent}
          />
          <div className="hidden md:block">
            {taskData[(taskIndex + 1) % taskData.length] && (
              <TaskCard
                key={(taskIndex + 1) % taskData.length}
                category={taskData[(taskIndex + 1) % taskData.length].category}
                title={taskData[(taskIndex + 1) % taskData.length].title}
                daysLeft={taskData[(taskIndex + 1) % taskData.length].daysLeft}
                imageSrc={taskData[(taskIndex + 1) % taskData.length].imageSrc}
                progressPercent={
                  taskData[(taskIndex + 1) % taskData.length].progressPercent
                }
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
