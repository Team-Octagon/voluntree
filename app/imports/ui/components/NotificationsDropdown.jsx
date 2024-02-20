import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const NotificationsDropdown = () => (
  <Container style={{ width: '300px' }} className="d-flex align-items-center justify-content-center flex-column vh-20">
    <Row className="mb-3">
      <Col className="flex-column">
        <h6>Message from [Name]</h6>
        <p>This is the subject line of the message.</p>
        <hr className="my-2" />
      </Col>
    </Row>
    <Row>
      <Col className="flex-column">
        <h6>[Event Ex500] Coming up on [date]</h6>
        <p>Confirm your attendance at the event. We would love to see you there!</p>
        <hr className="my-2" />
      </Col>
    </Row>
  </Container>
);

export default NotificationsDropdown;
