import React from 'react';
import { Card, Container, Col, Row } from 'react-bootstrap';

// Displays example stats for the volunteer when they use the dashboard page.
const StatsContainerVolunteer = () => (
  <Container className="mt-4">
    <Row>
      <Col md={3}>
        <Card>
          <Card.Body>
            <p className="text-center display-5">⏳</p>
            <Card.Title>Hours Volunteered</Card.Title>
            <Card.Text>120 hours</Card.Text>
          </Card.Body>
        </Card>
      </Col>

      <Col md={3}>
        <Card>
          <Card.Body>
            <p className="text-center display-5">💵</p>
            <Card.Title>Impact Value</Card.Title>
            <Card.Text>$486.92</Card.Text>
          </Card.Body>
        </Card>
      </Col>

      <Col md={3}>
        <Card>
          <Card.Body>
            <p className="text-center display-5">🙌</p>
            <Card.Title>Attended Events</Card.Title>
            <Card.Text>15 events</Card.Text>
          </Card.Body>
        </Card>
      </Col>

      <Col md={3}>
        <Card>
          <Card.Body>
            <p className="text-center display-5">🏅</p>
            <Card.Title>Badges</Card.Title>
            <Card.Text>Gold Volunteer</Card.Text>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  </Container>
);

export default StatsContainerVolunteer;
