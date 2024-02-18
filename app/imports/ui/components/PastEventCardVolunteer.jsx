import React from 'react';
import { Card } from 'react-bootstrap';
import PropTypes from 'prop-types';

const PastEventCardVolunteer = ({ title, description, date, location }) => {
  return (
    <Card style={{ marginBottom: '20px' }}>
      <Card.Body>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Card.Title>{title}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">Date: {date}</Card.Subtitle>
          <Card.Text>Description: {description}</Card.Text>
          <Card.Text>Location: {location}</Card.Text>
        </div>
      </Card.Body>
    </Card>
  );
};

PastEventCardVolunteer.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
};
export default PastEventCardVolunteer;
