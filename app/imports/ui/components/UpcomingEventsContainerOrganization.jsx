import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { COMPONENT_IDS } from '../utilities/ComponentIDs';
import { Events } from '../../api/event/Events';
import LoadingSpinner from './LoadingSpinner';
import { OrganizationProfiles } from '../../api/user/OrganizationProfileCollection';
import { OrganizationEvents } from '../../api/user/OrganizationEvents';
import UpcomingEventsCardOrganization from './UpcomingEventsCardOrganization';

const UpcomingEventsContainerOrganization = () => {
  const { ready, email } = useTracker(() => {
    const sub1 = OrganizationProfiles.subscribe();
    const sub2 = OrganizationEvents.subscribeOrganizationEventsOrganization();
    const sub3 = Events.subscribeEventOrganization();
    return {
      ready: sub1.ready() && sub2.ready() && sub3.ready(),
      email: Meteor.user()?.username,
    };
  }, []);

  const profileEvents = OrganizationEvents.find({ organization: email }).fetch();
  const eventData = Events.find({ _id: { $in: profileEvents.map((pe) => pe.event) } }).fetch();

  const now = new Date(); // Use a Date object for current time

  const upcomingEvents = eventData.filter(event => {
    const eventDate = new Date(event.startTime); // Parse event start time as Date object
    return eventDate >= now; // Compare as Date objects
  });
  return ready ? (
    <Container id={COMPONENT_IDS.DASHBOARD_UPCOMING_EVENTS_ORGANIZATION} className="mt-4">
      {upcomingEvents.map(event => (
        <UpcomingEventsCardOrganization key={event._id} eventId={event._id} />
      ))}
    </Container>
  ) : <LoadingSpinner />;
};

export default UpcomingEventsContainerOrganization;
