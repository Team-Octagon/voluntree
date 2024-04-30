import React, { useState, useEffect } from 'react';
import { Meteor } from 'meteor/meteor';
import { Card, Col, Container, Row, Badge, Button } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { Link } from 'react-router-dom';
import { useNavigate, useParams } from 'react-router';
import swal from 'sweetalert';
import { Events } from '../../api/event/Events';
import LoadingSpinner from '../components/LoadingSpinner';
import { PAGE_IDS } from '../utilities/PageIDs';
import FeedbackList from '../components/FeedbackList';
import { VolunteerProfileEvents } from '../../api/user/VolunteerProfileEvents';
import { defineMethod, removeItMethod } from '../../api/base/BaseCollection.methods';
import { OrganizationProfiles } from '../../api/user/OrganizationProfileCollection';

const VolunteerEventPage = () => {
  const { _id } = useParams();
  const navigate = useNavigate();
  const currentUser = Meteor.user()?.username;
  const { doc, ready, status, organizer } = useTracker(() => {
    const sub1 = Events.subscribeEvent();
    const sub2 = VolunteerProfileEvents.subscribeVolunteerProfileEventsVolunteer();
    const sub3 = OrganizationProfiles.subscribe();
    const rdy = sub1.ready() && sub2.ready() && sub3.ready();
    const document = rdy ? Events.findOne(_id) : null;
    const isSubscribed = rdy && currentUser ? !!VolunteerProfileEvents.findOne({ event: _id, volunteer: currentUser }) : false;
    const organization = rdy ? OrganizationProfiles.findOne({ name: document?.organizer }) : null;
    return { doc: document, ready: rdy, status: isSubscribed, organizer: organization };
  }, [_id]);

  const [isVolunteering, setIsVolunteering] = useState(status);

  useEffect(() => {
    setIsVolunteering(status);
  }, [status]);

  const submit = () => {
    const isSubscribed = VolunteerProfileEvents.find({ event: _id, volunteer: currentUser }).count() > 0;
    if (!isSubscribed) {
      const collectionName = VolunteerProfileEvents.getCollectionName();
      const definitionData = { event: _id, volunteer: currentUser };
      defineMethod.callPromise({ collectionName, definitionData })
        .then(() => {
          swal('Success', 'Event added successfully', 'success');
          setIsVolunteering(true);
        })
        .catch(error => swal('Error', error.message, 'error'));
    } else {
      const collectionName = VolunteerProfileEvents.getCollectionName();
      const instance = VolunteerProfileEvents.findDoc({ event: _id, volunteer: currentUser });
      removeItMethod.callPromise({ collectionName, instance })
        .then(() => {
          swal('Success', 'Event removed successfully', 'success');
          setIsVolunteering(false);
        })
        .catch(error => swal('Error', error.message, 'error'));
    }
  };

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
                  <Link to={`/organization-page/${organizer._id}`}>
                    <h5 className="mb-3">{doc.organizer}</h5>
                  </Link>
                  <Col sm={6}><strong>Date:</strong> {doc.eventDate.toLocaleDateString()}</Col>
                  <Col sm={6}><strong>Location:</strong> {doc.location}</Col>
                </Row>
                <Row className="justify-content-center mb-3">
                  <Col sm={6}><strong>Start Time:</strong> {doc.startTime.toLocaleString()}</Col>
                  <Col sm={6}><strong>End Time:</strong> {doc.endTime.toLocaleString() || 'Not specified'}</Col>
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
                    <Button
                      className="w-100"
                      onClick={submit}
                    >
                      {isVolunteering ? 'Unsubscribe' : 'Subscribe'}
                    </Button>
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
      <FeedbackList eventId={_id} />
    </Container>
  ) : <LoadingSpinner />;
};

export default VolunteerEventPage;
