import React, { createContext, useState, useMemo } from 'react';
import { ChatMessages } from '../../api/chat/ChatMessages';

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [isChatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [recipients, setRecipients] = useState(['john@foo.com', 'admin@foo.com', 'User3']);
  const [selectedRecipient, setSelectedRecipient] = useState('');

  const sendMessage = (sender, text, recipient) => {
    const messageID = ChatMessages.define({ sender, recipient, text });
    setMessages([...messages, ChatMessages.findDoc(messageID)]);
    if (!recipients.includes(recipient)) {
      setRecipients([...recipients, recipient]);
    }
  };

  const contextValue = useMemo(() => ({
    isChatOpen,
    openChat: () => setChatOpen(true),
    closeChat: () => setChatOpen(false),
    messages,
    recipients,
    sendMessage,
    selectedRecipient,
    setSelectedRecipient,
  }), [isChatOpen, messages, recipients, selectedRecipient]);

  return (
    <ChatContext.Provider value={contextValue}>
      {children}
    </ChatContext.Provider>
  );
};
