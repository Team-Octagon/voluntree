import React from 'react';
import { Container, ListGroup, Alert } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { OrganizationRequests } from '../../api/requests/OrganizationRequests';

const OrganizationRequestsPage = () => {
  const requests = useTracker(() => OrganizationRequests.find().fetch());

  return (
    <Container>
      <h1>Organization Requests</h1>
      {requests.length === 0 ? (
        <Alert variant="info">There are no organization requests at the moment.</Alert>
      ) : (
        <ListGroup>
          {requests.map((request) => (
            <ListGroup.Item key={request._id}>
              <strong>Email:</strong> {request.email}, <strong>Organization Name:</strong> {request.organizationName}
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </Container>
  );
};

export default OrganizationRequestsPage;
