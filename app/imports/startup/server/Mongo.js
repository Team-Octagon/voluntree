import { Meteor } from 'meteor/meteor';
import { Stuffs } from '../../api/stuff/StuffCollection';
import { Events } from '../../api/event/Events';

/* eslint-disable no-console */

// Initialize the database with a default data document.
function addData(data) {
  console.log(`  Adding: ${data.name} (${data.owner})`);
  Stuffs.define(data);
}

// Initialize the StuffsCollection if empty.
if (Stuffs.count() === 0) {
  if (Meteor.settings.defaultData) {
    console.log('Creating default data.');
    Meteor.settings.defaultData.forEach(data => addData(data));
  }
}

// Initialize the database with a default data document.
function addEvent(data) {
  console.log(`  Adding: ${data.title} (${data.name})`);
  Events.define(data);
}
// Initialize the EventsCollection if empty.
if (Events.count() === 0) {
  if (Meteor.settings.defaultEvent) {
    console.log('Creating default event data.');
    Meteor.settings.defaultEvent.forEach(data => addEvent(data));
  }
}
