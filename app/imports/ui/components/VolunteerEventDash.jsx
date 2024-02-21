import React, { useState } from 'react';
import { Col, Container, Tab, Row, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import { useTracker } from 'meteor/react-meteor-data';
import EventCardTest from './EventCardTest';
import { Events } from '../../api/event/Events'; // Adjust the import path as necessary
import LoadingSpinner from './LoadingSpinner';
import { COMPONENT_IDS } from '../utilities/ComponentIDs';

const VolunteerEventDash = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState('upcoming');

  const { ready, events } = useTracker(() => {
    const subscription = Events.subscribeEventAdmin(); // Adjust 'subscribeEventAdmin' to match your publication name if necessary
    const rdy = subscription.ready();
    const eventItems = Events.find({}).fetch(); // You can add query parameters to filter the events
    return {
      events: eventItems,
      ready: rdy,
    };
  }, []);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const filteredEvents = ready ? events.filter(event => {
    const searchTerm = search.toLowerCase();
    const titleMatch = event.title.toLowerCase().includes(searchTerm);
    const tagsMatch = event.tags.some(tag => tag.toLowerCase().includes(searchTerm));
    return titleMatch || tagsMatch;
  }) : [];

  return (
    ready ? (
      <Container fluid className="mt-4">
        <Form.Control id={COMPONENT_IDS.SEARCH_EVENTS} type="text" value={search} placeholder="Search events by title or tags" onChange={e => { setSearch(e.target.value); }} />
        <Tab.Container id="dashboard-tabs" activeKey={activeTab} onSelect={handleTabChange}>
          <Row>
            {filteredEvents.map((event, index) => (
              <Col key={index} sm={4} className="p-2 d-flex justify-content-center" onClick={() => navigate(`./${event._id}`)}>
                <EventCardTest
                  id={COMPONENT_IDS.EVENT_TEST_CARD}
                  eventLogo={event.eventLogo}
                  title={event.title}
                  description={event.description}
                  tags={event.tags}
                />
              </Col>
            ))}
          </Row>
        </Tab.Container>
      </Container>
    ) : <LoadingSpinner />
  );
};

export default VolunteerEventDash;
