import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { ASSIGNMENT_DETAILS, ASSESSMENT_ESSENCE } from "../../../constants";
import people from "../../../assets/profile-2user.png";
import tick from "../../../assets/tick-circle.png";

const MainTask: React.FC = () => {
  return (
    <Card className="w-full shadow-none border-none lg:h-fit lg:pb-5 sm:pb-5 pb-5 md:pb-5 lg:w-2/3 flex flex-col md:p-0">
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
                  <img src={people} alt="people" />
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
              <div key={index} className="flex items-center gap-2">
                <img src={tick} alt="check" />
                <p>{essence}</p>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MainTask;