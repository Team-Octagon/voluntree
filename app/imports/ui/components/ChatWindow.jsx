import React, { useContext, useState } from 'react';
import { Button, Form, ListGroup } from 'react-bootstrap';
import { ChatContext } from '../contexts/ChatContext';

const ChatWindow = () => {
  const { messages, recipients, sendMessage, closeChat } = useContext(ChatContext);
  const [selectedRecipient, setSelectedRecipient] = useState('');
  const [currentScreen, setCurrentScreen] = useState('chatList');
  const [newMessage, setNewMessage] = useState('');

  const handleChatSelect = (recipient) => {
    setSelectedRecipient(recipient);
    setCurrentScreen('chatMessages');
  };

  const handleNewChat = () => {
    // Logic for adding new chat
  };

  const handleSendMessage = () => {
    if (newMessage.trim() !== '') {
      sendMessage('User', newMessage, selectedRecipient);
      setNewMessage('');
    }
  };

  const handleCloseChat = () => {
    setSelectedRecipient('');
    setCurrentScreen('chatList');
    closeChat();
  };

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
        padding: '20px',
        overflowY: 'auto',
        transform: 'translate(0%)',
        zIndex: 1001,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {currentScreen === 'chatList' && (
        <div>
          <ListGroup style={{ marginBottom: '10px' }}>
            {recipients.map((recipient, index) => (
              <ListGroup.Item key={index} action onClick={() => handleChatSelect(recipient)}>
                {recipient}
              </ListGroup.Item>
            ))}
          </ListGroup>
          <Button variant="primary" onClick={handleNewChat}>
            Add New Chat
          </Button>
        </div>
      )}
      {currentScreen === 'chatMessages' && (
        <div>
          <Button variant="danger" onClick={handleCloseChat} style={{ marginBottom: '10px' }}>
            Close Chat
          </Button>
          <Button variant="secondary" onClick={() => setCurrentScreen('chatList')} style={{ marginBottom: '10px', marginRight: '10px' }}>
            Back
          </Button>
          <div className="chat-messages" style={{ maxHeight: 'calc(100% - 100px)', overflowY: 'auto' }}>
            {messages
              .filter((message) => message.recipient === selectedRecipient)
              .map((message, index) => (
                <div key={index}>
                  <strong>{message.sender} to {message.recipient}:</strong> {message.text}
                </div>
              ))}
          </div>
          <Form.Group controlId="newMessage">
            <Form.Control
              type="text"
              placeholder="Type your message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" onClick={handleSendMessage}>
            Send
          </Button>
        </div>
      )}
    </div>
  );
};

export default ChatWindow;
