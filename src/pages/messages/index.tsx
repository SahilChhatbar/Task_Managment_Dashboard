import React, { useState, useEffect } from "react";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  ConversationHeader,
  Avatar,
  ConversationList,
  Conversation as ChatConversation,
  Search,
  TypingIndicator,
} from "@chatscope/chat-ui-kit-react";
import { nanoid } from "nanoid";
import lincoln from "../../assets/lincoln.png";
import george from "../../assets/george.png";
import { Badge } from "@/components/ui/badge";

interface User {
  id: string;
  name: string;
  avatar: string;
  online: boolean;
}
interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: number; 
}
interface Conversation extends User {
  messages: Message[];
  unreadCount: number;
}
const userModels: User[] = [
  {
    id: "angelie-crison",
    name: "Angelie Crison",
    avatar: lincoln,
    online: true,
  },
  { id: "jakob-saris", name: "Jakob Saris", avatar: george, online: false },
  {
    id: "emery-korsgard",
    name: "Emery Korsgard",
    avatar: lincoln,
    online: false,
  },
];
const Messages: React.FC = () => {
  const [currentUser] = useState({
    id: "current-user",
    username: "You",
    avatar: "https://via.placeholder.com/40",
  });
  const [conversations, setConversations] = useState<Conversation[]>(
    userModels.map((user) => ({ ...user, messages: [], unreadCount: 0 }))
  );
  const [activeConversation, setActiveConversation] = useState<Conversation>(
    conversations[0]
  );
  const [inputValue, setInputValue] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  useEffect(() => {
    const updatedActiveConversation = conversations.find(
      (convo) => convo.id === activeConversation.id
    );
    if (updatedActiveConversation) {
      setActiveConversation(updatedActiveConversation);
      setConversations((conversations) =>
        conversations.map((convo) =>
          convo.id === activeConversation.id
            ? { ...convo, unreadCount: 0 }
            : convo
        )
      );
    }
  }, [conversations]);
  const handleSend = (message: string) => {
    if (!message.trim()) return;

    const updatedConversations = conversations.map((convo) =>
      convo.id === activeConversation.id
        ? {
            ...convo,
            messages: [
              ...convo.messages,
              {
                sender: currentUser.username,
                content: message,
                id: nanoid(),
                timestamp: Date.now(),
              },
            ],
          }
        : convo
    );
    setConversations(updatedConversations);
    setInputValue("");
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setConversations((conversations) =>
        conversations.map((convo) =>
          convo.id === activeConversation.id
            ? {
                ...convo,
                messages: [
                  ...convo.messages,
                  {
                    sender: convo.name,
                    content: "Got it! I'll get back to you soon.",
                    id: nanoid(),
                    timestamp: Date.now(),
                  },
                ],
                unreadCount: convo.unreadCount + 1, 
              }
            : convo
        )
      );
    }, 2000);
  };
  const filteredConversations = conversations.filter((convo) =>
    convo.name.toLowerCase().includes(searchValue.toLowerCase())
  );
  const formatTimestamp = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="flex h-screen">
      <div className="w-1/4 border-r border-gray-200 p-4">
        <Search
          placeholder="Search..."
          className="pb-4"
          value={searchValue}
          onChange={(value: string) => setSearchValue(value)}
        />
        <ConversationList>
          {filteredConversations.map((user) => (
            <ChatConversation
              key={user.id}
              name={user.name}
              onClick={() => {
                setActiveConversation(user);
              }}
              active={user.id === activeConversation.id} 
              style={{
                borderRadius: user.id === activeConversation.id ? "12px" : "0",
                backgroundColor:
                  user.id === activeConversation.id ? "#f0f4ff" : "transparent",
              }}
              info={
                <div className="flex flex-col">
                  <span className="text-sm">
                    {user.messages[user.messages.length - 1]?.content ||
                      "No messages yet"}
                  </span>
                  <span className="text-xs text-gray-500">
                    {user.messages[user.messages.length - 1]
                      ? formatTimestamp(
                          user.messages[user.messages.length - 1].timestamp
                        )
                      : ""}
                  </span>
                </div>
              }
            >
              <Avatar
                src={user.avatar}
                name={user.name}
                status={user.online ? "available" : "dnd"}
              />
              {user.unreadCount > 0 && (
                <Badge variant="secondary" className="pl-2">
                  {user.unreadCount}
                </Badge>
              )}
            </ChatConversation>
          ))}
        </ConversationList>
      </div>
      <div className="w-3/4 flex flex-col">
        {activeConversation && (
          <ChatContainer>
            <ConversationHeader>
              <Avatar
                src={activeConversation.avatar}
                name={activeConversation.name}
                status={activeConversation.online ? "available" : "dnd"}
              />
              <ConversationHeader.Content className="flex justify-between">
                <span>{activeConversation.name}</span> 
                <span className="text-sm text-gray-500">
                  {activeConversation.online ? "Online" : "Offline"}
                </span>
              </ConversationHeader.Content>
            </ConversationHeader>
            <MessageList>
              {activeConversation.messages.map((msg) => (
                <Message
                  key={msg.id}
                  model={{
                    message: msg.content,
                    sentTime: formatTimestamp(msg.timestamp),
                    sender: msg.sender,
                    direction:
                      msg.sender === currentUser.username
                        ? "outgoing"
                        : "incoming",
                    position: "single",
                  }}
                />
              ))}
              {isTyping && (
                <TypingIndicator
                  content={`${activeConversation.name} is typing...`}
                />
              )}
            </MessageList>
            <MessageInput
              placeholder="Send your message..."
              value={inputValue}
              onChange={(val: string) => setInputValue(val)}
              onSend={handleSend}
              attachButton={false}
            />
          </ChatContainer>
        )}
      </div>
    </div>
  );
};

export default Messages;
