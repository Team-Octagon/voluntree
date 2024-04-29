import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Button, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useTracker } from 'meteor/react-meteor-data';
import UpcomingEventsCardVolunteer from './UpcomingEventsCardVolunteer';
import { COMPONENT_IDS } from '../utilities/ComponentIDs';
import { Events } from '../../api/event/Events';
import { VolunteerProfiles } from '../../api/user/VolunteerProfileCollection';
import { VolunteerProfileEvents } from '../../api/user/VolunteerProfileEvents';
import LoadingSpinner from './LoadingSpinner';

const UpcomingEventsContainerVolunteer = () => {
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
  const eventData = Events.find({ _id: { $in: profileEvents.map((pe) => pe.event) } }).fetch();

  return ready ? (
    <Container id={COMPONENT_IDS.DASHBOARD_UPCOMING_EVENTS_VOLUNTEER} className="mt-4">
      {eventData.map(event => (
        <UpcomingEventsCardVolunteer key={event._id} eventId={event._id} />
      ))}
      <Container className="text-center mt-4">
        <Link to="/volunteer-list-events">
          <Button variant="primary">Find More Volunteer Opportunities</Button>
        </Link>
      </Container>
    </Container>
  ) : <LoadingSpinner />;
};

export default UpcomingEventsContainerVolunteer;
