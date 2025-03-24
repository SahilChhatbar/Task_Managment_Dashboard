import { useState } from "react";
import { Card, CardHeader } from "@/components/ui/card";
import { Search } from "lucide-react";
import { initialConversations } from "@/constants";
import { MdDoneAll } from "react-icons/md";
import video from "../../assets/video call.png";
import call from "../../assets/voice call.png"; 
import attach from "../../assets/attach-circle.png";
import send from "../../assets/send.png";

const Messages = () => {
  const [conversations, setConversations] = useState(initialConversations);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeConversation, setActiveConversation] = useState(
    initialConversations[0]
  );
  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    if (term.trim() === "") {
      setConversations(initialConversations);
    } else {
      const filtered = initialConversations.filter((convo) =>
        convo.name.toLowerCase().includes(term.toLowerCase())
      );
      setConversations(filtered);
    }
  };
  const highlightMatch = (name:string) => {
    if (!searchTerm) return name;

    const regex = new RegExp(`(${searchTerm})`, "gi");
    const parts = name.split(regex);

    return (
      <>
        {parts.map((part, i) =>
          regex.test(part) ? (
            <span key={i} className="bg-yellow-200">
              {part}
            </span>
          ) : (
            <span key={i}>{part}</span>
          )
        )}
      </>
    );
  };

  const handleSelectConversation = (convo) => {
    const updatedConversations = initialConversations.map((c) =>
      c.id === convo.id ? { ...c, read: true } : c
    );
    setConversations(
      searchTerm
        ? conversations.map((c) =>
            c.id === convo.id ? { ...c, read: true } : c
          )
        : updatedConversations
    );

    setActiveConversation(convo);
  };

  return (
    <div className="flex flex-row h-screen bg-gray-50">
      {/* Conversation List */}
      <Card className="jakarta flex flex-col w-1/3 p-6 shadow-none border-1 rounded-none h-full">
        <div className="sticky top-0 bg-white z-10">
          <div className="relative">
            <input
              type="text"
              placeholder="Search Name"
              className="w-full h-13 p-7 rounded-md border border-gray-200 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <Search className="absolute right-3 top-5 h-5 w-5 text-[#141522]" />
          </div>
        </div>
        <div className="flex-1 overflow-y-scroll no-scrollbar">
          {conversations.length > 0 ? (
            conversations.map((convo) => (
              <div
                key={convo.id}
                className={`flex items-center p-4 border-b cursor-pointer  hover:bg-gray-50 ${
                  activeConversation.id === convo.id
                    ? "bg-gray-100 rounded-[10px]"
                    : ""
                }`}
                onClick={() => handleSelectConversation(convo)}
              >
                <div className="relative">
                  <img
                    src={convo.avatar}
                    alt={convo.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                </div>
                <div className="flex-1 flex flex-col pl-3 gap-1 min-w-0">
                  <div className="flex justify-between items-baseline">
                    <h4 className="text-sm font-semibold text-[#141522] truncate">
                      {highlightMatch(convo.name)}
                    </h4>
                    <div className="flex flex-col items-end">
                      <span className="text-xs text-gray-500">
                        {convo.time}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-row items-center justify-between">
                    <p
                      className={`text-xs ${
                        convo.read ? "text-[#8E92BC]" : "text-[#141522]"
                      } truncate`}
                    >
                      {convo.lastMessage}
                    </p>
                    <div>
                      {convo.read ? (
                        <div className="flex items-center justify-center">
                          <span className="text-white text-xs">
                            <MdDoneAll color="#04A4F4" size={14} />
                          </span>
                        </div>
                      ) : (
                        <div className="flex items-center justify-center w-2 h-2 rounded-full bg-[#DB5962]"></div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="p-4 text-center text-gray-500">
              No conversations match your search
            </div>
          )}
        </div>
      </Card>
      {/* Chat Interface */}
      <Card className="flex flex-col w-2/3 shadow-none rounded-none h-full">
        <CardHeader className="sticky flex flex-row justify-between items-center bg-white">
          <div className="flex items-center">
            <img
              src={activeConversation.avatar}
              alt={activeConversation.name}
              className="w-13 h-13 rounded-full"
            />
            <div className="pl-3">
              <h3 className="font-medium">{activeConversation.name}</h3>
              <div className="flex flex-row gap-1 items-center">
              <div className="w-2 h-2 rounded-full bg-[#25C78B]"></div><p className="text-xs text-[#141522]">
                Online
              </p></div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <img src={video} alt="video" className="border-1 rounded-full p-3"/>
            <img src={call} alt="call" className="border-1 rounded-full p-3"/> </div>
        </CardHeader>
        <div className="flex-1 p-4 w-full overflow-scroll bg-[#fafafa] no-scrollbar">
          <div className="space-y-4">
            <div className="flex justify-start">
              <div className="bg-white rounded-lg shadow-sm p-3 max-w-xs">
                <p className="text-sm">Hello! How can I help you today?</p>
              </div>
            </div>
            <div className="flex justify-end">
              <div className="bg-[#546FFF] text-white rounded-lg shadow-sm p-3 max-w-xs">
                <p className="text-sm">
                  {activeConversation.lastMessage.replace("You: ", "")}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="p-4 border-t sticky bottom-0 bg-white z-10">
          <div className="flex items-center">
            <input
              type="text"
              placeholder="Send your message..."
              className="flex-1 p-3 focus:outline-none rounded-2xl"
            />
            <div className="flex items-center gap-5">
              <img src={attach}/>
              <button><img src={send}/></button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Messages;
