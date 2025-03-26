import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Card } from "@/components/ui/card";
import GeneralSettings from "./components/GeneralSettings";
import NotificationSettings from "./components/NotificationSettings";

interface SettingsProps {
  onSave?: () => void;
}

const Settings: React.FC<SettingsProps> = ({ onSave }) => {
  const [activeTab, setActiveTab] = useState("general");

  const handleSave = () => {
    if (onSave) {
      onSave();
    }
  };

  return (
    <div className="w-full p-7">
      <div className="block md:hidden text-start mb-4 text-2xl font-semibold text-[#141522]">
        Settings
      </div>
      <Card className="w-full shadow-none border-none lg:w-full lg:h-fit h-fit flex flex-col md:p-7">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="text-sm   border-none bg-[#ffffff] flex gap-7">
            <TabsTrigger
              value="general"
              className="relative cursor-pointer px-2 text-[#141522] py-2 rounded-none bg-transparent hover:bg-transparent data-[state=active]:text-[#546FFF] data-[state=active]:font-medium"
            >
              General
            </TabsTrigger>
            <TabsTrigger
              value="notification"
              className="relative cursor-pointer px-2 text-[#141522] py-2 rounded-none bg-transparent hover:bg-transparent data-[state=active]:text-[#546FFF] data-[state=active]:font-medium"
            >
              Notification
            </TabsTrigger>
          </TabsList>
          <div className="relative">
            <Separator className="bg-[#E4E4E7]" />
            <div
              className="absolute bottom-0 left-0 h-[2px] bg-[#546FFF] transition-all duration-300"
              style={{
                width: "75px",
                transform: `translateX(${
                  activeTab === "general" ? "0px" : "110px"
                })`,
              }}
            />
          </div>
          <TabsContent value="general" className="pt-6">
            <GeneralSettings onSave={handleSave} />
          </TabsContent>
          <TabsContent value="notification" className="pt-6">
            <NotificationSettings onSave={handleSave} />
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};

export default Settings;