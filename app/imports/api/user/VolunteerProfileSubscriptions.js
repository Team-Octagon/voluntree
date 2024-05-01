import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { check } from 'meteor/check';
import { Roles } from 'meteor/alanning:roles';
import BaseCollection from '../base/BaseCollection';
import { ROLE } from '../role/Role';

export const volunteerProfileSubsPublications = {
  volunteerProfileSubs: 'VolunteerProfileSubs',
  volunteerProfileSubsAdmin: 'VolunteerProfileSubsAdmin',
  volunteerProfileSubsVolunteer: 'VolunteerProfileSubsVolunteer',
  volunteerProfileSubsOrganization: 'VolunteerProfileSubsOrganization',
};

class VolunteerProfileSubsCollection extends BaseCollection {
  constructor() {
    super('VolunteerProfileSubs', new SimpleSchema({
      volunteer: String,
      event: String,
    }));
  }

  /**
   * Defines a new VolunteerSub item.
   * @param volunteer the email of the volunteer.
   * @param event the name of the event.
   * @return {String} the docID of the new document.
   */
  define({ volunteer, event }) {
    const docID = this._collection.insert({
      volunteer,
      event,
    });
    return docID;
  }

  /**
 * Updates the given document.
 * @param docID the id of the document to update. (optional).
 * @param volunteer the email of the volunteer. (optional).
 * @param event the name of the event. (optional).
 */
  update(docID, { volunteer, event }) {
    const updateData = {};
    if (volunteer) {
      updateData.volunteer = volunteer;
    }
    if (event) {
      updateData.event = event;
    }

    this._collection.update(docID, { $set: updateData });
  }

  /**
 * A stricter form of remove that throws an error if the document or docID could not be found in this collection.
 * @param { String | Object } event A document ordocID in this collection.
 * @returns true
 */
  removeIt(event) {
    const doc = this.findDoc(event);
    check(doc, Object);
    this._collection.remove(doc._id);
    return true;
  }

  /**
   * Default publication method for entities.
   * It publishes the entire collection for admin and just the information associated to an owner.
   */
  publish() {
    if (Meteor.isServer) {
      // get the VolunteerProfileEvent instance.
      const instance = this;
      /** This subscription publishes only the documents associated with the logged in user */
      Meteor.publish(volunteerProfileSubsPublications.volunteerProfileSubs, function publish() {
        if (this.userId) {
          const username = Meteor.users.findOne(this.userId).username;
          return instance._collection.find({ owner: username });
        }
        return this.ready();
      });

      /** This subscription publishes all documents regardless of user, but only if the logged in user is the Admin. */
      Meteor.publish(volunteerProfileSubsPublications.volunteerProfileSubsAdmin, function publish() {
        if (this.userId && Roles.userIsInRole(this.userId, ROLE.ADMIN)) {
          return instance._collection.find();
        }
        return this.ready();
      });

      /** This subscription publishes all documents regardless of user, but only if the logged in user is a Volunteer. */
      Meteor.publish(volunteerProfileSubsPublications.volunteerProfileSubsVolunteer, function publish() {
        if (this.userId && Roles.userIsInRole(this.userId, ROLE.VOLUNTEER)) {
          return instance._collection.find();
        }
        return this.ready();
      });
      /** This subscription publishes all documents regardless of user, but only if the logged in user is an Organization. */
      Meteor.publish(volunteerProfileSubsPublications.volunteerProfileSubsOrganization, function publish() {
        if (this.userId && Roles.userIsInRole(this.userId, ROLE.ORGANIZATION)) {
          return instance._collection.find();
        }
        return this.ready();
      });
    }
  }

  /**
   * Subscription method for event chosen by the current user.
   */
  subscribeVolunteerProfileSubs() {
    if (Meteor.isClient) {
      return Meteor.subscribe(volunteerProfileSubsPublications.volunteerProfileSubs);
    } return null;
  }

  /**
   * Subscription method for admin users.
   * It subscribes to the entire collection.
   */
  subscribeVolunteerProfileSubsAdmin() {
    if (Meteor.isClient) {
      return Meteor.subscribe(volunteerProfileSubsPublications.volunteerProfileSubsAdmin);
    }
    return null;
  }

  /**
   * Subscription method for volunteer users.
   * It subscribes to the entire collection.
   */
  subscribeVolunteerProfileSubsVolunteer() {
    if (Meteor.isClient) {
      return Meteor.subscribe(volunteerProfileSubsPublications.volunteerProfileSubsVolunteer);
    }
    return null;
  }

  /**
   * Subscription method for organization users.
   * It subscribes to the entire collection.
   */
  subscribeVolunteerProfileSubsOrganization() {
    if (Meteor.isClient) {
      return Meteor.subscribe(volunteerProfileSubsPublications.volunteerProfileSubsOrganization);
    }
    return null;
  }

  /**
 * Default implementation of assertValidRoleForMethod. Asserts that userId is logged in as an Admin or User.   * This is used in the define, update, and removeIt Meteor methods associated with each class.
 * @param userId The userId of the logged in user. Can be null or undefined
 * @throws { Meteor.Error } If there is no logged in user, or the user is not an Admin or User.
 */
  assertValidRoleForMethod(userId) {
    this.assertRole(userId, [ROLE.ADMIN, ROLE.ORGANIZATION, ROLE.VOLUNTEER]);
  }

  /**
   * Returns an object representing the definition of docID in a format appropriate to the restoreOne or define function.
   * @param docID
   * @return {{volunteer: *, event: *}}
   */
  dumpOne(docID) {
    const doc = this.findDoc(docID);
    const volunteer = doc.volunteer;
    const event = doc.event;
    return { volunteer, event };
  }
}

/**
 * Provides the singleton instance of this class to all other entities.
 */
export const VolunteerProfileSubs = new VolunteerProfileSubsCollection();
