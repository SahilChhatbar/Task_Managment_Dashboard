import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface AssignmentCardProps {
  title: string;
  subtitle: string;
  studentName: string;
  studentClass: string;
  studentNumber: string;
  lastModified: string;
  onSubmit: () => void;
}

const AssignmentCard: React.FC<AssignmentCardProps> = ({
  title,
  subtitle,
  studentName,
  studentClass,
  studentNumber,
  lastModified,
  onSubmit,
}) => {
  return (
    <Card className="w-full shadow-none border-none lg:w-1/3 p-0 h-fit flex flex-col">
      <CardHeader className="pt-5 flex flex-col gap-4">
        <h2 className="text-sm font-semibold text-[#141522]">
          Assigned Assignments
        </h2>
        <CardTitle className="text-xl sm:text-2xl flex flex-col gap-2 text-[#141522] font-semibold">
          {title}
          <h3 className="text-sm text-[#54577A]">{subtitle}</h3>
        </CardTitle>
      </CardHeader>
      <CardContent className="pb-5 flex flex-col gap-6 flex-grow">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <h3 className="text-lg sm:text-xl font-semibold">Detail Student</h3>
            <div className="flex flex-col gap-4">
              <div className="flex justify-between text-sm">
                <p className="text-[#54577A]">Student's name</p>
                <p className="font-semibold">{studentName}</p>
              </div>
              <div className="flex justify-between text-sm">
                <p className="text-[#54577A]">Student Class</p>
                <p className="font-semibold">{studentClass}</p>
              </div>
              <div className="flex justify-between text-sm">
                <p className="text-[#54577A]">Student Number</p>
                <p className="font-semibold">{studentNumber}</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <h3 className="text-lg sm:text-xl font-semibold">File Task</h3>
            <div className="flex flex-col gap-3">
              <div className="flex justify-between text-sm">
                <p className="text-[#54577A] font-medium">Last Modified</p>
                <p className="font-medium">{lastModified}</p>
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-[#54577A] font-medium text-sm">
                  File submissions
                </p>
                <Label
                  htmlFor="file-upload"
                  className="cursor-pointer border-2 border-dashed border-[#546FFF] rounded-lg p-6 sm:p-8 flex flex-col items-center justify-center"
                >
                  <div className="text-[#546FFF]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M20 11v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h8l4 4v4"></path>
                      <path d="M8 16h8"></path>
                      <path d="M8 12h8"></path>
                    </svg>
                  </div>
                </Label>
                <Input id="file-upload" type="file" className="hidden" />
                <p className="text-sm text-[#546FFF] text-start pt-2">
                  *drag or browser from device
                </p>
              </div>
            </div>
          </div>
        </div>
        <Button
          onClick={onSubmit}
          className="w-full cursor-pointer bg-[#546FFF] hover:bg-blue-600 text-white"
        >
          Submit
        </Button>
      </CardContent>
    </Card>
  );
};

export default AssignmentCard;