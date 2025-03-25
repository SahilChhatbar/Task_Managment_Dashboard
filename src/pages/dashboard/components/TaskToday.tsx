import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Clock } from "lucide-react";
import tt from "../../../assets/tt.png";
import {
  TASK_TITLE,
  TASK_SUBTITLE,
  PROGRESS_PERCENTAGE,
  TIME_ESTIMATE,
  DETAIL_TASKS,
} from "../../../constants";
import { useNavigate } from "react-router";
import one from "../../../assets/1.png";
import two from "../../../assets/2.png";
import three from "../../../assets/3.png";
import four from "../../../assets/4.png";
import five from "../../../assets/5.png";
import { Separator } from "@/components/ui/separator";


const TaskToday = () => {
  const navigate = useNavigate();
  return (
    <Card className="jakarta w-full shadow-none border-none p-6 flex flex-col gap-6">
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
            {TASK_TITLE}
          </h2>
          <p className="text-xs text-[#54577A]">{TASK_SUBTITLE}</p>
        </div>
      </div>
      <div className="w-full flex justify-between pb-2 text-base">
        <span>Progress</span>
        <span className="text-blue-500">{PROGRESS_PERCENTAGE}%</span>
      </div>
      <Progress
        value={PROGRESS_PERCENTAGE}
        className="h-2 [&>div]:bg-[#546FFF] bg-[#BAC8FF]"
      />
      <div className="w-full flex justify-between items-center">
        <div className="flex text-base items-center gap-2">
          <Clock className="h-5 w-5 text-[#54577A]" />
          <span>{TIME_ESTIMATE}</span>
        </div>
        <div className="flex -space-x-2">
          {[one, two, three, four, five].map((avatar, i) => (
            <Avatar key={i} className="h-6 w-6 border-2 cursor-pointer border-white">
              <img src={avatar} alt={`Avatar ${i + 1}`} className="w-full h-full object-cover" />
            </Avatar>
          ))}
        </div>
      </div>
      <Separator orientation="horizontal" />
      <div className="w-full">
        <div className="flex justify-between pb-2">
          <h3 className="font-semibold">Detail Task</h3>
          <span className="text-sm text-gray-500">{TASK_SUBTITLE}</span>
        </div>
        <div className="space-y-2">
          {DETAIL_TASKS.map((task, i) => (
            <div
              key={i}
              className="flex items-center gap-2 p-2 bg-white rounded"
            >
              <div className="h-6 w-6 bg-gray-100 rounded-lg font-semibold p-4 flex items-center justify-center">
                {i + 1}
              </div>
              <p className="text-sm">{task}</p>
            </div>
          ))}
        </div>
      </div>
      <Button onClick={()=>navigate("/detailtask")} className="w-full bg-[#546FFF] hover:bg-blue-600 font-semibold cursor-pointer text-white">
        Go To Detail
      </Button>
    </Card>
  );
};

export default TaskToday;
