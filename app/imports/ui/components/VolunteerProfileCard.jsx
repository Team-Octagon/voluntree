import React from 'react';
import PropTypes from 'prop-types';
import { Col, Container, Row, Image } from 'react-bootstrap';
import EditProfileCard from './EditProfileCard';

const VolunteerProfileCard = ({ firstName, lastName, bio, avatar }) => (
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
            <p>{bio}</p>
          </Col>
        </Row>
        <Row>
          <Col>
            <EditProfileCard />
          </Col>
        </Row>
      </Col>
      <Col xs={12} md={2}>
        <Image roundedCircle src={avatar} width="150px" />
      </Col>
    </Row>
  </Container>
);

VolunteerProfileCard.propTypes = {
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  bio: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
};

export default VolunteerProfileCard;
