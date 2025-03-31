import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import search from "../../../assets/search-normal.png";
import { MdDoneAll } from "react-icons/md";

type Message = {
  id: string;
  content: string;
  sender: "user" | "other";
  timestamp: string;
  type: "text" | "image";
  imageUrl?: string;
};

type Conversation = {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  read: boolean;
  messages: Message[];
};

interface ChatListProps {
  onSelectConversation: (conversation: Conversation) => void;
  activeConversationId: string;
  conversations: Conversation[];
}
const ChatList: React.FC<ChatListProps> = ({
  onSelectConversation,
  activeConversationId,
  conversations: initialConversations,
}) => {
  const [conversations, setConversations] = useState(initialConversations);
  const [searchTerm, setSearchTerm] = useState("");
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
  const highlightMatch = (name: string) => {
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
  return (
    <Card className="flex flex-col w-full p-6 shadow-none border-1 rounded-none h-full">
      <h2 className="block flex-col md:hidden text-start text-2xl font-semibold text-[#141522]">Message</h2>
      <div className="sticky top-0 bg-white z-10">
        <Input
          type="text"
          placeholder="Search Name"
          className="w-full h-13 p-7 rounded-md border border-gray-200 text-sm focus:outline-none shadow-none"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <img src={search} className="absolute right-3 top-5" />
      </div>
      <div className="flex-1 overflow-y-scroll no-scrollbar">
        {conversations.length > 0 ? (
          conversations.map((convo) => (
            <div
              key={convo.id}
              className="group relative flex items-center p-6 border-b cursor-pointer"
              onClick={() => onSelectConversation(convo)}
            >
              {activeConversationId === convo.id && (
                <div className="absolute top-1/2 left-0 w-full h-17 -translate-y-1/2 bg-[#FAFAFA] rounded-[10px]"></div>
              )}
              <div className="absolute top-1/2 left-0 w-full h-17 -translate-y-1/2 opacity-0 group-hover:opacity-100 bg-[#FAFAFA] rounded-[10px] transition-opacity"></div>
              <div className="relative flex items-center w-full">
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
  );
};

export default ChatList;
