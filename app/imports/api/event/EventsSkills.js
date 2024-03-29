import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { check } from 'meteor/check';
import { Roles } from 'meteor/alanning:roles';
import BaseCollection from '../base/BaseCollection';
import { ROLE } from '../role/Role';

export const eventSkillPublications = {
  eventSkill: 'EventSkill',
  eventSkillAdmin: 'EventSkillAdmin',
  eventSkillVolunteer: 'EventSkillVolunteer',
};

class EventsSkillsCollection extends BaseCollection {
  constructor() {
    super('EventsSkills', new SimpleSchema({
      event: String,
      skill: String,
    }));
  }

  /**
   * Defines a new EventSkill item.
   * @param event the name of the event.
   * @param skill the name of the skill.
   * @return {String} the docID of the new document.
   */
  define({ event, skill }) {
    const docID = this._collection.insert({
      event,
      skill,
    });
    return docID;
  }

  /**
   * Updates the given document.
   * @param docID the id of the document to update. (optional).
   * @param event the name of the event. (optional).
   * @param skill the name of the skill. (optional).
   */
  update(docID, { event, skill }) {
    const updateData = {};
    if (event) {
      updateData.event = event;
    }
    if (skill) {
      updateData.skill = skill;
    }

    this._collection.update(docID, { $set: updateData });
  }

  /**
   * A stricter form of remove that throws an error if the document or docID could not be found in this collection.
   * @param { String | Object } event A document or docID in this collection.
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
      // get the EventsSkills instance.
      const instance = this;
      /** This subscription publishes only the documents associated with the logged in user */
      Meteor.publish(eventSkillPublications.eventSkill, function publish() {
        if (this.userId) {
          const username = Meteor.users.findOne(this.userId).username;
          return instance._collection.find({ owner: username });
        }
        return this.ready();
      });

      /** This subscription publishes all documents regardless of user, but only if the logged in user is the Admin. */
      Meteor.publish(eventSkillPublications.eventSkillAdmin, function publish() {
        if (this.userId && Roles.userIsInRole(this.userId, ROLE.ADMIN)) {
          return instance._collection.find();
        }
        return this.ready();
      });

      /** This subscription publishes all documents regardless of user, but only if the logged in user is a Volunteer. */
      Meteor.publish(eventSkillPublications.eventSkillVolunteer, function publish() {
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
  subscribeEventSkills() {
    if (Meteor.isClient) {
      return Meteor.subscribe(eventSkillPublications.eventSkill);
    }
    return null;
  }

  /**
   * Subscription method for admin users.
   * It subscribes to the entire collection.
   */
  subscribeEventSkillsAdmin() {
    if (Meteor.isClient) {
      return Meteor.subscribe(eventSkillPublications.eventSkillAdmin);
    }
    return null;
  }

  /**
   * Subscription method for volunteer users.
   * It subscribes to the entire collection.
   */
  subscribeEventSkillsVolunteer() {
    if (Meteor.isClient) {
      return Meteor.subscribe(eventSkillPublications.eventSkillVolunteer);
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
   * @return {{event: *, skill: *}}
   */
  dumpOne(docID) {
    const doc = this.findDoc(docID);
    const event = doc.event;
    const skill = doc.skill;
    return { event, skill };
  }
}

/**
 * Provides the singleton instance of this class to all other entities.
 */
export const EventsSkills = new EventsSkillsCollection();
