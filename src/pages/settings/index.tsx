import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";

interface SettingsProps {
  onSave?: () => void;
}

const Settings: React.FC<SettingsProps> = ({ onSave }) => {
  const [activeTab, setActiveTab] = useState("general");
  const [language, setLanguage] = useState("english");
  const [timezone, setTimezone] = useState("english");
  const [timeFormat, setTimeFormat] = useState("24");

  const handleSave = () => {
    if (onSave) {
      onSave();
    }
  };

  return (
    <div className="jakarta w-full p-7">
        <div className="block md:hidden text-start mb-4 text-2xl font-semibold text-[#141522]">
        Settings 
      </div>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="text-sm jakarta w-40  border-none bg-[#fafafa] flex gap-7">
          <TabsTrigger
            value="general"
            className="px-2 text-[#141522] py-2 rounded-none bg-transparent hover:bg-transparent data-[state=active]:border-b-2"
          >
            General
          </TabsTrigger>
          <TabsTrigger
            value="notification"
            className="px-2 text-[#141522] py-2 rounded-none bg-transparent hover:bg-transparent data-[state=active]:border-b-2"
          >
            Notification
          </TabsTrigger>
        </TabsList>
        <Separator orientation="horizontal" />
        <TabsContent value="general" className="pt-6 space-y-8">
          <div className="space-y-4">
            <Label className="block text-sm font-medium text-[#141522]">
              Language
            </Label>
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger className="w-100">
                <SelectValue placeholder="English (Default)" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="english">English (Default)</SelectItem>
                <SelectItem value="spanish">Spanish</SelectItem>
                <SelectItem value="french">French</SelectItem>
                <SelectItem value="german">German</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-4">
            <Label className="block  text-sm font-medium text-[#141522]">
              Timezone
            </Label>
            <Select value={timezone} onValueChange={setTimezone}>
              <SelectTrigger className="w-100">
                <SelectValue placeholder="English (Default)" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="english">English (Default)</SelectItem>
                <SelectItem value="us-eastern">US Eastern</SelectItem>
                <SelectItem value="us-central">US Central</SelectItem>
                <SelectItem value="us-mountain">US Mountain</SelectItem>
                <SelectItem value="us-pacific">US Pacific</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-4">
            <Label className="block text-sm text-[#141522] font-medium">
              Time Format
            </Label>
            <RadioGroup
              value={timeFormat}
              onValueChange={setTimeFormat}
              className="flex flex-col sm:flex-row sm:space-x-4"
            >
              <div className="flex items-center space-x-2 p-4 rounded-lg border border-input bg-background">
                <RadioGroupItem value="24" id="24hours" />
                <Label htmlFor="24hours" className="font-medium">
                  24 Hours
                </Label>
              </div>
              <div className="flex items-center space-x-2 p-4 rounded-lg border border-input bg-background">
                <RadioGroupItem value="12" id="12hours" />
                <Label htmlFor="12hours" className="font-medium">
                  12 Hours
                </Label>
              </div>
            </RadioGroup>
          </div>
          <div className="pt-6">
            <Button
              onClick={handleSave}
              className="cursor-pointer h-11 sm:h-11 md:h-11 lg:h-11 w-64 self-center md:54 lg:54 sm:w-54 bg-[#546FFF] text-white font-semibold hover:bg-primary/90"
            >
              Save Changes
            </Button>
          </div>
        </TabsContent>
        <TabsContent value="notification" className="pt-6">
          <TabsList>
            <div className="flex flex-col gap-8">
              <Label className="flex items-center gap-2">
                <Switch
                  id="messages"
                  className="data-[state=checked]:bg-[#546FFF]"
                />
                Messages
              </Label>
              <Label className="flex items-center gap-2">
                <Switch
                  id="task-updates"
                  className="data-[state=checked]:bg-[#546FFF]"
                />
                Task Updates
              </Label>
              <Label className="flex items-center gap-2">
                <Switch
                  id="task-deadline"
                  className="data-[state=checked]:bg-[#546FFF]"
                />
                Task Deadline
              </Label>
              <Label className="flex items-center gap-2">
                <Switch
                  id="mentor-help"
                  className="data-[state=checked]:bg-[#546FFF]"
                />
                Mentor Help
              </Label>
              <div className="pt-10">
              <Button
                onClick={handleSave}
                className="cursor-pointer h-11 sm:h-11 md:h-11 lg:h-11 w-64 md:54 self-center lg:54 sm:w-54 bg-[#546FFF] text-white font-semibold hover:bg-primary/90"
              >
                Save Changes
              </Button></div>
            </div>
          </TabsList>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;