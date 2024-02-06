import React from 'react';
import { Col, Container, Button, Row, Image } from 'react-bootstrap';

const OrganizationProfileCard = () => (
  <Container fluid id="profile-card" className="my-5">
    <Row>
      <Col xs={12} md={{ span: 4, offset: 3 }}>
        <Row>
          <Col>
            <h1>Pawsitive Pals Foundation</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <p>Pawsitive Pals Foundation is dedicated to providing a second chance at life for animals in need by promoting adoption and providing compassionate care.</p>
            <p>Our mission revolves around creating a harmonious bond between humans and animals, ensuring each furry friend finds a loving forever home.</p>
            <p>Through community outreach, education, and support, we strive to advocate for the welfare and well-being of all creatures, fostering a future where every pet is valued, cherished, and celebrated.</p>
          </Col>
        </Row>
        <Row>
          <Col>
            <Button variant="primary">Message</Button>
          </Col>
        </Row>
      </Col>
      <Col xs={12} md={2}>
        <Image roundedCircle src="/images/meteor-logo.png" width="150px" />
      </Col>
    </Row>
  </Container>
);

export default OrganizationProfileCard;
