// WaiverList.js
import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

const sampleWaivers = [
  { title: 'Waiver 1', date: '2024-01-01', status: 'Signed' },
  { title: 'Waiver 2', date: '2024-02-15', status: 'Signed' },
  { title: 'Waiver 3', date: '2024-03-03', status: 'Signed' },
];

const VolunteerWavierSettingsCard = () => {
  return (
    <Card>
      <Card.Header className="text-center">Wavier's Signed</Card.Header>
      <Card.Body>
        <Row>
          {sampleWaivers.map((waiver, index) => (
            <Col key={index} md={4}>
              <Card>
                <Card.Body>
                  <Card.Title>{waiver.title}</Card.Title>
                  <Card.Text>
                    <strong>Date Signed:</strong> {waiver.date}<br />
                    <strong>Status:</strong> {waiver.status}
                  </Card.Text>
                  <Button variant="primary">View Details</Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Card.Body>
    </Card>
  );
};

export default VolunteerWavierSettingsCard;
