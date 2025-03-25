import { useState } from "react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface GeneralSettingsProps {
  onSave: () => void;
}

const GeneralSettings = ({ onSave }: GeneralSettingsProps) => {
  const [language, setLanguage] = useState("english");
  const [timezone, setTimezone] = useState("english");
  const [timeFormat, setTimeFormat] = useState("24");

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <Label className="block text-sm font-medium text-[#141522]">
          Language
        </Label>
        <Select value={language} onValueChange={setLanguage}>
          <SelectTrigger className="w-100 cursor-pointer">
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
        <Label className="block text-sm font-medium text-[#141522]">
          Timezone
        </Label>
        <Select value={timezone} onValueChange={setTimezone} >
          <SelectTrigger className="w-100 cursor-pointer">
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
            <Label htmlFor="24hours" className="font-medium cursor-pointer">
              24 Hours
            </Label>
          </div>
          <div className="flex items-center space-x-2 p-4 rounded-lg border border-input bg-background">
            <RadioGroupItem value="12" id="12hours" />
            <Label htmlFor="12hours" className="font-medium cursor-pointer">
              12 Hours
            </Label>
          </div>
        </RadioGroup>
      </div>

      <div className="pt-6">
        <Button
          onClick={onSave}
          className="cursor-pointer h-11 sm:h-11 md:h-11 lg:h-11 w-64 self-center md:54 lg:54 sm:w-54 bg-[#546FFF] text-white font-semibold hover:bg-primary/90"
        >
          Save Changes
        </Button>
      </div>
    </div>
  );
};

export default GeneralSettings;