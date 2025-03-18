import React from 'react';

interface CardProps {
  title: string;
  category: string;
  progress: number;
  daysLeft: number;
  teamMembers: string[];
  image?: string; // Optional image URL
}

const ProjectCard: React.FC<CardProps> = ({ 
  title, 
  category, 
  progress, 
  daysLeft, 
  teamMembers,
  image
}) => {
  return (
    <div className="w-80 h-80 bg-white rounded-lg shadow-md overflow-hidden">
      {/* Card Image */}
      <div className="h-40 bg-gray-100 w-full overflow-hidden">
        <img 
          src={image || "/api/placeholder/328/160"} 
          alt="Project Screenshot" 
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Card Content */}
      <div className="p-4">
        {/* Title and Category */}
        <div className="pb-4">
          <h3 className="text-lg font-bold text-gray-800">{title}</h3>
          <p className="text-sm text-gray-500">{category}</p>
        </div>
        
        {/* Progress Section */}
        <div className="pb-4">
          <div className="flex justify-between pb-1">
            <span className="text-sm font-medium text-gray-700">Progress</span>
            <span className="text-sm font-medium text-blue-500">{progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-500 h-2 rounded-full" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
        
        {/* Time and Team */}
        <div className="flex justify-between items-center">
          <div className="flex items-center text-gray-500">
            <svg className="w-4 h-4 pr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" fill="none"/>
              <path d="M12 7V12L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <span className="text-sm">{daysLeft} Days Left</span>
          </div>
          
          {/* Team Members */}
          <div className="flex -space-x-2">
            {teamMembers.slice(0, 4).map((member, index) => (
              <div 
                key={index} 
                className="w-6 h-6 rounded-full bg-gray-300 border-2 border-white flex items-center justify-center overflow-hidden text-xs"
              >
                {member.charAt(0)}
              </div>
            ))}
            {teamMembers.length > 4 && (
              <div className="w-6 h-6 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-xs">
                +{teamMembers.length - 4}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;