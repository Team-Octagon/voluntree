import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { check } from 'meteor/check';
import { Roles } from 'meteor/alanning:roles';
import BaseCollection from '../base/BaseCollection';
import { ROLE } from '../role/Role';

export const skillPublications = {
  skill: 'Skill',
  skillAdmin: 'SkillAdmin',
  skillVolunteer: 'SkillVolunteer',
};

class SkillsCollection extends BaseCollection {
  constructor() {
    super('Skills', new SimpleSchema({
      name: { type: String, index: true, unique: true },
    }));
  }

  /**
   * Defines a new Skill item.
   * @param name the name of the skill.
   * @return {String} the docID of the new document.
   */
  define({ name }) {
    const docID = this._collection.insert({
      name,
    });
    return docID;
  }

  /**
   * Updates the given document.
   * @param docID the id of the document to update. (optional).
   * @param name the title of the event. (optional).
   */
  update(docID, { name }) {
    const updateData = {};
    if (name) {
      updateData.name = name;
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
   * It publishes the entire collection for admin and just the skill associated to an owner.
   */
  publish() {
    if (Meteor.isServer) {
      // get the Events instance.
      const instance = this;
      /** This subscription publishes only the documents associated with the logged in user */
      Meteor.publish(skillPublications.skill, function publish() {
        if (this.userId) {
          const username = Meteor.users.findOne(this.userId).username;
          return instance._collection.find({ owner: username });
        }
        return this.ready();
      });

      /** This subscription publishes all documents regardless of user, but only if the logged in user is the Admin. */
      Meteor.publish(skillPublications.skillAdmin, function publish() {
        if (this.userId && Roles.userIsInRole(this.userId, ROLE.ADMIN)) {
          return instance._collection.find();
        }
        return this.ready();
      });

      /** This subscription publishes all documents regardless of user, but only if the logged in user is a Volunteer. */
      Meteor.publish(skillPublications.skillVolunteer, function publish() {
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
  subscribeSkills() {
    if (Meteor.isClient) {
      return Meteor.subscribe(skillPublications.skill);
    }
    return null;
  }

  /**
   * Subscription method for admin users.
   * It subscribes to the entire collection.
   */
  subscribeSkillsAdmin() {
    if (Meteor.isClient) {
      return Meteor.subscribe(skillPublications.skillAdmin);
    }
    return null;
  }

  /**
   * Subscription method for volunteer users.
   * It subscribes to the entire collection.
   */
  subscribeSkillsVolunteer() {
    if (Meteor.isClient) {
      return Meteor.subscribe(skillPublications.skillVolunteer);
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
   * @return {{name: (*|string)}}
   */
  dumpOne(docID) {
    const doc = this.findDoc(docID);
    const name = doc.name;
    return name;
  }
}

/**
 * Provides the singleton instance of this class to all other entities.
 */
export const Skills = new SkillsCollection();
