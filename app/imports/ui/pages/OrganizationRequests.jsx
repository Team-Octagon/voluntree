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
        <table className="table">
          <thead>
            <tr>
              <th className="text-left">Date Made</th>
              <th className="text-left">Email</th>
              <th className="text-right">Organization Name</th>
              <th className="test-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((request) => (
              <ListRequests
                key={request._id}
                createdAt={request.createdAt.toString()}
                email={request.email}
                organizationName={request.organizationName}
                password={request.password}
              />
            ))}
          </tbody>
        </table>
      </div>
    </Container>
  ) : <LoadingSpinner />;
};

export default OrganizationRequestsPage;
