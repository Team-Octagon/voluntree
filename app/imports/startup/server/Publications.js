import { Meteor } from 'meteor/meteor';
import * as Events from 'events';
import { MATPCollections } from '../../api/matp/MATPCollections';
import { Notifications } from '../../api/notifications/Notifications';

// Call publish for all the collections.
MATPCollections.collections.forEach(c => c.publish());

// alanning:roles publication
// Recommended code to publish roles for each user.
// eslint-disable-next-line consistent-return
Meteor.publish(null, function () {
  if (this.userId) {
    return Meteor.roleAssignment.find({ 'user._id': this.userId });
  }
  this.ready();
});

Meteor.publish('eventsPublic', function publish() {
  // Publish specific events to all users, even if not logged in.
  return Events.find({ status: 'public' }); // Example: only find events marked as public
});

Meteor.publish('notificationsPublic', function publish() {
  // Publish specific events to all users, even if not logged in.
  return Notifications.find(); // Example: only find events marked as public
});
