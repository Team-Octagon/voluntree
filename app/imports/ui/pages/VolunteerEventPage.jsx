import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { useParams } from 'react-router';
import { Events } from '../../api/event/Events';
import LoadingSpinner from '../components/LoadingSpinner';
import { PAGE_IDS } from '../utilities/PageIDs';

const VolunteerEventPage = () => {
  const { _id } = useParams();
  const { doc, ready } = useTracker(() => {
    const subscription = Events.subscribeEvent();
    const rdy = subscription.ready();
    const document = rdy ? Events.findOne(_id) : null;
    return { doc: document, ready: rdy };
  }, [_id]);

  return ready ? (
    <Container id={PAGE_IDS.VOLUNTEER_EVENT_PAGE} className="py-3">
      <Row className="justify-content-center">
        <Col md={10} lg={8}>
          <h2 className="text-center mb-4">Event Details</h2>
          {doc ? (
            <Card>
              <Card.Body>
                <Row>
                  <Col sm={6}><strong>Title:</strong> {doc.title}</Col>
                  <Col sm={6}><strong>Organizer:</strong> {doc.organizer}</Col>
                </Row>
                <Row>
                  <Col sm={6}><strong>Event Date:</strong> {doc.eventDate.toLocaleDateString()}</Col>
                  <Col sm={6}><strong>Location:</strong> {doc.location}</Col>
                </Row>
                <Row>
                  <Col><strong>Description:</strong> {doc.description}</Col>
                </Row>
                <Row>
                  <Col sm={6}><strong>Start Time:</strong> {doc.startTime}</Col>
                  <Col sm={6}><strong>End Time:</strong> {doc.endTime || 'Not specified'}</Col>
                </Row>
                <Row>
                  <Col sm={6}><strong>Volunteers Needed:</strong> {doc.volunteersNeeded}</Col>
                  <Col sm={6}><strong>Tags:</strong> {doc.tags.join(', ')}</Col>
                </Row>
                <Row>
                  <Col><strong>Event Logo:</strong> <img src={doc.eventLogo} alt="Event Logo" style={{ maxWidth: '100px', maxHeight: '100px' }} /></Col>
                </Row>
              </Card.Body>
            </Card>
          ) : (
            <p>Event not found</p>
          )}
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />;
};

export default VolunteerEventPage;
