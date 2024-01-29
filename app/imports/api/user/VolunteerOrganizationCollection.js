import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { check } from 'meteor/check';
import { Roles } from 'meteor/alanning:roles';
import BaseCollection from '../base/BaseCollection';
import { ROLE } from '../role/Role';

export const organizationPublications = {
  organization: 'Organization',
  organizationAdmin: 'OrganizationAmdin',
};
class VolunteerOrganizationCollection extends BaseCollection {
  constructor() {
    super('VolunteerOrganization', new SimpleSchema({
      organizationName: String,
      location: String,
      description: String,
      contact:String,
      startTime: String,
      endTime: {
        type: String,
        optional: true,
      },
      feedback: {
        type: String, // TODO: Feedback will require a better definition later on
        optional: true,
      },
    }));
  }

  define({ organizationName, location, description, contact, startTime, endTime, feedback }) {
    const docID = this._collection.insert({
      organizationName,
      location,
      description,
      contact,
      startTime,
      endTime,
      feedback,
    });
    return docID;
  }


  update(docID, { organizationName, location, description, contact, startTime, endTime }) {
    const updateData = {}; // TODO Shorten this code
    if (organizationName) {
      updateData.organizationName = organizationName;
    }
    if (location) {
      updateData.location = location;
    }
    if (description) {
      updateData.description = description;
    }
    if (contact) {
      updateData.contact = contact;
    }
    if (startTime) {
      updateData.startTime = startTime;
    }
    if (endTime) {
      updateData.endTime = endTime;
    }
    this._collection.update(docID, { $set: updateData });
  }


  removeIt(organizationName) {
    const doc = this.findDoc(organizationName);
    check(doc, Object);
    this._collection.remove(doc._id);
    return true;
  }

  publish() {
    if (Meteor.isServer) {
      // get the VolunteerOrganizationCollection instance.
      const instance = this;
      /** This subscription publishes only the documents associated with the logged in user */
      Meteor.publish(organizationPublications.organization, function publish() {
        if (this.userId) {
          const username = Meteor.users.findOne(this.userId).username;
          return instance._collection.find({ owner: username });
        }
        return this.ready();
      });

      /** This subscription publishes all documents regardless of user, but only if the logged in user is the Admin. */
      Meteor.publish(organizationPublications.organizationAdmin, function publish() {
        if (this.userId && Roles.userIsInRole(this.userId, ROLE.ADMIN)) {
          return instance._collection.find();
        }
        return this.ready();
      });
    }
  }

  /**
   * Subscription method for organization owned by the current user.
   */
  subscribeOrganization() {
    if (Meteor.isClient) {
      return Meteor.subscribe(organizationPublications.organization);
    }
    return null;
  }

  /**
   * Subscription method for admin users.
   * It subscribes to the entire collection.
   */
  subscribeOrganizationAdmin() {
    if (Meteor.isClient) {
      return Meteor.subscribe(organizationPublications.organizationAdmin);
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
   * @return {{organizationName: (*|string), location: (*|string), description: (*|string), contact: (*|string), startTime: (*|string), endTime: (*|string), volunteersNeeded: (*|number), status: (*|string), tags: (*|string)}}
   */
  dumpOne(docID) {
    const doc = this.findDoc(docID);
    const organizationName = doc.organizationName;
    const location = doc.location;
    const description = doc.description;
    const contact = doc.contact;
    const startTime = doc.startTime;
    const endTime = doc.endTime;
    return { organizationName, location, description, contact, startTime, endTime };
  }
}

/**
 * Provides the singleton instance of this class to all other entities.
 */
export const Organization = new VolunteerOrganizationCollection();
