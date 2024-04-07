import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Card, Badge } from 'react-bootstrap';

const EventCard = ({ eventId, title, description, tags, startTime }) => (
  <Card className="my-2">
    <Card.Header className="d-flex justify-content-between">
      <Link to={`/volunteer-event-page/${eventId}`}>
        <strong>{title}</strong>
      </Link>
      <span className="text-end">{startTime.toLocaleDateString()}</span>
    </Card.Header>
    <Card.Body>
      <Card.Text>{description}</Card.Text>
    </Card.Body>
    <Card.Footer>
      {tags.map((tag, index) => (
        <Badge key={index} variant="info" className="mx-2" style={{ padding: '0.5rem', minWidth: '6rem', textAlign: 'center' }}>
          {tag}
        </Badge>
      ))}
    </Card.Footer>
  </Card>
);

EventCard.propTypes = {
  eventId: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  startTime: PropTypes.instanceOf(Date).isRequired,
};

export default EventCard;
