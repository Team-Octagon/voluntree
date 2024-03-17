import React from 'react';
import { Button, Image, Row, Col, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const StartOrganizationTop = () => {
  const navigate = useNavigate();

  return (
    <Container className="d-flex flex-column justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <Row>
        <Col className="text-center">
          <Image src="/images/volunteer-team-stock-image.jpg" rounded />
        </Col>
      </Row>
      <Row>
        <Col className="text-center mt-3">
          <Button variant="primary" onClick={() => navigate('/create-organization')}>
            Create Organization
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default StartOrganizationTop;
