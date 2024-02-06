import React from 'react';
import PropTypes from 'prop-types';

/** Renders a single row in the List Events table. */
const EventItem = ({ event }) => (
  <tr>
    <td>{event.title}</td>
    <td>{event.eventDate}</td>
    <td>{event.location}</td>
    <td>{event.description}</td>
  </tr>
);

// Require a document to be passed to this component.
EventItem.propTypes = {
  event: PropTypes.shape({
    title: PropTypes.string,
    eventDate: PropTypes.string,
    location: PropTypes.string,
    description: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

export default EventItem;
