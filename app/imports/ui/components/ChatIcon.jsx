import React, { useContext, useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { Button } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { ChatContext } from '../contexts/ChatContext';
import ChatWindow from './ChatWindow';

const ChatButton = () => {
  const { openChat, closeChat, isChatOpen } = useContext(ChatContext);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useTracker(() => {
    setIsLoggedIn(!!Meteor.userId());
  }, []);

  return isLoggedIn && (
    <>
      <Button
        variant="primary"
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          zIndex: 1000,
        }}
        onClick={isChatOpen ? closeChat : openChat}
      >
        {isChatOpen ? 'Close Chat' : 'Open Chat'}
      </Button>
      {isChatOpen && <ChatWindow onClose={closeChat} />}
    </>
  );
};

export default ChatButton;
