import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import BaseCollection from '../base/BaseCollection';

export const chatMessagesPublications = {
  chatMessages: 'ChatMessages',
};

class ChatMessagesCollection extends BaseCollection {
  constructor() {
    super('ChatMessages', new SimpleSchema({
      users: Array,
      'users.$': String,
      messages: Array,
      'messages.$': Object,
      'messages.$.sender': String,
      'messages.$.recipient': String,
      'messages.$.createdAt': Date,
      'messages.$.text': String,
    }));
  }

  define({ users, messages }) {
    const createdAt = new Date();
    return this._collection.insert({
      users,
      messages: messages.map(message => ({
        ...message,
        createdAt,
      })),
    });
  }

  publish() {
    if (Meteor.isServer) {
      const instance = this;
      Meteor.publish(chatMessagesPublications.chatMessages, function publish() {
        if (this.userId) {
          return instance._collection.find({
            users: this.userId,
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
    const users = doc.users;
    const messages = doc.messages.map(message => ({
      sender: message.sender,
      recipient: message.recipient,
      text: message.text,
      createdAt: message.createdAt,
    }));
    return { users, messages };
  }
}

export const ChatMessages = new ChatMessagesCollection();
