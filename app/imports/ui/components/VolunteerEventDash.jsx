import React, { useState, useEffect } from 'react';
import { Col, Container, Row, Form, Button } from 'react-bootstrap'; // Make sure to import Button
import { useNavigate, useLocation } from 'react-router-dom';
import { useTracker } from 'meteor/react-meteor-data';
import EventCardTest from './EventCardTest';
import { Events } from '../../api/event/Events';
import LoadingSpinner from './LoadingSpinner';
import { COMPONENT_IDS } from '../utilities/ComponentIDs';

const VolunteerEventDash = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState('');

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
    const isEventDateValid = new Date(event.eventDate) >= new Date();
    return (
      isEventDateValid &&
      (event.title.toLowerCase().includes(lowerCaseSearchTerm) ||
        (event.tags && event.tags.some(tag => tag.toLowerCase().includes(lowerCaseSearchTerm))))
    );
  }) : [];

  return (
    ready ? (
      <Container fluid className="mt-4">
        <Form.Control
          id={COMPONENT_IDS.SEARCH_EVENTS}
          type="text"
          placeholder="Search events by title or tags"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="mb-4"
        />
        <Row>
          {filteredEvents.map((event, index) => (
            <Col key={index} sm={4} className="p-2 d-flex justify-content-center expand-card">
              <div
                className="event-card-container"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%', // Make sure the container takes full height
                }}
              >
                <EventCardTest
                  eventLogo={event.eventLogo}
                  title={event.title}
                  description={event.description}
                  tags={event.tags}
                />
                <Button
                  variant="primary"
                  className="rounded-0 rounded-bottom-3 mb-3 shadow-lg" // Removed "mt-3" to eliminate the top margin
                  style={{
                    backgroundColor: 'teal',
                    borderColor: 'darkslategray',
                    color: 'white',
                    width: '100%', // Ensure the button takes the full width of its container
                  }}
                  onClick={() => navigate(`/volunteer-event-page/${event._id}`)}
                >
                  Learn More
                </Button>

              </div>
            </Col>
          ))}
        </Row>

      </Container>
    ) : <LoadingSpinner />
  );
};

export default VolunteerEventDash;
