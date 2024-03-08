import React, { useContext, useState } from 'react';
import { Button, Form, ListGroup } from 'react-bootstrap';
import { ChatContext } from '../contexts/ChatContext';

const ChatWindow = () => {
  const { messages, recipients, sendMessage, closeChat } = useContext(ChatContext);
  const [newMessage, setNewMessage] = useState('');
  const [selectedRecipient, setSelectedRecipient] = useState('');

  const handleSendMessage = () => {
    if (newMessage.trim() !== '' && selectedRecipient) {
      sendMessage('User', newMessage, selectedRecipient);
      setNewMessage('');
    }
  };

  const handleCloseChat = () => {
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
      <ListGroup style={{ marginBottom: '10px' }}>
        {recipients.map((recipient, index) => (
          <ListGroup.Item
            key={index}
            action
            onClick={() => setSelectedRecipient(recipient)}
            active={recipient === selectedRecipient}
          >
            {recipient}
          </ListGroup.Item>
        ))}
      </ListGroup>

      <div className="chat-messages" style={{ maxHeight: 'calc(100% - 50px)', overflowY: 'auto' }}>
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

      <Button variant="danger" onClick={handleCloseChat} style={{ marginTop: '10px' }}>
        Close Window
      </Button>
    </div>
  );
};

export default ChatWindow;
