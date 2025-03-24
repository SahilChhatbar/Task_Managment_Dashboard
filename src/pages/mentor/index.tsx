import { mentors } from "@/constants";
import MentorCard from "../dashboard/components/MentorCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ListFilterIcon } from "lucide-react";

const Mentor = () => {
  return (
    <div className="jakarta grid grid-cols-1 gap-8 lg:p-0 md:p-0 sm:p-0 p-7">
      <div className="block flex-col md:hidden text-start text-2xl font-semibold text-[#141522]">
        <h2>Explore Task</h2>
        <div className="flex items-center justify-between flex-row">
          <Input
            placeholder="Search Task"
            className="border-none w-80 h-13 bg-white"
          />
          <div className="flex text-xs text-[#141522] flex-row">
            <Button
              variant="outline"
              className="cursor-pointer flex items-center gap-2 h-13 w-13 bg-white"
            >
              <ListFilterIcon className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
      <div className="p-6 md:p-8 flex flex-col gap-8">
        <div className="flex flex-col gap-8">
          <MentorCard 
            mentors={mentors} 
            slidesToShow={4}     
            title="Recent Mentors"
            showNavigation={true}
          />
        </div>
        <div className="flex flex-col gap-8">
          <div>
            <h2 className="text-xl md:text-2xl font-semibold text-[#141522] ">
            Mentors
            </h2>
            <div className="flex flex-col gap-8">
              <MentorCard 
                mentors={mentors.slice(0, 4)} 
                showDescription={true}
                isPopular={true}
                showNavigation={false}
                title=""
              />
              <MentorCard 
                mentors={mentors.slice(4, 8)} 
                showDescription={true}
                isPopular={true}
                showNavigation={false}
                title=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mentor;