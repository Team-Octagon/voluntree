import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { PAGE_IDS } from '../utilities/PageIDs';
import StatsContainerVolunteer from '../components/StatsContainerVolunteer';
import UpcomingEventsContainerVolunteer from '../components/UpcomingEventsContainerVolunteer';

/* A simple static component to render some text for the landing page. */
const DashboardVolunteer = () => (
  <Container id={PAGE_IDS.DASHBOARD_VOLUNTEER} fluid className="container">
    <Row>
      <Col>
        <h1>Welcome Back [name]!</h1>
      </Col>
    </Row>
    <Row className="mt-3">
      <Col>
        <StatsContainerVolunteer />
      </Col>
    </Row>
    <Row className="mt-4">
      <Col>
        <h2>Upcoming Events Scheduled</h2>
        <UpcomingEventsContainerVolunteer />
      </Col>
    </Row>
  </Container>
);

export default DashboardVolunteer;
