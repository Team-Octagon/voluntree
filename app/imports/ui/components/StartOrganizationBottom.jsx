import React from 'react';
import { Row, Col, Image } from 'react-bootstrap';

const StartOrganizationBottom = () => (
  <div className="bottom-component" style={{ marginTop: '20px', marginBottom: '20px', padding: '20px' }}>
    <Row>
      <Col className="text-center">
        <h1 style={{ color: 'white' }}>Create Organization</h1>
      </Col>
    </Row>
    <Row style={{ marginTop: '50px' }}>
      <Col md={5} className="text-center">
        <Image src="/images/Voluntree-logo-cricle-modified.png" roundedCircle style={{ width: '400px', height: '400px', objectFit: 'cover' }} />
      </Col>
      <Col md={6}>
        {/* Apply color style directly to the h2 tag */}
        {/* eslint-disable-next-line max-len */}
        <h2 style={{ color: 'white' }}>Users interested in creating an organization can apply by submitting their organization&apos;s name, an email, and a password. Once submitted, the application will undergo a review process by our administration team. This step is crucial to ensure that all organizations align with our platform&apos;s standards and values. Applicants should expect a waiting period for the review to be completed. Approval notifications will be sent to the provided email, indicating whether the organization can be added to our platform.</h2>
      </Col>
    </Row>
  </div>
);

export default StartOrganizationBottom;
