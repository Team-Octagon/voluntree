import React from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { useParams, useNavigate } from 'react-router';
import { Events } from '../../api/event/Events';

const VolunteerEventDetail = () => {
  const { _id } = useParams();
  const navigate = useNavigate();
  const { doc, ready } = useTracker(() => {
    const subscription = Events.subscribeEvent();
    const rdy = subscription.ready();
    const document = rdy ? Events.findOne(_id) : null;
    return { doc: document, ready: rdy };
  }, [_id]);
  return (
    <Container>
      { ready ? (
        <>
          <h1>{doc.title}</h1>
          <ul>
            {doc.tags.map(tag => <li key={tag}>{tag}</li>)}
          </ul>
          <p>{doc.description}</p>
          <p>Contact us at <a href={`mailto: ${doc.email}`}>{doc.email}</a></p>
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
