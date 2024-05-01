import React from 'react';
// eslint-disable-next-line no-unused-vars
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Col, Container, Row } from 'react-bootstrap';
import { PAGE_IDS } from '../utilities/PageIDs';
import { Events } from '../../api/event/Events';
import LoadingSpinner from '../components/LoadingSpinner';
import { OrganizationProfiles } from '../../api/user/OrganizationProfileCollection';
import { OrganizationEvents } from '../../api/user/OrganizationEvents';
import UpcomingEventsContainerOrganization from '../components/UpcomingEventsContainerOrganization';
import PastEventsContainerOrganization from '../components/PastEventsAttendedContainerOrganization';

const DashboardOrganization = () => {
  const { ready, email } = useTracker(() => {
    const sub1 = OrganizationProfiles.subscribe();
    const sub2 = OrganizationEvents.subscribeOrganizationEventsOrganization();
    const sub3 = Events.subscribeEventOrganization();
    return {
      ready: sub1.ready() && sub2.ready() && sub3.ready(),
      email: Meteor.user()?.username,
    };
  }, []);
  const profile = OrganizationProfiles.findOne({ email });
  return (
    ready ? (
      <Container id={PAGE_IDS.DASHBOARD_ORGANIZATION} fluid className="container">
        <Row>
          <Col>
            <h1>Welcome Back {profile ? profile.name : 'Guest'} {profile ? profile.lastName : 'Guest'}!</h1>
          </Col>
        </Row>
        <Row className="mt-4">
          <Col>
            <h3>Upcoming Scheduled Events</h3>
            <UpcomingEventsContainerOrganization />
          </Col>
        </Row>
        <Row>
          <Col>
            <h3>Past Scheduled Events</h3>
            <PastEventsContainerOrganization />
          </Col>
        </Row>
      </Container>
    ) : <LoadingSpinner />
  );
};

export default DashboardOrganization;
