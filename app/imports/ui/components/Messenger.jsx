import React from 'react';
import PropTypes from 'prop-types';


const Messenger = ({ title, description, tags }) => (
  <Card>
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
Messenger.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Messenger;
