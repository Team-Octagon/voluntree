import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

const ListRequests = ({ createdAt, email, organizationName }) => (
  <tr>
    <td className="text-left">{createdAt}</td>
    <td className="text-left">{email}</td>
    <td className="text-right">{organizationName}</td>
    <td>
      <Button variant="success">Approve</Button>{' '}
      <Button variant="danger">Ignore</Button>
    </td>
  </tr>
);

ListRequests.propTypes = {
  createdAt: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  organizationName: PropTypes.string.isRequired,
};

export default ListRequests;
