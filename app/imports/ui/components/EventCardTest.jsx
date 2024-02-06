import React from 'react';
import PropTypes from 'prop-types';
import { Card, Badge } from 'react-bootstrap';
import { COMPONENT_IDS } from '../utilities/ComponentIDs';

const EventCardTest = ({ title, description, eventLogo, tags }) => (
  <Card id={COMPONENT_IDS.EVENT_TEST_CARD} style={{ width: '18rem' }}>
    <a href={eventLogo}>
      <Card.Img variant="top" src={eventLogo} />
    </a>
    <Card.Header>{title}</Card.Header>
    <Card.Body>
      <Card.Text>{description}</Card.Text>
    </Card.Body>
    <Card.Footer>
      {tags.map((tag, index) => (
        <Badge key={index} variant="info" className="m-1">
          {tag}
        </Badge>
      ))}
    </Card.Footer>
  </Card>
);

// Require a document to be passed to this component.
EventCardTest.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  eventLogo: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default EventCardTest;
