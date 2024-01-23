import React from 'react';
import { Col, Container, Row, Image, Button } from 'react-bootstrap';

const VolunteerEventCard = () => (
  <Container fluid id="event-card" className="my-5">
    <Row>
      <Col xs={12} md={{ span: 4, offset: 3 }}>
        <Row>
          <Col>
            <h1>Sample Event Name</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <p>Join us for a day of environmental action and community bonding
              as we come together to make a positive impact on our beautiful coastline! Our Beach Cleanup event is all about giving back to nature and preserving the pristine beauty of our shores.
            </p>
          </Col>
        </Row>
        <Row>
          <Col>
            <Button variant="primary">Sign-up</Button>
          </Col>
        </Row>
      </Col>
      <Col xs={12} md={2}>
        <Image roundedCircle src="/images/Voluntree-logo.png" width="150px" />
      </Col>
    </Row>
  </Container>
);

export default VolunteerEventCard;
