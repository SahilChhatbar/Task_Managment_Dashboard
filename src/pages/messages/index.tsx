import { useState, useRef, useEffect } from "react";
import { Card, CardHeader } from "@/components/ui/card";
import { Search } from "lucide-react";
import { initialConversations } from "@/constants";
import { MdDoneAll } from "react-icons/md";
import video from "../../assets/video call.png";
import call from "../../assets/voice call.png";
import attach from "../../assets/attach-circle.png";
import send from "../../assets/send.png";
import { Button } from "@/components/ui/button";

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'other';
  timestamp: string;
  type: 'text' | 'file';
  fileUrl?: string;
  fileName?: string;
}

interface ChatHistory {
  [conversationId: string]: Message[];
}

const Messages = () => {
  const [conversations, setConversations] = useState(initialConversations);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeConversation, setActiveConversation] = useState(initialConversations[0]);
  const [newMessage, setNewMessage] = useState("");
  const [chatHistory, setChatHistory] = useState<ChatHistory>({
    [initialConversations[0].id]: [
      {
        id: "1",
        content: "Hello! How can I help you today?",
        sender: "other",
        timestamp: new Date().toISOString(),
        type: "text"
      }
    ]
  });
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory]);

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

  const handleSendMessage = (content: string, type: 'text' | 'file' = 'text', fileDetails?: { url: string, name: string }) => {
    if (!content.trim() && type === 'text') return;

    const newMsg: Message = {
      id: Date.now().toString(),
      content,
      sender: 'user',
      timestamp: new Date().toISOString(),
      type,
      ...(fileDetails && { fileUrl: fileDetails.url, fileName: fileDetails.name })
    };
    setChatHistory(prev => ({
      ...prev,
      [activeConversation.id]: [...(prev[activeConversation.id] || []), newMsg]
    }));
    const updatedConversations = conversations.map(conv => 
      conv.id === activeConversation.id 
        ? { ...conv, lastMessage: `You: ${content}`, read: true }
        : conv
    );
    setConversations(updatedConversations);
    setNewMessage("");
    setTimeout(() => {
      const replies = [
        "I understand, let me help you with that.",
        "Thanks for sharing! I'll look into it.",
        "Got it! Is there anything else you need?",
        "I'll get back to you on this shortly.",
      ];
      const randomReply = replies[Math.floor(Math.random() * replies.length)];
      
      const replyMsg: Message = {
        id: (Date.now() + 1).toString(),
        content: randomReply,
        sender: 'other',
        timestamp: new Date().toISOString(),
        type: 'text'
      };

      setChatHistory(prev => ({
        ...prev,
        [activeConversation.id]: [...(prev[activeConversation.id] || []), replyMsg]
      }));
    }, 1500);
  };

  const handleAttachment = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const fileUrl = URL.createObjectURL(file);
    handleSendMessage(
      `Sent file: ${file.name}`,
      'file',
      { url: fileUrl, name: file.name }
    );
  };

  const handleSelectConversation = (convo: typeof activeConversation) => {
    const updatedConversations = conversations.map((c) =>
      c.id === convo.id ? { ...c, read: true } : c
    );
    setConversations(updatedConversations);
    setActiveConversation(convo);
    if (!chatHistory[convo.id]) {
      setChatHistory(prev => ({
        ...prev,
        [convo.id]: [{
          id: "welcome",
          content: "Hello! How can I help you today?",
          sender: "other",
          timestamp: new Date().toISOString(),
          type: "text"
        }]
      }));
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
    <div className="flex flex-row h-screen overflow-hidden bg-[#f5f5f7]">
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
              <img
                src={call}
                alt="call"
                className="border-1 rounded-full p-3"
              />
            </Button>
          </div>
        </CardHeader>
        <div className="flex-1 p-4 w-full overflow-scroll bg-[#fafafa] no-scrollbar">
          <div className="space-y-4">
            {chatHistory[activeConversation.id]?.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`${
                    message.sender === 'user'
                      ? 'bg-[#546FFF] text-white'
                      : 'bg-white'
                  } rounded-lg shadow-sm p-3 max-w-xs`}
                >
                  {message.type === 'file' ? (
                    <a
                      href={message.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm underline"
                    >
                      📎 {message.fileName}
                    </a>
                  ) : (
                    <p className="text-sm">{message.content}</p>
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>
        <div className="p-4 border-t sticky bottom-0 bg-white z-10">
          <div className="flex items-center">
            <input
              type="text"
              placeholder="Send your message..."
              className="flex-1 p-3 focus:outline-none rounded-2xl"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
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
    </div>
  );
};

export default Messages;