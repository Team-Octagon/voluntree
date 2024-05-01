import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { COMPONENT_IDS } from '../utilities/ComponentIDs';
import { Events } from '../../api/event/Events';
import LoadingSpinner from './LoadingSpinner';
import { OrganizationProfiles } from '../../api/user/OrganizationProfileCollection';
import { OrganizationEvents } from '../../api/user/OrganizationEvents';
import PastEventCardOrganization from './PastEventCardOrganization';

const PastEventsContainerOrganization = () => {
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

  const now = new Date(); // Current date and time

  const pastEvents = eventData.filter(event => new Date(event.startTime) < now);

  return ready ? (
    <Container id={COMPONENT_IDS.DASHBOARD_PAST_EVENTS_ORGANIZATION}>
      {pastEvents.length > 0 ? (
        pastEvents.map((event) => (
          <PastEventCardOrganization key={event._id} eventId={event._id} />
        ))
      ) : (
        <div>No past events found.</div>
      )}
    </Container>
  ) : <LoadingSpinner />;
};

export default PastEventsContainerOrganization;
