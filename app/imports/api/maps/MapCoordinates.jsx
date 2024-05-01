import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import BaseCollection from '../base/BaseCollection';

export const mapCoordinatesPublications = {
  mapCoordinates: 'MapCoordinates',
};

class MapCoordinatesCollection extends BaseCollection {
  constructor() {
    super('MapCoordinates', new SimpleSchema({
      eventId: String, // Add eventId field
      latitude: Number,
      longitude: Number,
      createdAt: Date,
      // You can add more fields as needed, such as user ID, name, description, etc.
    }));
  }

  async define({ lat, lon, eventId }) {
    try {
      const createdAt = new Date();
      return this._collection.insert({
        eventId: eventId,
        latitude: lat,
        longitude: lon,
        createdAt,
      });
    } catch (error) {
      throw new Error(`Failed to define map coordinates: ${error.message}`);
    }
  }

  publish() {
    if (Meteor.isServer) {
      const instance = this;
      Meteor.publish(mapCoordinatesPublications.mapCoordinates, function publish() {
        // You may want to restrict access based on user roles or permissions here.
        return instance._collection.find({});
      });
    }
  }

  subscribeMapCoordinates() {
    if (Meteor.isClient) {
      return Meteor.subscribe(mapCoordinatesPublications.mapCoordinates);
    }
    return null;
  }

  // Optionally, you can add methods for retrieving, updating, or deleting coordinates.
}

export const MapCoordinates = new MapCoordinatesCollection();
