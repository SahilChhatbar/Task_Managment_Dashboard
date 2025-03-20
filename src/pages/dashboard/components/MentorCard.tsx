import React, { useState } from "react";
import { MdArticle } from "react-icons/md";
import { FaStar } from "react-icons/fa";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ProfileCardProps {
  name: string;
  designation: string;
  tasks: number;
  description?: string;
  reviews: {
    rating: number;
    count: number;
  };
  avatarUrl: string;
}

const MentorCard: React.FC<ProfileCardProps> = ({
  name,
  designation,
  tasks,
  reviews,
  description,
  avatarUrl = "/api/placeholder/48/48",
}) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const handleFollowClick = () => {
    setIsFollowing(!isFollowing);
  };

  return (
    <Card className="p-0 w-full bg-white rounded-xl border-none">
      <CardContent className="p-4 flex flex-col gap-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img
              src={avatarUrl}
              alt={`${name}'s profile`}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <h3 className="font-semibold text-base text-[#141522]">{name}</h3>
              <p className="text-xs text-[#54577A]">{designation}</p>
            </div>
          </div>
          <Button
            variant="ghost"
            className={`px-0 h-auto text-sm font-medium ${
              isFollowing ? "text-[#54577A]" : "text-[#546FFF]"
            }`}
            onClick={handleFollowClick}
          >
            {isFollowing ? "Followed" : "+ Follow"}
          </Button>
        </div>
        
        {description && (
          <div className="text-sm text-[#54577A] line-clamp-2">
            {description}
          </div>
        )}
        
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <MdArticle className="text-lg text-[#54577A]" />
            <span className="text-sm text-[#141522]">{tasks} Task</span>
          </div>
          <div className="flex items-center gap-2">
            <FaStar className="text-lg text-[#FFB054]" />
            <span className="text-sm text-[#141522]">
              {reviews.rating} ({reviews.count} Reviews)
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MentorCard;