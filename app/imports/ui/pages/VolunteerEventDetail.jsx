import React from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { useParams, useNavigate } from 'react-router';
import { Events } from '../../api/event/Events';

const VolunteerEventDetail = () => {
  const { _id } = useParams();
  const navigate = useNavigate();
  const { event, eventReady } = useTracker(() => {
    const subscription = Events.subscribeEvent();
    const rdy = subscription.ready();
    const document = rdy ? Events.findOne(_id) : null;
    return { event: document, eventReady: rdy };
  }, [_id]);
  return (
    <Container>
      { eventReady ? (
        <>
          <h1>{event.title}</h1>
          <ul>
            {event.tags.map(tag => <li key={tag}>{tag}</li>)}
          </ul>
          <p>{event.description}</p>
          <p>Contact us at <a href={`mailto: ${event.email}`}>{event.email}</a></p>
          <Row>
            <Col>
              <Button>Volunteer</Button> <Button onClick={() => navigate('/volunteer-list-events')}>Back</Button>
            </Col>
          </Row>
        </>
      )

        : <h1>not found</h1>}
    </Container>
  );
};

export default VolunteerEventDetail;
