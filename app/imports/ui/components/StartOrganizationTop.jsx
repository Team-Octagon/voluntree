import React from 'react';
import { Button, Image, Row, Col, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const StartOrganizationTop = () => {
  const navigate = useNavigate();

  return (
    <Container className="d-flex flex-column align-items-center" style={{ minHeight: '100vh' }}>
      {/* Move the Button Row to the top */}
      <Row className="mb-3"> {/* Add margin bottom to separate the button and image */}
        <Col className="text-center">
          {/* Increase Button size by using the 'lg' prop and custom styles for even larger size */}
          <Button
            variant="primary"
            style={{
              backgroundColor: 'teal',
              borderColor: 'teal',
              color: 'white',
              padding: '10px 20px', // Increase padding for bigger size
              fontSize: '20px', // Increase font size for better visibility
            }}
            onClick={() => navigate('/create-organization')}
          >
            Create Organization
          </Button>
        </Col>
      </Row>
      <Row>
        <Col className="text-center">
          <Image src="/images/stock-image1.png" rounded />
        </Col>
      </Row>
    </Container>
  );
};

export default StartOrganizationTop;
