import React, { useState } from "react";
import { MdArticle } from "react-icons/md";
import { FaStar } from "react-icons/fa";

interface ProfileCardProps {
  name: string;
  designation: string;
  tasks: number;
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
  avatarUrl = "/api/placeholder/48/48",
}) => {
  const [isFollowing, setIsFollowing] = useState(false);

  const handleFollowClick = () => {
    setIsFollowing(!isFollowing);
  };

  return (
    <div className="flex flex-col p-3 bg-white rounded-[10px] w-82 h-35 justify-around">
      <div className="flex justify-around items-center">
        <div className="flex items-center gap-2">
          <img
            src={avatarUrl}
            alt={`${name}'s profile`}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <h3 className="jakarta font-semibold text-base text-[#141522]">
              {name}
            </h3>
            <p className="jakarta text-xs text-[#54577A]">{designation}</p>
          </div>
        </div>
        <button
          className={`cursor-pointer text-sm font-medium ${
            isFollowing ? "jakarta text-[#54577A]" : "jakarta text-[#546FFF]"
          }`}
          onClick={handleFollowClick}
        >
          {isFollowing ? "Followed" : "+ Follow"}
        </button>
      </div>

      <div className="flex items-center justify-around">
        <div className="flex items-center gap-2">
          <MdArticle className="text-2xl  text-[#54577A]" />
          <span className="jakarta text-sm font-medium text-[#141522]">
            {tasks} Task
          </span>
        </div>

        <div className="flex items-center ">
          <FaStar className="text-2xl text-[#FFB054]" />
          <span className="jakarta font-medium text-sm text-[#141522]">
            {reviews.rating} ({reviews.count} Reviews)
          </span>
        </div>
      </div>
    </div>
  );
};

export default MentorCard;
