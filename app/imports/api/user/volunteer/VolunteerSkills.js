import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { check } from 'meteor/check';
import { Roles } from 'meteor/alanning:roles';
import BaseCollection from '../../base/BaseCollection';
import { ROLE } from '../../role/Role';

export const volunteerSkillPublications = {
  volunteerSkill: 'VolunteerSkill',
  volunteerSkillAdmin: 'VolunteerSkillAdmin',
  volunteerSkillVolunteer: 'VolunteerSkillVolunteer',
};

class VolunteerSkillsCollection extends BaseCollection {
  constructor() {
    super('VolunteerSkills', new SimpleSchema({
      volunteerUser: String,
      skill: String,
    }));
  }

  /**
   * Defines a new VolunteerSkill item.
   * @param volunteerUser the name of the volunteer user.
   * @param skill the name of the skill.
   * @return {String} the docID of the new document.
   */
  define({ volunteerUser, skill }) {
    const docID = this._collection.insert({
      volunteerUser,
      skill,
    });
    return docID;
  }

  /**
   * Updates the given document.
   * @param docID the id of the document to update. (optional).
   * @param volunteerUser the name of the volunteer user. (optional).
   * @param skill the name of the skill. (optional).
   */
  update(docID, { volunteerUser, skill }) {
    const updateData = {};
    if (volunteerUser) {
      updateData.volunteerUser = volunteerUser;
    }
    if (skill) {
      updateData.skill = skill;
    }

    this._collection.update(docID, { $set: updateData });
  }

  /**
   * A stricter form of remove that throws an error if the document or docID could not be found in this collection.
   * @param { String | Object } volunteerUser A document or docID in this collection.
   * @returns true
   */
  removeIt(volunteerUser) {
    const doc = this.findDoc(volunteerUser);
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
      // get the VolunteerSkill instance.
      const instance = this;
      /** This subscription publishes only the documents associated with the logged in user */
      Meteor.publish(volunteerSkillPublications.volunteerSkill, function publish() {
        if (this.userId) {
          const username = Meteor.users.findOne(this.userId).username;
          return instance._collection.find({ owner: username });
        }
        return this.ready();
      });

      /** This subscription publishes all documents regardless of user, but only if the logged in user is the Admin. */
      Meteor.publish(volunteerSkillPublications.volunteerSkillAdmin, function publish() {
        if (this.userId && Roles.userIsInRole(this.userId, ROLE.ADMIN)) {
          return instance._collection.find();
        }
        return this.ready();
      });

      /** This subscription publishes all documents regardless of user, but only if the logged in user is a Volunteer. */
      Meteor.publish(volunteerSkillPublications.volunteerSkillVolunteer, function publish() {
        if (this.userId && Roles.userIsInRole(this.userId, ROLE.VOLUNTEER)) {
          return instance._collection.find();
        }
        return this.ready();
      });
    }
  }

  /**
   * Subscription method for skills owned by the current user.
   */
  subscribeVolunteerSkills() {
    if (Meteor.isClient) {
      return Meteor.subscribe(volunteerSkillPublications.volunteerSkill);
    }
    return null;
  }

  /**
   * Subscription method for admin users.
   * It subscribes to the entire collection.
   */
  subscribeVolunteerSkillsAdmin() {
    if (Meteor.isClient) {
      return Meteor.subscribe(volunteerSkillPublications.volunteerSkillAdmin);
    }
    return null;
  }

  /**
   * Subscription method for volunteer users.
   * It subscribes to the entire collection.
   */
  subscribeVolunteerSkillsVolunteer() {
    if (Meteor.isClient) {
      return Meteor.subscribe(volunteerSkillPublications.volunteerSkillVolunteer);
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
   * @return {{volunteerUser: *, skill: *}}
   */
  dumpOne(docID) {
    const doc = this.findDoc(docID);
    const volunteerUser = doc.volunteerUser;
    const skill = doc.skill;
    return { volunteerUser, skill };
  }
}

/**
 * Provides the singleton instance of this class to all other entities.
 */
export const VolunteerSkills = new VolunteerSkillsCollection();
