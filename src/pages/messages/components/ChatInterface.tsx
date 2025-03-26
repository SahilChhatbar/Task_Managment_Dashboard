import React, { useState, useRef, useEffect } from "react";
import { Card, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import video from "../../../assets/video call.png";
import call from "../../../assets/voice call.png";
import attach from "../../../assets/attach-circle.png";
import send from "../../../assets/send.png";
import { INITIAL_CHAT_HISTORY } from "@/constants";
import { ArrowLeft } from "lucide-react";

const formatMessageTime = (timestamp: string) => {
  const date = new Date(timestamp);
  const now = new Date();
  const isToday = date.toDateString() === now.toDateString();
  
  const timeString = date.toLocaleTimeString('en-US', { 
    hour: 'numeric', 
    minute: '2-digit',
    hour12: true 
  });
  
  return isToday ? `Today, ${timeString}` : date.toLocaleDateString();
};

interface Message {
  id: string;
  content: string;
  sender: "user" | "other";
  timestamp: string;
  type: "text" | "file" | "image";
  fileUrl?: string;
  fileName?: string;
  caption?: string;
}

interface Conversation {
  id: string;
  name: string;
  avatar: string;
  time: string;
  lastMessage: string;
  read: boolean;
}

interface ChatHistory {
  [conversationId: string]: Message[];
}

interface ChatInterfaceProps {
  activeConversation: Conversation;
  onUpdateConversations: (conversations: Conversation[]) => void;
  onBack?: () => void;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({
  activeConversation,
  onUpdateConversations,
  onBack,
}) => {
  const [newMessage, setNewMessage] = useState("");
  const [chatHistory, setChatHistory] = useState<ChatHistory>(INITIAL_CHAT_HISTORY);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
    if (!chatHistory[activeConversation.id]) {
      setChatHistory((prev) => ({
        ...prev,
        [activeConversation.id]: [],
      }));
    }
  }, [activeConversation, chatHistory]);

  const handleSendMessage = (
    content: string,
    type: "text" | "file" | "image" = "text",
    fileDetails?: { url: string; name: string }
  ) => {
    if (!content.trim() && type === "text") return;

    const newMsg: Message = {
      id: Date.now().toString(),
      content,
      sender: "user",
      timestamp: new Date().toISOString(),
      type,
      ...(fileDetails && {
        fileUrl: fileDetails.url,
        fileName: fileDetails.name,
      }),
    };

    setChatHistory((prev) => ({
      ...prev,
      [activeConversation.id]: [...(prev[activeConversation.id] || []), newMsg],
    }));

    const updatedConversations = (conversations: Conversation[]) =>
      conversations.map((conv) =>
        conv.id === activeConversation.id
          ? { ...conv, lastMessage: `You: ${content}`, read: true }
          : conv
      );

    onUpdateConversations(updatedConversations);
    setNewMessage("");
  };

  const handleAttachment = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const fileUrl = URL.createObjectURL(file);
    const isImage = file.type.startsWith("image/");

    if (isImage) {
      handleSendMessage(newMessage || "Sent an image", "image", {
        url: fileUrl,
        name: file.name,
      });
    } else {
      handleSendMessage(newMessage || `Sent file: ${file.name}`, "file", {
        url: fileUrl,
        name: file.name,
      });
    }
  };

  return (
    <Card className="flex flex-col w-full shadow-none rounded-none h-full">
      <CardHeader className="sticky top-0 flex flex-row justify-between items-center bg-white z-20">
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
            <img src={video} alt="video" className="border-1 rounded-full p-3" />
          </Button>
          <Button variant="ghost" className="cursor-pointer">
            <img src={call} alt="call" className="border-1 rounded-full p-3" />
          </Button>
        </div>
      </CardHeader>
      <div className="flex-1 p-4 w-full overflow-scroll bg-[#fafafa] h-full no-scrollbar">
        <div className="space-y-4">
          {chatHistory[activeConversation.id]?.map((message) => (
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
                {message.type === "image" ? (
                  <div>
                    <img
                      src={message.fileUrl}
                      alt={message.fileName}
                      className="max-w-[200px] rounded-lg pb-1"
                    />
                    {message.content !== "Sent an image" && (
                      <p className="text-sm pt-1">{message.content}</p>
                    )}
                  </div>
                ) : message.type === "file" ? (
                  <div>
                    <a
                      href={message.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm underline"
                    >
                      📎 {message.fileName}
                    </a>
                    {message.content !== `Sent file: ${message.fileName}` && (
                      <p className="text-sm pt-1">{message.content}</p>
                    )}
                  </div>
                ) : (
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
        <div className="flex items-baseline">
          <input
            type="text"
            placeholder="Send your message..."
            className="flex-1 p-3 focus:outline-none rounded-2xl"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage(newMessage);
              }
            }}
          />
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            onChange={handleAttachment}
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
    </Card>
  );
};

export default ChatInterface;