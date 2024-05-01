import React, { useContext, useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { Button } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { ChatContext } from '../contexts/ChatContext';
import ChatWindow from './ChatWindow';

const ChatButton = () => {
  const { openChat, closeChat, isChatOpen } = useContext(ChatContext);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Initially set to false

  // Use useTracker to reactively track changes to the user's login status
  useTracker(() => {
    setIsLoggedIn(!!Meteor.userId()); // Check if user is logged in and update isLoggedIn state
  }, []);

  return isLoggedIn && ( // Only render if user is logged in
    <>
      <Button
        variant="primary"
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          zIndex: 1000,
        }}
        onClick={isChatOpen ? closeChat : openChat} // Toggle chat on button click
      >
        {isChatOpen ? 'Close Chat' : 'Open Chat'}
      </Button>
      {isChatOpen && <ChatWindow onClose={closeChat} />}
    </>
  );
};

export default ChatButton;
