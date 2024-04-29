import React from 'react';
// eslint-disable-next-line no-unused-vars
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Col, Container, Row } from 'react-bootstrap';
import { PAGE_IDS } from '../utilities/PageIDs';
import StatsContainerVolunteer from '../components/StatsContainerVolunteer';
import UpcomingEventsContainerVolunteer from '../components/UpcomingEventsContainerVolunteer';
import PastEventsAttendedContainerVolunteer from '../components/PastEventsAttendedContainerVolunteer';
import { Events } from '../../api/event/Events';
import LoadingSpinner from '../components/LoadingSpinner';
import { VolunteerProfiles } from '../../api/user/VolunteerProfileCollection';
import { VolunteerProfileEvents } from '../../api/user/VolunteerProfileEvents';

const DashboardVolunteer = () => {
  const { ready, email } = useTracker(() => {
    const sub1 = VolunteerProfiles.subscribe();
    const sub2 = VolunteerProfileEvents.subscribeVolunteerProfileEventsVolunteer();
    const sub3 = Events.subscribeEventVolunteer();
    return {
      ready: sub1.ready() && sub2.ready() && sub3.ready(),
      email: Meteor.user()?.username,
    };
  }, []);
  const profile = VolunteerProfiles.findOne({ email });
  return (
    ready ? (
      <Container id={PAGE_IDS.DASHBOARD_VOLUNTEER} fluid className="container">
        <Row>
          <Col>
            <h1>Welcome Back {profile ? profile.firstName : 'Guest'} {profile ? profile.lastName : 'Guest'}!</h1>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col>
            <StatsContainerVolunteer />
          </Col>
        </Row>
        <Row className="mt-4">
          <Col>
            <h3>Upcoming Events Scheduled</h3>
            <UpcomingEventsContainerVolunteer />
          </Col>
        </Row>
        <Row>
          <Col>
            <h3>Past Events Attended</h3>
            <PastEventsAttendedContainerVolunteer />
          </Col>
        </Row>
      </Container>
    ) : <LoadingSpinner />
  );
};

export default DashboardVolunteer;
