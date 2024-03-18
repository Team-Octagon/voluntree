import React from 'react';
import PropTypes from 'prop-types';

const ListRequests = ({ createdAt, email, organizationName }) => (
  <div>
    <table className="table">
      <thead>
        <tr>
          <th className="text-center">Created At</th>
          <th className="text-center">Email</th>
          <th className="text-center">Organization Name</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="text-left">{createdAt}</td>
          <td className="text-center">{email}</td>
          <td className="text-right">{organizationName}</td>
        </tr>
      </tbody>
    </table>
  </div>
);

ListRequests.propTypes = {
  createdAt: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  organizationName: PropTypes.string.isRequired,
};

export default ListRequests;
