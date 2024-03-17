import SimpleSchema from 'simpl-schema';
import BaseProfileCollection from '../BaseProfileCollection';

class OrganizationRequestsCollection extends BaseProfileCollection {
  constructor() {
    super('OrganizationProfile', new SimpleSchema({}));
  }

  /**
   * Defines the Organization request.
   * @param email The email associated with this profile.
   * @param password The password for this user.
   * @param name The name of the organization. This will be the username for the associated Meteor account if accepted.
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
   * Updates the OrganizationRequest. You cannot change the email or role.
   * @param docID the id of the VolunteerRequest.
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
