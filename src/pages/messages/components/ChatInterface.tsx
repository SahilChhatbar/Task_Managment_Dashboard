import React, { useState, useRef, useEffect } from "react";
import { CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import video from "../../../assets/video call.png";
import call from "../../../assets/voice call.png";
import attach from "../../../assets/attach-circle.png";
import send from "../../../assets/send.png";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface Message {
  id: string;
  content: string;
  sender: "user" | "other";
  timestamp: string;
  type: "text" | "image";
  imageUrl?: string;
  caption?: string; 
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
  onUpdateConversations: (
    updater: (conversations: Conversation[]) => Conversation[]
  ) => void;
  onBack?: () => void;
  isMobile?: boolean;
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

const formatMessageContent = (content: string) => {
  return content.split("\n").map((text, i) => (
    <React.Fragment key={i}>
      {text}
      {i !== content.split("\n").length - 1 && <br />}
    </React.Fragment>
  ));
};

const ChatInterface: React.FC<ChatInterfaceProps> = ({
  activeConversation,
  onUpdateConversations,
  onBack,
  isMobile = false,
}) => {
  const [newMessage, setNewMessage] = useState("");
  const [selectedImage, setSelectedImage] = useState<{
    url: string;
    file: File;
  } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const messages = activeConversation.messages || [
    {
      id: "+Date.now()",
      content: `Hi there! Is there anything I can help you with?`,
      sender: "other",
      timestamp: new Date().toISOString(),
      type: "text",
    },
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isMobile) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [isMobile]);

  const handleImageAttachment = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type.startsWith("image/")) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage({ url: imageUrl, file });
    }
  };
  const handleSendMessage = (content: string, imageUrl?: string) => {
    if (!content.trim() && !imageUrl && !selectedImage) return;

    const newMsg: Message = {
      id: Date.now().toString(),
      content: selectedImage ? "" : content.trim(),
      sender: "user",
      timestamp: new Date().toISOString(),
      type: imageUrl || selectedImage ? "image" : "text",
      imageUrl: imageUrl || selectedImage?.url,
      caption: selectedImage ? content.trim() : undefined, // Add caption if there's an image
    };

    onUpdateConversations((conversations) =>
      conversations.map((conv) =>
        conv.id === activeConversation.id
          ? {
              ...conv,
              messages: [...(conv.messages || []), newMsg],
              read: true,
            }
          : conv
      )
    );
    setNewMessage("");
    setSelectedImage(null);
  };

  const containerClassName = isMobile
    ? "fixed inset-0 z-50 flex flex-col w-full h-full bg-white"
    : "flex flex-col w-full shadow-none rounded-none h-full";

  return (
    <div className={containerClassName}>
      <CardHeader className="sticky border-t top-0 flex flex-row p-6 justify-between items-center bg-white">
        <div className="flex items-center pl-5 gap-2">
          {onBack && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onBack}
              className="flex lg:hidden"
            >
              <ArrowLeft size={30} />
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
        <div className="flex items-center gap-6 pr-3">
          <Button variant="ghost" className="cursor-pointer p-0">
            <img
              src={video}
              alt="video"
              className="border-1 rounded-full p-3"
            />
          </Button>
          <Button variant="ghost" className="cursor-pointer p-0">
            <img src={call} alt="call" className="border-1 rounded-full p-3" />
          </Button>
        </div>
      </CardHeader>
      <div
        ref={chatContainerRef}
        className="flex-1 p-4 w-full overflow-y-scroll no-scrollbar bg-[#F5F5F7] relative"
      >
        <div className="sticky top-2 flex justify-center">
          <div className="px-3 py-2 bg-[#141522] text-[#FFFFFF] text-sm rounded-[10px] shadow-none">
            Today
          </div>
        </div>
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
                }  rounded-lg shadow-sm p-3 md:max-w-[40%] md:inline-block break-words whitespace-pre-line`}
              >
                {message.type === "image" && message.imageUrl && (
                  <div className="flex flex-col">
                    <img
                      src={message.imageUrl}
                      alt="Sent image"
                      className="md:max-w-full max-w-70 rounded-lg pb-2"
                    />
                    {message.caption && (
                      <p className="text-sm">
                        {formatMessageContent(message.caption)}
                      </p>
                    )}
                  </div>
                )}
                {message.type === "text" && (
                  <p className="text-sm">
                    {formatMessageContent(message.content)}
                  </p>
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
        {selectedImage && (
          <div className="mb-2 p-2 bg-gray-100 rounded-lg flex items-center gap-2">
            <img
              src={selectedImage.url}
              alt="Selected"
              className="h-16 w-16 object-cover rounded"
            />
            <Button
              variant="ghost"
              size="sm"
              className="text-red-500 hover:text-red-700"
              onClick={() => setSelectedImage(null)}
            >
              ✕
            </Button>
          </div>
        )}
        <div className="flex items-center">
          <Textarea
            placeholder={
              selectedImage ? "Add a caption..." : "Send your message..."
            }
            className="flex-1 p-3 focus:outline-none shadow-none rounded-2xl resize-none min-h-10 max-h-32"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage(newMessage);
              }
            }}
            rows={1}
            style={{ height: "auto", overflow: "hidden" }}
            onInput={(e) => {
              const target = e.target as HTMLTextAreaElement;
              target.style.height = "auto";
              target.style.height = Math.min(target.scrollHeight, 128) + "px";
            }}
          />
          <Input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/*"
            onChange={handleImageAttachment}
          />
          <div className="flex items-center gap-6 pr-4">
            <Button
              variant="ghost"
              className="cursor-pointer p-0"
              onClick={() => fileInputRef.current?.click()}
            >
              <img src={attach} alt="attach" />
            </Button>
            <Button
              variant="ghost"
              className="cursor-pointer p-0"
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