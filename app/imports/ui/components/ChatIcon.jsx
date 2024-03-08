import React, { useContext } from 'react';
import { Meteor } from 'meteor/meteor';
import { Button } from 'react-bootstrap';
import { ChatContext } from '../contexts/ChatContext';
import ChatWindow from './ChatWindow';

const ChatButton = () => {
  const { openChat, closeChat, isChatOpen } = useContext(ChatContext);

  const handleToggleChat = () => {
    if (isChatOpen) {
      closeChat();
    } else {
      openChat();
    }
  };
  if (!Meteor.userId()) {
    return null;
  }

  return (
    <>
      <Button
        variant="primary"
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          zIndex: 1000,
        }}
        onClick={handleToggleChat}
      >
        {isChatOpen ? 'Close Chat' : 'Open Chat'}
      </Button>
      {isChatOpen && <ChatWindow onClose={closeChat} />}
    </>
  );
};

export default ChatButton;
