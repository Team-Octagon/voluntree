import React from 'react';
import { Row, Col, Image } from 'react-bootstrap';

const StartOrganizationBottom = () => (
  <div className="bottom-component" style={{ marginTop: '20px', marginBottom: '20px', padding: '20px' }}>
    <Row>
      <Col md={6} className="text-center">
        <Image src="/images/volunteer-team-stock-image.jpg" roundedCircle style={{ width: '400px', height: '400px' }}/>
      </Col>
      <Col md={6}>
        <p>Text explaining how applicants can create organizations through the application.</p>
      </Col>
    </Row>
  </div>
);

export default StartOrganizationBottom;
