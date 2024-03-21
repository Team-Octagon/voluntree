import { Meteor } from 'meteor/meteor';
import { Stuffs } from '../../api/stuff/StuffCollection';
import { Events } from '../../api/event/Events';
import { Notifications } from '../../api/notifications/Notifications';
import { VolunteerProfileEvents } from '../../api/user/VolunteerProfileEvents';

// eslint-disable-next-line no-undef
const dummyEvents = Assets.getText('events/dummy-events.json');
// eslint-disable-next-line no-undef
const dummyVolunteers = Assets.getText('volunteers/dummy-volunteers.json');

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
  console.log(`  Adding: ${data.title}`);
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

// Initialize the EventsCollection if empty using dummyEvents.
if (Events.count() === 0) {
  if (dummyEvents) {
    console.log('Creating default event data from dummy events.');
    const eventsData = JSON.parse(dummyEvents);
    eventsData.forEach(data => addEvent(data));
  }
}

// Add dummy events to dummy volunteers
if (dummyVolunteers) {
  console.log('Adding dummy events to dummy volunteers');
  const volunteerEventData = JSON.parse(dummyVolunteers);
  volunteerEventData.forEach((volunteer) => {
    // Make sure events are defined in Events collection if they are not already.
    volunteer.events.forEach((event) => {
      if (!Events.isDefined(event._id)) {
        const eventId = Events.define(event);
        console.log(`  Adding: ${event.title} of id ${eventId} to Events collection`);
        VolunteerProfileEvents.define({ volunteer: volunteer.email, event: eventId });
      }
    });
  });
}
