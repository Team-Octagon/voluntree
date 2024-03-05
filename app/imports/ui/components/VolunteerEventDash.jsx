import React, { useState, useEffect } from 'react';
import { Col, Container, Row, Form } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTracker } from 'meteor/react-meteor-data';
import EventCardTest from './EventCardTest'; // Ensure this path is correct
import { Events } from '../../api/event/Events'; // Adjust this import path as necessary
import LoadingSpinner from './LoadingSpinner'; // Ensure this path is correct

const VolunteerEventDash = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState('');

  // Extract search term from URL
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const search = queryParams.get('search');
    setSearchTerm(search || '');
  }, [location]);

  const { ready, events } = useTracker(() => {
    const subscription = Events.subscribeEvent();
    const rdy = subscription.ready();
    const eventItems = Events.find({}).fetch();
    return {
      events: eventItems,
      ready: rdy,
    };
  }, []);

  const filteredEvents = ready ? events.filter(event => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return event.title.toLowerCase().includes(lowerCaseSearchTerm) ||
        (event.tags && event.tags.some(tag => tag.toLowerCase().includes(lowerCaseSearchTerm)));
  }) : [];

  return (
    ready ? (
      <Container fluid className="mt-4">
        <Form.Control
          type="text"
          placeholder="Search events by title or tags"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="mb-4"
        />
        <Row>
          {filteredEvents.map((event, index) => (
            <Col key={index} sm={4} className="p-2 d-flex justify-content-center" onClick={() => navigate(`/volunteer-event/${event._id}`)}>
              <EventCardTest
                eventLogo={event.eventLogo}
                title={event.title}
                description={event.description}
                tags={event.tags}
              />
            </Col>
          ))}
        </Row>
      </Container>
    ) : <LoadingSpinner />
  );
};

export default VolunteerEventDash;
