import SimpleSchema from 'simpl-schema';
import BaseCollection from '../base/BaseCollection';
import { ROLE } from '../role/Role';

class OrganizationRequestsCollection extends BaseCollection {
  constructor() {
    super('OrganizationRequests', new SimpleSchema({
      email: String,
      organizationName: String,
      password: String,
    }));
  }

  /**
   * Defines the Organization request.
   * @param email The email associated with this profile.
   * @param password The password for this user.
   * @param organizationName The name of the organization. This will be the username for the associated Meteor account if accepted.
   */
  define({ email, organizationName, password }) {
    const docID = this._collection.insert({
      email,
      organizationName,
      password,
    });
    console.log(`Defining ${organizationName} with password ${password}`);
    return docID;
  }

  /**
   * Updates the OrganizationRequest. You cannot change the email or role.
   * @param docID the id of the VolunteerRequest.
   * @param organizationName new organization name (optional).
   */
  update(docID, { organizationName }) {
    this.assertDefined(docID);
    const updateData = {};
    if (organizationName) {
      updateData.organizationName = organizationName;
    }
    this._collection.update(docID, { $set: updateData });
  }

  /**
   * Removes this request, given its document ID.
   * @param docID The ID for this request object.
   */
  removeIt(docID) {
    if (this.isDefined(docID)) {
      return super.removeIt(docID);
    }
    return null;
  }

  /**
   * TODO CAM: Update this documentation since we want to be able to sign up new users.
   * Implementation of assertValidRoleForMethod. Asserts that userId is logged in as an Admin or Volunteer.
   * This is used in the define, update, and removeIt Meteor methods associated with each class.
   * @throws { Meteor.Error } If there is no logged in user, or the user is not an Admin or Volunteer.
   */
  assertValidRoleForMethod(userId) {
    this.assertRole(userId, [ROLE.ADMIN, ROLE.VOLUNTEER]);
    return true;
  }

  /**
   * Returns an object representing the OrganizationProfile docID in a format acceptable to define().
   * @param docID The docID of a OrganizationProfile.
   * @returns { Object } An object representing the definition of docID.
   */
  dumpOne(docID) {
    const doc = this.findDoc(docID);
    const email = doc.email;
    const organizationName = doc.organizationName;
    return { email, organizationName }; // CAM this is not enough for the define method. We lose the password.
  }
}

/**
 * Provides the singleton instance of this class to all other entities.
 * @type {OrganizationRequestsCollection}
 */
export const OrganizationRequests = new OrganizationRequestsCollection();
