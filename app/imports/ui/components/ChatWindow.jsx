import React, { useContext, useState, useEffect, useRef } from 'react';
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
  const messagesEndRef = useRef(null);

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
        <div>
          <ListGroup style={{ marginBottom: '10px' }}>
            {recipients.map((recipient, index) => (
              <ListGroup.Item key={index} action onClick={() => handleChatSelect(recipient)}>
                {recipient}
              </ListGroup.Item>
            ))}
          </ListGroup>
          <Button variant="primary" onClick={handleNewChat} style={{ margin: '0 auto' }}>
            Add New Chat
          </Button>
          <Button variant="primary" onClick={handleTest}>
            Test Add!
          </Button>
        </div>
      )}
      {currentScreen === 'chatMessages' && (
        <>
          {/* Fixed position buttons */}
          <div style={{ display: 'flex', alignItems: 'center', borderBottom: '2px solid black' }}>
            {/* Fixed position buttons */}
            <Button variant="secondary" onClick={() => setCurrentScreen('chatList')} style={{ marginBottom: '10px', marginRight: '10px' }}>
              ←
            </Button>
            <h6 style={{ margin: 'auto' }}>john@gmail.com</h6>
            <Button variant="danger" onClick={handleCloseChat} style={{ marginBottom: '10px', marginRight: '4px' }}>
              X
            </Button>
          </div>
          <div style={{ flex: '1', overflowY: 'auto' }} ref={messagesEndRef}>
            {/* Chat messages container */}
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
          <div style={{ position: 'relative', marginBottom: '0px', paddingBottom: '0px', borderTop: 'black 2px solid', backgroundColor: 'red' }}>
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
