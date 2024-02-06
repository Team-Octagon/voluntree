import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { Roles } from 'meteor/alanning:roles';
import BaseCollection from '../base/BaseCollection';
import { ROLE } from '../role/Role';

export const feedbackPublications = {
  feedback: 'Feedback',
  feedbackAdmin: 'FeedbackAdmin',
  feedbackVolunteer: 'FeedbackVolunteer',
};

class FeedbackCollection extends BaseCollection {
  constructor() {
    super('Feedback', new SimpleSchema({
      eventId: { type: String, index: true, unique: false },
      userId: { type: String, index: true, unique: false },
      rating: Number,
      comments: String,
      timestamp: Date,
      isAnonymous: Boolean,
    }));
  }

  /**
   * Defines a new Feedback item.
   * @param eventId the id of the event the feedback is for.
   * @param userId the id of the user the feedback is from.
   * @param rating the rating of the event.
   * @param comments the comments of the user.
   * @param timestamp the timestamp of the feedback when posted.
   * @param isAnonymous whether the feedback is anonymous or not.
   * @return {String} the docID of the new document.
   */
  define({ eventId, userId, rating, comments, timestamp, isAnonymous }) {
    const docID = this._collection.insert({
      eventId,
      userId,
      rating,
      comments,
      timestamp,
      isAnonymous,
    });
    return docID;
  }

  /**
   * Updates the given document.
   * @param docID the id of the document to update. (optional).
   * @param userId the id of the user the feedback is from. (optional).
   * @param rating the rating of the event. (optional).
   * @param comments the comments of the user. (optional).
   * @param timestamp the timestamp of the feedback when posted. (optional).
   * @param isAnonymous whether the feedback is anonymous or not. (optional).
   */
  update(docID, { userId, rating, comments, timestamp, isAnonymous }) {
    const updateData = {};
    if (userId) {
      updateData.userId = userId;
    }
    if (rating) {
      updateData.rating = rating;
    }
    if (comments) {
      updateData.comments = comments;
    }
    if (timestamp) {
      updateData.timestamp = timestamp;
    }
    if (isAnonymous) {
      updateData.isAnonymous = isAnonymous;
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
   * It publishes the entire collection for admin and just the feedback associated to an owner.
   */
  publish() {
    if (Meteor.isServer) {
      // get the Feedback instance.
      const instance = this;
      /** This subscription publishes only the documents associated with the logged in user */
      Meteor.publish(feedbackPublications.feedback, function publish() {
        if (this.userId) {
          const username = Meteor.users.findOne(this.userId).username;
          return instance._collection.find({ owner: username });
        }
        return this.ready();
      });

      /** This subscription publishes all documents regardless of user, but only if the logged in user is the Admin. */
      Meteor.publish(feedbackPublications.feedbackAdmin, function publish() {
        if (this.userId && Roles.userIsInRole(this.userId, ROLE.ADMIN)) {
          return instance._collection.find();
        }
        return this.ready();
      });

      /** This subscription publishes all documents regardless of user, but only if the logged in user is a Volunteer. */
      Meteor.publish(feedbackPublications.feedbackVolunteer, function publish() {
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
  subscribeFeedback() {
    if (Meteor.isClient) {
      return Meteor.subscribe(feedbackPublications.feedback);
    }
    return null;
  }

  /**
   * Subscription method for admin users.
   * It subscribes to the entire collection.
   */
  subscribeFeedbackAdmin() {
    if (Meteor.isClient) {
      return Meteor.subscribe(feedbackPublications.feedbackAdmin);
    }
    return null;
  }

  /**
   * Subscription method for volunteer users.
   * It subscribes to the entire collection.
   */
  subscribeFeedbackVolunteer() {
    if (Meteor.isClient) {
      return Meteor.subscribe(feedbackPublications.feedbackVolunteer);
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
   * @return { Object } An object representing the definition of the docID.
   */
  dumpOne(docID) {
    const doc = this.findDoc(docID);
    const eventId = doc.eventId;
    const userId = doc.userId;
    const rating = doc.rating;
    const comments = doc.comments;
    const timestamp = doc.timestamp;
    const isAnonymous = doc.isAnonymous;
    return { eventId, userId, rating, comments, timestamp, isAnonymous };
  }
}

/**
 * Provides the singleton instance of this class to all other entities.
 */
export const Feedback = new FeedbackCollection();
