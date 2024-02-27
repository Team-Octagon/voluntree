import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import { Stuffs } from '../../api/stuff/StuffCollection';
import { Events } from '../../api/event/Events';
import { Notifications } from '../../api/notifications/Notifications';

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

function addNotification(data) {
  console.log('addning notifcation');
  Notifications.define(data);
}

// Initialize the EventsCollection if empty.
if (Notifications.count() === 0) {
  if (Meteor.settings.defaultNotifications) {
    console.log('Creating default notifications event data.');
    Meteor.settings.defaultNotifications.forEach(data => addNotification(data));
  }
}

// Initialize the EventsCollection if empty.
if (Events.count() === 0) {
  if (Meteor.settings.defaultEvent) {
    console.log('Creating default event data.');
    Meteor.settings.defaultEvent.forEach(data => addEvent(data));
  }
}

