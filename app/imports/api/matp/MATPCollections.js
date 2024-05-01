import { Meteor } from 'meteor/meteor';
import { Stuffs } from '../stuff/StuffCollection';
import { AdminProfiles } from '../user/AdminProfileCollection';
import { UserProfiles } from '../user/UserProfileCollection';
import { VolunteerProfiles } from '../user/VolunteerProfileCollection';
import { Events } from '../event/Events';
import { Notifications } from '../notifications/Notifications';
import { Feedback } from '../feedback/Feedback';
import { OrganizationRequests } from '../requests/OrganizationRequests';
import { OrganizationProfiles } from '../user/OrganizationProfileCollection';
import { VolunteerProfileSkills } from '../user/VolunteerProfileSkills';
import { VolunteerProfileEvents } from '../user/VolunteerProfileEvents';
import { VolunteerProfileSubs } from '../user/VolunteerProfileSubscriptions';
import { OrganizationEvents } from '../user/OrganizationEvents';
import { ChatMessages } from '../chat/ChatMessages';
import { MapCoordinates } from '../maps/MapCoordinates';

class MATPClass {
  collections;

  collectionLoadSequence;

  collectionAssociation;

  constructor() {
    // list of all the MATPCollections collections
    this.collections = [
      AdminProfiles,
      Stuffs,
      Events,
      UserProfiles,
      VolunteerProfiles,
      VolunteerProfileEvents,
      VolunteerProfileSkills,
      VolunteerProfileSubs,
      Notifications,
      Feedback,
      OrganizationRequests,
      OrganizationProfiles,
      OrganizationEvents,
      ChatMessages,
      MapCoordinates,
    ];
    /*
     * A list of collection class instances in the order required for them to be sequentially loaded from a file.
     */
    this.collectionLoadSequence = [
      AdminProfiles,
      UserProfiles,
      VolunteerProfiles,
      VolunteerProfileEvents,
      VolunteerProfileSkills,
      VolunteerProfileSubs,
      Stuffs,
      Events,
      Notifications,
      Feedback,
      OrganizationRequests,
      OrganizationProfiles,
      OrganizationEvents,
      ChatMessages,
      MapCoordinates,
    ];

    /*
     * An object with keys equal to the collection name and values the associated collection instance.
     */
    this.collectionAssociation = {};
    this.collections.forEach((collection) => {
      this.collectionAssociation[collection.getCollectionName()] = collection;
    });

  }

  /**
   * Return the collection class instance given its name.
   * @param collectionName The name of the collection.
   * @returns The collection class instance.
   * @throws { Meteor.Error } If collectionName does not name a collection.
   */
  getCollection(collectionName) {
    // console.log('MATPCollections', collectionName, this.collectionAssociation);
    const collection = this.collectionAssociation[collectionName];
    if (!collection) {
      throw new Meteor.Error(`Called MARTPCollections.getCollection with unknown collection name: ${collectionName}`);
    }
    return collection;
  }
}

export const MATPCollections = new MATPClass();
