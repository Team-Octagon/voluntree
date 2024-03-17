import React from 'react';
import { Row, Col, Image } from 'react-bootstrap';

const StartOrganizationBottom = () => (
  <div className="bottom-component">
    <Row>
      <Col md={6}>
        <Image src="/images/volunteer-team-stock-image.jpg" rounded />
      </Col>
      <Col md={6}>
        <p>Text explaining how applicants can create organizations through the application.</p>
      </Col>
    </Row>
  </div>
);

export default StartOrganizationBottom;
