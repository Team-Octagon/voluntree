import React from 'react';
import { Col, Container, Row, Image } from 'react-bootstrap';
import PropTypes from 'prop-types';

const OrganizationProfileCard = ({ profile }) => {
  const { name, bio, avatar } = profile;
  return (
    <Container fluid id="profile-card" className="my-5">
      <Row>
        <Col xs={12} md={{ span: 4, offset: 3 }}>
          <Row>
            <Col>
              <h1>{name}</h1>
            </Col>
          </Row>
          <Row>
            <Col>
              <p>{bio}</p>
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

OrganizationProfileCard.propTypes = {
  profile: PropTypes.shape({
    name: PropTypes.string.isRequired,
    bio: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
  }).isRequired,
};

export default OrganizationProfileCard;
