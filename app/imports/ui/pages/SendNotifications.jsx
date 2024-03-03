import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import SendNotificationForm from '../components/SendNotificationsForm';
import { PAGE_IDS } from '../utilities/PageIDs';

const SendNotifications = () => (
  <Container id={PAGE_IDS.SEND_NOTIFCATIONS} className="py-3">
    <Row className="justify-content-center">
      <Col md={10} lg={8}>
        <h2 className="text-center mb-4">Send Notification</h2>
        <SendNotificationForm />
      </Col>
    </Row>
  </Container>
);

SendNotifications.defaultProps = {
  onSubmit: null,
};

export default SendNotifications;
