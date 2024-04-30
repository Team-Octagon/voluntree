import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import PastEventCardVolunteer from './PastEventCardVolunteer';
import { COMPONENT_IDS } from '../utilities/ComponentIDs';
import { Events } from '../../api/event/Events';
import { VolunteerProfiles } from '../../api/user/VolunteerProfileCollection';
import { VolunteerProfileEvents } from '../../api/user/VolunteerProfileEvents';
import LoadingSpinner from './LoadingSpinner';

const PastEventsContainerVolunteer = () => {
  const { ready, email } = useTracker(() => {
    const sub1 = VolunteerProfiles.subscribe();
    const sub2 = VolunteerProfileEvents.subscribeVolunteerProfileEventsVolunteer();
    const sub3 = Events.subscribeEventVolunteer();
    return {
      ready: sub1.ready() && sub2.ready() && sub3.ready(),
      email: Meteor.user()?.username,
    };
  }, []);

  const profileEvents = VolunteerProfileEvents.find({ volunteer: email }).fetch();
  const eventData = Events.find({
    _id: { $in: profileEvents.map((pe) => pe.event) },
  }).fetch();

  const now = new Date(); // Current date and time

  const pastEvents = eventData.filter(event => new Date(event.startTime) < now);

  return ready ? (
    <Container id={COMPONENT_IDS.DASHBOARD_PAST_EVENTS_VOLUNTEER}>
      {pastEvents.length > 0 ? (
        pastEvents.map((event) => (
          <PastEventCardVolunteer key={event._id} eventId={event._id} />
        ))
      ) : (
        <div>No past events found.</div>
      )}
    </Container>
  ) : <LoadingSpinner />;
};

export default PastEventsContainerVolunteer;
