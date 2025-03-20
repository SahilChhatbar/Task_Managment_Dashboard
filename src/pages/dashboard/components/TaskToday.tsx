import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Clock } from "lucide-react";
import tt from "../../../assets/tt.png";
const TaskToday = () => {
  return (
    <Card className="jakarta w-full p-6 flex flex-col gap-6">
      <div className="flex flex-col">
        <div className="flex flex-row justify-between">
          <h3 className="text-[#141522] text-sm font-semibold">Task Today</h3>
          <Button
            variant="ghost"
            size="icon"
            className="cursor-pointer h-8 w-8 p-0"
          >
            <MoreHorizontal />
          </Button>
        </div>
        <img src={tt} />
      </div>
      <div className="flex justify-between">
        <div>
          <h2 className="text-base font-semibold text-[#141522]">
            Creating Awesome Mobile Apps
          </h2>
          <p className="text-xs text-[#54577A]">UI/UX Designer</p>
        </div>
      </div>
      <div className="w-full flex justify-between pb-2 text-base">
        <span>Progress</span>
        <span className="text-blue-500">90%</span>
      </div>
      <Progress value={90} className="h-2 [&>div]:bg-[#546FFF] bg-[#BAC8FF]" />
      <div className="w-full flex justify-between items-center">
        <div className="flex text-base items-center gap-2">
          <Clock className="h-5 w-5 text-[#54577A]" />
          <span>1 Hour</span>
        </div>
        <div className="flex -space-x-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <Avatar key={i} className="h-6 w-6 border-2 border-white">
              <div className="w-full h-full bg-blue-500 flex items-center justify-center text-white text-xs">
                {i}
              </div>
            </Avatar>
          ))}
        </div>
      </div>

      <div className="w-full">
        <div className="flex justify-between pb-2">
          <h3 className="font-semibold">Detail Task</h3>
          <span className="text-sm text-gray-500">UI/UX Designer</span>
        </div>

        <div className="space-y-2">
          {[
            "Understanding the tools in Figma",
            "Understand the basics of making designs",
            "Design a mobile application with figma",
          ].map((task, i) => (
            <div
              key={i}
              className="flex items-center gap-2 p-2 bg-white rounded"
            >
              <div className="h-6 w-6 bg-gray-100 rounded flex items-center justify-center">
                {i + 1}
              </div>
              <p className="text-sm">{task}</p>
            </div>
          ))}
        </div>
      </div>
      <Button className="w-full bg-blue-500 hover:bg-blue-600 font-semibold cursor-pointer text-white">
        Go To Detail
      </Button>
    </Card>
  );
};

export default TaskToday;
