import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { COMPONENT_IDS } from '../utilities/ComponentIDs';

/** Renders a single row in the List Events table. */
const EventItem = ({ event }) => (
  <tr>
    <td>{event.title}</td>
    <td>{event.organizer}</td>
    <td>{event.eventDate instanceof Date ? event.eventDate.toLocaleDateString() : event.eventDate}</td>
    <td>{event.location}</td>
    <td>{event.description}</td>
    <td>{event.startTime}</td>
    <td>{event.endTime}</td>
    <td>{event.volunteersNeeded}</td>
    <td>{event.status}</td>
    <td>{Array.isArray(event.tags) ? event.tags.join(', ') : event.tags}</td>
    <td>
      <Link className={COMPONENT_IDS.LIST_EVENTS_EDIT} to={`/edit-event/${event._id}`}>Edit</Link>
    </td>
  </tr>
);

// Update PropTypes to include new fields
EventItem.propTypes = {
  event: PropTypes.shape({
    title: PropTypes.string,
    organizer: PropTypes.string,
    eventDate: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.string]),
    location: PropTypes.string,
    description: PropTypes.string,
    startTime: PropTypes.string,
    endTime: PropTypes.string,
    volunteersNeeded: PropTypes.number,
    status: PropTypes.string,
    tags: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.string), PropTypes.string]),
    _id: PropTypes.string,
  }).isRequired,
};

export default EventItem;
