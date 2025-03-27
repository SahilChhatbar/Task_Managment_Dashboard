import { useState, useEffect } from "react";
import ChatList from "./components/ChatList";
import ChatInterface from "./components/ChatInterface";
import { initialConversations } from "@/constants";

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

const Messages = () => {
  const [conversations, setConversations] = useState<Conversation[]>(
    initialConversations.map(conv => ({
      ...conv,
      lastMessage: conv.lastMessage || "",
      time: conv.time || new Date().toISOString(),
      read: conv.read ?? true,
      messages: [
        {
          id: "initial-msg",
          content: "Hi there! Is there anything I can help you with?",
          sender: "other",
          timestamp: new Date().toISOString(),
          type: "text",
        }
      ]
    }))
  );

  const [activeConversation, setActiveConversation] = useState<Conversation>(conversations[0]);
  const [isMobileView, setIsMobileView] = useState(false);
  const [showChat, setShowChat] = useState(false);


  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 1000);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSelectConversation = (convo: Conversation) => {
    setActiveConversation(convo);
    if (isMobileView) {
      setShowChat(true);
    }
  };

  const handleUpdateConversations = (
    updater: (conversations: Conversation[]) => Conversation[]
  ) => {
    const updatedConversations = updater(conversations);
    setConversations(updatedConversations);

    const updatedActiveConversation = updatedConversations.find(
      conv => conv.id === activeConversation.id
    );
    if (updatedActiveConversation) {
      setActiveConversation(updatedActiveConversation);
    }
  };

  const handleBackToList = () => {
    setShowChat(false);
  };

  return (
    <div className="flex flex-row h-screen overflow-hidden bg-[#f5f5f7]">
      <div
        className={`${isMobileView ? "w-full" : "w-1/3"} ${
          isMobileView && showChat ? "hidden" : "block"
        }`}
      >
        <ChatList
          onSelectConversation={handleSelectConversation}
          activeConversationId={activeConversation.id}
          conversations={conversations}
        />
      </div>
      <div
        className={`${isMobileView ? "w-full" : "w-2/3"} ${
          isMobileView && !showChat ? "hidden" : "block"
        }`}
      >
        <ChatInterface
          activeConversation={activeConversation}
          onUpdateConversations={handleUpdateConversations}
          onBack={isMobileView ? handleBackToList : undefined}
        />
      </div>
    </div>
  );
};

export default Messages;