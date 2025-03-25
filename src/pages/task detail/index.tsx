import React from "react";
import { Button } from "@/components/ui/button";
import { ListFilterIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { STUDENT_DETAILS } from "../../constants";
import MainTask from "./components/MainTask";
import Assignment from "./components/Assignment";

interface DetailTaskProps {
  studentName?: string;
  studentClass?: string;
  studentNumber?: string;
  lastModified?: string;
}

const DetailTask: React.FC<DetailTaskProps> = ({
  studentName = STUDENT_DETAILS.name,
  studentClass = STUDENT_DETAILS.class,
  studentNumber = STUDENT_DETAILS.number,
  lastModified = STUDENT_DETAILS.lastModified,
}) => {
  const handleSubmit = () => {
    console.log("Assignment submitted");
  };

  return (
    <div className="jakarta flex flex-col p-4 sm:p-6 w-full bg-gray-50 rounded-lg">
      <div className="block md:hidden text-start pb-4">
        <h2 className="text-xl font-semibold text-[#141522]">Detail Task</h2>
        <div className="flex items-center justify-between flex-row pt-2">
          <Input
            placeholder="Search Task"
            className="border-none w-full max-w-xs bg-white"
          />
          <div className="flex text-xs text-[#141522] pl-2">
            <Button
              variant="outline"
              className="cursor-pointer flex items-center gap-2 bg-white h-10 w-10"
            >
              <ListFilterIcon className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row gap-6 w-full">
        <MainTask />
        <Assignment
          title="Assignment Title"
          subtitle="Assignment Subtitle"
          studentName={studentName}
          studentClass={studentClass}
          studentNumber={studentNumber}
          lastModified={lastModified}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};

export default DetailTask;