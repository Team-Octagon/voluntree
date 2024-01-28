import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { check } from 'meteor/check';
import { _ } from 'meteor/underscore';
import { Roles } from 'meteor/alanning:roles';
import BaseCollection from '../base/BaseCollection';
import { ROLE } from '../role/Role';

export const eventTags = ['adoption', 'animals', 'arts', 'community', 'culture', 'education', 'environment', 'health', 'human services', 'seniors', 'sports', 'technology', 'youth'];

export const eventPublications = {
  event: 'Event',
  eventAdmin: 'EventAdmin',
  eventVolunteer: 'EventVolunteer',
};

class EventsCollection extends BaseCollection {
  constructor() {
    super('Events', new SimpleSchema({
      title: String,
      organizer: { type: String, index: true, unique: false },
      eventDate: Date,
      location: String,
      description: String,
      startTime: String,
      endTime: {
        type: String,
        optional: true,
      },
      volunteersNeeded: Number,
      status: {
        type: String,
        allowedValues: ['not started', 'completed'],
        defaultValue: 'not started',
      },
      tags: {
        type: String,
        allowedValues: eventTags,
      },
    }));
  }

  /**
   * Defines a new Event item.
   * @param title the title of the event.
   * @param organizer the organizer of the event.
   * @param eventDate the date of the event.
   * @param location the location of the event.
   * @param description the description of the event.
   * @param startTime the start time of the event.
   * @param endTime the end time of the event.
   * @param volunteersNeeded the number of volunteers needed for the event.
   * @param skillsRecommended the skills recommended for the event.
   * @param status the status of the event.
   * @param tags the tags describing the event type.
   * @param feedback user feedback of the event.
   * @return {String} the docID of the new document.
   */
  define({ name, organizer, eventDate, location, description, startTime, endTime, volunteersNeeded, status, tags }) {
    const docID = this._collection.insert({
      name,
      organizer,
      eventDate,
      location,
      description,
      startTime,
      endTime,
      volunteersNeeded,
      status,
      tags,
    });
    return docID;
  }

  /**
   * Updates the given document.
   * @param docID the id of the document to update. (optional).
   * @param title the title of the event. (optional).
   * @param organizer the organizer of the event. (optional).
   * @param eventDate the date of the event. (optional).
   * @param location the location of the event. (optional).
   * @param description the description of the event. (optional).
   * @param startTime the start time of the event. (optional).
   * @param endTime the end time of the event. (optional).
   * @param volunteersNeeded the number of volunteers needed for the event. (optional).
   * @param status the status of the event. (optional).
   * @param tags the tags describing the event type. (optional).
   */
  update(docID, { title, organizer, eventDate, location, description, startTime, endTime, volunteersNeeded, status, tags }) {
    const updateData = {}; // TODO Shorten this code
    if (title) {
      updateData.title = title;
    }
    if (organizer) {
      updateData.organizer = organizer;
    }
    if (eventDate) {
      updateData.eventDate = eventDate;
    }
    if (location) {
      updateData.location = location;
    }
    if (description) {
      updateData.description = description;
    }
    if (startTime) {
      updateData.startTime = startTime;
    }
    if (endTime) {
      updateData.endTime = endTime;
    }
    // if (quantity) { NOTE: 0 is falsy so we need to check if the quantity is a number.
    if (_.isNumber(volunteersNeeded)) {
      updateData.volunteersNeeded = volunteersNeeded;
    }
    if (status) {
      updateData.status = status;
    }
    if (tags) {
      updateData.tags = tags;
    }
    this._collection.update(docID, { $set: updateData });
  }

  /**
   * A stricter form of remove that throws an error if the document or docID could not be found in this collection.
   * @param { String | Object } title A document or docID in this collection.
   * @returns true
   */
  removeIt(title) {
    const doc = this.findDoc(title);
    check(doc, Object);
    this._collection.remove(doc._id);
    return true;
  }

  /**
   * Default publication method for entities.
   * It publishes the entire collection for admin and just the event associated to an owner.
   */
  publish() {
    if (Meteor.isServer) {
      // get the Events instance.
      const instance = this;
      /** This subscription publishes only the documents associated with the logged in user */
      Meteor.publish(eventPublications.event, function publish() {
        if (this.userId) {
          const username = Meteor.users.findOne(this.userId).username;
          return instance._collection.find({ owner: username });
        }
        return this.ready();
      });

      /** This subscription publishes all documents regardless of user, but only if the logged in user is the Admin. */
      Meteor.publish(eventPublications.eventAdmin, function publish() {
        if (this.userId && Roles.userIsInRole(this.userId, ROLE.ADMIN)) {
          return instance._collection.find();
        }
        return this.ready();
      });

      /** This subscription publishes all documents regardless of user, but only if the logged in user is a Volunteer. */
      Meteor.publish(eventPublications.eventVolunteer, function publish() {
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
  subscribeEvent() {
    if (Meteor.isClient) {
      return Meteor.subscribe(eventPublications.event);
    }
    return null;
  }

  /**
   * Subscription method for admin users.
   * It subscribes to the entire collection.
   */
  subscribeEventAdmin() {
    if (Meteor.isClient) {
      return Meteor.subscribe(eventPublications.eventAdmin);
    }
    return null;
  }

  /**
   * Subscription method for volunteer users.
   * It subscribes to the entire collection.
   */
  subscribeEventVolunteer() {
    if (Meteor.isClient) {
      return Meteor.subscribe(eventPublications.eventVolunteer);
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
   * @return {{organizer: (*|string), title: (*|string), eventDate: (*|Date), location: (*|string), description: (*|string), startTime: (*|string), endTime: (*|string), volunteersNeeded: (*|number), status: (*|string), tags: (*|string)}}
   */
  dumpOne(docID) {
    const doc = this.findDoc(docID);
    const title = doc.title;
    const organizer = doc.organizer;
    const eventDate = doc.eventDate;
    const location = doc.location;
    const description = doc.description;
    const startTime = doc.startTime;
    const endTime = doc.endTime;
    const volunteersNeeded = doc.volunteersNeeded;
    const status = doc.status;
    const tags = doc.tags;
    return { title, organizer, eventDate, location, description, startTime, endTime, volunteersNeeded, status, tags };
  }
}

/**
 * Provides the singleton instance of this class to all other entities.
 */
export const Events = new EventsCollection();
