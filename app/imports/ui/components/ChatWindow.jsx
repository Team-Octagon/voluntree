import React, { useContext, useState, useEffect, useRef } from 'react';
import { Button, Form, ListGroup } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { ChatContext } from '../contexts/ChatContext';

const ChatWindow = () => {
  const { messages, recipients, sendMessage, closeChat } = useContext(ChatContext);
  const [selectedRecipient, setSelectedRecipient] = useState('');
  const [currentScreen, setCurrentScreen] = useState('chatList');
  const [currentMessages, setCurrentMessages] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newMessage, setNewMessage] = useState('');
  const currentUser = Meteor.user().username;
  const messagesEndRef = useRef(null);

  const handleChatSelect = (recipient) => {
    setSelectedRecipient(recipient);
    setCurrentScreen('chatMessages');
  };

  const handleNewChat = () => {
    setCurrentScreen('startNewMessage');
  };
  const handleNewChatAdd = () => {
    sendMessage(currentUser, newMessage, newUserEmail);
    setCurrentScreen('chatList');
  };

  const handleSendMessage = () => {
    if (newMessage.trim() !== '') {
      sendMessage(currentUser, newMessage, selectedRecipient);
      setCurrentMessages([...currentMessages, { sender: currentUser, text: newMessage }]);
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      setNewMessage('');
    }
  };

  const handleCloseChat = () => {
    setSelectedRecipient('');
    setCurrentScreen('chatList');
    closeChat();
  };

  useEffect(() => {
    if (selectedRecipient !== '') {
      console.log('Selected recipient changed: ', selectedRecipient);
      console.log('Messages: ', messages[selectedRecipient]);
      setCurrentMessages(messages[selectedRecipient]);
    }
  }, [selectedRecipient]);

  useEffect(() => {
    // Scroll to the bottom of the chat window after updating messages
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
    }
  }, [currentMessages]);

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        right: 0,
        width: '300px',
        height: '50%',
        backgroundColor: 'white',
        borderTop: '1px solid #ccc',
        overflowY: 'auto',
        transform: 'translate(0%)',
        zIndex: 1001,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {currentScreen === 'chatList' && (
        <>
          <div style={{ textAlign: 'center' }}>
            <ListGroup style={{ marginBottom: '10px' }}>
              {recipients.map((recipient, index) => (
                <ListGroup.Item key={index} action onClick={() => handleChatSelect(recipient)}>
                  {recipient}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </div>
          <Button variant="primary" onClick={handleNewChat}>
            Add New Chat
          </Button>
          <Button variant="danger" onClick={handleCloseChat}>
            Close Chat
          </Button>
        </>
      )}
      {currentScreen === 'startNewMessage' && (
        <>
          <div style={{ display: 'flex', alignItems: 'center', borderBottom: '2px solid black' }}>
            <Button variant="secondary" onClick={() => setCurrentScreen('chatList')} style={{ marginBottom: '10px', marginRight: '10px' }}>
              ←
            </Button>
            <h6 style={{ margin: 'auto' }}>Start New Message</h6>
            <Button variant="danger" onClick={handleCloseChat} style={{ marginBottom: '10px', marginRight: '4px' }}>
              X
            </Button>
          </div>
          <h4>User Email</h4>
          <Form.Group controlId="startNewMessage">
            <Form.Control
              type="text"
              placeholder="Enter User Email"
              value={newUserEmail}
              onChange={(e) => setNewUserEmail(e.target.value)}
              style={{ marginTop: '3px' }}
            />
            <h4>Message</h4>
            <Form.Control
              type="text"
              placeholder="Type your message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              style={{ marginTop: '3px' }}
            />
          </Form.Group>
          <Button
            variant="primary"
            onClick={handleNewChatAdd}
          >
            Send
          </Button>
        </>
      )}
      {currentScreen === 'chatMessages' && (
        <>
          {/* Fixed position buttons */}
          <div style={{ display: 'flex', alignItems: 'center', borderBottom: '2px solid black', margin: '6px 6px' }}>
            {/* Fixed position buttons */}
            <Button variant="secondary" onClick={() => setCurrentScreen('chatList')} style={{ marginBottom: '10px', marginRight: '10px' }}>
              ←
            </Button>
            <h6 style={{ margin: 'auto' }}>{selectedRecipient}</h6>
            <Button variant="danger" onClick={handleCloseChat} style={{ marginBottom: '10px', marginRight: '4px' }}>
              X
            </Button>
          </div>
          <div style={{ flex: '1', overflowY: 'auto' }} ref={messagesEndRef}>
            {/* Chat messages container */}
            {currentMessages.length > 0 ? (
              <div>
                {currentMessages.map((message, index) => (
                  <div
                    key={index}
                    style={{ textAlign: message.sender === currentUser ? 'right' : 'left', backgroundColor: message.sender === currentUser ? '#6685ff' : '#8c8c8c', padding: '0px', marginBottom: '4px',
                      borderRadius: '10px', margin: '3px 3px' }}
                  >
                    <p style={{ marginLeft: message.sender === !currentUser ? '0px' : '10px', marginRight: message.sender === !currentUser ? '0px' : '10px' }}>{message.text}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p>No messages available.</p>
            )}
          </div>
          <div style={{ position: 'relative', marginBottom: '0px', paddingBottom: '0px', borderTop: 'black 2px solid', margin: '6px 6px' }}>
            {/* Text box and send button */}
            <Form.Group controlId="newMessage">
              <Form.Control
                type="text"
                placeholder="Type your message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                style={{ marginTop: '3px' }}
              />
            </Form.Group>
            <Button
              variant="primary"
              style={{ position: 'absolute', right: '0', bottom: '0' }}
              onClick={handleSendMessage}
            >
              Send
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default ChatWindow;
