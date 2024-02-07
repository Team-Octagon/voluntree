import React from 'react';
import PropTypes from 'prop-types';
import { EventInfo } from '../../api/stuff/EventInfoCollection';

/** Renders a single row in the List Stuff (Admin) table. See pages/ListStuffAdmin.jsx. */
const EventInfoAdmin = () => (
  <tr>
    <td>{EventInfo.name}</td>
    <td>{EventInfo.volunteers}</td>
    <td>{EventInfo.feedback}</td>
    <td>{EventInfo.hours}</td>
  </tr>
);

// Require a document to be passed to this component.
EventInfoAdmin.propTypes = {
  stuff: PropTypes.shape({
    name: PropTypes.string,
    hours: PropTypes.number,
    feedback: PropTypes.string,
    _id: PropTypes.string,
    volunteers: PropTypes.number,
  }).isRequired,
};

export default EventInfoAdmin;
