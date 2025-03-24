import React, { useState, useEffect, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Clock } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import useEmblaCarousel from "embla-carousel-react";
import { Button } from "@/components/ui/button";
import one from "../../../assets/1.png";
import two from "../../../assets/2.png";
import three from "../../../assets/3.png";
import four from "../../../assets/4.png";
import { MdArrowBackIosNew } from "react-icons/md";
import { MdArrowForwardIos } from "react-icons/md";

interface TaskData {
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
interface TaskCardCarouselProps {
  tasks: TaskData[];
  title?: string;
  slidesToShow?: number; 
  showNavigation?: boolean;
}
const TaskCard: React.FC<TaskData> = ({
  title,
  category,
  progressPercent,
  daysLeft,
  teamMembers = [
    { name: "Person 1", image: one},
    { name: "Person 2", image: two},
    { name: "Person 3", image: three},
    { name: "Person 4", image: four},
  ],
  imageSrc,
}) => {
  return (
    <Card  className="p-0 w-full h-min bg-white rounded-xl shadow-none border-none pb-4">
      <div className="w-full">
        <img
          src={imageSrc}
          alt={title}
          className="w-full h-[110px] object-cover rounded-lg"
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
const TaskCardCarousel: React.FC<TaskCardCarouselProps> = ({
  tasks,
  title = "Upcoming Task",
  slidesToShow = 2, 
  showNavigation = true,
}) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    slidesToScroll: 1,
  });
  
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);
  
  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);
  
  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setPrevBtnEnabled(emblaApi.canScrollPrev());
    setNextBtnEnabled(emblaApi.canScrollNext());
  }, [emblaApi]);
  
  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);
  const getWidthClass = () => {
    if (slidesToShow === 4) {
      return "md:w-1/4 w-full";
    } else if (slidesToShow === 2) {
      return "md:w-1/2 w-full";
    }
    return "w-full";
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center pb-4">
        <h2 className="text-xl md:text-2xl font-semibold text-[#141522]">
          {title}
        </h2>
        {showNavigation && (
          <div className="flex items-center gap-2">
            <Button
              className="p-1 rounded-full cursor-pointer hover:bg-gray-100 disabled:opacity-30"
              onClick={scrollPrev}
              disabled={!prevBtnEnabled}
              variant="ghost"
            >
            <MdArrowBackIosNew/>
            </Button>
            <Button
              className="p-1 rounded-full cursor-pointer hover:bg-gray-100 disabled:opacity-30"
              onClick={scrollNext}
              disabled={!nextBtnEnabled}
              variant="ghost"
            >
            <MdArrowForwardIos/>
            </Button>
          </div>
        )}
      </div>
      <div className="overflow-hidden" ref={emblaRef}>
        <div
          className="flex"
          style={{
            display: "flex",
            backfaceVisibility: "hidden",
          }}
        >
          {tasks.map((task, index) => (
            <div
              key={`${task.title}-${index}`}
              className={`flex-none ${getWidthClass()}`}
              style={{
                minWidth: 0,
                paddingRight: index === tasks.length - 1 ? "0" : "1rem",
              }}
            >
              <div className="flex w-full justify-center">
                <TaskCard
                  key={index}
                  title={task.title}
                  category={task.category}
                  progressPercent={task.progressPercent}
                  daysLeft={task.daysLeft}
                  teamMembers={task.teamMembers}
                  imageSrc={task.imageSrc}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export { TaskCardCarousel, TaskCard };