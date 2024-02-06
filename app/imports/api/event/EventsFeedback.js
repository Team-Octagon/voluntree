import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { Roles } from 'meteor/alanning:roles';
import BaseCollection from '../base/BaseCollection';
import { ROLE } from '../role/Role';

export const eventFeedbackPublications = {
  eventFeedback: 'EventFeedback',
  eventFeedbackAdmin: 'EventFeedbackAdmin',
  eventFeedbackVolunteer: 'EventFeedbackVolunteer',
};

class EventsFeedbackCollection extends BaseCollection {
  constructor() {
    super('EventsFeedback', new SimpleSchema({
      event: String,
      feedback: String,
    }));
  }

  /**
   * Defines a new EventFeedback item.
   * @param event the name of the event the feedback is for.
   * @param feedback the feedback of the event.
   * @return {String} the docID of the new document.
   */
  define({ event, feedback }) {
    const docID = this._collection.insert({
      event,
      feedback,
    });
    return docID;
  }

  /**
   * Updates the given document.
   * @param docID the id of the document to update. (optional).
   * @param event the name of the event the feedback is for (optional).
   * @param feedback the feedback of the event. (optional).
   */
  update(docID, { event, feedback }) {
    const updateData = {};
    if (event) {
      updateData.event = event;
    }
    if (feedback) {
      updateData.feedback = feedback;
    }

    this._collection.update(docID, { $set: updateData });
  }

  /**
   * Removes the feedback given its docId.
   * @param docID The id for this object.
   * @returns true
   */
  removeIt(docID) {
    if (this.isDefined(docID)) {
      return super.removeIt(docID);
    }
    return null;
  }

  /**
   * Default publication method for entities.
   * It publishes the entire collection for admin and just the information associated to an owner.
   */
  publish() {
    if (Meteor.isServer) {
      // get the EventsFeedback instance.
      const instance = this;
      /** This subscription publishes only the documents associated with the logged in user */
      Meteor.publish(eventFeedbackPublications.eventFeedback, function publish() {
        if (this.userId) {
          const username = Meteor.users.findOne(this.userId).username;
          return instance._collection.find({ owner: username });
        }
        return this.ready();
      });

      /** This subscription publishes all documents regardless of user, but only if the logged in user is the Admin. */
      Meteor.publish(eventFeedbackPublications.eventFeedbackAdmin, function publish() {
        if (this.userId && Roles.userIsInRole(this.userId, ROLE.ADMIN)) {
          return instance._collection.find();
        }
        return this.ready();
      });

      /** This subscription publishes all documents regardless of user, but only if the logged in user is a Volunteer. */
      Meteor.publish(eventFeedbackPublications.eventFeedbackVolunteer, function publish() {
        if (this.userId && Roles.userIsInRole(this.userId, ROLE.VOLUNTEER)) {
          return instance._collection.find();
        }
        return this.ready();
      });
    }
  }

  /**
   * Subscription method for event owned by the current user.
   */
  subscribeEventFeedback() {
    if (Meteor.isClient) {
      return Meteor.subscribe(eventFeedbackPublications.eventFeedback);
    }
    return null;
  }

  /**
   * Subscription method for admin users.
   * It subscribes to the entire collection.
   */
  subscribeEventFeedbackAdmin() {
    if (Meteor.isClient) {
      return Meteor.subscribe(eventFeedbackPublications.eventFeedbackAdmin);
    }
    return null;
  }

  /**
   * Subscription method for volunteer users.
   * It subscribes to the entire collection.
   */
  subscribeEventFeedbackVolunteer() {
    if (Meteor.isClient) {
      return Meteor.subscribe(eventFeedbackPublications.eventFeedbackVolunteer);
    }
    return null;
  }

  /**
   * Default implementation of assertValidRoleForMethod. Asserts that userId is logged in as an Admin or User.
   * This is used in the define, update, and removeIt Meteor methods associated with each class.
   * @param userId The userId of the logged in user. Can be null or undefined
   * @throws { Meteor.Error } If there is no logged in user, or the user is not an Admin or User.
   */
  assertValidRoleForMethod(userId) {
    this.assertRole(userId, [ROLE.ADMIN, ROLE.USER, ROLE.VOLUNTEER]);
  }

  /**
   * Returns an object representing the definition of docID in a format appropriate to the restoreOne or define function.
   * @param docID
   * @return {{event: *, feedback: *}}
   */
  dumpOne(docID) {
    const doc = this.findDoc(docID);
    const event = doc.event;
    const feedback = doc.feedback;
    return { event, feedback };
  }
}

/**
 * Provides the singleton instance of this class to all other entities.
 */
export const EventsFeedback = new EventsFeedbackCollection();
