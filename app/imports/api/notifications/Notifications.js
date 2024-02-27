import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import BaseCollection from '../base/BaseCollection';

export const notificationPublications = {
  notifications: 'Notifications',
};

class NotificationsCollection extends BaseCollection {
  constructor() {
    super('Notifications', new SimpleSchema({
      userId: String,
      message: String,
      createdAt: Date,
    }));
  }

  /**
   * Defines a new notification.
   * @param userId the id of the user for whom the notification is intended.
   * @param message the content of the notification.
   * @return {String} the docID of the new document.
   */
  define({ userId, message }) {
    const docID = this._collection.insert({
      userId,
      message,
      createdAt: new Date(),
    });
    return docID;
  }

  /**
   * Default publication method for notifications.
   * It publishes notifications associated with the logged in user.
   */
  publish() {
    if (Meteor.isServer) {
      const instance = this;
      Meteor.publish(notificationPublications.notifications, function publish() {
        if (this.userId) {
          const user = Meteor.users.findOne(this.userId);
          const userEmail = user.emails[0].address;
          console.log(userEmail);
          return instance._collection.find({ userId: userEmail });
        }
        return this.ready();
      });
    }
  }

  /**
   * Subscription method for user notifications.
   */
  subscribeNotifications() {
    if (Meteor.isClient) {
      return Meteor.subscribe(notificationPublications.notifications);
    }
    return null;
  }

  /**
   * Returns an object representing the definition of docID in a format appropriate to the restoreOne or define function.
   * @param docID
   * @return {{userId: *, message: *, createdAt: *}}
   */
  dumpOne(docID) {
    const doc = this.findDoc(docID);
    const userId = doc.userId;
    const message = doc.message;
    const createdAt = doc.createdAt;
    return { userId, message, createdAt };
  }
}

export const Notifications = new NotificationsCollection();
