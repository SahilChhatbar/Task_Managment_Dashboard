import React, { useState, useRef, useEffect } from "react";
import { CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import video from "../../../assets/video call.png";
import call from "../../../assets/voice call.png";
import attach from "../../../assets/attach-circle.png";
import send from "../../../assets/send.png";
import { Input } from "@/components/ui/input";

interface Message {
  id: string;
  content: string;
  sender: "user" | "other";
  timestamp: string;
  type: "text" | "image";
  imageUrl?: string;
}

interface Conversation {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  read: boolean;
  messages: Message[]; 
}

interface ChatInterfaceProps {
  activeConversation: Conversation;
  onUpdateConversations: (updater: (conversations: Conversation[]) => Conversation[]) => void;
  onBack?: () => void;
}

const formatMessageTime = (timestamp: string) => {
  const date = new Date(timestamp);
  const now = new Date();
  const isToday = date.toDateString() === now.toDateString();

  const timeString = date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  return isToday ? `Today, ${timeString}` : date.toLocaleDateString();
};

const ChatInterface: React.FC<ChatInterfaceProps> = ({
  activeConversation,
  onUpdateConversations,
  onBack,
}) => {
  const [newMessage, setNewMessage] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messages = activeConversation.messages || [
    {
      id: "initial-msg",
      content: `Hi there! Is there anything I can help you with?`,
      sender: "other",
      timestamp: new Date().toISOString(),
      type: "text",
    }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (content: string, imageUrl?: string) => {
    if (!content.trim() && !imageUrl) return;

    const newMsg: Message = {
      id: Date.now().toString(),
      content: content || "Sent an image",
      sender: "user",
      timestamp: new Date().toISOString(),
      type: imageUrl ? "image" : "text",
      imageUrl,
    };

    onUpdateConversations(conversations => 
      conversations.map(conv => 
        conv.id === activeConversation.id 
          ? { 
              ...conv, 
              messages: [...(conv.messages || []), newMsg],
              read: true 
            }
          : conv
      )
    );
    setNewMessage("");
  };

  const handleImageAttachment = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type.startsWith("image/")) {
      const imageUrl = URL.createObjectURL(file);
      handleSendMessage("", imageUrl);
    }
  };

  return (
    <div className="flex flex-col w-full shadow-none rounded-none h-full">
      <CardHeader className="sticky border-t top-0 flex flex-row p-6 justify-between items-center bg-white">
        <div className="flex items-center gap-2">
          {onBack && (
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={onBack}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
          )}
          <img
            src={activeConversation.avatar}
            alt={activeConversation.name}
            className="w-13 h-13 rounded-full"
          />
          <div className="pl-3">
            <h3 className="font-medium">{activeConversation.name}</h3>
            <div className="flex flex-row gap-1 items-center">
              <div className="w-2 h-2 rounded-full bg-[#25C78B]"></div>
              <p className="text-xs text-[#141522]">Online</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" className="cursor-pointer">
            <img
              src={video}
              alt="video"
              className="border-1 rounded-full p-3"
            />
          </Button>
          <Button variant="ghost" className="cursor-pointer">
            <img src={call} alt="call" className="border-1 rounded-full p-3" />
          </Button>
        </div>
      </CardHeader>
      <div className="flex-1 p-4 w-full overflow-y-auto bg-[#F5F5F7]">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex flex-col ${
                message.sender === "user" ? "items-end" : "items-start"
              }`}
            >
              <div
                className={`${
                  message.sender === "user"
                    ? "bg-[#546FFF] text-white"
                    : "bg-white"
                } rounded-lg shadow-sm p-3 max-w-xs`}
              >
                {message.type === "image" && message.imageUrl && (
                  <img
                    src={message.imageUrl}
                    alt="Sent image"
                    className="max-w-[200px] rounded-lg"
                  />
                )}
                {message.type === "text" && (
                  <p className="text-sm">{message.content}</p>
                )}
              </div>
              <span className="text-xs text-gray-500 mt-1">
                {formatMessageTime(message.timestamp)}
              </span>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>
      <div className="p-4 border-t sticky bottom-0 bg-white z-10">
        <div className="flex items-center">
          <Input
            type="text"
            placeholder="Send your message..."
            className="flex-1 p-3 focus:outline-none shadow-none rounded-2xl"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage(newMessage);
              }
            }}
          />
          <Input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/*"
            onChange={handleImageAttachment}
          />
          <div className="flex items-center gap-5">
            <Button
              variant="ghost"
              className="cursor-pointer"
              onClick={() => fileInputRef.current?.click()}
            >
              <img src={attach} alt="attach" />
            </Button>
            <Button
              variant="ghost"
              className="cursor-pointer"
              onClick={() => handleSendMessage(newMessage)}
            >
              <img src={send} alt="send" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;