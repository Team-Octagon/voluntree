import React from 'react';
import { Container } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import PastEventCardVolunteer from './PastEventCardVolunteer';
import { COMPONENT_IDS } from '../utilities/ComponentIDs';
import { Events } from '../../api/event/Events';

const UpcomingEventsContainerVolunteer = () => {
  const { pastEventsData } = useTracker(() => {
    Events.subscribeEventVolunteer();
    // Get the Event documents
    const items = Events.find({}).fetch();
    return {
      pastEventsData: items,
    };
  }, []);

  return (
    <Container id={COMPONENT_IDS.DASHBOARD_PAST_EVENTS_VOLUNTEER}>
      {pastEventsData.map((event) => (
        <PastEventCardVolunteer eventId={event._id} />
      ))}
    </Container>
  );
};

export default UpcomingEventsContainerVolunteer;
