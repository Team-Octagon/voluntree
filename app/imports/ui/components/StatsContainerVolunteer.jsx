import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Card, Container, Col, Row } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { PAGE_IDS } from '../utilities/PageIDs';
import { Events } from '../../api/event/Events';
import { VolunteerProfiles } from '../../api/user/VolunteerProfileCollection';
import { VolunteerProfileEvents } from '../../api/user/VolunteerProfileEvents';
import LoadingSpinner from './LoadingSpinner';

// Displays example stats for the volunteer when they use the dashboard page.
const StatsContainerVolunteer = () => {
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

  const now = new Date(); // Use a Date object for current time

  const upcomingEvents = eventData.filter(event => {
    const eventDate = new Date(event.startTime); // Parse event start time as Date object
    return eventDate >= now; // Compare as Date objects
  });
  const pastEvents = eventData.filter(event => new Date(event.startTime) < now);
  const pastHours = pastEvents.reduce((a, event) => a + Events.totalHoursOfEvent(event), 0);
  const futureHours = upcomingEvents.reduce((a, event) => a + Events.totalHoursOfEvent(event), 0);
  const impactValue = pastHours * 15;
  const award = (() => {
    if (pastEvents.length >= 10) {
      return '🥇';
    } if (pastEvents.length >= 5) {
      return '🥈';
    }
    return '🥉';
  })();
  const awardName = (() => {
    if (pastEvents.length >= 10) {
      return 'Gold';
    } if (pastEvents.length >= 5) {
      return 'Silver';
    }
    return 'Bronze';
  })();
  return (ready ? (
    <Container id={PAGE_IDS.DASHBOARD_STATS_VOLUNTEER} className="mt-4">
      <Row>
        <Col md={3}>
          <Card className="text-center">
            <Card.Body>
              <p className="text-center display-2">⏳</p>
              <Card.Title>Hours Volunteered</Card.Title>
              <Card.Text>{pastHours} hours worked {futureHours} planned!</Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col md={3}>
          <Card className="text-center">
            <Card.Body>
              <p className="text-center display-2">💵</p>
              <Card.Title>Impact Value</Card.Title>
              <Card.Text>${impactValue}</Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col md={3}>
          <Card className="text-center">
            <Card.Body>
              <p className="text-center display-5">🙌</p>
              <Card.Title>Total Events</Card.Title>
              <Card.Text>{pastEvents.length} events attended <br /> {upcomingEvents.length} events planned</Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col md={3}>
          <Card className="text-center">
            <Card.Body>
              <p className="text-center display-2">{award}</p>
              <Card.Title title="5 events is siler and 10 events is gold">Badges</Card.Title>
              <Card.Text>{awardName} Volunteer <br />  </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />
  );
};

export default StatsContainerVolunteer;
