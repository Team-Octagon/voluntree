import React from 'react';
import { Col, Container, Row, Image } from 'react-bootstrap';

const VolunteerProfileSettingsCard = () => (
  <Container fluid id="profile-card" className="my-5">
    <Row>
      <Col xs={12} md={2}>
        <Image roundedCircle src="/images/meteor-logo.png" width="150px" />
      </Col>
    </Row>
    <Row className="py-3">
      <h3>Test Name Here</h3>
    </Row>
  </Container>
);

export default VolunteerProfileSettingsCard;
