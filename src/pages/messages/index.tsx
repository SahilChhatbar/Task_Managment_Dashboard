import { useState, useEffect } from "react";
import ChatList from "./components/ChatList";
import ChatInterface from "./components/ChatInterface";
import { initialConversations } from "@/constants";

const Messages = () => {
  const [conversations, setConversations] = useState(initialConversations);
  const [activeConversation, setActiveConversation] = useState(
    initialConversations[0]
  );
  const [isMobileView, setIsMobileView] = useState(false);
  const [showChat, setShowChat] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSelectConversation = (convo: typeof activeConversation) => {
    const updatedConversations = conversations.map((c) =>
      c.id === convo.id ? { ...c, read: true } : c
    );
    setConversations(updatedConversations);
    setActiveConversation(convo);
    if (isMobileView) {
      setShowChat(true);
    }
  };

  const handleUpdateConversations = (
    updater: (
      conversations: typeof initialConversations
    ) => typeof initialConversations
  ) => {
    setConversations(updater(conversations));
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
