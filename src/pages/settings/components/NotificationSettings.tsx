import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

interface NotificationSettingsProps {
  onSave: () => void;
}

const NotificationSettings = ({ onSave }: NotificationSettingsProps) => {
  return (
    <div className="flex flex-col gap-8">
      <Label className="flex items-center gap-2">
        <Switch
          id="messages"
          className="data-[state=checked]:bg-white cursor-pointer border-[#E4E4E7]"
        />
        Messages
      </Label>
      <Label className="flex items-center gap-2">
        <Switch
          id="task-updates"
          className="data-[state=checked]:bg-white cursor-pointer border-[#E4E4E7]"
        />
        Task Updates
      </Label>
      <Label className="flex items-center gap-2">
        <Switch
          id="task-deadline"
          className="data-[state=checked]:bg-white cursor-pointer border-[#E4E4E7]"
        />
        Task Deadline
      </Label>
      <Label className="flex items-center gap-2">
        <Switch
          id="mentor-help"
          className="data-[state=checked]:bg-white cursor-pointer border-[#E4E4E7]"
        />
        Mentor Help
      </Label>
      <div className="pt-10">
        <Button
          onClick={onSave}
          className="cursor-pointer h-11 sm:h-11 md:h-11 lg:h-11 w-64 md:54 self-center lg:54 sm:w-54 bg-[#546FFF] text-white font-semibold hover:bg-primary/90"
        >
          Save Changes
        </Button>
      </div>
    </div>
  );
};

export default NotificationSettings;