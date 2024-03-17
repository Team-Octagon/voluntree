import SimpleSchema from 'simpl-schema';
import BaseProfileCollection from '../BaseProfileCollection';
import { ROLE } from '../../role/Role';

class OrganizationRequestsCollection extends BaseProfileCollection {
  constructor() {
    super('OrganizationProfile', new SimpleSchema({}));
  }

  /**
   * Defines the profile associated with an Organization and the associated Meteor account.
   * @param email The email associated with this profile.
   * @param password The password for this user.
   * @param name The name of the organization. This will be the username for the associated Meteor account.
   */
  define({ email, name, password }) {
    const docID = this._collection.insert({
      email,
      name,
      password,
    });
    return docID;
  }

  /**
   * Updates the OrganizationProfile. You cannot change the email or role.
   * @param docID the id of the VolunteerProfile.
   * @param name new organization name (optional).
   */
  update(docID, { name }) {
    this.assertDefined(docID);
    const updateData = {};
    if (name) {
      updateData.name = name;
    }
    this._collection.update(docID, { $set: updateData });
  }

  /**
   * Removes this profile, given its profile ID.
   * Also removes this user from Meteor Accounts.
   * @param profileID The ID for this profile object.
   */
  removeIt(profileID) {
    if (this.isDefined(profileID)) {
      return super.removeIt(profileID);
    }
    return null;
  }

  /**
   * TODO CAM: Update this documentation since we want to be able to sign up new users.
   * Implementation of assertValidRoleForMethod. Asserts that userId is logged in as an Admin or Organization.
   * This is used in the define, update, and removeIt Meteor methods associated with each class.
   * @throws { Meteor.Error } If there is no logged in user, or the user is not an Admin or Organization.
   */
  assertValidRoleForMethod() {
    // this.assertRole(userId, [ROLE.ADMIN, ROLE.ORGANIZATION]);
    return true;
  }

  /**
   * Returns an array of strings, each one representing an integrity problem with this collection.
   * Returns an empty array if no problems were found.
   * Checks the profile common fields and the role..
   * @returns {Array} A (possibly empty) array of strings indicating integrity issues.
   */
  checkIntegrity() {
    const problems = [];
    this.find().forEach((doc) => {
      if (doc.role !== ROLE.ORGANIZATION) {
        problems.push(`OrganizationProfile instance does not have ROLE.ORGANIZATION: ${doc}`);
      }
    });
    return problems;
  }

  /**
   * Returns an object representing the OrganizationProfile docID in a format acceptable to define().
   * @param docID The docID of a OrganizationProfile.
   * @returns { Object } An object representing the definition of docID.
   */
  dumpOne(docID) {
    const doc = this.findDoc(docID);
    const email = doc.email;
    const name = doc.name;
    return { email, name }; // CAM this is not enough for the define method. We lose the password.
  }
}

/**
 * Provides the singleton instance of this class to all other entities.
 * @type {OrganizationRequestsCollection}
 */
export const OrganizationRequests = new OrganizationRequestsCollection();
