import React from 'react';
import PropTypes from 'prop-types';
import { Card, Badge } from 'react-bootstrap';

const EventCard = ({ title, description, tags }) => (
  <Card style={{ width: '18rem' }}>
    <Card.Header>{title}</Card.Header>
    <Card.Body>
      <Card.Text>{description}</Card.Text>
    </Card.Body>
    <Card.Footer>
      {tags.map((tag, index) => (
        <Badge key={index} variant="info" className="mr-2">
          {tag}
        </Badge>
      ))}
    </Card.Footer>
  </Card>
);

// Require a document to be passed to this component.
EventCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default EventCard;
