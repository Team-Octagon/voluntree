import React, { createContext, useState, useMemo, useEffect } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { ChatMessages } from '../../api/chat/ChatMessages';

export const ChatContext = createContext();

// TODO: Fix below. Remove eslint-disable-next-line and fix the eslint error.
// eslint-disable-next-line react/prop-types
export const ChatProvider = ({ children }) => {
  const [isChatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [recipients, setRecipients] = useState([]);
  const [selectedRecipient, setSelectedRecipient] = useState('');
  let currentUser = Meteor.user();
  if (currentUser) {
    currentUser = currentUser.username;
    console.log();
  }

  const { ready, chatMessages } = useTracker(() => {
    const sub = ChatMessages.subscribeChatMessages();
    const isReady = sub.ready();
    const messageItems = ChatMessages.find({
      $or: [{ sender: currentUser }, { recipient: currentUser }],
    }).fetch();
    const conversations = {};
    messageItems.forEach(message => {
      const otherUser = message.sender === currentUser ? message.recipient : message.sender;
      if (!conversations[otherUser]) {
        conversations[otherUser] = [];
      }
      conversations[otherUser].push(message);
    });
    return { ready: isReady, chatMessages: conversations };
  }, [currentUser]);

  useEffect(() => {
    if (ready) {
      const conversationRecipients = Object.keys(chatMessages);
      setRecipients(conversationRecipients);
      setMessages(chatMessages);
    }
  }, [ready, chatMessages]);

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
