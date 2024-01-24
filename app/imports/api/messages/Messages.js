import { Mongo } from 'meteor/mongo';

export const Messages = new Mongo.Collection('messages');

// You can add any additional methods or configurations for the collection here.
// For example, you might want to add a schema using a package like 'aldeed:simple-schema'.

if (Meteor.isServer) {
  // Allow insert, update, and remove only if the user is logged in.
  Messages.allow({
    insert(userId, doc) {
      return !!userId;
    },
    update(userId, doc) {
      return !!userId;
    },
    remove(userId, doc) {
      return !!userId;
    },
  });

  // Publish messages for a specific pair of users.
  Meteor.publish('messages', function (userId1, userId2) {
    return Messages.find({
      $or: [
        { senderId: userId1, receiverId: userId2 },
        { senderId: userId2, receiverId: userId1 },
      ],
    });
  });
}

// On the client side, subscribe to the messages for the specified pair of users.
if (Meteor.isClient) {
  Meteor.subscribe('messages', userId1, userId2); // Replace userId1 and userId2 with actual user IDs.
}
