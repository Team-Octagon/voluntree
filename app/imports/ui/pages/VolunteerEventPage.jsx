import React from 'react';
import { Card, Col, Container, Row, Badge, Button } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { useNavigate, useParams } from 'react-router';
import { Events } from '../../api/event/Events';
import LoadingSpinner from '../components/LoadingSpinner';
import { PAGE_IDS } from '../utilities/PageIDs';

const VolunteerEventPage = () => {
  const { _id } = useParams();
  const navigate = useNavigate();
  const { doc, ready } = useTracker(() => {
    const subscription = Events.subscribeEvent();
    const rdy = subscription.ready();
    const document = rdy ? Events.findOne(_id) : null;
    return { doc: document, ready: rdy };
  }, [_id]);

  return ready ? (
    <Container id={PAGE_IDS.VOLUNTEER_EVENT_PAGE} className="py-5">
      <Row className="justify-content-center mb-4">
        <Col md={8} lg={6}>
          {doc ? (
            <Card className="text-center mt-3">
              <Card.Body>
                <Card.Title className="mb-3">{doc.title}</Card.Title>
                <img src={doc.eventLogo || '/images/default-event-image.jpg'} alt="Event Logo" className="img-fluid mb-3" />
                <Row className="justify-content-center">
                  <h5 className="mb-3">{doc.organizer}</h5>
                  <Col sm={6}><strong>Date:</strong> {doc.eventDate.toLocaleDateString()}</Col>
                  <Col sm={6}><strong>Location:</strong> {doc.location}</Col>
                </Row>
                <Row className="justify-content-center mb-3">
                  <Col sm={6}><strong>Start Time:</strong> {doc.startTime.toLocaleDateString()}</Col>
                  <Col sm={6}><strong>End Time:</strong> {doc.endTime.toLocaleDateString() || 'Not specified'}</Col>
                </Row>
                <div className="description-box p-3" style={{ backgroundColor: '#f8f9fa', borderRadius: '5px', margin: 'auto' }}>
                  <strong>Description:</strong> {doc.description}
                </div>
                <Row className="justify-content-center mt-3">
                  <Col sm={12}>
                    {doc.tags.map((tag, index) => (
                      <Badge key={index} bg="primary" className="me-1">{tag}</Badge>
                    ))}
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <Row className="justify-content-between">
                  <Col xs={6}>
                    <Button className="w-100">Volunteer</Button>
                  </Col>
                  <Col xs={6}>
                    <Button className="w-100" onClick={() => navigate('/volunteer-list-events')}>
                      Back
                    </Button>
                  </Col>
                </Row>
              </Card.Footer>
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
