import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { check } from 'meteor/check';
import { Roles } from 'meteor/alanning:roles';
import BaseCollection from '../../base/BaseCollection';
import { ROLE } from '../../role/Role';

export const volunteerProfileSkillPublications = {
  volunteerProfileSkill: 'VolunteerProfileSkill',
  volunteerProfileSkillAdmin: 'VolunteerProfileSkillAdmin',
  volunteerProfileSkillVolunteer: 'VolunteerProfileSkillVolunteer',
};

class VolunteerProfileSkillsCollection extends BaseCollection {
  constructor() {
    super('VolunteerProfileSkills', new SimpleSchema({
      volunteerProfile: String,
      skill: String,
    }));
  }

  /**
   * Defines a new VolunteerSkill item.
   * @param volunteer the name of the volunteer.
   * @param skill the name of the skill.
   * @return {String} the docID of the new document.
   */
  define({ volunteer, skill }) {
    const docID = this._collection.insert({
      volunteer,
      skill,
    });
    return docID;
  }

  /**
   * Updates the given document.
   * @param docID the id of the document to update. (optional).
   * @param volunteer the name of the volunteer. (optional).
   * @param skill the name of the skill. (optional).
   */
  update(docID, { volunteer, skill }) {
    const updateData = {};
    if (volunteer) {
      updateData.volunteer = volunteer;
    }
    if (skill) {
      updateData.skill = skill;
    }

    this._collection.update(docID, { $set: updateData });
  }

  /**
   * A stricter form of remove that throws an error if the document or docID could not be found in this collection.
   * @param { String | Object } skill A document or docID in this collection.
   * @returns true
   */
  removeIt(skill) {
    const doc = this.findDoc(skill);
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
      // get the VolunteerProfileSkill instance.
      const instance = this;
      /** This subscription publishes only the documents associated with the logged in user */
      Meteor.publish(volunteerProfileSkillPublications.volunteerProfileSkill, function publish() {
        if (this.userId) {
          const username = Meteor.users.findOne(this.userId).username;
          return instance._collection.find({ owner: username });
        }
        return this.ready();
      });

      /** This subscription publishes all documents regardless of user, but only if the logged in user is the Admin. */
      Meteor.publish(volunteerProfileSkillPublications.volunteerProfileSkillAdmin, function publish() {
        if (this.userId && Roles.userIsInRole(this.userId, ROLE.ADMIN)) {
          return instance._collection.find();
        }
        return this.ready();
      });

      /** This subscription publishes all documents regardless of user, but only if the logged in user is a Volunteer. */
      Meteor.publish(volunteerProfileSkillPublications.volunteerProfileSkillVolunteer, function publish() {
        if (this.userId && Roles.userIsInRole(this.userId, ROLE.VOLUNTEER)) {
          return instance._collection.find();
        }
        return this.ready();
      });
    }
  }

  /**
   * Subscription method for event made by the current user.
   */
  subscribeVolunteerProfileSkills() {
    if (Meteor.isClient) {
      return Meteor.subscribe(volunteerProfileSkillPublications.volunteerProfileSkill);
    }
    return null;
  }

  /**
   * Subscription method for admin users.
   * It subscribes to the entire collection.
   */
  subscribeVolunteerProfileSkillsAdmin() {
    if (Meteor.isClient) {
      return Meteor.subscribe(volunteerProfileSkillPublications.volunteerProfileSkillAdmin);
    }
    return null;
  }

  /**
   * Subscription method for volunteer users.
   * It subscribes to the entire collection.
   */
  subscribeVolunteerProfileSkillsVolunteer() {
    if (Meteor.isClient) {
      return Meteor.subscribe(volunteerProfileSkillPublications.volunteerProfileSkillVolunteer);
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
   * @return {{volunteer: *, skill: *}}
   */
  dumpOne(docID) {
    const doc = this.findDoc(docID);
    const volunteer = doc.volunteer;
    const skill = doc.skill;
    return { volunteer, skill };
  }
}

/**
 * Provides the singleton instance of this class to all other entities.
 */
export const VolunteerProfileSkills = new VolunteerProfileSkillsCollection();
