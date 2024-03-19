import React from 'react';
import PropTypes from 'prop-types';
import { Col, Container, Row, Image } from 'react-bootstrap';
import EditProfileCard from './EditProfileCard';

const VolunteerProfileCard = ({ profile }) => {
  const { firstName, lastName, bio, avatar } = profile;
  return (
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
              <EditProfileCard
                profile={profile}
              />
            </Col>
          </Row>
        </Col>
        <Col xs={12} md={2}>
          <Image roundedCircle src={avatar} width="150px" />
        </Col>
      </Row>
    </Container>
  );
};

VolunteerProfileCard.propTypes = {
  profile: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    bio: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
  }).isRequired,
};

export default VolunteerProfileCard;
