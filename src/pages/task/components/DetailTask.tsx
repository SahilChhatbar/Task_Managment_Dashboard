import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Clock, ListFilterIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { MdPeople } from "react-icons/md";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  ASSIGNMENT_DETAILS,
  ASSESSMENT_ESSENCE,
  STUDENT_DETAILS,
} from "../../../constants";

interface AssignmentProps {
  studentName?: string;
  studentClass?: string;
  studentNumber?: string;
  lastModified?: string;
}

const DetailTask: React.FC<AssignmentProps> = ({
  studentName = STUDENT_DETAILS.name,
  studentClass = STUDENT_DETAILS.class,
  studentNumber = STUDENT_DETAILS.number,
  lastModified = STUDENT_DETAILS.lastModified,
}) => {
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
        <Card className="w-full lg:w-2/3 flex flex-col p-0">
          <div className="w-full">
            <img
              src={ASSIGNMENT_DETAILS.image}
              alt="Mobile App Development Course"
              className="w-full object-cover"
            />
            <div className="p-4 sm:p-5">
              <div className="flex flex-col">
                <h2 className="text-2xl sm:text-3xl text-[#141522] font-semibold">
                  {ASSIGNMENT_DETAILS.title}
                </h2>
                <div className="flex items-center h-5 gap-3 flex-row pt-3">
                  <h3 className="text-sm text-[#54577A]">
                    {ASSIGNMENT_DETAILS.subtitle}
                  </h3>
                  <Separator orientation="vertical" className="h-full" />
                  <Button
                    variant="ghost"
                    className="cursor-pointer p-0 text-[#04A4F4]"
                  >
                    + Get Mentors
                  </Button>
                </div>
                <div className="flex gap-4 sm:gap-8 pt-3">
                  <div className="text-[#54577A] text-sm">
                    <span className="flex flex-row items-center gap-1">
                      <MdPeople size={16} />{" "}
                      {ASSIGNMENT_DETAILS.studentsInvolved} Students Involved
                    </span>
                  </div>
                  <div className="text-[#54577A] text-sm">
                    <span className="flex flex-row items-center gap-1">
                      <Clock size={16} /> {ASSIGNMENT_DETAILS.duration}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <CardContent className="flex flex-col gap-6 flex-grow">
            <div className="flex flex-col gap-2">
              <h3 className="text-xl sm:text-2xl font-semibold text-[#141522]">
                Description
              </h3>
              <p className="text-[#141522] text-sm">
                {ASSIGNMENT_DETAILS.description}
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <h3 className="text-xl sm:text-2xl font-semibold text-[#141522]">
                Essence of Assessment
              </h3>
              <div className="flex flex-col text-[#141522] text-sm gap-4">
                {ASSESSMENT_ESSENCE.map((essence, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <CheckCircle
                      className="text-blue-500 flex-shrink-0"
                      size={20}
                    />
                    <p>{essence}</p>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="w-full lg:w-1/3 p-0 h-fit flex flex-col">
          <CardHeader className="pt-5 flex flex-col gap-4">
            <h2 className="text-sm font-semibold text-[#141522]">
              Assigned Assignments
            </h2>
            <CardTitle className="text-xl sm:text-2xl flex flex-col gap-2 text-[#141522] font-semibold">
              {ASSIGNMENT_DETAILS.title}
              <h3 className="text-sm text-[#54577A]">
                {ASSIGNMENT_DETAILS.subtitle}
              </h3>
            </CardTitle>
          </CardHeader>
          <CardContent className="pb-5 flex flex-col gap-6 flex-grow">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-3">
                <h3 className="text-lg sm:text-xl font-semibold">
                  Detail Student
                </h3>
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
                      <p className="text-sm text-[#546FFF] text-center pt-2">
                        *drag or browser from device
                      </p>
                    </Label>
                    <Input id="file-upload" type="file" className="hidden" />
                  </div>
                </div>
              </div>
            </div>
            <div className="pt-2">
              <Button className="w-full cursor-pointer bg-[#546FFF] hover:bg-blue-600 text-white">
                Submit
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DetailTask;
