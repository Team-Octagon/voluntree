import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { PAGE_IDS } from '../utilities/PageIDs';
import VolunteerEventDash from '../components/VolunteerEventDash';

const VolunteerListEvents = () => (
  <Container id={PAGE_IDS.VOLUNTEER_PROFILE} className="py-3">
    <Row>
      <Col className="text-center">
        <h1>Here is a list of all events</h1>
      </Col>
    </Row>
    <VolunteerEventDash />
  </Container>
);

export default VolunteerListEvents;
