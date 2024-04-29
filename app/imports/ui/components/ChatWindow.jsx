import React, { useContext, useState, useEffect } from 'react';
import { Button, Form, ListGroup } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { ChatContext } from '../contexts/ChatContext';
import { defineMethod } from '../../api/base/BaseCollection.methods';
import { ChatMessages } from '../../api/chat/ChatMessages';

const ChatWindow = () => {
  const { messages, recipients, sendMessage, closeChat } = useContext(ChatContext);
  const [selectedRecipient, setSelectedRecipient] = useState('');
  const [currentScreen, setCurrentScreen] = useState('chatList');
  const [currentMessages, setCurrentMessages] = useState('');
  const [newMessage, setNewMessage] = useState('');
  const currentUser = Meteor.user().username;

  const handleChatSelect = (recipient) => {
    setSelectedRecipient(recipient);
    setCurrentScreen('chatMessages');
  };

  const handleNewChat = () => {
    // Logic for adding new chat
  };

  const handleTest = () => {
    const collectionName = ChatMessages.getCollectionName();
    console.log('Adding test message...');
    const testData = {
      sender: currentUser,
      recipient: 'user2',
      text: 'hello this is a test!',
    };

    defineMethod.callPromise({ collectionName, definitionData: testData })
      .then((result) => {
        console.log('Test message added with ID:', result);
        // Optionally, update the UI or perform any other actions upon success
      })
      .catch(error => console.error('Error adding test message:', error));
  };

  const handleSendMessage = () => {
    if (newMessage.trim() !== '') {
      sendMessage(currentUser, newMessage, selectedRecipient);
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
          <Button variant="primary" onClick={handleTest}>
            Test Add!
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
          <p>Loading...</p>
          {/* Display all messages if messages are available */}
          {currentMessages.length > 0 ? (
            <div>
              {currentMessages.map((message, index) => (
                <div key={index} style={{ textAlign: message.sender === currentUser ? 'right' : 'left' }}>
                  <p>{message.text}</p>
                </div>
              ))}
            </div>
          ) : (
            <p>No messages available.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ChatWindow;
