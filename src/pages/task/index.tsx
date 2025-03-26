import { taskData } from "@/constants";
import { ListFilterIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TaskCardCarousel } from "../dashboard/components/TaskCard";

const Task = () => {
  return (
    <div className="grid grid-cols-1 gap-8 p-7">
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
      <TaskCardCarousel
        tasks={taskData}
        title="Time Limit"
        slidesToShow={4} 
        showNavigation={true}
      />
      <TaskCardCarousel
        tasks={taskData}
        title="New Task"
        slidesToShow={4}
        showNavigation={true}
      />
    </div>
  );
};

export default Task;