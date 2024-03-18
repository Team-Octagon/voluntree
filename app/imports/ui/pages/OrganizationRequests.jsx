import React from 'react';
import { Container } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { OrganizationRequests } from '../../api/requests/OrganizationRequests';
import LoadingSpinner from '../components/LoadingSpinner';
import ListRequests from '../components/ListRequests';

const OrganizationRequestsPage = () => {
  const { ready, requests } = useTracker(() => {
    const sub = OrganizationRequests.subscribe();
    const requestItems = OrganizationRequests.find().fetch();
    return {
      ready: sub.ready(),
      requests: requestItems,
    };
  }, []);

  return ready ? (
    <Container>
      <h1>Organization Requests</h1>
      <div>
        {requests.map((request) => (
          <ListRequests
            key={request._id}
            createdAt={request.createdAt}
            email={request.email}
            organizationName={request.organizationName}
          />
        ))}
      </div>
    </Container>
  ) : <LoadingSpinner />;
};

export default OrganizationRequestsPage;
