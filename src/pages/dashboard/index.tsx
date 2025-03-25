import Activity from "./components/Activity";
import MentorCard from "./components/MentorCard";
import RunningTaskCard from "./components/RunningTaskCard";
import { mentors, taskData } from "@/constants";
import { TaskCardCarousel } from "./components/TaskCard";

const Dashboard = () => {
  return (
    <div className="flex flex-col gap-7 p-7">
      <div className="block md:hidden text-start mb-4 text-2xl font-semibold text-[#141522]">
        Hi, Dennis <br />
        Nzioki
        <br />
        <span className="text-[#54577A] text-sm">
          Let's finish your task today!
        </span>
      </div>
      <div className="flex flex-col gap-8 md:flex-row">
        <RunningTaskCard />
        <Activity />
      </div>
      <div className="grid w-full grid-cols-1">
        <MentorCard 
          mentors={mentors} 
          slidesToShow={2} 
          title="Monthly Mentors"
          showNavigation={true}
        />
      </div>
      <div className="grid grid-cols-1 gap-8">
        <TaskCardCarousel
          tasks={taskData}
          title="Upcoming Task"
          slidesToShow={2} 
          showNavigation={true}
        />
      </div>
    </div>
  );
};

export default Dashboard;