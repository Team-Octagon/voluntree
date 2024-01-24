import React, { useState, useEffect } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { Messages } from '/imports/api/messages';

const Messenger = ({ userId1, userId2 }) => {
  const [messageInput, setMessageInput] = useState('');
  const messages = useTracker(() => {
    return Messages.find({
      $or: [
        { senderId: userId1, receiverId: userId2 },
        { senderId: userId2, receiverId: userId1 },
      ],
    }).fetch();
  });

  const sendMessage = () => {
    if (messageInput.trim() !== '') {
      Messages.insert({
        senderId: userId1,
        receiverId: userId2,
        text: messageInput,
        createdAt: new Date(),
      });
      setMessageInput('');
    }
  };

  return (
    <div>
      <div>
        {messages.map((message) => (
          <div key={message._id}>
            {message.senderId === userId1 ? (
              <div>{`You: ${message.text}`}</div>
            ) : (
              <div>{`User ${userId2}: ${message.text}`}</div>
            )}
          </div>
        ))}
      </div>
      <div>
        <input
          type="text"
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Messenger;
