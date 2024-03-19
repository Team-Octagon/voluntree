import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Alert, Button } from 'react-bootstrap';
import swal from 'sweetalert';
import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { OrganizationProfiles } from '../../api/user/OrganizationProfileCollection';
import { defineMethod } from '../../api/base/BaseCollection.methods';

const ListRequests = ({ createdAt, email, organizationName, password }) => {

  const schema = new SimpleSchema({
    email: String,
    name: String,
    password: String,
  });
  const bridge = new SimpleSchema2Bridge(schema);

  const [error, setError] = useState('');
  const approveRequest = () => {
    const collectionName = OrganizationProfiles.getCollectionName();
    const definitionData = { email, name: organizationName, password };
    console.log(collectionName, definitionData);
    defineMethod.callPromise({ collectionName, definitionData })
      .then(() => {
        swal('Success', 'Request approved', 'success');
        setError('');
        console.log('Request approved');
      })
      .catch((err) => setError(err.reason));
  };

  return (
    <tr>
      <td className="text-left">{createdAt}</td>
      <td className="text-left">{email}</td>
      <td className="text-right">{organizationName}</td>
      <td>
        <Button
          variant="success"
          schema={bridge}
          onClick={approveRequest}
        >Approve
        </Button>{' '}
        <Button variant="danger">Delete</Button>
        {error === '' ? (
          ''
        ) : (
          <Alert variant="danger">
            <Alert.Heading>Registration was not successful</Alert.Heading>
            {error}
          </Alert>
        )}
      </td>
    </tr>
  );
};

ListRequests.propTypes = {
  createdAt: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  organizationName: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
};

export default ListRequests;
