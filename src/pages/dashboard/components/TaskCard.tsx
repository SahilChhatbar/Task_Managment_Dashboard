import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Clock } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ProjectCardProps {
  title: string;
  category: string;
  progressPercent: number;
  daysLeft: number;
  teamMembers?: Array<{
    name: string;
    image: string;
  }>;
  imageSrc: string;
}
const ProjectCard: React.FC<ProjectCardProps> = ({
  title = "Creating Mobile App Design",
  category = "UI UX Design",
  progressPercent = 75,
  daysLeft = 3,
  teamMembers = [
    { name: "Person 1", image: "/api/placeholder/32/32" },
    { name: "Person 2", image: "/api/placeholder/32/32" },
    { name: "Person 3", image: "/api/placeholder/32/32" },
    { name: "Person 4", image: "/api/placeholder/32/32" },
  ],
  imageSrc = "/api/placeholder/328/180",
}) => {
  return (
    <Card className="jakarta w-full max-w-[328px] h-[314px] rounded-[10px] flex flex-col p-0">
      <div className="w-full">
        <img
          src={imageSrc}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>
      <CardContent className="p-4 pt-0 pb-0 flex flex-col gap-5 flex-grow">
        <div>
          <h3 className="font-semibold text-base text-[#141522]">{title}</h3>
          <p className="text-xs font-medium text-[#54577A]">{category}</p>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <span className="text-base font-medium">Progress</span>
            <span className="text-base text-[#546FFF] font-medium">
              {progressPercent}%
            </span>
          </div>
          <Progress
            value={progressPercent}
            className="h-2 [&>div]:bg-[#546FFF] text-white bg-[#BAC8FF]"
          />
        </div>
        <div className="flex justify-between items-center pb-0">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-[#54577A]" />
            <span className="text-base text-[#141522]">
              {daysLeft} Days Left
            </span>
          </div>
          <div className="flex -space-x-2">
            {teamMembers.map((member, index) => (
              <Avatar key={index} className="w-6 h-6 border-2 border-white">
                <AvatarImage src={member.image} alt={member.name} />
                <AvatarFallback>{member.name[0]}</AvatarFallback>
              </Avatar>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectCard;
