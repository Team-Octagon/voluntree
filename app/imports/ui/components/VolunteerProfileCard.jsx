import React from 'react';
import PropTypes from 'prop-types';
import { Col, Container, Button, Row, Image } from 'react-bootstrap';

const VolunteerProfileCard = ({ firstName, lastName }) => (
  <Container fluid id="profile-card" className="my-5">
    <Row>
      <Col xs={12} md={{ span: 4, offset: 3 }}>
        <Row>
          <Col>
            <h1>{firstName} {lastName}</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <p>I&apos;m a university looking forward to do volunteer service!</p>
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

VolunteerProfileCard.propTypes = {
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
};

export default VolunteerProfileCard;
