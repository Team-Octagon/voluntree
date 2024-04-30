import React, { createContext, useState, useMemo, useEffect } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { ChatMessages } from '../../api/chat/ChatMessages';
import { defineMethod } from '../../api/base/BaseCollection.methods';

export const ChatContext = createContext();

// TODO: Fix below. Remove eslint-disable-next-line and fix the eslint error.
// eslint-disable-next-line react/prop-types
export const ChatProvider = ({ children }) => {
  const [isChatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [recipients, setRecipients] = useState([]);
  const [selectedRecipient, setSelectedRecipient] = useState('');
  const [fetchTrigger, setFetchTrigger] = useState(false);
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
  }, [currentUser, fetchTrigger]);

  useEffect(() => {
    if (ready) {
      const conversationRecipients = Object.keys(chatMessages);
      setRecipients(conversationRecipients);
      setMessages(chatMessages);
    }
  }, [ready, chatMessages]);

  const sendMessage = (sender, text, recipient) => {
    const collectionName = ChatMessages.getCollectionName();
    console.log('Adding test message...');
    const testData = {
      sender: sender,
      recipient: recipient,
      text: text,
    };

    defineMethod.callPromise({ collectionName, definitionData: testData })
      .then((result) => {
        console.log('Test message added with ID:', result);
      })
      .catch(error => console.error('Error adding test message:', error));
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
