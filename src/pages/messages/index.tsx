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
          id: "+new Date()",
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

  // Effect to control body scrolling when chat modal is open on mobile
  useEffect(() => {
    if (isMobileView && showChat) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileView, showChat]);

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
      {/* Chat List */}
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
      
      {/* Desktop Chat Interface */}
      {!isMobileView && (
        <div className="w-2/3">
          <ChatInterface
            activeConversation={activeConversation}
            onUpdateConversations={handleUpdateConversations}
          />
        </div>
      )}
      
      {/* Mobile Chat Modal */}
      {isMobileView && showChat && (
        <div className="fixed inset-0 z-50 flex flex-col bg-white">
          <ChatInterface
            activeConversation={activeConversation}
            onUpdateConversations={handleUpdateConversations}
            onBack={handleBackToList}
          />
        </div>
      )}
    </div>
  );
};

export default Messages;