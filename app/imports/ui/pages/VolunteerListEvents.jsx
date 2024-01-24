import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { PAGE_IDS } from '../utilities/PageIDs';
import VolunteerEventDash from '../components/VolunteerEventDash';

const VolunteerListEvents = () => (
  <Container id={PAGE_IDS.VOLUNTEER_PROFILE} className="py-3">
    <Row>
      <Col className="text-center">
        <h1>Event Listings</h1>
      </Col>
    </Row>
    <Row>
      <Col style={{ paddingLeft: 120 }}>
        <VolunteerEventDash />
      </Col>
    </Row>
  </Container>
);

export default VolunteerListEvents;
