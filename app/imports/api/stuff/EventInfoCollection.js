import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { check } from 'meteor/check';
import { _ } from 'meteor/underscore';
import { Roles } from 'meteor/alanning:roles';
import BaseCollection from '../base/BaseCollection';
import { ROLE } from '../role/Role';

export const stuffConditions = ['excellent', 'good', 'fair', 'poor'];
export const stuffPublications = {
  stuff: 'Stuff',
  stuffAdmin: 'StuffAdmin',
  stuffVolunteer: 'StuffVolunteer',
};

class EventInfoCollection extends BaseCollection {
  constructor() {
    super('Stuffs', new SimpleSchema({
      name: String,
      volunteers: Number,
      feedback: String,
      hours: Number,
    }));
  }

  /**
   * Defines a new Stuff item.
   * @param name the name of the item.
   * @param volunteers how many volunteers.
   * @param feedback feedback.
   * @param hours number of hours contributed.
   */
  define({ name, volunteers, feedback, hours }) {
    const docID = this._collection.insert({
      name,
      volunteers,
      feedback,
      hours,
    });
    return docID;
  }

  /**
   * Updates the given document.
   * @param docID the id of the document to update.
   * @param name the new name (optional).
   * @param volunteers new amount of volunteers.
   * @param feedback new feedback.
   * @param hours new number of hours contributed.   */
  update(docID, { name, volunteers, feedback, hours }) {
    const updateData = {};
    if (name) {
      updateData.name = name;
    }
    // if (quantity) { NOTE: 0 is falsy so we need to check if the quantity is a number.
    if (_.isNumber(volunteers)) {
      updateData.volunteers = volunteers;
    }
    if (_.isNumber(hours)) {
      updateData.hours = hours;
    }
    this._collection.update(docID, { $set: updateData });
  }

  /**
   * A stricter form of remove that throws an error if the document or docID could not be found in this collection.
   * @param { String | Object } name A document or docID in this collection.
   * @returns true
   */
  removeIt(name) {
    const doc = this.findDoc(name);
    check(doc, Object);
    this._collection.remove(doc._id);
    return true;
  }

  /**
   * Default publication method for entities.
   * It publishes the entire collection for admin and just the stuff associated to an owner.
   */
  publish() {
    if (Meteor.isServer) {
      // get the StuffCollection instance.
      const instance = this;
      /** This subscription publishes only the documents associated with the logged in user */
      Meteor.publish(stuffPublications.stuff, function publish() {
        if (this.userId) {
          const username = Meteor.users.findOne(this.userId).username;
          return instance._collection.find({ owner: username });
        }
        return this.ready();
      });

      /** This subscription publishes all documents regardless of user, but only if the logged in user is the Admin. */
      Meteor.publish(stuffPublications.stuffAdmin, function publish() {
        if (this.userId && Roles.userIsInRole(this.userId, ROLE.ADMIN)) {
          return instance._collection.find();
        }
        return this.ready();
      });

      /** This subscription publishes all documents regardless of user, but only if the logged in user is a Volunteer. */
      Meteor.publish(stuffPublications.stuffVolunteer, function publish() {
        if (this.userId && Roles.userIsInRole(this.userId, ROLE.VOLUNTEER)) {
          return instance._collection.find();
        }
        return this.ready();
      });
    }
  }

  /**
   * Subscription method for stuff owned by the current user.
   */
  subscribeStuff() {
    if (Meteor.isClient) {
      return Meteor.subscribe(stuffPublications.stuff);
    }
    return null;
  }

  /**
   * Subscription method for admin users.
   * It subscribes to the entire collection.
   */
  subscribeStuffAdmin() {
    if (Meteor.isClient) {
      return Meteor.subscribe(stuffPublications.stuffAdmin);
    }
    return null;
  }

  /**
   * Subscription method for volunteer users.
   * It subscribes to the entire collection.
   */
  subscribeStuffVolunteer() {
    if (Meteor.isClient) {
      return Meteor.subscribe(stuffPublications.stuffVolunteer);
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
   * @return {{hours: (*|number), volunteers: *, feedback: *, name}}
   */
  dumpOne(docID) {
    const doc = this.findDoc(docID);
    const name = doc.name;
    const volunteers = doc.volunteers;
    const hours = doc.hours;
    const feedback = doc.feedback;
    return { name, volunteers, hours, feedback };
  }
}

/**
 * Provides the singleton instance of this class to all other entities.
 */
export const EventInfo = new EventInfoCollection();
