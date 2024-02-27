import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { Container, Row, Col } from 'react-bootstrap';
import { Notifications } from '../../api/notifications/Notifications';

// Renders notifications dropdown when bell icon is clicked.
const NotificationsDropdown = () => {

  const { ready, notifications } = useTracker(() => {
    // Subscribe to the Events collection.
    const subscription = Notifications.subscribeNotifications();
    // Determine if the subscription is ready.
    const rdy = subscription.ready();
    // Get the Event documents.
    const notificationItems = Notifications.find({}).fetch();
    return {
      notifications: notificationItems,
      ready: rdy,
    };
  }, []);
  if (ready) {
    console.log(notifications);
  }

  return (
    <Container style={{ width: '300px' }} className="d-flex align-items-center justify-content-center flex-column vh-20">
      {ready ? (
        notifications.map((notification, index) => (
          <Row key={index} className="mb-3">
            <Col className="flex-column">
              <h6>{notification.message}</h6>
              <p>{notification.createdAt.toLocaleString()}</p>
              <hr className="my-2" />
            </Col>
          </Row>
        ))
      ) : (
        <p>Loading...</p>
      )}
    </Container>
  );
};

export default NotificationsDropdown;
