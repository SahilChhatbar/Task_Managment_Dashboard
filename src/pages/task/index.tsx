import TaskCard from "..//dashboard/components/TaskCard";
import { useState } from "react";
import { taskData } from "@/constants";
import { MdChevronRight, MdChevronLeft } from "react-icons/md";
import { ListFilterIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Task = () => {
  const [taskIndex, setTaskIndex] = useState(0);

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
    <div className="jakarta grid grid-cols-1 gap-8 p-7">
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
      <div className="grid grid-cols-1 grid-flow-col items-center">
        <h1 className="text-2xl font-semibold text-[#141522]">Time Limit</h1>
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
      <div className="grid place-items-center grid-cols-1 md:grid-cols-4 lg:grid-cols-4 sm:grid-cols-2 gap-8">
        <TaskCard key={taskIndex} {...taskData[taskIndex]} 
        />
        <div className="hidden md:block">
          {taskData[(taskIndex + 1) % taskData.length] && (
            <TaskCard
              key={(taskIndex + 1) % taskData.length}
              {...taskData[(taskIndex + 1) % taskData.length]}
            />
          )}
        </div>
        <div className="hidden md:block">
          {taskData[(taskIndex + 2) % taskData.length] && (
            <TaskCard
              key={(taskIndex + 2) % taskData.length}
              {...taskData[(taskIndex + 2) % taskData.length]}

            />
          )}
        </div>
        <div className="hidden md:block">
          {taskData[(taskIndex + 3) % taskData.length] && (
            <TaskCard
              key={(taskIndex + 3) % taskData.length}
              {...taskData[(taskIndex + 3) % taskData.length]}
            />
          )}
        </div>
      </div>
      <div className="grid grid-cols-1 grid-flow-col items-center">
        <h1 className="text-2xl font-semibold text-[#141522]">New Task</h1>
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
      <div className="grid place-items-center grid-cols-1 md:grid-cols-4 lg:grid-cols-4 sm:grid-cols-2 gap-8">
        <TaskCard key={taskIndex} {...taskData[taskIndex]} />
        <div className="hidden md:block">
          {taskData[(taskIndex + 1) % taskData.length] && (
            <TaskCard
              key={(taskIndex + 1) % taskData.length}
              {...taskData[(taskIndex + 1) % taskData.length]}
            />
          )}
        </div>
        <div className="hidden md:block">
          {taskData[(taskIndex + 2) % taskData.length] && (
            <TaskCard
              key={(taskIndex + 2) % taskData.length}
              {...taskData[(taskIndex + 2) % taskData.length]}
            />
          )}
        </div>
        <div className="hidden md:block">
          {taskData[(taskIndex + 3) % taskData.length] && (
            <TaskCard
              key={(taskIndex + 3) % taskData.length}
              {...taskData[(taskIndex + 3) % taskData.length]}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Task;
