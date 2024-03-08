import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import BaseCollection from '../base/BaseCollection';

export const chatMessagesPublications = {
  chatMessages: 'ChatMessages',
};

class ChatMessagesCollection extends BaseCollection {
  constructor() {
    super('ChatMessages', new SimpleSchema({
      sender: String,
      recipient: String,
      text: String,
      createdAt: Date,
    }));
  }

  define({ sender, recipient, text }) {
    const createdAt = new Date();
    return this._collection.insert({
      sender,
      recipient,
      text,
      createdAt,
    });
  }

  publish() {
    if (Meteor.isServer) {
      const instance = this;
      Meteor.publish(chatMessagesPublications.chatMessages, function publish() {
        if (this.userId) {
          return instance._collection.find({
            $or: [
              { sender: this.userId },
              { recipient: this.userId },
            ],
          });
        }
        return this.ready();
      });
    }
  }

  subscribeChatMessages() {
    if (Meteor.isClient) {
      return Meteor.subscribe(chatMessagesPublications.chatMessages);
    }
    return null;
  }

  dumpOne(docID) {
    const doc = this.findDoc(docID);
    const sender = doc.sender;
    const recipient = doc.recipient;
    const text = doc.text;
    const createdAt = doc.createdAt;
    return { sender, recipient, text, createdAt };
  }
}

export const ChatMessages = new ChatMessagesCollection();
