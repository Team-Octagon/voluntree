import React from 'react';
import { Container } from 'react-bootstrap';
import PastEventCardVolunteer from './PastEventCardVolunteer';
import { COMPONENT_IDS } from '../utilities/ComponentIDs';
import { Events } from "../../api/event/Events";
import { useTracker } from 'meteor/react-meteor-data';

const UpcomingEventsContainerVolunteer = () => {
  const { pastEventsData, ready } = useTracker(() => {
    // Get access to Event documents.
    const subscription = Events.subscribeEventVolunteer();
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the Event documents
    const items = Events.find({}).fetch();
    return {
      pastEventsData: items,
      ready: rdy,
    };
  }, []);

  return (<Container id={COMPONENT_IDS.DASHBOARD_PAST_EVENTS_VOLUNTEER}>
    {pastEventsData.map((event) => (
        <PastEventCardVolunteer event={event}/>
    ))}
  </Container>)
}

export default UpcomingEventsContainerVolunteer;
