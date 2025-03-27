import React, { useState, useEffect, useCallback } from "react";
import { FaStar } from "react-icons/fa";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import useEmblaCarousel from "embla-carousel-react";
import note from "../../../assets/note-2.png";
import { MdArrowBackIosNew } from "react-icons/md";
import { MdArrowForwardIos } from "react-icons/md"; 

interface MentorData {
  name: string;
  designation: string;
  tasks: number;
  reviews: {
    rating: number;
    count: number;
  };
  description?: string;
  avatarUrl: string;
}
interface MentorCardProps {
  mentors: MentorData[];
  showDescription?: boolean;
  slidesToShow?: number;
  title?: string;
  showNavigation?: boolean;
  isPopular?: boolean;
}
const MentorCard: React.FC<MentorCardProps> = ({
  mentors,
  showDescription = false,
  slidesToShow = 4,
  title = "Recent Mentors",
  showNavigation = true,
  isPopular = false,
}) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    slidesToScroll: 1,
  });
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);
  const [followingState, setFollowingState] = useState<{
    [key: string]: boolean;
  }>({});

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

  const handleFollowClick = (mentorName: string) => {
    setFollowingState((prev) => ({
      ...prev,
      [mentorName]: !prev[mentorName],
    }));
  };
  const getWidthClass = () => {
    if (slidesToShow === 4) {
      return "md:w-6/21 w-full";
    } else if (slidesToShow === 2) {
      return "md:w-11/23 w-full";
    }
    return "md:w-1/4 w-full";
  };

  if (isPopular) {
    return (
      <div className="w-full">
        <div className="flex justify-between items-center pb-4">
          <h2 className="text-xl md:text-2xl font-semibold text-[#141522]">
            {title}
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
          {mentors.map((mentor, index) => (
            <Card
              key={`${mentor.name}-${index}`}
              className="p-0 md:w-89 w-full shadow-none h-min bg-white rounded-[10px] border-none"
            >
              <CardContent className="p-4 flex flex-col gap-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <img
                      src={mentor.avatarUrl}
                      alt={`${mentor.name}'s profile`}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="font-semibold text-base text-[#141522]">
                        {mentor.name}
                      </h3>
                      <p className="text-xs text-[#54577A]">
                        {mentor.designation}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    className={`px-0 h-auto text-sm font-medium cursor-pointer ${
                      followingState[mentor.name]
                        ? "text-[#54577A]"
                        : "text-[#546FFF]"
                    }`}
                    onClick={() => handleFollowClick(mentor.name)}
                  >
                    {followingState[mentor.name] ? "Followed" : "+ Follow"}
                  </Button>
                </div>
                {showDescription && mentor.description && (
                  <div className="text-sm text-[#54577A] leading-[200%] line-clamp-2">
                    {mentor.description}
                  </div>
                )}
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <img src={note}/>
                    <span className="text-sm text-[#141522]">
                      {mentor.tasks} Task
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaStar className="text-lg text-[#FFB054]" />
                    <span className="text-sm text-[#141522]">
                      {mentor.reviews.rating} ({mentor.reviews.count} Reviews)
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }
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
          className="flex gap-8"
          style={{
            display: "flex",
            backfaceVisibility: "hidden",
          }}
        >
          {mentors.map((mentor, index) => (
            <div
              key={`${mentor.name}-${index}`}
              className={`flex-none ${getWidthClass()}`}
              style={{
                minWidth: 0,
                paddingRight: index === mentors.length - 1 ? "0" : "1rem",
              }}
            >
              <Card className="p-0 w-full h-min bg-white rounded-[10px] shadow-none border-none">
                <CardContent className="p-4 flex flex-col gap-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <img
                        src={mentor.avatarUrl}
                        alt={`${mentor.name}'s profile`}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <h3 className="font-semibold text-base text-[#141522]">
                          {mentor.name}
                        </h3>
                        <p className="text-xs text-[#54577A]">
                          {mentor.designation}
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      className={`px-0 h-auto text-sm cursor-pointer font-medium ${
                        followingState[mentor.name]
                          ? "text-[#54577A]"
                          : "text-[#546FFF]"
                      }`}
                      onClick={() => handleFollowClick(mentor.name)}
                    >
                      {followingState[mentor.name] ? "Followed" : "+ Follow"}
                    </Button>
                  </div>

                  {showDescription && mentor.description && (
                    <div className="text-sm text-[#54577A] line-clamp-2">
                      {mentor.description}
                    </div>
                  )}

                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                    <img src={note}/>
                      <span className="text-sm text-[#141522]">
                        {mentor.tasks} Task
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaStar className="text-lg text-[#FFB054]" />
                      <span className="text-sm text-[#141522]">
                        {mentor.reviews.rating} ({mentor.reviews.count} Reviews)
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MentorCard;
